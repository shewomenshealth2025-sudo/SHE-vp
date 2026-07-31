import { useEffect, useMemo, useState } from "react";

function toText(value, fallback = "") {
  if (value === null || value === undefined || value === "") return fallback;
  if (typeof value === "string" || typeof value === "number") return String(value);
  if (Array.isArray(value)) return value.map((item) => toText(item)).filter(Boolean).join(", ");
  if (typeof value === "object") {
    return toText(
      value.name ??
        value.label ??
        value.title ??
        value.description ??
        value.value ??
        value.city ??
        value.county,
      fallback,
    );
  }
  return fallback;
}

function getLocation(service) {
  const location =
    service.city ??
    service.county ??
    service.locationName ??
    service.location?.name ??
    service.address?.city ??
    service.address?.county ??
    service.address;

  return toText(location, "View location");
}

function getUpdateLabel(service) {
  const text = `${service.type ?? ""} ${service.topic ?? ""} ${(service.topics ?? []).join(" ")}`.toLowerCase();

  if (text.includes("support") || text.includes("community") || text.includes("charity")) {
    return "Community update";
  }

  if (text.includes("physio") || text.includes("pelvic")) {
    return "Pelvic health service";
  }

  if (text.includes("menopause")) {
    return "Menopause service";
  }

  if (text.includes("maternity") || text.includes("postnatal") || text.includes("pregnancy")) {
    return "Maternity update";
  }

  if (service.acceptsSelfReferral) {
    return "Self-referral available";
  }

  return "New service added";
}

function getDescription(service) {
  if (service.acceptsSelfReferral) {
    return "You can contact this service directly without waiting for a GP referral.";
  }

  if (service.acceptsGPReferral) {
    return "This service accepts GP referrals. View the service for referral details.";
  }

  if (Array.isArray(service.servicesOffered) && service.servicesOffered.length > 0) {
    return service.servicesOffered.slice(0, 2).join(" · ");
  }

  return toText(service.speciality, "Tap to view service details and contact information.");
}

function dateValue(service) {
  const value = Date.parse(service.lastVerified ?? service.updatedAt ?? service.createdAt ?? "");
  return Number.isFinite(value) ? value : 0;
}

function LocationIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.9" />
    </svg>
  );
}

function BuildingIcon() {
  return (
    <svg width="35" height="35" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 21V5a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v16M15 9h4a1 1 0 0 1 1 1v11M2 21h20" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M7 8h2m2 0h2M7 12h2m2 0h2M7 16h2m8-3h1m-1 3h1" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function Chevron({ direction = "right" }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ transform: direction === "left" ? "rotate(180deg)" : undefined }}>
      <path d="m9 18 6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function NearbyUpdatesPopup({ services = [], onSelectService }) {
  const updates = useMemo(() => {
    return [...services]
      .filter((service) => service?.id && service?.name)
      .sort((a, b) => dateValue(b) - dateValue(a))
      .slice(0, 6);
  }, [services]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setActiveIndex(0);
  }, [updates.length]);

  useEffect(() => {
    if (paused || updates.length < 2) return undefined;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % updates.length);
    }, 6500);

    return () => window.clearInterval(timer);
  }, [paused, updates.length]);

  if (!visible || updates.length === 0) return null;

  const service = updates[activeIndex];

  const previous = () => {
    setActiveIndex((current) => (current === 0 ? updates.length - 1 : current - 1));
  };

  const next = () => {
    setActiveIndex((current) => (current + 1) % updates.length);
  };

  return (
    <aside
      className="she-nearby-popup"
      aria-label="What is happening near you"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <button className="she-nearby-close" type="button" onClick={() => setVisible(false)} aria-label="Close local updates">×</button>

      <div className="she-nearby-header">
        <span className="she-nearby-kicker"><LocationIcon /> What’s happening near you</span>
        <span className="she-nearby-count">{activeIndex + 1} / {updates.length}</span>
      </div>

      <div className="she-nearby-main" key={service.id}>
        <button className="she-nearby-arrow she-nearby-arrow-left" type="button" onClick={previous} aria-label="Previous update">
          <Chevron direction="left" />
        </button>

        <div className="she-nearby-icon"><BuildingIcon /></div>

        <div className="she-nearby-content">
          <span className="she-nearby-label">{getUpdateLabel(service)}</span>
          <h3>{service.name}</h3>
          <div className="she-nearby-location"><LocationIcon /> {getLocation(service)}</div>
          <p>{getDescription(service)}</p>
          <button className="she-nearby-details" type="button" onClick={() => onSelectService?.(service)}>
            View details <Chevron />
          </button>
        </div>

        <button className="she-nearby-arrow she-nearby-arrow-right" type="button" onClick={next} aria-label="Next update">
          <Chevron />
        </button>
      </div>

      <div className="she-nearby-dots">
        {updates.map((item, index) => (
          <button
            key={item.id}
            type="button"
            className={index === activeIndex ? "is-active" : ""}
            onClick={() => setActiveIndex(index)}
            aria-label={`Show update ${index + 1}`}
          />
        ))}
      </div>
    </aside>
  );
}