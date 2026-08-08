import { ArrowLeft, ArrowRight, Check, Download, ExternalLink, LockKeyhole, ShieldCheck, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { createPlanFromJourney, exportAppointmentSummary, JOURNEYS, savePlan, setMemoryConsent } from "../utils/shePlan";

export default function GuidedJourney({ journeyId, onClose, onSaved, navigate }) {
  const journey = JOURNEYS[journeyId];
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [plan, setPlan] = useState(null);
  const [consent, setConsent] = useState(false);
  const question = journey.questions[step];
  const value = answers[question?.id] || "";
  const profile = useMemo(readProfile, []);

  function next() {
    if (!value.trim()) return;
    if (step < journey.questions.length - 1) {
      setStep((current) => current + 1);
      return;
    }
    const nextPlan = createPlanFromJourney(journeyId, answers, profile);
    setPlan(nextPlan);
  }

  function save() {
    savePlan(plan);
    setMemoryConsent(consent);
    onSaved?.(plan, consent);
  }

  if (plan) {
    return (
      <section className="rounded-[28px] border border-[#f1d3de] bg-white p-5 shadow-xl shadow-pink-950/5 sm:p-7" aria-live="polite">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e93368] text-white"><Check size={23} /></div>
        <p className="mt-5 text-sm font-semibold text-[#e93368]">Your SHE Plan is ready</p>
        <h2 className="mt-1 text-3xl font-semibold tracking-tight">A clear route forward</h2>

        {plan.urgent && <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium leading-6 text-red-800">Your answers include warning signs that may need urgent assessment. Do not wait for this plan if you feel very unwell—use urgent maternity care, 111/out-of-hours care, or 999/112 for an emergency.</div>}

        <div className="mt-6 rounded-2xl bg-[#fff7fa] p-5">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#d92f62]">What you told SHE</p>
          <p className="mt-2 leading-7 text-stone-700">{plan.summary}</p>
        </div>

        <div className="mt-5 space-y-3">
          {plan.nextSteps.map((item, index) => <div key={item} className="flex gap-3 rounded-2xl border border-stone-100 p-4"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#241f20] text-xs font-semibold text-white">{index + 1}</span><p className="text-sm leading-6 text-stone-700">{item}</p></div>)}
        </div>

        <div className="mt-5 rounded-2xl border border-[#e4ddf3] bg-[#faf8ff] p-4">
          <div className="flex gap-3"><ShieldCheck size={19} className="mt-0.5 shrink-0 text-[#7255a6]" /><div><p className="text-sm font-semibold">Why SHE is showing this</p>{plan.reasons.map((reason) => <p key={reason} className="mt-1 text-sm leading-6 text-stone-600">{reason}</p>)}</div></div>
          <p className="mt-3 border-t border-[#e4ddf3] pt-3 text-xs leading-5 text-stone-500">Navigation guidance is based on NHS and HSE public health guidance. SHE does not diagnose conditions or replace a clinician.</p>
        </div>

        <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-2xl border border-stone-200 p-4">
          <input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} className="mt-1 accent-[#e93368]" />
          <span><span className="block text-sm font-semibold">Let SHE remember this on this device</span><span className="mt-1 block text-xs leading-5 text-stone-500">With your consent, Chat can refer to this plan next time. It stays in this browser and can be deleted in Profile.</span></span>
        </label>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <button type="button" onClick={save} className="flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-[#e93368] px-5 py-3 text-sm font-semibold text-white"><Sparkles size={17} /> Save to My SHE Plan</button>
          <button type="button" onClick={() => exportAppointmentSummary(plan)} className="flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-[#241f20] px-5 py-3 text-sm font-semibold text-white"><Download size={17} /> Export appointment summary</button>
        </div>

        <div className="mt-5 flex flex-wrap gap-3 text-sm font-semibold">
          <button type="button" onClick={() => navigate("education", { search: journey.learnQuery })} className="flex items-center gap-1.5 text-[#7255a6]">Relevant guides <ExternalLink size={14} /></button>
          <button type="button" onClick={() => navigate("services", { search: journey.serviceQuery, view: "list" })} className="flex items-center gap-1.5 text-[#7255a6]">Find services <ExternalLink size={14} /></button>
          <button type="button" onClick={() => navigate("products", { search: journey.productQuery })} className="flex items-center gap-1.5 text-[#7255a6]">Relevant products <ExternalLink size={14} /></button>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-[28px] border border-[#f1d3de] bg-white p-5 shadow-xl shadow-pink-950/5 sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div><p className="text-sm font-semibold text-[#e93368]">Guided SHE journey</p><h2 className="mt-1 text-2xl font-semibold">{journey.label}</h2></div>
        <button type="button" onClick={onClose} className="text-sm font-medium text-stone-500">Close</button>
      </div>
      <div className="mt-5 flex gap-1.5" aria-label={`Step ${step + 1} of ${journey.questions.length}`}>{journey.questions.map((item, index) => <span key={item.id} className={`h-1.5 flex-1 rounded-full ${index <= step ? "bg-[#e93368]" : "bg-stone-100"}`} />)}</div>
      <p className="mt-7 text-xs font-semibold uppercase tracking-[0.14em] text-stone-400">Question {step + 1} of {journey.questions.length}</p>
      <label htmlFor="journey-answer" className="mt-2 block text-xl font-semibold">{question.label}</label>
      {question.hint && <p className="mt-2 text-sm leading-6 text-stone-500">{question.hint}</p>}
      {question.type === "select" ? (
        <div className="mt-5 grid gap-2">{question.options.map((option) => <button key={option} type="button" onClick={() => setAnswers((current) => ({ ...current, [question.id]: option }))} className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${value === option ? "border-[#e93368] bg-[#fff3f7] text-[#c92758]" : "border-stone-200 hover:border-pink-200"}`}>{option}</button>)}</div>
      ) : (
        <textarea id="journey-answer" value={value} onChange={(event) => setAnswers((current) => ({ ...current, [question.id]: event.target.value }))} rows={5} className="mt-5 w-full resize-none rounded-2xl border border-stone-200 bg-[#fffdfc] p-4 leading-7 outline-none focus:border-[#e93368] focus:ring-4 focus:ring-pink-50" />
      )}
      <div className="mt-6 flex items-center justify-between gap-3">
        <button type="button" onClick={() => step ? setStep((current) => current - 1) : onClose()} className="flex min-h-11 items-center gap-2 rounded-xl px-3 text-sm font-semibold text-stone-500"><ArrowLeft size={16} /> {step ? "Back" : "Cancel"}</button>
        <button type="button" onClick={next} disabled={!value.trim()} className="flex min-h-11 items-center gap-2 rounded-xl bg-[#241f20] px-5 text-sm font-semibold text-white disabled:opacity-35">{step === journey.questions.length - 1 ? "Create my plan" : "Continue"}<ArrowRight size={16} /></button>
      </div>
      <div className="mt-6 flex gap-2 border-t border-stone-100 pt-5 text-xs leading-5 text-stone-500"><LockKeyhole size={15} className="mt-0.5 shrink-0" /> Your answers stay in this page until you choose to save the completed plan on this device.</div>
    </section>
  );
}

function readProfile() {
  try { return JSON.parse(window.localStorage.getItem("she-health-profile") || "{}"); } catch { return {}; }
}
