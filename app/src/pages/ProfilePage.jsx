import { useEffect, useMemo, useRef, useState } from "react";
import {
  Activity,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  CirclePlus,
  HeartPulse,
  LockKeyhole,
  Pill,
  Smartphone,
  Stethoscope,
  Trash2,
  Upload,
  X,
} from "lucide-react";

const PROFILE_KEY = "she-health-profile";
const CYCLE_KEY = "she-cycle-tracker";
const DAY_MS = 86400000;

const EMPTY_PROFILE = {
  lifeStage: "",
  personaliseChat: false,
  conditions: [],
  medications: [],
  symptoms: [],
};

const SECTIONS = {
  conditions: { title: "Conditions", placeholder: "e.g. Endometriosis", icon: Stethoscope },
  medications: { title: "Medications", placeholder: "e.g. Levothyroxine", icon: Pill },
  symptoms: { title: "Symptoms", placeholder: "e.g. Pelvic pain", icon: Activity },
};

export default function ProfilePage() {
  const [profile, setProfile] = useState(() => readStorage(PROFILE_KEY, EMPTY_PROFILE));
  const [periodDays, setPeriodDays] = useState(() => readStorage(CYCLE_KEY, []));
  const [month, setMonth] = useState(() => startOfMonth(new Date()));
  const [activeSection, setActiveSection] = useState(null);
  const [draft, setDraft] = useState("");
  const [importMessage, setImportMessage] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => window.localStorage.setItem(PROFILE_KEY, JSON.stringify(profile)), [profile]);
  useEffect(() => window.localStorage.setItem(CYCLE_KEY, JSON.stringify(periodDays)), [periodDays]);

  const totalItems = profile.conditions.length + profile.medications.length + profile.symptoms.length;
  const periodSet = useMemo(() => new Set(periodDays), [periodDays]);
  const cycleAnchor = useMemo(() => findLatestPeriodStart(periodDays), [periodDays]);

  function togglePeriodDay(date) {
    const key = toDateKey(date);
    setPeriodDays((current) =>
      current.includes(key)
        ? current.filter((day) => day !== key)
        : [...current, key].sort(),
    );
  }

  function addItem(sectionKey) {
    const value = draft.trim();
    if (!value) return;
    setProfile((current) => ({
      ...current,
      [sectionKey]: current[sectionKey].some((item) => item.toLowerCase() === value.toLowerCase())
        ? current[sectionKey]
        : [...current[sectionKey], value],
    }));
    setDraft("");
    setActiveSection(null);
  }

  async function importHealthExport(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const dates = [...new Set(text.match(/\b20\d{2}-\d{2}-\d{2}\b/g) || [])]
        .filter(isValidDateKey)
        .sort();

      if (!dates.length) {
        setImportMessage("No cycle dates were found. Use a JSON or CSV export containing YYYY-MM-DD dates.");
        return;
      }

      setPeriodDays((current) => [...new Set([...current, ...dates])].sort());
      setImportMessage(`${dates.length} dated health records imported on this device. Review the red period days and remove any that are not relevant.`);
    } catch {
      setImportMessage("That file could not be read. Try a JSON or CSV health export.");
    } finally {
      event.target.value = "";
    }
  }

  function clearProfile() {
    if (!window.confirm("Remove all information saved in My Health on this device?")) return;
    setProfile(EMPTY_PROFILE);
    setPeriodDays([]);
    setActiveSection(null);
  }

  return (
    <main className="min-h-screen bg-[#fffdfc] px-5 py-8 text-[#241f20] md:px-10 lg:px-14">
      <div className="mx-auto max-w-6xl">
        <header className="pb-8">
          <div className="flex items-center gap-2 text-[#f43f75]"><HeartPulse size={19} /><span className="font-semibold">My Health</span></div>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight md:text-5xl">Your cycle, at a glance.</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[#746c6e] md:text-lg">A simple private tracker for period days and estimated cycle phases.</p>
        </header>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="rounded-3xl border border-[#eee8e7] bg-white p-5 shadow-[0_10px_40px_rgba(67,46,52,0.04)] sm:p-7">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-[#f43f75]">Cycle calendar</p>
                <h2 className="mt-1 text-2xl font-semibold">{month.toLocaleDateString("en-GB", { month: "long", year: "numeric" })}</h2>
              </div>
              <div className="flex gap-2">
                <button type="button" onClick={() => setMonth(addMonths(month, -1))} className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-50 text-stone-600 hover:bg-stone-100" aria-label="Previous month"><ChevronLeft size={18} /></button>
                <button type="button" onClick={() => setMonth(addMonths(month, 1))} className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-50 text-stone-600 hover:bg-stone-100" aria-label="Next month"><ChevronRight size={18} /></button>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-7 text-center text-xs font-semibold uppercase tracking-[0.12em] text-stone-400">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => <div key={day} className="py-2">{day}</div>)}
            </div>

            <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
              {getCalendarDays(month).map(({ date, inMonth }) => {
                const key = toDateKey(date);
                const logged = periodSet.has(key);
                const phase = logged ? "period" : getPhase(date, cycleAnchor);
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => togglePeriodDay(date)}
                    className={`relative flex aspect-square min-h-10 items-center justify-center rounded-full text-sm transition ${phaseClass(phase)} ${inMonth ? "" : "opacity-30"} ${isToday(date) ? "ring-2 ring-stone-400 ring-offset-2" : ""}`}
                    aria-label={`${date.toLocaleDateString("en-GB")}${logged ? ", period logged" : phase ? `, estimated ${phase} phase` : ""}`}
                    aria-pressed={logged}
                  >
                    {date.getDate()}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3 text-xs text-stone-600">
              <Legend colour="bg-[#e94b64]" label="Period" />
              <Legend colour="bg-[#93c5fd]" label="Follicular" />
              <Legend colour="bg-[#74c69d]" label="Ovulation" />
              <Legend colour="bg-[#c4a7e7]" label="Luteal" />
            </div>
            <p className="mt-5 text-xs leading-5 text-stone-500">Tap any date to mark or unmark a period day. Phases use a simple 28-day estimate and are not contraception or medical advice.</p>
          </div>

          <aside className="space-y-4">
            <section className="rounded-3xl bg-[#fff0f5] p-6">
              <CalendarDays size={23} className="text-[#e93368]" />
              <p className="mt-4 text-sm font-semibold text-[#d92f62]">Quick log</p>
              <h2 className="mt-2 text-xl font-semibold">Period today?</h2>
              <button type="button" onClick={() => togglePeriodDay(new Date())} className={`mt-5 w-full rounded-xl px-4 py-3 text-sm font-semibold transition ${periodSet.has(toDateKey(new Date())) ? "bg-white text-[#d92f62]" : "bg-[#e93368] text-white"}`}>
                {periodSet.has(toDateKey(new Date())) ? "Remove today" : "Log today"}
              </button>
            </section>

            <section className="rounded-3xl border border-[#e7e0f7] bg-white p-6">
              <Smartphone size={23} className="text-[#7255a6]" />
              <h2 className="mt-4 text-xl font-semibold">Transfer from your health app</h2>
              <p className="mt-3 text-sm leading-6 text-stone-600">Import a JSON or CSV export from Apple Health or another phone health app. The file is read only in this browser.</p>
              <input ref={fileInputRef} type="file" accept=".json,.csv,.txt,application/json,text/csv,text/plain" onChange={importHealthExport} className="hidden" />
              <button type="button" onClick={() => fileInputRef.current?.click()} className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#7255a6] px-4 py-3 text-sm font-semibold text-white"><Upload size={16} /> Import health export</button>
              <p className="mt-3 text-xs leading-5 text-stone-500">Direct Apple Health and Health Connect syncing requires a native mobile permission flow. This MVP uses an export you choose.</p>
              {importMessage && <p className="mt-3 rounded-xl bg-[#f7f4ff] p-3 text-xs leading-5 text-[#5d4785]" aria-live="polite">{importMessage}</p>}
            </section>
          </aside>
        </section>

        <section className="mt-10 rounded-2xl border border-[#f1d7df] bg-[#fff8fa] p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <LockKeyhole size={19} className="mt-0.5 shrink-0 text-[#e93368]" />
            <div>
              <h2 className="font-semibold">Your health information stays on this device</h2>
              <p className="mt-2 max-w-4xl text-sm leading-6 text-stone-600">This MVP stores cycle logs, conditions, medications and symptoms in your browser’s local storage. SHE does not upload them to a server. They are used only on this device, and only to personalise chat when you switch personalisation on. Clearing browser data may remove them.</p>
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-3xl border border-[#eee8e7] bg-white p-5 sm:p-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold text-[#f43f75]">Optional health details</p>
              <h2 className="mt-1 text-xl font-semibold">Keep the essentials small and useful</h2>
              <p className="mt-2 text-sm text-stone-500">{totalItems ? `${totalItems} health ${totalItems === 1 ? "item" : "items"} saved.` : "Nothing added yet."}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <select value={profile.lifeStage} onChange={(event) => setProfile((current) => ({ ...current, lifeStage: event.target.value }))} className="rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm">
                <option value="">Life stage</option><option>Menstrual health</option><option>Trying to conceive</option><option>Pregnancy</option><option>Postpartum</option><option>Perimenopause</option><option>Menopause</option><option>General health</option>
              </select>
              <label className="flex items-center gap-2 rounded-xl border border-stone-200 px-3 py-2 text-sm"><input type="checkbox" checked={profile.personaliseChat} onChange={(event) => setProfile((current) => ({ ...current, personaliseChat: event.target.checked }))} className="accent-[#f43f75]" /> Personalise chat</label>
            </div>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {Object.entries(SECTIONS).map(([sectionKey, section]) => (
              <CompactHealthSection key={sectionKey} section={section} items={profile[sectionKey]} active={activeSection === sectionKey} draft={draft} setDraft={setDraft} onOpen={() => { setActiveSection(sectionKey); setDraft(""); }} onCancel={() => setActiveSection(null)} onAdd={() => addItem(sectionKey)} onRemove={(item) => setProfile((current) => ({ ...current, [sectionKey]: current[sectionKey].filter((value) => value !== item) }))} />
            ))}
          </div>
        </section>

        <footer className="mt-5 flex justify-end">
          {(totalItems > 0 || periodDays.length > 0) && <button type="button" onClick={clearProfile} className="flex items-center gap-2 text-sm font-medium text-stone-500 hover:text-[#d92f63]"><Trash2 size={16} /> Clear My Health data</button>}
        </footer>
      </div>
    </main>
  );
}

function CompactHealthSection({ section, items, active, draft, setDraft, onOpen, onCancel, onAdd, onRemove }) {
  const Icon = section.icon;
  return (
    <div className="rounded-2xl bg-[#faf8f8] p-4">
      <div className="flex items-center justify-between"><span className="flex items-center gap-2 text-sm font-semibold"><Icon size={16} className="text-[#e93368]" />{section.title}</span><button type="button" onClick={onOpen} className="text-[#e93368]" aria-label={`Add ${section.title.toLowerCase()}`}><CirclePlus size={18} /></button></div>
      {active && <form onSubmit={(event) => { event.preventDefault(); onAdd(); }} className="mt-3"><input autoFocus value={draft} onChange={(event) => setDraft(event.target.value)} placeholder={section.placeholder} className="w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm" /><div className="mt-2 flex gap-2"><button type="submit" className="text-xs font-semibold text-[#d92f62]">Add</button><button type="button" onClick={onCancel} className="text-xs text-stone-500">Cancel</button></div></form>}
      <div className="mt-3 flex flex-wrap gap-1.5">{items.map((item) => <span key={item} className="flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-xs text-stone-600">{item}<button type="button" onClick={() => onRemove(item)} aria-label={`Remove ${item}`}><X size={12} /></button></span>)}</div>
      {!active && items.length === 0 && <p className="mt-3 text-xs text-stone-400">None added</p>}
    </div>
  );
}

function Legend({ colour, label }) { return <span className="flex items-center gap-2"><span className={`h-3 w-3 rounded-full ${colour}`} />{label}</span>; }

function readStorage(key, fallback) { try { return JSON.parse(window.localStorage.getItem(key) || JSON.stringify(fallback)); } catch { return fallback; } }
function startOfMonth(date) { return new Date(date.getFullYear(), date.getMonth(), 1); }
function addMonths(date, amount) { return new Date(date.getFullYear(), date.getMonth() + amount, 1); }
function toDateKey(date) { return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`; }
function isValidDateKey(key) { const date = new Date(`${key}T00:00:00`); return !Number.isNaN(date.getTime()) && toDateKey(date) === key; }
function isToday(date) { return toDateKey(date) === toDateKey(new Date()); }

function getCalendarDays(month) {
  const first = startOfMonth(month);
  const offset = (first.getDay() + 6) % 7;
  const start = new Date(first.getFullYear(), first.getMonth(), 1 - offset);
  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(start.getFullYear(), start.getMonth(), start.getDate() + index);
    return { date, inMonth: date.getMonth() === month.getMonth() };
  });
}

function findLatestPeriodStart(days) {
  if (!days.length) return null;
  const sorted = [...days].filter(isValidDateKey).sort();
  const starts = sorted.filter((day, index) => {
    if (index === 0) return true;
    return (new Date(`${day}T00:00:00`) - new Date(`${sorted[index - 1]}T00:00:00`)) / DAY_MS > 1;
  });
  return starts.at(-1) || null;
}

function getPhase(date, anchor) {
  if (!anchor) return null;
  const anchorDate = new Date(`${anchor}T00:00:00`);
  const difference = Math.floor((new Date(date.getFullYear(), date.getMonth(), date.getDate()) - anchorDate) / DAY_MS);
  if (difference < 0) return null;
  const day = difference % 28;
  if (day <= 4) return "period";
  if (day <= 12) return "follicular";
  if (day === 13) return "ovulation";
  return "luteal";
}

function phaseClass(phase) {
  return {
    period: "bg-[#e94b64] font-semibold text-white hover:bg-[#d83f58]",
    follicular: "bg-[#dbeafe] text-[#24578f] hover:bg-[#bfdbfe]",
    ovulation: "bg-[#c9f1da] font-semibold text-[#266747] hover:bg-[#aee5c5]",
    luteal: "bg-[#eadffc] text-[#674794] hover:bg-[#dac8f5]",
  }[phase] || "text-stone-600 hover:bg-stone-100";
}
