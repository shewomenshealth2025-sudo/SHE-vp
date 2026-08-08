import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bookmark,
  Building2,
  ChevronRight,
  Clock3,
  Filter,
  HeartPulse,
  Hospital,
  Globe2,
  Mail,
  MapPin,
  Navigation,
  LoaderCircle,
  Phone,
  Search,
  Stethoscope,
  Users,
  X,
} from "lucide-react";
import RealServiceMap from "../components/RealServiceMap";
import { services as originalServices } from "../data/services";
import { expandedServices } from "../data/expandedServices";
import { expandedServices2 } from "../data/expandedServices2";
import { serviceDatabase } from "../data/services/database";
import { communitySupportServices } from "../data/services/communitySupport.generated";
import { niFamilySupportServices } from "../data/services/niFamilySupport";

const allCandidateServices = [
  ...originalServices,
  ...expandedServices,
  ...expandedServices2,
  ...serviceDatabase,
  ...communitySupportServices,
  ...niFamilySupportServices,
];

const services = allCandidateServices.filter(
  (service, index, collection) => {
    const serviceId = service.id ?? service.name;

    return (
      collection.findIndex(
        (candidate) =>
          (candidate.id ?? candidate.name) === serviceId,
      ) === index
    );
  },
);

const typeFilters = [
  "All",
  "Public",
  "Private",
  "Specialist",
  "Community",
];

const topicFilters = [
  "All topics",
  "Periods & pelvic pain",
  "Endometriosis",
  "Fertility",
  "Contraception",
  "Pelvic health",
  "Menopause",
  "Support & wellbeing",
];

const STORAGE_KEY = "she-saved-services";

function readSavedServices() {
  try {
    return JSON.parse(
      window.localStorage.getItem(STORAGE_KEY) || "[]",
    );
  } catch {
    return [];
  }
}

function normalise(value = "") {
  return String(value).toLowerCase().trim();
}

function arrayFrom(value) {
  if (Array.isArray(value)) return value;
  if (!value) return [];
  return [value];
}


function toDisplayText(value, fallback = "") {
  if (value === null || value === undefined || value === "") {
    return fallback;
  }

  if (typeof value === "string" || typeof value === "number") {
    return String(value);
  }

  if (Array.isArray(value)) {
    const items = value
      .map((item) => toDisplayText(item))
      .filter(Boolean);

    return items.length ? items.join(", ") : fallback;
  }

  if (typeof value === "object") {
    const preferredValue =
      value.name ??
      value.label ??
      value.title ??
      value.description ??
      value.address ??
      value.city ??
      value.value;

    if (preferredValue !== undefined) {
      return toDisplayText(preferredValue, fallback);
    }

    const readableValues = Object.values(value)
      .filter(
        (item) =>
          typeof item === "string" ||
          typeof item === "number"
      )
      .map(String);

    return readableValues.length
      ? readableValues.join(", ")
      : fallback;
  }

  return fallback;
}

function getType(service) {
  return toDisplayText(
    service.type ??
      service.serviceType ??
      service.providerType,
    "Service",
  );
}

function getTopic(service) {
  return toDisplayText(
    service.topic ??
      service.category ??
      service.healthTopic ??
      service.speciality,
    "Women’s health",
  );
}

function getLocation(service) {
  return toDisplayText(
    service.locationName ??
      service.city ??
      service.location?.name ??
      service.location ??
      service.address,
    "Location information available in profile",
  );
}

function getReferralRoute(service) {
  return toDisplayText(
    service.referralRoute ??
      service.referral ??
      service.access,
    "Contact the service or your GP for referral information.",
  );
}

function getWaitTime(service) {
  return toDisplayText(
    service.waitingTime ??
      service.waitTime ??
      service.wait,
    "Not publicly available at service level",
  );
}

function getSpeciality(service) {
  return toDisplayText(
    service.speciality ??
      service.specialty ??
      service.description ??
      service.summary,
    "Women’s health support and care",
  );
}

function getContactDetails(service) {
  return {
    phone: toDisplayText(service.phone ?? service.telephone),
    email: toDisplayText(service.email),
    website: toDisplayText(service.website ?? service.sourceUrl),
  };
}

function searchTextForService(service) {
  return [
    service.name,
    getType(service),
    getTopic(service),
    getLocation(service),
    getSpeciality(service),
    getReferralRoute(service),
    ...arrayFrom(service.servicesOffered),
    ...arrayFrom(service.suitableFor),
    ...arrayFrom(service.tags),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

export default function ServicesPage() {
  const [query, setQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedTopic, setSelectedTopic] =
    useState("All topics");
  const [selectedService, setSelectedService] = useState(null);
  const [profileService, setProfileService] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [locationStatus, setLocationStatus] = useState("idle");
  const [savedIds, setSavedIds] = useState(readSavedServices);

  const filteredServices = useMemo(() => {
    const search = normalise(query);

    return services.filter((service) => {
      const matchesType =
        selectedType === "All" ||
        normalise(getType(service)) === normalise(selectedType);

      const matchesTopic =
        selectedTopic === "All topics" ||
        normalise(getTopic(service)).includes(
          normalise(selectedTopic),
        ) ||
        searchTextForService(service).includes(
          normalise(selectedTopic),
        );

      const matchesSearch =
        !search || searchTextForService(service).includes(search);

      return matchesType && matchesTopic && matchesSearch;
    });
  }, [query, selectedType, selectedTopic]);

  function toggleSaved(service) {
    const id = service.id ?? service.name;

    setSavedIds((current) => {
      const next = current.includes(id)
        ? current.filter((item) => item !== id)
        : [id, ...current];

      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(next),
      );

      return next;
    });
  }

  function isSaved(service) {
    return savedIds.includes(service.id ?? service.name);
  }

  function locateUser() {
    if (!navigator.geolocation) {
      setLocationStatus("unsupported");
      return;
    }

    setLocationStatus("loading");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });

        setLocationStatus("success");
      },
      () => {
        setLocationStatus("error");
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      },
    );
  }

  function resetFilters() {
    setQuery("");
    setSelectedType("All");
    setSelectedTopic("All topics");
    setSelectedService(null);
  }

  return (
    <main className="relative h-[calc(100dvh-72px)] min-h-[560px] overflow-hidden bg-stone-100 pb-20 lg:h-screen lg:min-h-[680px] lg:pb-0">
      <div className="absolute inset-0">
        <RealServiceMap
          services={filteredServices}
          selectedService={selectedService}
          userLocation={userLocation}
          onSelectService={setSelectedService}
        />
      </div>

      {/* Search and filters */}
      <section className="pointer-events-none absolute inset-x-0 top-0 z-[500] p-4 md:p-6">
        <div className="pointer-events-auto mx-auto max-w-7xl rounded-[28px] border border-white/70 bg-white/95 p-3 shadow-xl shadow-stone-900/10 backdrop-blur-xl md:p-4">
          <div className="flex items-center gap-3">
            <label className="flex min-w-0 flex-1 items-center gap-3 rounded-2xl bg-stone-50 px-4 py-3.5 focus-within:bg-white focus-within:ring-2 focus-within:ring-pink-100">
              <Search
                size={20}
                className="shrink-0 text-stone-400"
              />

              <input
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setSelectedService(null);
                }}
                placeholder="Search a symptom, condition or service..."
                className="w-full bg-transparent text-sm outline-none placeholder:text-stone-400 md:text-base"
              />

              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-stone-500"
                >
                  <X size={15} />
                </button>
              )}
            </label>

            <div className="hidden shrink-0 items-center gap-2 rounded-2xl bg-pink-50 px-4 py-3 text-sm font-medium text-[#f43f72] sm:flex">
              <MapPin size={17} />
              {filteredServices.length} locations
            </div>
          </div>

          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-stone-100 text-stone-500">
              <Filter size={17} />
            </span>

            {typeFilters.map((filter) => (
              <FilterPill
                key={filter}
                label={filter}
                active={selectedType === filter}
                onClick={() => {
                  setSelectedType(filter);
                  setSelectedService(null);
                }}
              />
            ))}

            <div className="mx-1 h-10 w-px shrink-0 bg-stone-200" />

            {topicFilters.map((filter) => (
              <FilterPill
                key={filter}
                label={filter}
                active={selectedTopic === filter}
                onClick={() => {
                  setSelectedTopic(filter);
                  setSelectedService(null);
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Empty state */}
      {filteredServices.length === 0 && (
        <div className="absolute inset-0 z-[450] flex items-center justify-center bg-white/55 p-5 backdrop-blur-sm">
          <div className="max-w-md rounded-[30px] border border-white bg-white p-8 text-center shadow-2xl">
            <Search
              size={34}
              className="mx-auto text-[#f43f72]"
            />

            <h2 className="mt-4 text-2xl font-semibold">
              No matching services
            </h2>

            <p className="mt-3 text-sm leading-6 text-stone-500">
              Try a broader search or clear one of the current
              filters.
            </p>

            <button
              type="button"
              onClick={resetFilters}
              className="mt-6 rounded-full bg-[#241f20] px-5 py-3 text-sm font-medium text-white"
            >
              Clear all filters
            </button>
          </div>
        </div>
      )}

      {/* Women’s health map controls */}
      <div className="absolute bottom-24 right-4 z-[500] flex flex-col items-end gap-3 md:bottom-6 md:right-6">
        <button
          type="button"
          onClick={locateUser}
          disabled={locationStatus === "loading"}
          className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-white/80 bg-white/95 text-[#f43f72] shadow-xl backdrop-blur-xl transition hover:scale-105 disabled:opacity-60"
          aria-label="Locate me"
          title="Locate me"
        >
          {locationStatus === "loading" ? (
            <LoaderCircle
              size={20}
              className="animate-spin"
            />
          ) : (
            <Navigation size={20} />
          )}
        </button>

        <div className="pointer-events-auto hidden rounded-2xl border border-white/80 bg-white/95 p-3 shadow-xl backdrop-blur-xl lg:block">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-stone-400">
            Map key
          </p>

          <div className="space-y-2 text-xs text-stone-600">
            <LegendItem colour="#ec407a" label="Public" />
            <LegendItem colour="#8b5cf6" label="Private" />
            <LegendItem colour="#38bdf8" label="Support" />
            <LegendItem colour="#22c55e" label="Pelvic health" />
            <LegendItem colour="#f59e0b" label="Wellbeing" />
            <LegendItem colour="#3b82f6" label="Diagnostics" />
          </div>
        </div>
      </div>

      {locationStatus === "error" && (
        <div className="absolute bottom-24 right-4 z-[550] max-w-xs rounded-2xl bg-[#241f20] px-4 py-3 text-xs leading-5 text-white shadow-xl md:right-6">
          We couldn’t access your location. Check your browser location permissions and try again.
        </div>
      )}

      {/* Selected marker card */}
      <AnimatePresence>
        {selectedService && (
          <SelectedServiceCard
            service={selectedService}
            saved={isSaved(selectedService)}
            close={() => setSelectedService(null)}
            toggleSaved={() => toggleSaved(selectedService)}
            openProfile={() => setProfileService(selectedService)}
          />
        )}
      </AnimatePresence>

      {/* Map helper */}
      {!selectedService && filteredServices.length > 0 && (
        <div className="pointer-events-none absolute bottom-24 left-1/2 z-[450] hidden -translate-x-1/2 sm:block md:bottom-6">
          <div className="rounded-full bg-[#241f20]/90 px-5 py-3 text-xs font-medium text-white shadow-xl backdrop-blur-md">
            Select a map marker to view the service
          </div>
        </div>
      )}

      <AnimatePresence>
        {profileService && (
          <ServiceProfileModal
            service={profileService}
            saved={isSaved(profileService)}
            close={() => setProfileService(null)}
            toggleSaved={() => toggleSaved(profileService)}
          />
        )}
      </AnimatePresence>
    </main>
  );
}

function LegendItem({ colour, label }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className="h-3 w-3 rounded-full border-2 border-white shadow-sm"
        style={{ backgroundColor: colour }}
      />
      {label}
    </div>
  );
}

function FilterPill({ label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`shrink-0 rounded-full px-4 py-2.5 text-sm transition ${
        active
          ? "bg-[#241f20] font-medium text-white"
          : "border border-stone-200 bg-white text-stone-600 hover:border-pink-200 hover:bg-pink-50"
      }`}
    >
      {label}
    </button>
  );
}

function SelectedServiceCard({
  service,
  saved,
  close,
  toggleSaved,
  openProfile,
}) {
  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 35,
        scale: 0.98,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        y: 30,
        scale: 0.98,
      }}
      className="absolute inset-x-3 bottom-24 z-[600] max-h-[62dvh] overflow-y-auto rounded-[28px] border border-white/80 bg-white/95 p-5 shadow-2xl backdrop-blur-xl sm:inset-x-auto sm:bottom-24 sm:left-6 sm:w-[390px] md:bottom-6 md:max-h-[80vh] md:p-6"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-pink-50 text-[#f43f72]">
          <Hospital size={22} />
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={toggleSaved}
            className={`flex h-10 w-10 items-center justify-center rounded-full ${
              saved
                ? "bg-[#f43f72] text-white"
                : "bg-stone-100 text-stone-500"
            }`}
          >
            <Bookmark
              size={17}
              fill={saved ? "currentColor" : "none"}
            />
          </button>

          <button
            type="button"
            onClick={close}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-100 text-stone-500"
          >
            <X size={17} />
          </button>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <span className="rounded-full bg-pink-50 px-3 py-1.5 text-xs font-medium text-[#f43f72]">
          {getType(service)}
        </span>

        <span className="rounded-full bg-stone-100 px-3 py-1.5 text-xs text-stone-600">
          {getTopic(service)}
        </span>
      </div>

      <h2 className="mt-4 text-2xl font-semibold leading-tight">
        {service.name}
      </h2>

      <p className="mt-2 text-sm leading-6 text-stone-500">
        {getSpeciality(service)}
      </p>

      <div className="mt-5 flex items-center gap-2 text-sm text-stone-500">
        <MapPin size={16} className="text-[#f43f72]" />
        {getLocation(service)}
      </div>

      <div className="mt-5 rounded-2xl bg-stone-50 p-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-stone-400">
          Referral route
        </p>

        <p className="mt-2 text-sm leading-6 text-stone-600">
          {getReferralRoute(service)}
        </p>
      </div>

      <ServiceContacts service={service} compact />

      <button
        type="button"
        onClick={openProfile}
        className="mt-5 flex w-full items-center justify-between rounded-2xl bg-[#241f20] px-5 py-4 text-sm font-medium text-white"
      >
        View full profile
        <ChevronRight size={18} />
      </button>
    </motion.article>
  );
}

function ServiceProfileModal({
  service,
  saved,
  close,
  toggleSaved,
}) {
  const offered = arrayFrom(
    service.servicesOffered ??
      service.services ??
      service.support,
  );

  const suitableFor = arrayFrom(
    service.suitableFor ??
      service.whoItsFor ??
      service.eligibility,
  );

  const preparation = arrayFrom(
    service.appointmentPreparation ??
      service.appointmentPrep ??
      service.prepare,
  );

  const relatedGuides = arrayFrom(service.relatedGuides);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={close}
      className="fixed inset-0 z-[1000] flex items-end justify-center bg-black/35 backdrop-blur-sm md:items-center md:p-6"
    >
      <motion.article
        initial={{
          opacity: 0,
          y: 45,
          scale: 0.98,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        exit={{
          opacity: 0,
          y: 35,
          scale: 0.98,
        }}
        onClick={(event) => event.stopPropagation()}
        className="mb-[76px] max-h-[calc(94dvh-76px)] w-full max-w-3xl overflow-y-auto rounded-t-[34px] bg-white shadow-2xl md:mb-0 md:max-h-[94vh] md:rounded-[34px]"
      >
        <header className="sticky top-0 z-10 flex items-center justify-between border-b border-stone-100 bg-white/95 px-5 py-4 backdrop-blur-xl md:px-8">
          <p className="text-sm font-medium text-stone-500">
            Service profile
          </p>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={toggleSaved}
              className={`flex h-10 w-10 items-center justify-center rounded-full ${
                saved
                  ? "bg-[#f43f72] text-white"
                  : "bg-stone-100 text-stone-500"
              }`}
            >
              <Bookmark
                size={17}
                fill={saved ? "currentColor" : "none"}
              />
            </button>

            <button
              type="button"
              onClick={close}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-100 text-stone-500"
            >
              <X size={18} />
            </button>
          </div>
        </header>

        <div className="px-6 pb-12 pt-8 md:px-10">
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-pink-50 text-[#f43f72]">
            <Hospital size={28} />
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <span className="rounded-full bg-pink-50 px-3 py-1.5 text-xs font-medium text-[#f43f72]">
              {getType(service)}
            </span>

            <span className="rounded-full bg-stone-100 px-3 py-1.5 text-xs text-stone-600">
              {getTopic(service)}
            </span>
          </div>

          <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
            {service.name}
          </h1>

          <p className="mt-4 text-base leading-7 text-stone-600">
            {getSpeciality(service)}
          </p>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            <InfoCard
              icon={MapPin}
              label="Location"
              value={getLocation(service)}
            />

            <InfoCard
              icon={Clock3}
              label="Waiting time"
              value={getWaitTime(service)}
            />

            <InfoCard
              icon={Stethoscope}
              label="Referral route"
              value={getReferralRoute(service)}
            />

            <InfoCard
              icon={Building2}
              label="Service type"
              value={getType(service)}
            />
          </div>

          <ServiceContacts service={service} />

          {offered.length > 0 && (
            <ProfileSection
              icon={HeartPulse}
              title="Services offered"
              items={offered}
            />
          )}

          {suitableFor.length > 0 && (
            <ProfileSection
              icon={Users}
              title="Who it may be suitable for"
              items={suitableFor}
            />
          )}

          {preparation.length > 0 && (
            <ProfileSection
              icon={Stethoscope}
              title="Preparing for an appointment"
              items={preparation}
            />
          )}

          {relatedGuides.length > 0 && (
            <ProfileSection
              icon={HeartPulse}
              title="Related SHE guides"
              items={relatedGuides}
            />
          )}

          <div className="mt-9 rounded-2xl bg-pink-50 p-4 text-xs leading-5 text-stone-500">
            Service details should be confirmed directly with the
            provider. Referral routes, eligibility and waiting times can
            change.
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
}

function ServiceContacts({ service, compact = false }) {
  const { phone, email, website } = getContactDetails(service);
  const actions = [
    {
      label: phone || "Phone not published",
      shortLabel: "Call",
      href: phone ? `tel:${phone.replace(/[^+\d]/g, "")}` : null,
      icon: Phone,
    },
    {
      label: email || "Email not published",
      shortLabel: "Email",
      href: email ? `mailto:${email}` : null,
      icon: Mail,
    },
    {
      label: website ? "Open provider website" : "Website not published",
      shortLabel: "Website",
      href: website || null,
      icon: Globe2,
      external: true,
    },
  ];

  return (
    <section className={compact ? "mt-4" : "mt-9"} aria-label="Contact this service">
      {!compact && <h2 className="text-xl font-semibold">Contact this service</h2>}
      <div className={`${compact ? "grid grid-cols-3" : "mt-4 grid sm:grid-cols-3"} gap-2`}>
        {actions.map(({ label, shortLabel, href, icon: Icon, external }) => {
          const classes = `flex min-w-0 flex-col items-center justify-center gap-2 rounded-2xl border px-2 py-3 text-center transition ${
            href
              ? "border-pink-100 bg-pink-50 text-[#e93368] hover:bg-pink-100"
              : "cursor-not-allowed border-stone-100 bg-stone-50 text-stone-400"
          }`;
          const content = (
            <>
              <Icon size={compact ? 17 : 20} />
              <span className="text-xs font-semibold">{shortLabel}</span>
              {!compact && <span className="max-w-full truncate text-[11px] font-normal text-stone-500">{label}</span>}
            </>
          );

          return href ? (
            <a
              key={shortLabel}
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noreferrer" : undefined}
              className={classes}
              aria-label={`${shortLabel}: ${label}`}
            >
              {content}
            </a>
          ) : (
            <span key={shortLabel} className={classes} title={label}>
              {content}
            </span>
          );
        })}
      </div>
    </section>
  );
}

function InfoCard({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl border border-stone-100 bg-white p-5 shadow-sm">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-pink-50 text-[#f43f72]">
        <Icon size={17} />
      </div>

      <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-400">
        {label}
      </p>

      <p className="mt-2 text-sm leading-6 text-stone-600">
        {value}
      </p>
    </div>
  );
}

function ProfileSection({ icon: Icon, title, items }) {
  return (
    <section className="mt-9">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-pink-50 text-[#f43f72]">
          <Icon size={19} />
        </div>

        <h2 className="text-xl font-semibold">{title}</h2>
      </div>

      <div className="mt-4 space-y-3">
        {items.map((item, index) => {
          const text =
            typeof item === "string"
              ? item
              : item?.title ??
                item?.name ??
                item?.label ??
                JSON.stringify(item);

          return (
            <div
              key={`${text}-${index}`}
              className="flex items-start gap-3 rounded-2xl bg-stone-50 px-4 py-3 text-sm leading-6 text-stone-600"
            >
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#f43f72]" />
              {text}
            </div>
          );
        })}
      </div>
    </section>
  );
}
