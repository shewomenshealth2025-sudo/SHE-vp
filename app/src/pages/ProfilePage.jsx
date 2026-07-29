import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  CalendarDays,
  Check,
  ChevronRight,
  CirclePlus,
  Clock3,
  HeartPulse,
  Lock,
  Pill,
  Plus,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Trash2,
  X,
} from "lucide-react";

const STORAGE_KEY = "she-health-profile";

const emptyProfile = {
  firstName: "",
  healthStage: "Not selected",
  personalisationEnabled: false,
  conditions: [],
  medications: [],
  symptoms: [],
  timeline: [],
};

const healthStages = [
  "Not selected",
  "Menstrual health",
  "Trying to conceive",
  "Pregnant",
  "Postpartum",
  "Perimenopause",
  "Menopause",
  "Postmenopause",
];

const commonConditions = [
  "Endometriosis",
  "Adenomyosis",
  "PCOS",
  "Fibroids",
  "POTS",
  "Lupus",
  "Rheumatoid arthritis",
  "Hashimoto’s thyroiditis",
  "Coeliac disease",
  "Migraine",
  "ME/CFS",
  "Iron deficiency",
  "PMDD",
  "Hypermobility",
  "Long COVID",
];

const commonSymptoms = [
  "Pelvic pain",
  "Painful periods",
  "Heavy bleeding",
  "Fatigue",
  "Dizziness",
  "Heart racing",
  "Brain fog",
  "Joint pain",
  "Headache or migraine",
  "Bloating",
  "Sleep problems",
  "Hot flushes",
];

function loadProfile() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);

    if (!stored) return emptyProfile;

    return {
      ...emptyProfile,
      ...JSON.parse(stored),
    };
  } catch {
    return emptyProfile;
  }
}

function createId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 7)}`;
}

function formatDate(value) {
  if (!value) return "";

  const date = new Date(`${value}T12:00:00`);

  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

export default function ProfilePage() {
  const [profile, setProfile] = useState(loadProfile);
  const [activeModal, setActiveModal] = useState(null);

  useEffect(() => {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(profile),
    );

    window.localStorage.setItem(
      "she-chat-personalisation-enabled",
      JSON.stringify(profile.personalisationEnabled),
    );

    window.localStorage.setItem(
      "she-chat-health-context",
      JSON.stringify({
        conditions: profile.conditions.map((item) => item.name),
        medications: profile.medications.map((item) => ({
          name: item.name,
          dose: item.dose,
          frequency: item.frequency,
        })),
        symptoms: profile.symptoms.map((item) => ({
          name: item.name,
          severity: item.severity,
        })),
        healthStage: profile.healthStage,
      }),
    );
  }, [profile]);

  const recentTimeline = useMemo(() => {
    return [...profile.timeline]
      .sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      })
      .slice(0, 5);
  }, [profile.timeline]);

  function removeItem(section, id) {
    setProfile((current) => ({
      ...current,
      [section]: current[section].filter((item) => item.id !== id),
    }));
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-5 pb-32 pt-8 md:px-8 lg:px-12">
      <section className="flex flex-col justify-between gap-6 border-b border-stone-100 pb-8 sm:flex-row sm:items-end">
        <div>
          <p className="flex items-center gap-2 text-sm font-medium text-[#f43f72]">
            <HeartPulse size={16} />
            My Health
          </p>

          <h1 className="mt-2 text-4xl font-semibold tracking-tight text-[#241f20] md:text-5xl">
            Your health, in one place.
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-stone-500 md:text-base">
            Keep a simple record of the information you may want available
            for appointments and personalised SHE support.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setActiveModal("profile")}
          className="flex w-fit items-center gap-2 rounded-full border border-stone-200 bg-white px-5 py-3 text-sm font-medium text-stone-700 shadow-sm transition hover:border-pink-200"
        >
          Edit profile
          <ChevronRight size={16} />
        </button>
      </section>

      <section className="mt-7 grid gap-4 sm:grid-cols-3">
        <SummaryCard
          icon={Stethoscope}
          value={profile.conditions.length}
          label="Conditions"
        />

        <SummaryCard
          icon={Pill}
          value={profile.medications.length}
          label="Medications"
        />

        <SummaryCard
          icon={Activity}
          value={profile.symptoms.length}
          label="Symptoms"
        />
      </section>

      <section className="mt-8 rounded-[30px] border border-stone-100 bg-white p-6 shadow-sm md:p-8">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-medium text-[#f43f72]">
              Health snapshot
            </p>

            <h2 className="mt-2 text-2xl font-semibold">
              {profile.firstName
                ? `${profile.firstName}’s health profile`
                : "Your health profile"}
            </h2>

            <p className="mt-2 text-sm text-stone-500">
              Current stage: {profile.healthStage}
            </p>
          </div>

          <label className="flex cursor-pointer items-center gap-3 rounded-2xl bg-pink-50 px-4 py-3">
            <div>
              <p className="text-sm font-medium text-[#241f20]">
                Personalise SHE Chat
              </p>

              <p className="mt-1 text-xs text-stone-500">
                Use this profile when answering
              </p>
            </div>

            <input
              type="checkbox"
              checked={profile.personalisationEnabled}
              onChange={(event) =>
                setProfile((current) => ({
                  ...current,
                  personalisationEnabled: event.target.checked,
                }))
              }
              className="h-5 w-5 accent-[#f43f72]"
            />
          </label>
        </div>

        <div className="mt-6 flex items-start gap-3 rounded-2xl bg-stone-50 px-4 py-3 text-xs leading-5 text-stone-500">
          <Lock size={16} className="mt-0.5 shrink-0 text-[#f43f72]" />
          This MVP stores your profile only in this browser. Do not use it
          as your only copy of important medical information.
        </div>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <SimpleSection
          icon={Stethoscope}
          title="Conditions"
          subtitle="Diagnosed or currently being investigated"
          addLabel="Add condition"
          onAdd={() => setActiveModal("condition")}
          emptyText="No conditions added."
        >
          {profile.conditions.map((condition) => (
            <HealthRow
              key={condition.id}
              title={condition.name}
              detail={
                condition.status === "suspected"
                  ? "Being investigated"
                  : "Diagnosed"
              }
              onDelete={() =>
                removeItem("conditions", condition.id)
              }
            />
          ))}
        </SimpleSection>

        <SimpleSection
          icon={Pill}
          title="Medications"
          subtitle="Current medicines and treatments"
          addLabel="Add medication"
          onAdd={() => setActiveModal("medication")}
          emptyText="No medications added."
        >
          {profile.medications.map((medication) => (
            <HealthRow
              key={medication.id}
              title={medication.name}
              detail={[
                medication.dose,
                medication.frequency,
              ]
                .filter(Boolean)
                .join(" · ")}
              onDelete={() =>
                removeItem("medications", medication.id)
              }
            />
          ))}
        </SimpleSection>

        <SimpleSection
          icon={Activity}
          title="Current symptoms"
          subtitle="A light snapshot rather than a daily tracker"
          addLabel="Add symptom"
          onAdd={() => setActiveModal("symptom")}
          emptyText="No symptoms added."
        >
          {profile.symptoms.map((symptom) => (
            <SymptomRow
              key={symptom.id}
              symptom={symptom}
              onDelete={() =>
                removeItem("symptoms", symptom.id)
              }
            />
          ))}
        </SimpleSection>

        <SimpleSection
          icon={CalendarDays}
          title="Recent timeline"
          subtitle="Appointments, tests and important changes"
          addLabel="Add entry"
          onAdd={() => setActiveModal("timeline")}
          emptyText="No timeline entries added."
        >
          {recentTimeline.map((entry) => (
            <TimelineRow
              key={entry.id}
              entry={entry}
              onDelete={() =>
                removeItem("timeline", entry.id)
              }
            />
          ))}
        </SimpleSection>
      </section>

      <section className="mt-8 rounded-[30px] bg-[#241f20] p-6 text-white md:p-8">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="flex items-center gap-2 text-sm text-white/65">
              <ShieldCheck size={16} />
              Appointment preparation
            </p>

            <h2 className="mt-2 text-2xl font-semibold">
              Keep the important details easy to find.
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-white/60">
              Your conditions, medications and recent symptoms can later
              be turned into a concise appointment summary.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setActiveModal("summary")}
            className="flex shrink-0 items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-[#241f20]"
          >
            View summary
            <ChevronRight size={16} />
          </button>
        </div>
      </section>

      <AnimatePresence>
        {activeModal === "profile" && (
          <ProfileModal
            profile={profile}
            save={(values) => {
              setProfile((current) => ({
                ...current,
                ...values,
              }));

              setActiveModal(null);
            }}
            close={() => setActiveModal(null)}
          />
        )}

        {activeModal === "condition" && (
          <ConditionModal
            save={(condition) => {
              setProfile((current) => ({
                ...current,
                conditions: [
                  ...current.conditions,
                  {
                    id: createId("condition"),
                    ...condition,
                  },
                ],
              }));

              setActiveModal(null);
            }}
            close={() => setActiveModal(null)}
          />
        )}

        {activeModal === "medication" && (
          <MedicationModal
            save={(medication) => {
              setProfile((current) => ({
                ...current,
                medications: [
                  ...current.medications,
                  {
                    id: createId("medication"),
                    ...medication,
                  },
                ],
              }));

              setActiveModal(null);
            }}
            close={() => setActiveModal(null)}
          />
        )}

        {activeModal === "symptom" && (
          <SymptomModal
            save={(symptom) => {
              setProfile((current) => ({
                ...current,
                symptoms: [
                  ...current.symptoms,
                  {
                    id: createId("symptom"),
                    ...symptom,
                  },
                ],
              }));

              setActiveModal(null);
            }}
            close={() => setActiveModal(null)}
          />
        )}

        {activeModal === "timeline" && (
          <TimelineModal
            save={(entry) => {
              setProfile((current) => ({
                ...current,
                timeline: [
                  ...current.timeline,
                  {
                    id: createId("timeline"),
                    ...entry,
                  },
                ],
              }));

              setActiveModal(null);
            }}
            close={() => setActiveModal(null)}
          />
        )}

        {activeModal === "summary" && (
          <SummaryModal
            profile={profile}
            close={() => setActiveModal(null)}
          />
        )}
      </AnimatePresence>
    </main>
  );
}

function SummaryCard({ icon: Icon, value, label }) {
  return (
    <div className="rounded-[24px] border border-stone-100 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-pink-50 text-[#f43f72]">
          <Icon size={19} />
        </div>

        <p className="text-2xl font-semibold">{value}</p>
      </div>

      <p className="mt-4 text-sm text-stone-500">{label}</p>
    </div>
  );
}

function SimpleSection({
  icon: Icon,
  title,
  subtitle,
  addLabel,
  onAdd,
  emptyText,
  children,
}) {
  const items = Array.isArray(children)
    ? children.filter(Boolean)
    : children
      ? [children]
      : [];

  return (
    <section className="rounded-[30px] border border-stone-100 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-pink-50 text-[#f43f72]">
              <Icon size={19} />
            </div>

            <h2 className="text-xl font-semibold">{title}</h2>
          </div>

          <p className="mt-3 text-sm text-stone-500">
            {subtitle}
          </p>
        </div>

        <button
          type="button"
          onClick={onAdd}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-stone-100 text-stone-600 transition hover:bg-pink-50 hover:text-[#f43f72]"
          aria-label={addLabel}
          title={addLabel}
        >
          <Plus size={18} />
        </button>
      </div>

      <div className="mt-5 divide-y divide-stone-100">
        {items.length > 0 ? (
          items
        ) : (
          <div className="py-7 text-center">
            <p className="text-sm text-stone-400">{emptyText}</p>

            <button
              type="button"
              onClick={onAdd}
              className="mt-3 text-sm font-medium text-[#f43f72]"
            >
              {addLabel}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function HealthRow({ title, detail, onDelete }) {
  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <div>
        <p className="font-medium text-[#241f20]">{title}</p>

        {detail && (
          <p className="mt-1 text-xs text-stone-500">
            {detail}
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={onDelete}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-stone-300 transition hover:bg-red-50 hover:text-red-500"
        aria-label={`Remove ${title}`}
      >
        <Trash2 size={15} />
      </button>
    </div>
  );
}

function SymptomRow({ symptom, onDelete }) {
  return (
    <div className="py-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="font-medium">{symptom.name}</p>

          <p className="mt-1 text-xs text-stone-500">
            {symptom.frequency}
          </p>
        </div>

        <button
          type="button"
          onClick={onDelete}
          className="flex h-9 w-9 items-center justify-center rounded-full text-stone-300 transition hover:bg-red-50 hover:text-red-500"
        >
          <Trash2 size={15} />
        </button>
      </div>

      <div className="mt-3 flex gap-1.5">
        {[1, 2, 3, 4, 5].map((level) => (
          <span
            key={level}
            className={`h-2 flex-1 rounded-full ${
              level <= Number(symptom.severity)
                ? "bg-[#f43f72]"
                : "bg-stone-100"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function TimelineRow({ entry, onDelete }) {
  return (
    <div className="flex items-start justify-between gap-4 py-4">
      <div className="flex items-start gap-3">
        <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-pink-50 text-[#f43f72]">
          <Clock3 size={15} />
        </span>

        <div>
          <p className="font-medium">{entry.title}</p>

          <p className="mt-1 text-xs text-stone-500">
            {formatDate(entry.date)}
            {entry.type ? ` · ${entry.type}` : ""}
          </p>

          {entry.notes && (
            <p className="mt-2 text-sm leading-6 text-stone-500">
              {entry.notes}
            </p>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={onDelete}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-stone-300 transition hover:bg-red-50 hover:text-red-500"
      >
        <Trash2 size={15} />
      </button>
    </div>
  );
}

function ModalShell({ title, subtitle, close, children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={close}
      className="fixed inset-0 z-[1000] flex items-end justify-center bg-black/30 backdrop-blur-sm md:items-center md:p-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 35, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.98 }}
        onClick={(event) => event.stopPropagation()}
        className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-[32px] bg-white p-6 shadow-2xl md:rounded-[32px] md:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold">{title}</h2>

            {subtitle && (
              <p className="mt-2 text-sm leading-6 text-stone-500">
                {subtitle}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={close}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-stone-100 text-stone-500"
          >
            <X size={17} />
          </button>
        </div>

        <div className="mt-7">{children}</div>
      </motion.div>
    </motion.div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-stone-700">
        {label}
      </span>

      <div className="mt-2">{children}</div>
    </label>
  );
}

const inputClass =
  "w-full rounded-2xl border border-stone-200 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-pink-300 focus:ring-4 focus:ring-pink-100";

const primaryButtonClass =
  "mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#241f20] px-5 py-3.5 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40";

function ProfileModal({ profile, save, close }) {
  const [firstName, setFirstName] = useState(profile.firstName);
  const [healthStage, setHealthStage] = useState(
    profile.healthStage,
  );

  return (
    <ModalShell
      title="Edit health profile"
      subtitle="Only include information you are comfortable storing in this browser."
      close={close}
    >
      <div className="space-y-5">
        <Field label="First name or preferred name">
          <input
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            placeholder="Optional"
            className={inputClass}
          />
        </Field>

        <Field label="Current health stage">
          <select
            value={healthStage}
            onChange={(event) => setHealthStage(event.target.value)}
            className={inputClass}
          >
            {healthStages.map((stage) => (
              <option key={stage}>{stage}</option>
            ))}
          </select>
        </Field>
      </div>

      <button
        type="button"
        onClick={() =>
          save({
            firstName: firstName.trim(),
            healthStage,
          })
        }
        className={primaryButtonClass}
      >
        <Check size={17} />
        Save profile
      </button>
    </ModalShell>
  );
}

function ConditionModal({ save, close }) {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("diagnosed");

  return (
    <ModalShell
      title="Add a condition"
      subtitle="Add a diagnosis or something currently being investigated."
      close={close}
    >
      <div className="space-y-5">
        <Field label="Condition">
          <input
            list="she-condition-options"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="For example, POTS"
            className={inputClass}
          />

          <datalist id="she-condition-options">
            {commonConditions.map((condition) => (
              <option key={condition} value={condition} />
            ))}
          </datalist>
        </Field>

        <Field label="Status">
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className={inputClass}
          >
            <option value="diagnosed">Diagnosed</option>
            <option value="suspected">Being investigated</option>
          </select>
        </Field>
      </div>

      <button
        type="button"
        disabled={!name.trim()}
        onClick={() =>
          save({
            name: name.trim(),
            status,
          })
        }
        className={primaryButtonClass}
      >
        <CirclePlus size={17} />
        Add condition
      </button>
    </ModalShell>
  );
}

function MedicationModal({ save, close }) {
  const [name, setName] = useState("");
  const [dose, setDose] = useState("");
  const [frequency, setFrequency] = useState("");

  return (
    <ModalShell
      title="Add medication"
      subtitle="Record the basic details you may need during an appointment."
      close={close}
    >
      <div className="space-y-5">
        <Field label="Medication name">
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Medication"
            className={inputClass}
          />
        </Field>

        <Field label="Dose">
          <input
            value={dose}
            onChange={(event) => setDose(event.target.value)}
            placeholder="For example, 10 mg"
            className={inputClass}
          />
        </Field>

        <Field label="Frequency">
          <input
            value={frequency}
            onChange={(event) => setFrequency(event.target.value)}
            placeholder="For example, once daily"
            className={inputClass}
          />
        </Field>
      </div>

      <button
        type="button"
        disabled={!name.trim()}
        onClick={() =>
          save({
            name: name.trim(),
            dose: dose.trim(),
            frequency: frequency.trim(),
          })
        }
        className={primaryButtonClass}
      >
        <CirclePlus size={17} />
        Add medication
      </button>
    </ModalShell>
  );
}

function SymptomModal({ save, close }) {
  const [name, setName] = useState("");
  const [severity, setSeverity] = useState(3);
  const [frequency, setFrequency] = useState("Sometimes");

  return (
    <ModalShell
      title="Add a symptom"
      subtitle="Keep this as a simple snapshot. Detailed tracking can be added later."
      close={close}
    >
      <div className="space-y-5">
        <Field label="Symptom">
          <input
            list="she-symptom-options"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="For example, dizziness"
            className={inputClass}
          />

          <datalist id="she-symptom-options">
            {commonSymptoms.map((symptom) => (
              <option key={symptom} value={symptom} />
            ))}
          </datalist>
        </Field>

        <Field label={`Severity: ${severity} of 5`}>
          <input
            type="range"
            min="1"
            max="5"
            value={severity}
            onChange={(event) =>
              setSeverity(Number(event.target.value))
            }
            className="w-full accent-[#f43f72]"
          />
        </Field>

        <Field label="How often?">
          <select
            value={frequency}
            onChange={(event) => setFrequency(event.target.value)}
            className={inputClass}
          >
            <option>Rarely</option>
            <option>Sometimes</option>
            <option>Often</option>
            <option>Most days</option>
            <option>Daily</option>
          </select>
        </Field>
      </div>

      <button
        type="button"
        disabled={!name.trim()}
        onClick={() =>
          save({
            name: name.trim(),
            severity,
            frequency,
          })
        }
        className={primaryButtonClass}
      >
        <CirclePlus size={17} />
        Add symptom
      </button>
    </ModalShell>
  );
}

function TimelineModal({ save, close }) {
  const [type, setType] = useState("Appointment");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(
    new Date().toISOString().slice(0, 10),
  );
  const [notes, setNotes] = useState("");

  return (
    <ModalShell
      title="Add a timeline entry"
      subtitle="Record an appointment, test, referral or important health change."
      close={close}
    >
      <div className="space-y-5">
        <Field label="Entry type">
          <select
            value={type}
            onChange={(event) => setType(event.target.value)}
            className={inputClass}
          >
            <option>Appointment</option>
            <option>Referral</option>
            <option>Blood test</option>
            <option>Scan</option>
            <option>Procedure</option>
            <option>Medication change</option>
            <option>Symptom change</option>
            <option>Other</option>
          </select>
        </Field>

        <Field label="Title">
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="For example, GP appointment"
            className={inputClass}
          />
        </Field>

        <Field label="Date">
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            className={inputClass}
          />
        </Field>

        <Field label="Notes">
          <textarea
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            placeholder="Optional"
            rows={3}
            className={`${inputClass} resize-none`}
          />
        </Field>
      </div>

      <button
        type="button"
        disabled={!title.trim() || !date}
        onClick={() =>
          save({
            type,
            title: title.trim(),
            date,
            notes: notes.trim(),
          })
        }
        className={primaryButtonClass}
      >
        <CirclePlus size={17} />
        Add timeline entry
      </button>
    </ModalShell>
  );
}

function SummaryModal({ profile, close }) {
  const conditions = profile.conditions
    .map((item) => item.name)
    .join(", ");

  const medications = profile.medications
    .map((item) =>
      [item.name, item.dose, item.frequency]
        .filter(Boolean)
        .join(" — "),
    )
    .join("\n");

  const symptoms = profile.symptoms
    .map(
      (item) =>
        `${item.name} — severity ${item.severity}/5, ${item.frequency.toLowerCase()}`,
    )
    .join("\n");

  const summaryText = [
    `Health stage: ${profile.healthStage}`,
    "",
    "Conditions:",
    conditions || "None recorded",
    "",
    "Current medications:",
    medications || "None recorded",
    "",
    "Current symptoms:",
    symptoms || "None recorded",
  ].join("\n");

  async function copySummary() {
    try {
      await navigator.clipboard.writeText(summaryText);
    } catch {
      // Clipboard access may be restricted in some previews.
    }
  }

  return (
    <ModalShell
      title="Health summary"
      subtitle="A simple overview to help you prepare for an appointment."
      close={close}
    >
      <div className="space-y-6">
        <SummaryBlock
          title="Health stage"
          value={profile.healthStage}
        />

        <SummaryBlock
          title="Conditions"
          value={conditions || "None recorded"}
        />

        <SummaryBlock
          title="Medications"
          value={medications || "None recorded"}
          preserveLines
        />

        <SummaryBlock
          title="Current symptoms"
          value={symptoms || "None recorded"}
          preserveLines
        />
      </div>

      <button
        type="button"
        onClick={copySummary}
        className={primaryButtonClass}
      >
        <Check size={17} />
        Copy summary
      </button>

      <p className="mt-4 text-xs leading-5 text-stone-400">
        Check all information for accuracy before sharing it with a
        healthcare professional.
      </p>
    </ModalShell>
  );
}

function SummaryBlock({ title, value, preserveLines = false }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-400">
        {title}
      </p>

      <p
        className={`mt-2 text-sm leading-6 text-stone-700 ${
          preserveLines ? "whitespace-pre-line" : ""
        }`}
      >
        {value}
      </p>
    </div>
  );
}
