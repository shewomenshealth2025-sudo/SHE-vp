import { useEffect, useMemo, useState } from "react";
import { ArrowRight, BookOpen, CalendarCheck, ExternalLink, Layers3, ListFilter, Newspaper, Sparkles } from "lucide-react";
import { useSearchParams } from "react-router-dom";

import { getAllConditions, getCondition, searchKnowledge } from "../data/knowledge";

import KnowledgeSearch from "../components/knowledge/KnowledgeSearch";
import KnowledgeSection from "../components/knowledge/KnowledgeSection";
import ConditionCard from "../components/knowledge/ConditionCard";
import ConditionViewer from "../components/knowledge/ConditionViewer";
import { sheNews, sheNewsUpdated } from "../data/sheNews";

const PAGE_SIZE = 24;
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const primaryTopics = [
  { id: "periods-cycle", label: "Periods & cycle", pattern: /menstrual|puberty|hormonal health/ },
  { id: "pelvic-endometriosis", label: "Pelvic pain & endometriosis", pattern: /pelvic|endometriosis|adenomyosis|fibroids/ },
  { id: "fertility", label: "Fertility & treatment", pattern: /fertility/ },
  { id: "pregnancy", label: "Pregnancy", pattern: /pregnancy|early pregnancy/ },
  { id: "birth-postpartum", label: "Birth & postpartum", pattern: /birth|postpartum|postnatal|breastfeeding|infant feeding/ },
  { id: "menopause", label: "Menopause", pattern: /menopause/ },
  { id: "sexual-contraception", label: "Sexual health & contraception", pattern: /sexual|contracep|vaginal/ },
  { id: "gynaecology", label: "Gynaecology", pattern: /gynaecological|ovarian|cervical|abortion/ },
  { id: "breast", label: "Breast health", pattern: /breast/ },
  { id: "bladder-vulval", label: "Bladder, urinary & vulval health", pattern: /bladder|urinary|vulval/ },
  { id: "autoimmune-whole-body", label: "Autoimmune & whole-body health", pattern: /autoimmune|blood|bone|circulation|whole-body|skin/ },
  { id: "mental-neurological", label: "Mental & neurological health", pattern: /mental|neurological|autonomic/ },
  { id: "cancer-screening", label: "Cancer awareness & screening", pattern: /cancer|screening/ },
  { id: "healthcare-navigation", label: "Healthcare navigation", pattern: /hospital|healthcare navigation|emergency|post-surgical/ },
];

const lifeStages = [
  { id: "puberty-periods", label: "Puberty & periods", description: "First periods, cycle stages, bleeding and period symptoms", pattern: /puberty|menstrual|hormonal health/ },
  { id: "fertility", label: "Fertility & conception", description: "Ovulation, testing, trying to conceive and fertility care", pattern: /fertility/ },
  { id: "pregnancy", label: "Pregnancy", description: "Week-by-week changes, antenatal care and pregnancy symptoms", pattern: /pregnancy|early pregnancy/ },
  { id: "postpartum", label: "Postpartum", description: "Recovery, feeding, pelvic health and postnatal wellbeing", pattern: /postpartum|postnatal|breastfeeding|infant feeding/ },
  { id: "menopause", label: "Perimenopause & menopause", description: "Hormone changes, symptoms, HRT and long-term health", pattern: /menopause/ },
  { id: "sexual-health", label: "Sexual & intimate health", description: "Contraception, infections, vaginal and sexual wellbeing", pattern: /sexual|contracep|vaginal|vulval/ },
  { id: "autoimmune", label: "Autoimmune diseases", description: "Immune conditions, symptoms, treatment and life-stage considerations", pattern: /autoimmune/ },
  { id: "mental-health", label: "Mental health & emotional wellbeing", description: "Mood, anxiety, perinatal mental health, trauma and support", pattern: /mental health|perinatal mental|postpartum mental/ },
];

const popularIds = [
  "endometriosis", "pcos", "period-pain", "heavy-periods", "pots", "perimenopause",
  "iron-deficiency-anaemia", "adenomyosis", "fertility-tests", "pregnancy-week-1",
  "pmdd", "pelvic-floor-dysfunction",
];

function conditionText(condition) {
  return [condition.title, condition.category, condition.summary, ...(condition.quickFacts || []), ...(condition.symptoms || [])]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function categoryText(condition) {
  return normaliseCategory(condition.category || "Women’s health").toLowerCase();
}

function matchesGroup(condition, group) {
  return group.pattern.test(categoryText(condition));
}

function normaliseCategory(value = "") {
  const label = value.trim().replace(/^./, (letter) => letter.toUpperCase());
  return label === "Contraception" ? "Contraceptives" : label;
}

function parseReviewDate(condition) {
  const value = condition.lastReviewed || condition.reviewed || "";
  const timestamp = Date.parse(value);
  return Number.isNaN(timestamp) ? 0 : timestamp;
}

export default function LearnPageV2() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const query = searchParams.get("q") || "";
  const selectedCondition = getCondition(searchParams.get("article"));
  const selectedCategory = searchParams.get("category") || "";
  const selectedStage = searchParams.get("stage") || "";
  const mode = searchParams.get("view") || "";
  const selectedLetter = searchParams.get("letter") || "A";

  const conditions = useMemo(() => getAllConditions(), []);
  const results = useMemo(() => query.trim() ? searchKnowledge(query) : [], [query]);

  const categories = useMemo(() => primaryTopics.map((topic) => ({ ...topic, count: conditions.filter((condition) => matchesGroup(condition, topic)).length })), [conditions]);

  const popular = useMemo(() => {
    const rank = new Map(popularIds.map((id, index) => [id, index]));
    return conditions
      .filter((condition) => rank.has(condition.id) || condition.popular)
      .sort((a, b) => (rank.get(a.id) ?? 999) - (rank.get(b.id) ?? 999))
      .slice(0, 6);
  }, [conditions]);

  const recentlyReviewed = useMemo(() => [...conditions]
    .sort((a, b) => parseReviewDate(b) - parseReviewDate(a) || a.title.localeCompare(b.title))
    .slice(0, 6), [conditions]);

  const browsedConditions = useMemo(() => {
    if (selectedCategory) {
      const topic = primaryTopics.find((item) => item.id === selectedCategory);
      return topic ? conditions.filter((condition) => matchesGroup(condition, topic)) : [];
    }
    if (selectedStage) {
      const stage = lifeStages.find((item) => item.id === selectedStage);
      return stage ? conditions.filter((condition) => matchesGroup(condition, stage)) : [];
    }
    if (mode === "az") return conditions.filter((condition) => condition.title.toUpperCase().startsWith(selectedLetter)).sort((a, b) => a.title.localeCompare(b.title));
    return [...conditions].sort((a, b) => a.title.localeCompare(b.title));
  }, [conditions, mode, selectedCategory, selectedLetter, selectedStage]);

  useEffect(() => setVisibleCount(PAGE_SIZE), [query, selectedCategory, selectedStage, mode, selectedLetter]);

  function updateQuery(value) {
    setSearchParams(value.trim() ? { q: value } : {}, { replace: true });
  }

  function openCondition(condition) {
    setSearchParams({ article: condition.id });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function closeCondition() {
    setSearchParams({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function openBrowse(params) {
    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (selectedCondition) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-12">
        <ConditionViewer
          condition={selectedCondition}
          onBack={closeCondition}
          onSelectRelated={(id) => {
            const related = getCondition(id);
            if (related) openCondition(related);
          }}
        />
      </main>
    );
  }

  const activeStage = lifeStages.find((stage) => stage.id === selectedStage);
  const activeCategory = primaryTopics.find((topic) => topic.id === selectedCategory);
  const isBrowseView = Boolean(selectedCategory || selectedStage || mode === "az");

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <header className="mb-10">
        <p className="flex items-center gap-2 text-sm font-semibold text-pink-600"><BookOpen size={18} /> SHE Learn</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight text-gray-950 md:text-6xl">Understand your health, one clear guide at a time.</h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-gray-600">Browse {conditions.length} evidence-linked guides by topic, life stage or A–Z, plus current women’s-health news from trusted public sources.</p>
      </header>

      <KnowledgeSearch query={query} onQueryChange={updateQuery} resultCount={results.length} />

      {query.trim() ? (
        <KnowledgeSection title={`Search results for “${query.trim()}”`}>
          {results.length ? <TieredSearchResults results={results} onOpen={openCondition} /> : <EmptySearch />}
        </KnowledgeSection>
      ) : mode === "news" ? (
        <NewsHub onBack={() => openBrowse({})} />
      ) : isBrowseView ? (
        <BrowseResults
          title={activeCategory?.label || activeStage?.label || `A–Z: ${selectedLetter}`}
          description={selectedCategory ? `${browsedConditions.length} guides across the related specialist subjects.` : activeStage?.description || "Browse every guide alphabetically."}
          conditions={browsedConditions}
          visibleCount={visibleCount}
          selectedLetter={selectedLetter}
          showAlphabet={mode === "az"}
          onLetter={(letter) => openBrowse({ view: "az", letter })}
          onOpen={openCondition}
          onLoadMore={() => setVisibleCount((count) => count + PAGE_SIZE)}
          onBack={() => openBrowse({})}
        />
      ) : (
        <>
          <nav className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4" aria-label="Browse SHE Learn">
            <BrowseButton icon={Layers3} title="Browse categories" detail={`${categories.length} clear health themes`} onClick={() => document.getElementById("learn-categories")?.scrollIntoView({ behavior: "smooth" })} />
            <BrowseButton icon={ListFilter} title="A–Z index" detail="Every guide, alphabetically" onClick={() => openBrowse({ view: "az", letter: "A" })} />
            <BrowseButton icon={Sparkles} title="Health collections" detail="Life stages and connected conditions" onClick={() => document.getElementById("life-stages")?.scrollIntoView({ behavior: "smooth" })} />
            <BrowseButton icon={Newspaper} title="SHE News" detail="Women’s-health news and policy" onClick={() => openBrowse({ view: "news" })} />
          </nav>

          <section className="mt-10 overflow-hidden rounded-3xl bg-gray-950 px-6 py-7 text-white md:flex md:items-center md:justify-between md:px-8">
            <div>
              <p className="text-sm font-semibold text-pink-300">SHE News</p>
              <h2 className="mt-2 text-2xl font-bold">What is changing in women’s health</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-300">Dated, plainly summarised updates from the NHS, HSE and public health bodies—with a direct link to every original source.</p>
            </div>
            <button type="button" onClick={() => openBrowse({ view: "news" })} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-gray-950 md:mt-0">Read latest news <ArrowRight size={16} /></button>
          </section>

          <KnowledgeSection title="Popular topics">
            <p className="-mt-2 mb-6 text-sm text-gray-500">Common starting points across menstrual, hormonal and whole-body health.</p>
            <CardGrid conditions={popular} onOpen={openCondition} />
          </KnowledgeSection>

          <section id="life-stages" className="border-t border-gray-200 py-10">
            <p className="text-sm font-semibold text-pink-600">Browse around where you are</p>
            <h2 className="mt-1 text-3xl font-bold text-gray-950">Life-stage and health collections</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {lifeStages.map((stage) => {
                const count = conditions.filter((condition) => matchesGroup(condition, stage)).length;
                return <button key={stage.id} type="button" onClick={() => openBrowse({ stage: stage.id })} className="group rounded-2xl border border-gray-200 bg-white p-5 text-left transition hover:-translate-y-0.5 hover:border-pink-200 hover:shadow-md"><p className="font-semibold text-gray-950">{stage.label}</p><p className="mt-2 text-sm leading-6 text-gray-600">{stage.description}</p><span className="mt-4 flex items-center gap-2 text-sm font-semibold text-pink-700">{count} guides <ArrowRight size={15} /></span></button>;
              })}
            </div>
          </section>

          <section id="learn-categories" className="border-t border-gray-200 py-10">
            <p className="text-sm font-semibold text-pink-600">Browse by subject</p>
            <h2 className="mt-1 text-3xl font-bold text-gray-950">Categories</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {categories.map((category) => <button key={category.id} type="button" onClick={() => openBrowse({ category: category.id })} className="flex items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-4 text-left transition hover:border-pink-200 hover:bg-pink-50/40"><span className="font-medium text-gray-900">{category.label}</span><span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-500">{category.count}</span></button>)}
            </div>
          </section>

          <KnowledgeSection title="Recently reviewed">
            <div className="mb-6 flex items-center gap-2 text-sm text-gray-500"><CalendarCheck size={17} className="text-pink-600" /> Most recently editorially reviewed guides</div>
            <CardGrid conditions={recentlyReviewed} onOpen={openCondition} />
          </KnowledgeSection>

          <BrowseResults
            title="All health guides"
            description={`Showing ${Math.min(visibleCount, conditions.length)} of ${conditions.length} guides. Browse continuously or use the routes above.`}
            conditions={browsedConditions}
            visibleCount={visibleCount}
            onOpen={openCondition}
            onLoadMore={() => setVisibleCount((count) => count + PAGE_SIZE)}
          />
        </>
      )}
    </main>
  );
}

function BrowseButton({ icon: Icon, title, detail, onClick }) {
  return <button type="button" onClick={onClick} className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 text-left transition hover:border-pink-200 hover:bg-pink-50/40"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-pink-50 text-pink-700"><Icon size={20} /></span><span><span className="block font-semibold text-gray-950">{title}</span><span className="mt-1 block text-sm text-gray-500">{detail}</span></span></button>;
}

function BrowseResults({ title, description, conditions, visibleCount, onOpen, onLoadMore, onBack, showAlphabet = false, selectedLetter, onLetter }) {
  const visible = conditions.slice(0, visibleCount);
  return <section className="border-t border-gray-200 py-10">
    {onBack && <button type="button" onClick={onBack} className="mb-5 text-sm font-semibold text-pink-700">← Back to Learn</button>}
    <h2 className="text-3xl font-bold text-gray-950">{title}</h2>
    <p className="mt-2 text-sm leading-6 text-gray-600">{description}</p>
    {showAlphabet && <div className="mt-6 flex flex-wrap gap-2">{alphabet.map((letter) => <button key={letter} type="button" onClick={() => onLetter(letter)} className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold ${selectedLetter === letter ? "bg-pink-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-pink-50 hover:text-pink-700"}`}>{letter}</button>)}</div>}
    {visible.length ? <div className="mt-7"><CardGrid conditions={visible} onOpen={onOpen} /></div> : <div className="mt-7 rounded-2xl bg-gray-50 p-7 text-gray-600">No guides begin with this letter yet.</div>}
    {visibleCount < conditions.length && <div className="mt-10 text-center"><button type="button" onClick={onLoadMore} className="rounded-xl bg-gray-950 px-6 py-3 text-sm font-semibold text-white">Load 24 more</button><p className="mt-3 text-xs text-gray-500">{conditions.length - visible.length} guides remaining</p></div>}
  </section>;
}

function CardGrid({ conditions, onOpen }) {
  return <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">{conditions.map((condition) => <ConditionCard key={condition.id} condition={condition} onClick={onOpen} />)}</div>;
}

function TieredSearchResults({ results, onOpen }) {
  const groups = [
    { id: "exact", title: "Exact matches", description: "The closest direct match to what you searched." },
    { id: "close", title: "Closely related guides", description: "Focused guides that include the same condition, treatment or phrase." },
    { id: "broader", title: "Broader reading", description: "A small number of useful surrounding topics." },
  ];

  return <div className="space-y-10">{groups.map((group) => {
    const items = results.filter((result) => result.tier === group.id);
    if (!items.length) return null;
    return <section key={group.id} aria-labelledby={`search-${group.id}`}>
      <h3 id={`search-${group.id}`} className="text-xl font-bold text-gray-950">{group.title}</h3>
      <p className="mt-1 mb-5 text-sm text-gray-500">{group.description}</p>
      <CardGrid conditions={items.map((item) => item.data)} onOpen={onOpen} />
    </section>;
  })}</div>;
}

function NewsHub({ onBack }) {
  const [topic, setTopic] = useState("All");
  const topics = ["All", ...new Set(sheNews.map((item) => item.topic))];
  const stories = topic === "All" ? sheNews : sheNews.filter((item) => item.topic === topic);

  return <section className="mt-10 border-t border-gray-200 py-10">
    <button type="button" onClick={onBack} className="mb-5 text-sm font-semibold text-pink-700">← Back to Learn</button>
    <div className="max-w-3xl">
      <p className="flex items-center gap-2 text-sm font-semibold text-pink-600"><Newspaper size={17} /> SHE News</p>
      <h2 className="mt-2 text-4xl font-bold tracking-tight text-gray-950">Women’s health, without the headline fog.</h2>
      <p className="mt-4 text-base leading-7 text-gray-600">Current updates selected from the NHS, HSE, government health departments and public screening bodies. SHE summarises what changed; the original source remains the record.</p>
      <p className="mt-3 text-xs font-medium text-gray-500">Curated coverage · Last checked {sheNewsUpdated} · Newest first</p>
    </div>

    <div className="mt-7 flex flex-wrap gap-2" aria-label="Filter news by topic">
      {topics.map((item) => <button key={item} type="button" onClick={() => setTopic(item)} aria-pressed={topic === item} className={`rounded-full px-4 py-2 text-sm font-semibold transition ${topic === item ? "bg-gray-950 text-white" : "bg-gray-100 text-gray-600 hover:bg-pink-50 hover:text-pink-700"}`}>{item}</button>)}
    </div>

    <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {stories.map((story) => <article key={story.id} className="flex min-h-72 flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <span className="rounded-full bg-pink-50 px-3 py-1 text-xs font-semibold text-pink-700">{story.topic}</span>
          <time dateTime={story.date} className="text-xs font-medium text-gray-500">{new Date(`${story.date}T12:00:00`).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</time>
        </div>
        <h3 className="mt-5 text-xl font-bold leading-7 text-gray-950">{story.title}</h3>
        <p className="mt-3 flex-1 text-sm leading-6 text-gray-600">{story.summary}</p>
        <div className="mt-6 border-t border-gray-100 pt-4">
          <p className="text-xs text-gray-500">{story.source} · {story.region}</p>
          <a href={story.url} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-pink-700">Read original source <ExternalLink size={15} /></a>
        </div>
      </article>)}
    </div>

    <aside className="mt-8 rounded-2xl bg-amber-50 p-5 text-sm leading-6 text-amber-950">
      <strong>About coverage:</strong> SHE News is a curated MVP feed, not a complete record of every story published online. Health announcements can change; always use the linked original source for the full details.
    </aside>
  </section>;
}

function EmptySearch() {
  return <div className="rounded-3xl border border-gray-200 bg-gray-50 p-8"><h2 className="text-xl font-semibold text-gray-900">No close matches yet</h2><p className="mt-2 text-gray-600">Try a symptom, condition, life stage or phrase such as “pain when standing”, “luteal phase” or “20 weeks pregnant”.</p></div>;
}
