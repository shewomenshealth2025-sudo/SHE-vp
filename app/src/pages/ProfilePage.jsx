import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  ChevronRight,
  CirclePlus,
  HeartPulse,
  LockKeyhole,
  Pill,
  Stethoscope,
  Trash2,
  UserRound,
  X,
} from "lucide-react";

const STORAGE_KEY = "she-health-profile";

const EMPTY_PROFILE = {
  lifeStage: "",
  personaliseChat: false,
  conditions: [],
  medications: [],
  symptoms: [],
};

const SECTIONS = {
  conditions: {
    title: "Conditions",
    description:
      "Add conditions you have been diagnosed with or are currently investigating.",
    placeholder: "e.g. Endometriosis",
    icon: Stethoscope,
  },
  medications: {
    title: "Medications",
    description:
      "Keep a simple record of current medicines and treatments.",
    placeholder: "e.g. Levothyroxine",
    icon: Pill,
  },
  symptoms: {
    title: "Symptoms",
    description:
      "Save symptoms you may want to discuss during an appointment.",
    placeholder: "e.g. Pelvic pain",
    icon: Activity,
  },
};

function loadProfile() {
  try {
    const savedProfile = window.localStorage.getItem(STORAGE_KEY);

    return savedProfile
      ? { ...EMPTY_PROFILE, ...JSON.parse(savedProfile) }
      : EMPTY_PROFILE;
  } catch {
    return EMPTY_PROFILE;
  }
}

function HealthSection({
  sectionKey,
  items,
  isAdding,
  draft,
  onStartAdding,
  onDraftChange,
  onAdd,
  onCancel,
  onRemove,
}) {
  const section = SECTIONS[sectionKey];
  const Icon = section.icon;

  return (
    <section className="border-t border-[#eee8e7] py-8 first:border-t-0">
      <div className="flex items-start justify-between gap-6">
        <div className="flex min-w-0 gap-4">
          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-[#fff0f5] text-[#f43f75]">
            <Icon size={21} strokeWidth={1.8} />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#241f20]">
              {section.title}
            </h2>

            <p className="mt-1 max-w-2xl text-sm leading-6 text-[#746c6e]">
              {section.description}
            </p>
          </div>
        </div>

        {!isAdding && (
          <button
            type="button"
            onClick={() => onStartAdding(sectionKey)}
            className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-[#f7f5f5] text-[#4e4749] transition hover:bg-[#fff0f5] hover:text-[#f43f75]"
            aria-label={`Add ${section.title.toLowerCase()}`}
          >
            <CirclePlus size={21} strokeWidth={1.8} />
          </button>
        )}
      </div>

      {isAdding && (
        <form
          className="ml-0 mt-5 flex flex-col gap-3 sm:ml-15 sm:flex-row"
          onSubmit={(event) => {
            event.preventDefault();
            onAdd(sectionKey);
          }}
        >
          <input
            autoFocus
            type="text"
            value={draft}
            onChange={(event) => onDraftChange(event.target.value)}
            placeholder={section.placeholder}
            className="min-w-0 flex-1 rounded-xl border border-[#ded7d8] bg-white px-4 py-3 text-[#241f20] outline-none transition placeholder:text-[#aaa1a3] focus:border-[#f43f75] focus:ring-4 focus:ring-[#f43f75]/10"
          />

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={!draft.trim()}
              className="rounded-xl bg-[#f43f75] px-5 py-3 font-medium text-white transition hover:bg-[#df2f64] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Add
            </button>

            <button
              type="button"
              onClick={onCancel}
              className="rounded-xl border border-[#ded7d8] px-4 py-3 text-[#625a5c] transition hover:bg-[#f8f6f6]"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {items.length > 0 ? (
        <div className="ml-0 mt-5 flex flex-wrap gap-2 sm:ml-15">
          {items.map((item) => (
            <div
              key={item}
              className="group flex items-center gap-2 rounded-full border border-[#eadfe2] bg-[#fffafb] py-2 pl-4 pr-2 text-sm text-[#433c3e]"
            >
              <span>{item}</span>

              <button
                type="button"
                onClick={() => onRemove(sectionKey, item)}
                className="flex h-7 w-7 items-center justify-center rounded-full text-[#9b9193] transition hover:bg-white hover:text-[#e11d48]"
                aria-label={`Remove ${item}`}
              >
                <X size={15} />
              </button>
            </div>
          ))}
        </div>
      ) : (
        !isAdding && (
          <button
            type="button"
            onClick={() => onStartAdding(sectionKey)}
            className="ml-0 mt-5 flex items-center gap-2 text-sm font-medium text-[#f43f75] transition hover:text-[#d92f63] sm:ml-15"
          >
            Add your first {section.title.toLowerCase()}
            <ChevronRight size={16} />
          </button>
        )
      )}
    </section>
  );
}

export default function ProfilePage() {
  const [profile, setProfile] = useState(loadProfile);
  const [editingProfile, setEditingProfile] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [draft, setDraft] = useState("");

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  }, [profile]);

  const totalItems = useMemo(
    () =>
      profile.conditions.length +
      profile.medications.length +
      profile.symptoms.length,
    [profile]
  );

  function startAdding(sectionKey) {
    setActiveSection(sectionKey);
    setDraft("");
  }

  function cancelAdding() {
    setActiveSection(null);
    setDraft("");
  }

  function addItem(sectionKey) {
    const value = draft.trim();

    if (!value) return;

    setProfile((current) => {
      const alreadyExists = current[sectionKey].some(
        (item) => item.toLowerCase() === value.toLowerCase()
      );

      if (alreadyExists) return current;

      return {
        ...current,
        [sectionKey]: [...current[sectionKey], value],
      };
    });

    cancelAdding();
  }

  function removeItem(sectionKey, itemToRemove) {
    setProfile((current) => ({
      ...current,
      [sectionKey]: current[sectionKey].filter(
        (item) => item !== itemToRemove
      ),
    }));
  }

  function clearProfile() {
    const confirmed = window.confirm(
      "Remove all information saved in your health profile?"
    );

    if (!confirmed) return;

    setProfile(EMPTY_PROFILE);
    cancelAdding();
  }

  return (
    <main className="min-h-screen bg-[#fffdfc] px-6 py-10 text-[#241f20] md:px-10 lg:px-14">
      <div className="mx-auto max-w-6xl">
        <header className="border-b border-[#eee8e7] pb-9">
          <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
            <div>
              <div className="mb-3 flex items-center gap-2 text-[#f43f75]">
                <HeartPulse size={19} strokeWidth={1.8} />
                <span className="font-semibold">My Health</span>
              </div>

              <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-5xl">
                A simple place to keep track of what matters to you.
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-7 text-[#746c6e] md:text-lg">
                Save information you may want available for appointments and
                personalised SHE support.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setEditingProfile((current) => !current)}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-[#ded7d8] bg-white px-5 py-3 font-medium text-[#40393b] shadow-sm transition hover:border-[#f2b7c9] hover:bg-[#fff8fa]"
            >
              <UserRound size={18} />
              Edit profile
            </button>
          </div>
        </header>

        {editingProfile && (
          <section className="mt-8 rounded-2xl bg-[#fff4f7] p-6">
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div className="w-full max-w-lg">
                <label
                  htmlFor="life-stage"
                  className="mb-2 block text-sm font-semibold text-[#4b4345]"
                >
                  Current life stage
                </label>

                <select
                  id="life-stage"
                  value={profile.lifeStage}
                  onChange={(event) =>
                    setProfile((current) => ({
                      ...current,
                      lifeStage: event.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-[#eadce0] bg-white px-4 py-3 outline-none focus:border-[#f43f75] focus:ring-4 focus:ring-[#f43f75]/10"
                >
                  <option value="">Not selected</option>
                  <option value="Menstrual health">Menstrual health</option>
                  <option value="Trying to conceive">
                    Trying to conceive
                  </option>
                  <option value="Pregnancy">Pregnancy</option>
                  <option value="Postpartum">Postpartum</option>
                  <option value="Perimenopause">Perimenopause</option>
                  <option value="Menopause">Menopause</option>
                  <option value="General health">General health</option>
                </select>
              </div>

              <label className="flex cursor-pointer items-center justify-between gap-5 rounded-xl bg-white px-4 py-3">
                <div>
                  <p className="font-medium text-[#332d2f]">
                    Personalise SHE Chat
                  </p>
                  <p className="mt-1 text-sm text-[#81787a]">
                    Use this profile when answering.
                  </p>
                </div>

                <input
                  type="checkbox"
                  checked={profile.personaliseChat}
                  onChange={(event) =>
                    setProfile((current) => ({
                      ...current,
                      personaliseChat: event.target.checked,
                    }))
                  }
                  className="h-5 w-5 accent-[#f43f75]"
                />
              </label>
            </div>
          </section>
        )}

        <section className="py-8">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm font-semibold text-[#f43f75]">
                Health overview
              </p>

              <p className="mt-2 text-lg text-[#4e4749]">
                {totalItems === 0
                  ? "Your profile is ready when you are."
                  : `${totalItems} health ${
                      totalItems === 1 ? "item" : "items"
                    } saved.`}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[#746c6e]">
              <span>
                <strong className="text-[#241f20]">
                  {profile.conditions.length}
                </strong>{" "}
                conditions
              </span>

              <span className="hidden text-[#d9d1d3] sm:inline">•</span>

              <span>
                <strong className="text-[#241f20]">
                  {profile.medications.length}
                </strong>{" "}
                medications
              </span>

              <span className="hidden text-[#d9d1d3] sm:inline">•</span>

              <span>
                <strong className="text-[#241f20]">
                  {profile.symptoms.length}
                </strong>{" "}
                symptoms
              </span>
            </div>
          </div>
        </section>

        <div className="rounded-3xl border border-[#eee8e7] bg-white px-6 shadow-[0_10px_40px_rgba(67,46,52,0.04)] md:px-8">
          {Object.keys(SECTIONS).map((sectionKey) => (
            <HealthSection
              key={sectionKey}
              sectionKey={sectionKey}
              items={profile[sectionKey]}
              isAdding={activeSection === sectionKey}
              draft={draft}
              onStartAdding={startAdding}
              onDraftChange={setDraft}
              onAdd={addItem}
              onCancel={cancelAdding}
              onRemove={removeItem}
            />
          ))}
        </div>

        <footer className="mt-7 flex flex-col justify-between gap-4 rounded-2xl bg-[#f8f6f6] px-5 py-4 text-sm text-[#746c6e] sm:flex-row sm:items-center">
          <div className="flex max-w-3xl items-start gap-3">
            <LockKeyhole
              size={17}
              className="mt-0.5 flex-none text-[#f43f75]"
            />

            <p>
              This MVP stores your health profile only in this browser. Do not
              use it as your only copy of important medical information.
            </p>
          </div>

          {totalItems > 0 && (
            <button
              type="button"
              onClick={clearProfile}
              className="flex w-fit items-center gap-2 font-medium text-[#8a7f82] transition hover:text-[#d92f63]"
            >
              <Trash2 size={16} />
              Clear profile
            </button>
          )}
        </footer>
      </div>
    </main>
  );
}