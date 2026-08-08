import { useEffect, useMemo, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import NearbyUpdatesPopup from "./NearbyUpdatesPopup";

function toText(value, fallback = "") {
  if (value === null || value === undefined || value === "") {
    return fallback;
  }

  if (typeof value === "string" || typeof value === "number") {
    return String(value);
  }

  if (Array.isArray(value)) {
    return value.map((item) => toText(item)).filter(Boolean).join(", ");
  }

  if (typeof value === "object") {
    return toText(
      value.name ??
        value.label ??
        value.title ??
        value.description ??
        value.value,
      fallback,
    );
  }

  return fallback;
}

function getCoordinates(service) {
  const coordinateArray =
    Array.isArray(service.coordinates)
      ? service.coordinates
      : Array.isArray(service.location?.coordinates)
        ? service.location.coordinates
        : null;

  const lat =
    service.latitude ??
    service.lat ??
    coordinateArray?.[0] ??
    service.coordinates?.lat ??
    service.coordinates?.latitude ??
    service.location?.lat ??
    service.location?.latitude;

  const lng =
    service.longitude ??
    service.lng ??
    service.lon ??
    coordinateArray?.[1] ??
    service.coordinates?.lng ??
    service.coordinates?.lon ??
    service.coordinates?.longitude ??
    service.location?.lng ??
    service.location?.lon ??
    service.location?.longitude;

  return {
    lat: Number.parseFloat(lat),
    lng: Number.parseFloat(lng),
  };
}

function getServiceType(service) {
  return toText(
    service.type ??
      service.serviceType ??
      service.providerType,
    "Service",
  );
}

function getServiceTopic(service) {
  return toText(
    service.topic ??
      service.category ??
      service.healthTopic ??
      service.speciality,
    "Women’s health",
  );
}

function getServiceLocation(service) {
  return toText(
    service.locationName ??
      service.city ??
      service.location?.name ??
      service.address,
    "View location details",
  );
}

function getMarkerTheme(service) {
  const text = `${getServiceType(service)} ${getServiceTopic(service)}`
    .toLowerCase();

  if (text.includes("nhs")) {
    return {
      colour: "#ec407a",
      label: "NHS",
      symbol: "✚",
    };
  }

  if (text.includes("private")) {
    return {
      colour: "#8b5cf6",
      label: "Private",
      symbol: "✦",
    };
  }

  if (
    text.includes("support") ||
    text.includes("community") ||
    text.includes("charity")
  ) {
    return {
      colour: "#38bdf8",
      label: "Support",
      symbol: "♥",
    };
  }

  if (
    text.includes("physio") ||
    text.includes("pelvic health")
  ) {
    return {
      colour: "#22c55e",
      label: "Physiotherapy",
      symbol: "●",
    };
  }

  if (
    text.includes("mental") ||
    text.includes("wellbeing") ||
    text.includes("counselling")
  ) {
    return {
      colour: "#f59e0b",
      label: "Wellbeing",
      symbol: "✦",
    };
  }

  if (
    text.includes("diagnostic") ||
    text.includes("imaging") ||
    text.includes("scan")
  ) {
    return {
      colour: "#3b82f6",
      label: "Diagnostics",
      symbol: "◆",
    };
  }

  return {
    colour: "#f43f72",
    label: "Women’s health",
    symbol: "●",
  };
}

function createMarkerIcon(service, selected = false) {
  const theme = getMarkerTheme(service);

  return L.divIcon({
    className: "she-map-marker-shell",
    iconSize: selected ? [54, 62] : [44, 52],
    iconAnchor: selected ? [27, 57] : [22, 48],
    popupAnchor: [0, selected ? -54 : -45],
    html: `
      <div class="${selected ? "she-map-marker-selected" : ""}" style="
        position:relative;
        width:${selected ? 48 : 40}px;
        height:${selected ? 48 : 40}px;
      ">
        ${
          selected
            ? `
              <span style="
                position:absolute;
                inset:-7px;
                border-radius:999px;
                background:${theme.colour};
                opacity:.18;
                animation:sheMarkerPulse 1.7s infinite;
              "></span>
            `
            : ""
        }

        <div style="
          position:absolute;
          inset:0;
          border-radius:50% 50% 50% 12px;
          transform:rotate(-45deg);
          background:${theme.colour};
          border:4px solid white;
          box-shadow:0 9px 24px rgba(36,31,32,.28);
          display:flex;
          align-items:center;
          justify-content:center;
        ">
          <span style="
            transform:rotate(45deg);
            color:white;
            font-size:${selected ? 18 : 15}px;
            font-weight:800;
            line-height:1;
          ">
            ${theme.symbol}
          </span>
        </div>
      </div>
    `,
  });
}

function createUserIcon() {
  return L.divIcon({
    className: "she-user-location-shell",
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    html: `
      <div style="
        position:relative;
        width:36px;
        height:36px;
      ">
        <span style="
          position:absolute;
          inset:-8px;
          border-radius:999px;
          background:#3b82f6;
          opacity:.17;
          animation:sheMarkerPulse 1.8s infinite;
        "></span>

        <div style="
          position:absolute;
          inset:5px;
          border-radius:999px;
          background:#3b82f6;
          border:4px solid white;
          box-shadow:0 6px 18px rgba(59,130,246,.35);
        "></div>
      </div>
    `,
  });
}

function MapController({
  services,
  selectedService,
  userLocation,
}) {
  const map = useMap();

  useEffect(() => {
    if (selectedService) return;

    const points = services
      .map(getCoordinates)
      .filter(
        ({ lat, lng }) =>
          Number.isFinite(lat) && Number.isFinite(lng),
      )
      .map(({ lat, lng }) => [lat, lng]);

    if (!points.length) return;

    if (points.length === 1) {
      map.flyTo(points[0], 13, {
        duration: 0.65,
      });

      return;
    }

    map.fitBounds(points, {
      paddingTopLeft: [70, 190],
      paddingBottomRight: [70, 90],
      maxZoom: 12,
    });
  }, [map, services, selectedService]);

  useEffect(() => {
    if (!selectedService) return;

    const { lat, lng } = getCoordinates(selectedService);

    if (!Number.isFinite(lat) || !Number.isFinite(lng)) return;

    map.flyTo([lat, lng], Math.max(map.getZoom(), 14), {
      duration: 0.65,
    });
  }, [map, selectedService]);

  useEffect(() => {
    if (!userLocation) return;

    map.flyTo(
      [userLocation.latitude, userLocation.longitude],
      14,
      {
        duration: 0.8,
      },
    );
  }, [map, userLocation]);

  return null;
}

function ClusteredMarkers({
  services,
  selectedService,
  userLocation,
  onSelectService,
}) {
  const map = useMap();
  const clusterRef = useRef(null);
  const userMarkerRef = useRef(null);

  useEffect(() => {
    if (clusterRef.current) {
      map.removeLayer(clusterRef.current);
    }

    const cluster = L.markerClusterGroup({
      showCoverageOnHover: false,
      spiderfyOnMaxZoom: true,
      maxClusterRadius: 48,
      disableClusteringAtZoom: 15,
      iconCreateFunction(clusterItem) {
        const count = clusterItem.getChildCount();

        return L.divIcon({
          className: "she-cluster-shell",
          iconSize: [48, 48],
          html: `
            <div style="
              width:48px;
              height:48px;
              border-radius:999px;
              display:flex;
              align-items:center;
              justify-content:center;
              background:#241f20;
              color:white;
              border:4px solid white;
              box-shadow:0 8px 24px rgba(36,31,32,.24);
              font-size:14px;
              font-weight:700;
            ">
              ${count}
            </div>
          `,
        });
      },
    });

    services.forEach((service) => {
      const { lat, lng } = getCoordinates(service);

      if (!Number.isFinite(lat) || !Number.isFinite(lng)) return;

      const serviceId = service.id ?? service.name;
      const selectedId =
        selectedService?.id ?? selectedService?.name;

      const marker = L.marker([lat, lng], {
        icon: createMarkerIcon(
          service,
          serviceId === selectedId,
        ),
        riseOnHover: true,
      });

      const theme = getMarkerTheme(service);

      marker.bindTooltip(
        `
          <div style="min-width:190px;padding:3px 2px;">
            <div style="
              display:inline-block;
              margin-bottom:6px;
              border-radius:999px;
              padding:3px 8px;
              background:${theme.colour}16;
              color:${theme.colour};
              font-size:10px;
              font-weight:700;
            ">
              ${theme.label}
            </div>

            <div style="
              font-weight:700;
              color:#241f20;
              font-size:13px;
              line-height:1.35;
            ">
              ${service.name}
            </div>

            <div style="
              margin-top:5px;
              color:#78716c;
              font-size:11px;
            ">
              ${getServiceLocation(service)}
            </div>
          </div>
        `,
        {
          direction: "top",
          offset: [0, -38],
          opacity: 1,
        },
      );

      marker.on("click", () => {
        onSelectService?.(service);
      });

      cluster.addLayer(marker);
    });

    map.addLayer(cluster);
    clusterRef.current = cluster;

    return () => {
      if (clusterRef.current) {
        map.removeLayer(clusterRef.current);
        clusterRef.current = null;
      }
    };
  }, [
    map,
    services,
    selectedService,
    onSelectService,
  ]);

  useEffect(() => {
    if (userMarkerRef.current) {
      map.removeLayer(userMarkerRef.current);
      userMarkerRef.current = null;
    }

    if (!userLocation) return;

    const marker = L.marker(
      [userLocation.latitude, userLocation.longitude],
      {
        icon: createUserIcon(),
        zIndexOffset: 1000,
      },
    );

    marker.bindTooltip("Your location", {
      direction: "top",
      offset: [0, -16],
    });

    marker.addTo(map);
    userMarkerRef.current = marker;

    return () => {
      if (userMarkerRef.current) {
        map.removeLayer(userMarkerRef.current);
        userMarkerRef.current = null;
      }
    };
  }, [map, userLocation]);

  return null;
}

export default function RealServiceMap({
  services = [],
  selectedService = null,
  userLocation = null,
  onSelectService,
}) {
  const validServices = useMemo(() => {
    return services.filter((service) => {
      const { lat, lng } = getCoordinates(service);

      return Number.isFinite(lat) && Number.isFinite(lng);
    });
  }, [services]);

  const initialCentre =
    validServices.length > 0
      ? [
          getCoordinates(validServices[0]).lat,
          getCoordinates(validServices[0]).lng,
        ]
      : [54.5973, -5.9301];

  return (
    <div className="she-service-map-wrap">
      <style>{`
        @keyframes sheMarkerPulse {
          0% { transform: scale(.72); opacity: .36; }
          65% { transform: scale(1.25); opacity: .06; }
          100% { transform: scale(1.25); opacity: 0; }
        }

        @keyframes sheNearbyFade {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .she-service-map-wrap {
          position: relative;
          width: 100%;
          height: 100%;
          min-height: 520px;
          overflow: hidden;
        }

        .she-service-map-wrap .leaflet-container {
          width: 100%;
          height: 100%;
          min-height: 520px;
        }

        .she-map-marker-shell,
        .she-cluster-shell,
        .she-user-location-shell {
          background: transparent !important;
          border: 0 !important;
        }

        .leaflet-tooltip {
          border: 1px solid rgba(244, 63, 114, .12);
          border-radius: 15px;
          box-shadow: 0 10px 35px rgba(36, 31, 32, .13);
          padding: 9px 11px;
        }

        .leaflet-tooltip-top::before { border-top-color: white; }
        .marker-cluster-small, .marker-cluster-medium, .marker-cluster-large { background: transparent !important; }
        .marker-cluster div { background: transparent !important; }

        .she-nearby-popup {
          position: absolute;
          left: 22px;
          bottom: 22px;
          z-index: 1000;
          width: min(430px, calc(100% - 44px));
          padding: 18px 18px 16px;
          background: rgba(255,255,255,.98);
          border: 1px solid rgba(244,63,114,.15);
          border-radius: 22px;
          box-shadow: 0 22px 60px rgba(36,31,32,.16), 0 7px 24px rgba(244,63,114,.13);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }

        .she-nearby-close {
          display: none;
          position: absolute;
          top: 7px;
          right: 11px;
          border: 0;
          background: transparent;
          color: #78716c;
          font-size: 24px;
          cursor: pointer;
        }

        .she-nearby-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 14px;
        }

        .she-nearby-kicker {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: #f43f72;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: .02em;
          text-transform: uppercase;
        }

        .she-nearby-count { color: #57534e; font-size: 12px; font-weight: 600; }

        .she-nearby-main {
          position: relative;
          display: grid;
          grid-template-columns: 66px minmax(0,1fr);
          gap: 15px;
          align-items: start;
          animation: sheNearbyFade .25s ease;
        }

        .she-nearby-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 66px;
          height: 66px;
          border-radius: 999px;
          background: #ffe6ef;
          color: #f43f72;
        }

        .she-nearby-content { min-width: 0; }
        .she-nearby-label { color: #f43f72; font-size: 11px; font-weight: 700; }

        .she-nearby-content h3 {
          margin: 3px 0 7px;
          color: #181314;
          font-size: 19px;
          line-height: 1.15;
          letter-spacing: -.02em;
        }

        .she-nearby-location {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 7px;
          color: #292524;
          font-size: 13px;
          font-weight: 600;
        }

        .she-nearby-content p {
          margin: 0 0 12px;
          color: #57534e;
          font-size: 13px;
          line-height: 1.42;
        }

        .she-nearby-details {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          min-height: 40px;
          padding: 9px 12px;
          border: 0;
          border-radius: 11px;
          background: #ffe5ee;
          color: #ed376d;
          font: inherit;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
        }

        .she-nearby-details:hover { background: #ffd7e4; }

        .she-nearby-arrow {
          position: absolute;
          top: 25px;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 30px;
          height: 38px;
          padding: 0;
          border: 0;
          background: transparent;
          color: #f43f72;
          opacity: 0;
          cursor: pointer;
          transition: opacity .15s ease;
        }

        .she-nearby-popup:hover .she-nearby-arrow { opacity: 1; }
        .she-nearby-arrow-left { left: -17px; }
        .she-nearby-arrow-right { right: -17px; }

        .she-nearby-dots {
          display: flex;
          justify-content: center;
          gap: 7px;
          margin-top: 14px;
        }

        .she-nearby-dots button {
          width: 7px;
          height: 7px;
          padding: 0;
          border: 0;
          border-radius: 999px;
          background: #dedbd9;
          cursor: pointer;
          transition: width .18s ease, background .18s ease;
        }

        .she-nearby-dots button.is-active { width: 18px; background: #f43f72; }

        @media (max-width: 700px) {
          .she-nearby-popup {
            position: absolute;
            left: 12px;
            right: 12px;
            bottom: 12px;
            width: auto;
            padding: 15px;
            border-radius: 19px;
          }
          .she-nearby-close { display: block; }
          .she-nearby-header { padding-right: 24px; }
          .she-nearby-main { grid-template-columns: 54px minmax(0,1fr); gap: 12px; }
          .she-nearby-icon { width: 54px; height: 54px; }
          .she-nearby-content h3 { font-size: 17px; }
          .she-nearby-arrow { display: none; }
        }
      `}</style>

      <MapContainer
        center={initialCentre}
        zoom={11}
        scrollWheelZoom={false}
        dragging
        className="h-full w-full"
        zoomControl
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapController
          services={validServices}
          selectedService={selectedService}
          userLocation={userLocation}
        />

        <ClusteredMarkers
          services={validServices}
          selectedService={selectedService}
          userLocation={userLocation}
          onSelectService={onSelectService}
        />
      </MapContainer>

      <NearbyUpdatesPopup
        services={validServices}
        onSelectService={onSelectService}
      />
    </div>
  );}
