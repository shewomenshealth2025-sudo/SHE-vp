import { useEffect, useMemo, useState } from "react";

function toText(value, fallback = "") {
  if (value === null || value === undefined || value === "") return fallback;
  if (typeof value === "string" || typeof value === "number") return String(value);
  if (Array.isArray(value)) return value.map((item) => toText(item)).filter(Boolean).join(", ");
  if (typeof value === "object") {
    return toText(
      value.name ?? value.label ?? value.title ?? value.city ?? value.county,
      fallback,
    );
  }
  return fallback;
}

function getLocation(service) {
  return toText(
    service.city ??
      service.county ??
      service.locationName ??
      service.location?.name ??
      service.address?.city ??
      service.address?.county ??
      service.address,
    "View location",
  );
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

function MinimiseIcon({ expanded }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={expanded ? "m6 9 6 6 6-6" : "m6 15 6-6 6 6"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function NearbyUpdatesPopup({ services = [], onSelectService }) {
  const updates = useMemo(() => {
    return services
      .filter((service) => {
        const news = service?.news;
        return (
          service?.id &&
          service?.name &&
          news &&
          news.active !== false &&
          news.title &&
          news.summary &&
          news.publishedAt
        );
      })
      .sort(
        (a, b) =>
          Date.parse(b.news.publishedAt) - Date.parse(a.news.publishedAt),
      )
      .slice(0, 6);
  }, [services]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [minimised, setMinimised] = useState(false);

  useEffect(() => {
    setActiveIndex(0);
  }, [updates.length]);

  useEffect(() => {
    if (paused || minimised || updates.length < 2) return undefined;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % updates.length);
    }, 6500);

    return () => window.clearInterval(timer);
  }, [paused, minimised, updates.length]);

  if (updates.length === 0) return null;

  const service = updates[activeIndex];
  const news = service.news;

  const previous = () => {
    setActiveIndex((current) => (current === 0 ? updates.length - 1 : current - 1));
  };

  const next = () => {
    setActiveIndex((current) => (current + 1) % updates.length);
  };

  return (
    <>
      <style>{`
        .she-nearby-popup {
          transition: transform .34s ease, opacity .26s ease;
        }

        .she-nearby-popup.is-minimised {
          transform: translateY(calc(100% - 48px));
        }

        .she-nearby-minimise {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          margin-left: 4px;
          border: 0;
          border-radius: 999px;
          background: #fff1f5;
          color: #f43f72;
          cursor: pointer;
          flex: 0 0 auto;
        }

        .she-nearby-minimise:hover {
          background: #ffe1ea;
        }

        .she-nearby-header-actions {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .she-nearby-popup.is-minimised .she-nearby-main,
        .she-nearby-popup.is-minimised .she-nearby-dots {
          visibility: hidden;
          opacity: 0;
          pointer-events: none;
        }

        .she-nearby-popup.is-minimised .she-nearby-header {
          margin-bottom: 0;
          height: 30px;
        }

        @media (max-width: 700px) {
          .she-nearby-popup.is-minimised {
            transform: translateY(calc(100% - 50px));
          }
        }
      `}</style>

      <aside
        className={`she-nearby-popup${minimised ? " is-minimised" : ""}`}
        aria-label="New local women's health updates"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="she-nearby-header">
          <span className="she-nearby-kicker">
            <LocationIcon /> New near you
          </span>

          <div className="she-nearby-header-actions">
            {!minimised && (
              <span className="she-nearby-count">
                {activeIndex + 1} / {updates.length}
              </span>
            )}

            <button
              className="she-nearby-minimise"
              type="button"
              onClick={() => setMinimised((current) => !current)}
              aria-label={minimised ? "Show local updates" : "Minimise local updates"}
              aria-expanded={!minimised}
            >
              <MinimiseIcon expanded={!minimised} />
            </button>
          </div>
        </div>

        <div className="she-nearby-main" key={service.id}>
          {updates.length > 1 && (
            <button className="she-nearby-arrow she-nearby-arrow-left" type="button" onClick={previous} aria-label="Previous update">
              <Chevron direction="left" />
            </button>
          )}

          <div className="she-nearby-icon"><BuildingIcon /></div>

          <div className="she-nearby-content">
            <span className="she-nearby-label">{news.label ?? "New service update"}</span>
            <h3>{news.title}</h3>
            <div className="she-nearby-location"><LocationIcon /> {getLocation(service)}</div>
            <p>{news.summary}</p>
            <button className="she-nearby-details" type="button" onClick={() => onSelectService?.(service)}>
              View details <Chevron />
            </button>
          </div>

          {updates.length > 1 && (
            <button className="she-nearby-arrow she-nearby-arrow-right" type="button" onClick={next} aria-label="Next update">
              <Chevron />
            </button>
          )}
        </div>

        {updates.length > 1 && (
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
        )}
      </aside>
    </>
  );
}