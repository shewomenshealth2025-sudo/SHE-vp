import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  CircleDollarSign,
  ExternalLink,
  Heart,
  Menu,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Star,
  TrendingUp,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { products } from "../data/products";
import {
  PRODUCT_REVIEWS_KEY,
  addCommunityMetrics,
  readProductReviews,
} from "../utils/productReviews";
import { getRetailerDestination } from "../utils/retailerLinks";

const money = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  minimumFractionDigits: 2,
});

const categoryDirectory = [
  {
    group: "Periods & menstrual health",
    items: [
      { label: "All period products", categories: ["Period care"] },
      { label: "Pads & towels", terms: ["pad", "towel"] },
      { label: "Tampons", terms: ["tampon"] },
      { label: "Period underwear", terms: ["period underwear", "brief"] },
      { label: "Menstrual cups", terms: ["menstrual cup", "mooncup"] },
      { label: "Menstrual discs", terms: ["menstrual disc", "disc"] },
      { label: "Reusable period care", reusable: true, categories: ["Period care"] },
      { label: "Heavy-period support", terms: ["heavy", "high capacity"] },
      { label: "Period pain relief", categories: ["Pelvic pain"] },
      { label: "Heat therapy", terms: ["heat", "hot-water"] },
      { label: "TENS devices", terms: ["tens", "electrical"] },
    ],
  },
  {
    group: "Intimate & sexual health",
    items: [
      { label: "Intimate care", categories: ["Intimate care"] },
      { label: "Vaginal dryness", terms: ["dryness", "moisturiser"] },
      { label: "Lubricants", terms: ["lubricant"] },
      { label: "Thrush treatment", terms: ["thrush", "clotrimazole"] },
      { label: "Bacterial vaginosis", terms: ["bacterial vaginosis", "bv"] },
      { label: "Sensitive vulval care", terms: ["vulval", "emollient"] },
      { label: "Sexual wellbeing", terms: ["sexual", "intimate"] },
      { label: "Contraception essentials", terms: ["contraception", "condom"] },
      { label: "Emergency contraception", terms: ["morning after"] },
      { label: "STI testing", terms: ["sti", "sexual health test"] },
    ],
  },
  {
    group: "Fertility & conception",
    items: [
      { label: "All fertility products", categories: ["Fertility"] },
      { label: "Ovulation tests", terms: ["ovulation"] },
      { label: "Cycle tracking", terms: ["cycle", "basal", "temperature"] },
      { label: "Fertility monitors", terms: ["fertility monitor", "mira"] },
      { label: "Trying-to-conceive supplements", terms: ["folic acid", "prenatal"] },
      { label: "Fertility-friendly lubricants", terms: ["fertility-friendly"] },
      { label: "Pregnancy tests", terms: ["pregnancy test"] },
    ],
  },
  {
    group: "Pregnancy",
    items: [
      { label: "All pregnancy products", categories: ["Pregnancy"] },
      { label: "Pregnancy vitamins", terms: ["pregnancy multivitamin", "pregnacare"] },
      { label: "Folic acid", terms: ["folic acid"] },
      { label: "Pregnancy pillows", terms: ["pregnancy pillow"] },
      { label: "Pelvic support belts", terms: ["support belt"] },
      { label: "Morning-sickness support", terms: ["nausea", "wristband"] },
      { label: "Pregnancy monitoring", terms: ["blood pressure", "thermometer"] },
      { label: "Maternity comfort", categories: ["Pregnancy"] },
    ],
  },
  {
    group: "Postpartum & feeding",
    items: [
      { label: "All postpartum products", categories: ["Postpartum"] },
      { label: "Post-birth recovery", terms: ["peri bottle", "postpartum"] },
      { label: "Breast pumps", terms: ["breast pump", "pump"] },
      { label: "Wearable breast pumps", terms: ["wearable breast pump"] },
      { label: "Manual breast pumps", terms: ["manual breast pump"] },
      { label: "Nipple care", terms: ["nipple", "lanolin"] },
      { label: "Milk collection", terms: ["milk", "haakaa"] },
      { label: "Breastfeeding support", terms: ["breastfeeding", "nursing"] },
    ],
  },
  {
    group: "Menopause",
    items: [
      { label: "All menopause products", categories: ["Menopause"] },
      { label: "Hot-flush relief", terms: ["hot flush", "cooling", "fan"] },
      { label: "Night-sweat support", terms: ["cooling pillow", "night"] },
      { label: "Vaginal moisturisers", terms: ["vaginal moisturiser"] },
      { label: "Menopause supplements", terms: ["menopause supplement"] },
      { label: "Sleep support", terms: ["sleep"] },
      { label: "Menopause testing", terms: ["menopause stage"] },
      { label: "Bone-health support", terms: ["vitamin d", "bone"] },
    ],
  },
  {
    group: "Bladder & pelvic health",
    items: [
      { label: "All bladder care", categories: ["Bladder health"] },
      { label: "Bladder-leak pads", terms: ["incontinence pad", "bladder leak"] },
      { label: "Pelvic-floor trainers", terms: ["pelvic floor trainer"] },
      { label: "Pelvic-floor apps", terms: ["pelvic floor app", "squeezy"] },
      { label: "Pelvic-pain support", categories: ["Pelvic pain"] },
      { label: "UTI support", terms: ["urinary", "uti"] },
      { label: "Cystitis care", terms: ["cystitis"] },
    ],
  },
  {
    group: "Breast health & bras",
    items: [
      {
        label: "Bra fitting & sizing",
        exactTerms: ["bra fitting", "bra size", "measuring tape"],
      },
      {
        label: "Everyday bras",
        exactTerms: ["everyday t-shirt bra", "full-cup support bra", "wire-free comfort bra"],
      },
      {
        label: "Sports bras",
        exactTerms: ["sports bra", "yoga bra"],
      },
      {
        label: "Maternity bras",
        exactTerms: ["maternity bra"],
      },
      {
        label: "Nursing bras",
        exactTerms: ["nursing bra"],
      },
      {
        label: "Post-surgery bras",
        exactTerms: ["post-surgery support bra"],
      },
      {
        label: "Breast forms & prostheses",
        exactTerms: ["breast form", "prosthesis"],
      },
      {
        label: "Breast-care accessories",
        exactTerms: ["breast-care accessory", "nipple care", "milk collection"],
      },
      {
        label: "Breast self-check tools",
        exactTerms: ["breast self-check", "breast awareness"],
      },
    ],
  },
  {
    group: "Hair, skin & body",
    items: [
      { label: "Women’s hair loss", terms: ["hair loss"] },
      { label: "Hormonal skin care", terms: ["hormonal skin"] },
      { label: "Sensitive skin", terms: ["sensitive skin"] },
      { label: "Dry skin", terms: ["dry skin", "moisturiser"] },
      { label: "Body care", terms: ["body cream", "body moisturiser"] },
      { label: "Acne care", terms: ["acne"] },
      { label: "Scalp care", terms: ["scalp"] },
      { label: "Hair supplements", terms: ["hair supplement"] },
    ],
  },
  {
    group: "Vitamins & supplements",
    items: [
      { label: "All supplements", categories: ["Supplements"] },
      { label: "Vitamin D", terms: ["vitamin d"] },
      { label: "Iron", terms: ["iron", "feroglobin", "spatone"] },
      { label: "Vitamin B12", terms: ["b12"] },
      { label: "Magnesium", terms: ["magnesium"] },
      { label: "Omega-3", terms: ["omega-3"] },
      { label: "Probiotics", terms: ["probiotic"] },
      { label: "Pregnancy supplements", terms: ["pregnancy multivitamin", "prenatal"] },
      { label: "Menopause supplements", terms: ["menopause supplement"] },
    ],
  },
  {
    group: "Monitoring & everyday health",
    items: [
      { label: "All everyday health", categories: ["Everyday health"] },
      { label: "Blood-pressure monitors", terms: ["blood pressure"] },
      { label: "Thermometers", terms: ["thermometer"] },
      { label: "Pulse oximeters", terms: ["pulse oximeter"] },
      { label: "Migraine support", terms: ["migraine", "headache"] },
      { label: "Sleep support", terms: ["sleep"] },
      { label: "Compression socks", terms: ["compression socks"] },
      { label: "Home health devices", categories: ["Everyday health"] },
    ],
  },
  {
    group: "Hormonal health",
    items: [
      { label: "PCOS support", terms: ["pcos", "polycystic", "pmos"] },
      { label: "Endometriosis support", terms: ["endometriosis"] },
      { label: "Adenomyosis support", terms: ["adenomyosis"] },
      { label: "Hormone tracking", terms: ["hormone", "cycle tracker"] },
      { label: "Hormonal acne", terms: ["hormonal acne"] },
      { label: "Insulin-resistance support", terms: ["insulin resistance"] },
      { label: "Thyroid monitoring", terms: ["thyroid"] },
    ],
  },
  {
    group: "Diagnostics & testing",
    items: [
      { label: "Pregnancy tests", terms: ["pregnancy test"] },
      { label: "Ovulation tests", terms: ["ovulation test"] },
      { label: "Fertility testing", terms: ["fertility test", "fertility monitor"] },
      { label: "Menopause tests", terms: ["menopause test", "menopause stage"] },
      { label: "STI tests", terms: ["sti test", "sexual health test"] },
      { label: "UTI tests", terms: ["uti test", "urinary test"] },
      { label: "Vaginal-health tests", terms: ["vaginal health", "bv test"] },
      { label: "Home blood tests", terms: ["blood test", "home test"] },
    ],
  },
  {
    group: "Clothing, comfort & support",
    items: [
      { label: "Period clothing", terms: ["period underwear", "period swimwear"] },
      { label: "Maternity clothing", terms: ["maternity"] },
      { label: "Postpartum clothing", terms: ["postpartum clothing"] },
      { label: "Compression clothing", terms: ["compression"] },
      { label: "Abdominal support", terms: ["abdominal support", "support belt"] },
      { label: "Cooling clothing", terms: ["cooling clothing", "menopause clothing"] },
      { label: "Comfort footwear", terms: ["comfort footwear", "support shoes"] },
    ],
  },
  {
    group: "Mental health & wellbeing",
    items: [
      { label: "Stress support", terms: ["stress"] },
      { label: "Anxiety support", terms: ["anxiety"] },
      { label: "Sleep wellbeing", terms: ["sleep"] },
      { label: "Mood tracking", terms: ["mood tracker"] },
      { label: "Journals", terms: ["journal"] },
      { label: "Meditation tools", terms: ["meditation"] },
      { label: "Postnatal wellbeing", terms: ["postnatal mental health"] },
    ],
  },
  {
    group: "Books, apps & digital tools",
    items: [
      { label: "Women’s-health books", terms: ["book", "guide"] },
      { label: "Cycle-tracking apps", terms: ["cycle app", "period tracker"] },
      { label: "Fertility apps", terms: ["fertility app"] },
      { label: "Pregnancy apps", terms: ["pregnancy app"] },
      { label: "Pelvic-floor apps", terms: ["pelvic floor app", "squeezy"] },
      { label: "Menopause apps", terms: ["menopause app"] },
      { label: "Mental-health apps", terms: ["mental health app"] },
    ],
  },
  {
    group: "Fitness, recovery & lifestyle",
    items: [
      { label: "Women’s fitness", terms: ["fitness", "exercise"] },
      { label: "Pelvic-health exercise", terms: ["pelvic exercise"] },
      { label: "Pregnancy exercise", terms: ["pregnancy exercise"] },
      { label: "Postpartum recovery", terms: ["postpartum recovery"] },
      { label: "Yoga & mobility", terms: ["yoga", "mobility"] },
      { label: "Recovery tools", terms: ["recovery", "massage"] },
      { label: "Hydration", terms: ["hydration", "water bottle"] },
    ],
  },
];

function getSaved() {
  try {
    return JSON.parse(localStorage.getItem("she-saved-products") || "[]");
  } catch {
    return [];
  }
}

function productText(product) {
  return [
    product.name,
    product.brand,
    product.category,
    product.description,
    product.badge,
    product.suitableFor,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function matchesSelection(product, selection) {
  if (!selection) return true;

  if (
    selection.categories?.length &&
    !selection.categories.includes(product.category)
  ) {
    return false;
  }

  if (selection.reusable && !product.reusable) {
    return false;
  }

  if (selection.productIds?.length) {
    return selection.productIds.includes(product.id);
  }

  if (selection.exactTerms?.length) {
    const searchableText = [
      product.name,
      product.brand,
      product.badge,
      product.description,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return selection.exactTerms.some((term) =>
      searchableText.includes(term.toLowerCase()),
    );
  }

  if (selection.terms?.length) {
    const searchableText = productText(product);

    return selection.terms.some((term) =>
      searchableText.includes(term.toLowerCase()),
    );
  }

  return true;
}

function countForSelection(selection) {
  return products.filter((product) =>
    matchesSelection(product, selection),
  ).length;
}

function selectionDescription(selection) {
  if (!selection) {
    return "Browse products covering periods, fertility, pregnancy, postpartum, menopause, intimate health, breast health and everyday wellbeing.";
  }

  const descriptions = {
    "Pads & towels":
      "Disposable and reusable products designed to absorb menstrual flow across different absorbency levels.",
    Tampons:
      "Internal menstrual products available in different absorbencies and applicator styles.",
    "Period underwear":
      "Reusable absorbent underwear for periods, spotting and light bladder leaks.",
    "Menstrual cups":
      "Reusable internal products designed to collect menstrual flow.",
    "Menstrual discs":
      "Flexible internal products positioned higher in the vaginal canal to collect menstrual flow.",
    "Period pain relief":
      "Heat, electrical stimulation and comfort products used to support period and pelvic-pain management.",
    "Bra fitting & sizing":
      "Guidance and products for finding supportive, comfortable and correctly fitted bras.",
    "Vaginal dryness":
      "Non-hormonal moisturisers, lubricants and comfort products for vaginal dryness.",
    "Ovulation tests":
      "Urine and digital products used to identify hormonal changes associated with ovulation.",
    "Pregnancy tests":
      "Home urine tests designed to detect the pregnancy hormone hCG.",
    "Post-birth recovery":
      "Products designed to support comfort, hygiene and recovery following childbirth.",
    "Hot-flush relief":
      "Cooling and comfort products for hot flushes and temperature changes during menopause.",
    "Pelvic-floor trainers":
      "Devices and tools designed to support structured pelvic-floor exercise.",
    "Blood-pressure monitors":
      "Home devices used to measure and record blood pressure.",
  };

  return (
    descriptions[selection.label] ||
    `Explore SHE-reviewed products related to ${selection.label.toLowerCase()}.`
  );
}

function ProductImage({ product, className = "", compact = false }) {
  const [failed, setFailed] = useState(false);
  const source = product.image && !failed
    ? product.image
    : "/products/product-fallback.svg";

  return (
    <img
      src={source}
      alt={`${product.brand} ${product.name}`}
      className={className}
      loading={compact ? "eager" : "lazy"}
      onError={() => {
        if (source !== "/products/product-fallback.svg") setFailed(true);
      }}
    />
  );
}

function ProductCard({ product, saved, comparing, onSave, onCompare, onOpen }) {
  return (
    <article className="group overflow-hidden border border-stone-200 bg-white transition hover:border-[#efbdd0] hover:shadow-[0_12px_30px_rgba(52,35,41,0.06)]">
      <div className="relative aspect-square overflow-hidden bg-[#f8f5f6]">
        <ProductImage
          product={product}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]"
        />

        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1.5 text-[11px] font-medium text-[#e93368] shadow-sm">
            {product.badge}
          </span>
        )}

        <button
          type="button"
          onClick={() => onSave(product.id)}
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-500 shadow-sm"
          aria-label={`Save ${product.name}`}
        >
          <Heart
            size={18}
            className={saved ? "fill-current text-[#f43f72]" : ""}
          />
        </button>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between gap-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-400">
            {product.brand}
          </p>

          <div className="flex items-center gap-1 text-xs text-stone-500" title="Rating shown by the retailer or manufacturer; not a SHE community rating">
            <Star size={13} className="fill-amber-400 text-amber-400" />
            {product.rating.toFixed(1)} retailer
          </div>
        </div>

        <button
          type="button"
          onClick={() => onOpen(product)}
          className="mt-3 block min-h-12 text-left"
        >
          <h3 className="line-clamp-2 text-[17px] font-semibold leading-6 text-[#211d1f] group-hover:text-[#e93368]">
            {product.name}
          </h3>
        </button>

        <p className="mt-3 line-clamp-2 text-sm leading-6 text-stone-500">
          {product.description}
        </p>

        <div className="mt-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] text-stone-400">From</p>
            <p className="mt-1 text-xl font-semibold">
              {money.format(product.price)}
            </p>
          </div>

          <button
            type="button"
            onClick={() => onOpen(product)}
            className="rounded-full bg-[#fff0f5] px-3 py-1.5 text-xs font-semibold text-[#e93368]"
            aria-label={`Why ${product.name} has a SHE Score of ${product.score.toFixed(1)}`}
          >
            SHE Score {product.score.toFixed(1)}
          </button>
        </div>

        <div className="mt-5 grid grid-cols-[1fr_auto] gap-2">
          <button
            type="button"
            onClick={() => onOpen(product)}
            className="flex items-center justify-center gap-2 bg-[#211d1f] px-4 py-3 text-sm font-medium text-white transition hover:bg-black"
          >
            View product
            <ArrowRight size={15} />
          </button>
          <button
            type="button"
            onClick={() => onCompare(product.id)}
            className={`border px-3 text-sm font-medium transition ${
              comparing
                ? "border-[#f43f72] bg-[#fff0f5] text-[#e93368]"
                : "border-stone-300 text-stone-600 hover:border-[#f43f72]"
            }`}
            aria-label={`${comparing ? "Remove" : "Add"} ${product.name} ${comparing ? "from" : "to"} comparison`}
          >
            Compare
          </button>
        </div>
      </div>
    </article>
  );
}

function ProductModal({ product, saved, onSave, onClose, onReview }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    const close = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", close);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", close);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[1000] flex items-end justify-center bg-black/40 backdrop-blur-sm md:items-center md:p-6">
      <div className="max-h-[94vh] w-full max-w-5xl overflow-y-auto rounded-t-[28px] bg-white shadow-2xl md:rounded-[28px]">
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-stone-100 bg-white/95 px-5 py-4 backdrop-blur">
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-2 text-sm font-medium text-stone-500"
          >
            <ArrowLeft size={17} />
            Back
          </button>

          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-100"
          >
            <X size={18} />
          </button>
        </div>

        <div className="grid gap-9 p-6 md:grid-cols-2 md:p-9">
          <div className="aspect-square overflow-hidden bg-stone-100">
            <ProductImage
              product={product}
              className="h-full w-full object-cover"
            />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-stone-400">
              {product.brand}
            </p>

            <h1 className="mt-3 text-3xl font-semibold tracking-tight">
              {product.name}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5 text-sm text-stone-500">
                <Star size={15} className="fill-amber-400 text-amber-400" />
                {product.rating.toFixed(1)}
                <span>({product.reviews.toLocaleString("en-GB")} retailer reviews)</span>
              </div>

              <span className="rounded-full bg-[#fff0f5] px-3 py-1.5 text-xs font-semibold text-[#e93368]">
                SHE Score {product.score.toFixed(1)}
              </span>
            </div>

            <div className="mt-5 rounded-2xl border border-[#f7d7e2] bg-[#fff8fa] p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#d92f62]">
                <ShieldCheck size={17} />
                Why this SHE Score?
              </div>
              <p className="mt-2 text-sm leading-6 text-stone-600">
                SHE considers evidence relevance, safety information,
                value and product transparency. A score is guidance, not a medical
                endorsement.
              </p>
              <p className="mt-2 text-xs leading-5 text-stone-500">
                Retailer ratings and reviews are shown separately and do not change the SHE Score. Your device-only review does not change it either.
              </p>
            </div>

            <p className="mt-6 text-base leading-7 text-stone-600">
              {product.description}
            </p>

            <p className="mt-7 text-3xl font-semibold">
              {money.format(product.price)}
            </p>

            <button
              type="button"
              onClick={() => onSave(product.id)}
              className="mt-5 flex w-full items-center justify-center gap-2 border border-[#efbdd0] px-4 py-3 text-sm font-medium text-[#e93368]"
            >
              <Heart
                size={17}
                className={saved ? "fill-current" : ""}
              />
              {saved ? "Saved" : "Save product"}
            </button>

            <div className="mt-8 space-y-4">
              <Info title="Who it may suit" text={product.suitableFor} />
              <Info title="Who it may not suit" text={product.notFor} />
              <Info title="How to use it" text={product.howToUse} />
              <Info title="Evidence summary" text={product.evidence} />
              <Info title="Safety" text={product.safety} />
            </div>

            <ProductReviewPanel product={product} onReview={onReview} />

            <div className="mt-8">
              <h2 className="font-semibold">Where to buy</h2>

              <p className="mt-2 text-xs leading-5 text-stone-500">
                Some retailer links may be affiliate links. This never changes a
                product’s SHE Score or the price you pay.
              </p>

              <div className="mt-3 space-y-2">
                {product.retailers.map((retailer) => {
                  const destination = getRetailerDestination(retailer, product);
                  return <a
                    key={retailer}
                    href={destination.url}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="flex w-full items-center justify-between border border-stone-200 px-4 py-3 text-left text-sm"
                  >
                    <span><span className="font-medium">Shop at {retailer}</span><span className="mt-0.5 block text-xs text-stone-400">{destination.affiliate ? "Affiliate link may apply" : "Official retailer website"}</span></span>
                    <ExternalLink size={15} className="text-stone-400" />
                  </a>;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductReviewPanel({ product, onReview }) {
  const existing = product.userReview;
  const [rating, setRating] = useState(existing?.rating || 0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState(existing?.comment || "");
  const [submitted, setSubmitted] = useState(false);

  function submitReview(event) {
    event.preventDefault();
    if (!rating) return;

    onReview(product.id, {
      rating,
      comment: comment.trim().slice(0, 600),
      createdAt: new Date().toISOString(),
    });
    setSubmitted(true);
  }

  return (
    <section className="mt-9 border-t border-stone-200 pt-8">
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#d92f62]">Your review</p>
      <h2 className="mt-2 text-2xl font-semibold">{existing ? "Update your review" : "Rate this product"}</h2>
      <p className="mt-2 text-sm leading-6 text-stone-500">
        Save a private note and rating for yourself. It stays in this browser, is not shared with other users and does not change the SHE Score.
      </p>

      <form onSubmit={submitReview} className="mt-5">
        <fieldset>
          <legend className="text-sm font-semibold">Your rating out of 5</legend>
          <div className="mt-3 flex gap-1" onMouseLeave={() => setHoveredRating(0)}>
            {[1, 2, 3, 4, 5].map((value) => {
              const active = value <= (hoveredRating || rating);
              return (
                <button
                  key={value}
                  type="button"
                  onMouseEnter={() => setHoveredRating(value)}
                  onFocus={() => setHoveredRating(value)}
                  onBlur={() => setHoveredRating(0)}
                  onClick={() => setRating(value)}
                  className="rounded-lg p-1 text-amber-400 transition hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
                  aria-label={`${value} out of 5 stars`}
                >
                  <Star size={30} className={active ? "fill-current" : "text-stone-300"} />
                </button>
              );
            })}
          </div>
        </fieldset>

        <label className="mt-5 block text-sm font-semibold" htmlFor={`review-${product.id}`}>
          Your review <span className="font-normal text-stone-400">(optional)</span>
        </label>
        <textarea
          id={`review-${product.id}`}
          value={comment}
          onChange={(event) => setComment(event.target.value.slice(0, 600))}
          rows={4}
          placeholder="What worked well? What should someone know before buying it?"
          className="mt-2 w-full resize-none rounded-2xl border border-stone-200 p-4 text-sm leading-6 outline-none transition focus:border-[#f43f72] focus:ring-2 focus:ring-pink-100"
        />
        <div className="mt-2 flex justify-between text-xs text-stone-400">
          <span>Do not include private medical information.</span>
          <span>{comment.length}/600</span>
        </div>

        <button
          type="submit"
          disabled={!rating}
          className="mt-5 w-full rounded-2xl bg-[#241f20] px-5 py-3.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          {existing ? "Update your review" : "Save your review"}
        </button>

        {submitted && (
          <p className="mt-3 rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700" role="status">
            Your review has been saved on this device. The retailer rating and SHE Score have not changed.
          </p>
        )}
      </form>

      {existing?.comment && (
        <article className="mt-6 rounded-2xl bg-stone-50 p-5">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <span>Your review</span>
            <span className="flex items-center gap-1 text-amber-500">
              <Star size={14} className="fill-current" /> {existing.rating}/5
            </span>
          </div>
          <p className="mt-3 text-sm leading-6 text-stone-600">{existing.comment}</p>
        </article>
      )}
    </section>
  );
}

function Info({ title, text }) {
  return (
    <div className="border-t border-stone-100 pt-4">
      <h3 className="text-sm font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-stone-600">{text}</p>
    </div>
  );
}

function CategoryDirectory({
  selected,
  onSelect,
  mobile = false,
  onClose,
}) {
  return (
    <div className={mobile ? "h-full overflow-y-auto px-5 pb-10" : ""}>
      {mobile && (
        <div className="sticky top-0 z-10 flex items-center justify-between bg-white py-5">
          <h2 className="text-lg font-semibold">Categories</h2>

          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-100"
          >
            <X size={18} />
          </button>
        </div>
      )}

      <button
        type="button"
        onClick={() => {
          onSelect(null);
          onClose?.();
        }}
        className={`w-full py-2 text-left text-sm ${
          !selected
            ? "font-semibold text-[#e93368]"
            : "text-stone-600 hover:text-[#e93368]"
        }`}
      >
        All women’s health
      </button>

      {categoryDirectory.map((section) => (
        <div key={section.group} className="mt-7">
          <h3 className="border-b border-stone-200 pb-3 text-sm font-semibold text-[#211d1f]">
            {section.group}
          </h3>

          <div className="mt-3 space-y-1">
            {section.items.map((item) => (
              <button
                key={`${section.group}-${item.label}`}
                type="button"
                onClick={() => {
                  onSelect(item);
                  onClose?.();
                }}
                className={`flex w-full items-start justify-between gap-3 py-1.5 text-left text-[13px] leading-5 transition ${
                  selected?.label === item.label
                    ? "font-semibold text-[#e93368]"
                    : "text-stone-600 hover:text-[#e93368]"
                }`}
              >
                <span>{item.label}</span>
                <span className="shrink-0 text-[11px] font-normal text-stone-400">
                  {countForSelection(item)}
                </span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

const healthNeedCollections = [
  {
    label: "Manage painful periods",
    description: "Heat, TENS and everyday comfort options",
    categories: ["Pelvic pain"],
    tone: "bg-[#fff0f5]",
  },
  {
    label: "Build your period routine",
    description: "Reusable and disposable care for every flow",
    categories: ["Period care"],
    tone: "bg-[#f8f1ff]",
  },
  {
    label: "Trying to conceive",
    description: "Cycle tracking, tests and conception support",
    categories: ["Fertility"],
    tone: "bg-[#eef8f5]",
  },
  {
    label: "Pregnancy essentials",
    description: "Carefully selected support for each trimester",
    categories: ["Pregnancy"],
    tone: "bg-[#fff7ec]",
  },
  {
    label: "Post-birth recovery",
    description: "Comfort, feeding and recovery products",
    categories: ["Postpartum"],
    tone: "bg-[#f2f6ff]",
  },
  {
    label: "Navigate menopause",
    description: "Cooling, sleep and intimate-health support",
    categories: ["Menopause"],
    tone: "bg-[#f7f3ee]",
  },
];

function CuratedRail({ eyebrow, title, description, products: items, savedIds, compareIds, onSave, onCompare, onOpen }) {
  if (!items.length) return null;

  return (
    <section className="mt-14">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold text-[#e93368]">{eyebrow}</p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
        {description && <p className="mt-2 text-sm leading-6 text-stone-500">{description}</p>}
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {items.slice(0, 6).map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            saved={savedIds.includes(product.id)}
            comparing={compareIds.includes(product.id)}
            onSave={onSave}
            onCompare={onCompare}
            onOpen={onOpen}
          />
        ))}
      </div>
    </section>
  );
}

function CompareBar({ products: items, onRemove, onClear, onCompare }) {
  if (!items.length) return null;

  return (
    <div className="fixed inset-x-0 bottom-16 z-40 px-4 lg:bottom-5 lg:left-72">
      <div className="mx-auto flex max-w-4xl flex-col gap-3 rounded-2xl border border-stone-200 bg-white p-4 shadow-[0_20px_60px_rgba(44,30,36,0.18)] sm:flex-row sm:items-center">
        <div className="flex-1">
          <p className="text-sm font-semibold">Compare products ({items.length}/3)</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {items.map((product) => (
              <button
                key={product.id}
                type="button"
                onClick={() => onRemove(product.id)}
                className="flex items-center gap-2 rounded-full bg-[#fff0f5] px-3 py-1.5 text-xs text-[#d92f62]"
              >
                {product.name}
                <X size={13} />
              </button>
            ))}
          </div>
        </div>
        <button type="button" onClick={onClear} className="text-sm font-medium text-stone-500">
          Clear
        </button>
        <button
          type="button"
          disabled={items.length < 2}
          onClick={onCompare}
          className="rounded-xl bg-[#211d1f] px-5 py-3 text-sm font-medium text-white disabled:cursor-not-allowed disabled:bg-stone-300"
        >
          Compare now
        </button>
      </div>
    </div>
  );
}

function CompareModal({ products: items, onClose, onOpen }) {
  if (items.length < 2) return null;

  return (
    <div className="fixed inset-0 z-[1200] overflow-y-auto bg-black/45 p-4 backdrop-blur-sm sm:p-8">
      <div className="mx-auto max-w-5xl rounded-3xl bg-white p-5 shadow-2xl sm:p-8">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="text-sm font-semibold text-[#e93368]">Side by side</p>
            <h2 className="mt-1 text-2xl font-semibold sm:text-3xl">Compare your finds</h2>
            <p className="mt-2 text-sm text-stone-500">Scores guide discovery and are not medical endorsements.</p>
          </div>
          <button type="button" onClick={onClose} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-stone-100" aria-label="Close comparison"><X size={18} /></button>
        </div>

        <div className="mt-7 overflow-x-auto">
          <div className={`grid min-w-[680px] gap-4 ${items.length === 2 ? "grid-cols-2" : "grid-cols-3"}`}>
            {items.map((product) => (
              <article key={product.id} className="rounded-2xl border border-stone-200 p-5">
                <ProductImage product={product} className="aspect-square w-full rounded-xl bg-stone-100 object-cover" />
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-stone-400">{product.brand}</p>
                <h3 className="mt-2 text-lg font-semibold">{product.name}</h3>
                <p className="mt-3 text-2xl font-semibold">{money.format(product.price)}</p>
                <dl className="mt-5 space-y-3 border-t border-stone-100 pt-5 text-sm">
                  <div className="flex justify-between gap-4"><dt className="text-stone-500">SHE Score</dt><dd className="font-semibold text-[#d92f62]">{product.score.toFixed(1)}</dd></div>
                  <div className="flex justify-between gap-4"><dt className="text-stone-500">User rating</dt><dd className="font-semibold">{product.rating.toFixed(1)} / 5</dd></div>
                  <div className="flex justify-between gap-4"><dt className="text-stone-500">Reviews</dt><dd className="font-semibold">{product.reviews.toLocaleString("en-GB")}</dd></div>
                  <div className="flex justify-between gap-4"><dt className="text-stone-500">Reusable</dt><dd className="font-semibold">{product.reusable ? "Yes" : "No"}</dd></div>
                </dl>
                <button type="button" onClick={() => onOpen(product)} className="mt-6 w-full rounded-xl bg-[#211d1f] px-4 py-3 text-sm font-medium text-white">View full details</button>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [selection, setSelection] = useState(null);
  const [sort, setSort] = useState("Recommended");
  const [savedIds, setSavedIds] = useState(getSaved);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(16);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState("All brands");
  const [maximumPrice, setMaximumPrice] = useState(300);
  const [minimumScore, setMinimumScore] = useState(0);
  const [reusableOnly, setReusableOnly] = useState(false);
  const [compareIds, setCompareIds] = useState([]);
  const [compareOpen, setCompareOpen] = useState(false);
  const [productReviews, setProductReviews] = useState(readProductReviews);

  useEffect(() => {
    localStorage.setItem(
      "she-saved-products",
      JSON.stringify(savedIds),
    );
  }, [savedIds]);

  useEffect(() => {
    localStorage.setItem(PRODUCT_REVIEWS_KEY, JSON.stringify(productReviews));
  }, [productReviews]);

  const reviewedProducts = useMemo(
    () => products.map((product) => addCommunityMetrics(product, productReviews[product.id])),
    [productReviews],
  );

  const brandOptions = useMemo(
    () => [
      "All brands",
      ...Array.from(
        new Set(reviewedProducts.map((product) => product.brand)),
      ).sort(),
    ],
    [reviewedProducts],
  );

  const filteredProducts = useMemo(() => {
    const term = search.trim().toLowerCase();

    const result = reviewedProducts.filter((product) => {
      const matchesCategory = matchesSelection(product, selection);
      const matchesSearch =
        !term || productText(product).includes(term);

      const matchesBrand =
        selectedBrand === "All brands" ||
        product.brand === selectedBrand;

      const matchesPrice = product.price <= maximumPrice;
      const matchesScore = product.score >= minimumScore;
      const matchesReusable = !reusableOnly || product.reusable;

      return (
        matchesCategory &&
        matchesSearch &&
        matchesBrand &&
        matchesPrice &&
        matchesScore &&
        matchesReusable
      );
    });

    return [...result].sort((a, b) => {
      if (sort === "Highest SHE Score") return b.score - a.score;
      if (sort === "Most reviewed") return b.reviews - a.reviews;
      if (sort === "Price: low to high") return a.price - b.price;
      if (sort === "Price: high to low") return b.price - a.price;

      return (
        Number(b.featured) - Number(a.featured) ||
        Number(b.popular) - Number(a.popular) ||
        b.score - a.score
      );
    });
  }, [
    maximumPrice,
    minimumScore,
    reusableOnly,
    search,
    selectedBrand,
    selection,
    sort,
    reviewedProducts,
  ]);

  const trendingProducts = useMemo(
    () => [...reviewedProducts].sort((a, b) => Number(b.popular) - Number(a.popular) || b.reviews - a.reviews).slice(0, 6),
    [reviewedProducts],
  );

  const newProducts = useMemo(
    () => reviewedProducts.filter((product) => product.newProduct).sort((a, b) => b.score - a.score).slice(0, 6),
    [reviewedProducts],
  );

  const underTwenty = useMemo(
    () => reviewedProducts.filter((product) => product.price <= 20 && product.score >= 7.5).sort((a, b) => b.score - a.score).slice(0, 6),
    [reviewedProducts],
  );

  const savedProducts = useMemo(
    () => reviewedProducts.filter((product) => savedIds.includes(product.id)),
    [reviewedProducts, savedIds],
  );

  const comparedProducts = useMemo(
    () => reviewedProducts.filter((product) => compareIds.includes(product.id)),
    [reviewedProducts, compareIds],
  );

  const activeProduct = selectedProduct
    ? reviewedProducts.find((product) => product.id === selectedProduct.id) || selectedProduct
    : null;

  function saveReview(productId, review) {
    setProductReviews((current) => ({ ...current, [productId]: review }));
  }

  function toggleSaved(id) {
    setSavedIds((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  }

  function toggleCompare(id) {
    setCompareIds((current) => {
      if (current.includes(id)) return current.filter((item) => item !== id);
      if (current.length >= 3) return [...current.slice(1), id];
      return [...current, id];
    });
  }

  function chooseCategory(item) {
    setSelection(item);
    setVisibleCount(16);
    setSelectedBrand("All brands");
    setMaximumPrice(300);
    setMinimumScore(0);
    setReusableOnly(false);
    setFiltersOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="min-h-screen bg-white text-[#211d1f]">
      <div className="sticky top-0 z-30 border-b border-stone-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1500px] items-center gap-3 px-5 py-4 sm:px-8 lg:px-10">
          <button
            type="button"
            onClick={() => setMobileCategoriesOpen(true)}
            className="flex h-11 w-11 shrink-0 items-center justify-center border border-stone-200 lg:hidden"
            aria-label="Open product categories"
          >
            <Menu size={20} />
          </button>

          <div className="relative mx-auto w-full max-w-3xl">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
            />

            <input
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setVisibleCount(16);
              }}
              placeholder="Search women’s-health products..."
              className="h-12 w-full border border-stone-300 bg-white pl-12 pr-4 text-sm outline-none transition focus:border-[#f43f72]"
            />
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-[1500px] px-5 pb-24 sm:px-8 lg:px-10">
        <div className="min-w-0 pt-8">
            {!selection && !search.trim() && (
              <>
                <section className="overflow-hidden rounded-[28px] bg-[#fff0f5] px-6 py-10 sm:px-10 sm:py-12">
                  <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                    <div>
                      <div className="flex items-center gap-2 text-sm font-semibold text-[#d92f62]">
                        <Sparkles size={17} />
                        Products · SHE Finds
                      </div>
                      <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-[#211d1f] sm:text-6xl">
                        Find what works for you.
                      </h1>
                      <p className="mt-5 max-w-2xl text-base leading-7 text-stone-600 sm:text-lg">
                        Compare products, understand the evidence and shop by what
                        you need—not by confusing supermarket aisles.
                      </p>
                      <div className="mt-7 flex flex-wrap gap-3">
                        <button
                          type="button"
                          onClick={() => document.getElementById("shop-by-need")?.scrollIntoView({ behavior: "smooth" })}
                          className="rounded-xl bg-[#211d1f] px-5 py-3 text-sm font-semibold text-white"
                        >
                          Shop by need
                        </button>
                        <button
                          type="button"
                          onClick={() => setMobileCategoriesOpen(true)}
                          className="rounded-xl border border-[#e7afc1] bg-white px-5 py-3 text-sm font-semibold text-[#d92f62]"
                        >
                          Browse all categories
                        </button>
                      </div>
                    </div>
                    <div className="rounded-3xl bg-white p-6 shadow-[0_18px_45px_rgba(136,54,82,0.10)]">
                      <div className="flex items-center justify-between">
                        <span className="rounded-full bg-[#fff0f5] px-3 py-1 text-xs font-semibold text-[#d92f62]">
                          Today’s find
                        </span>
                        <TrendingUp size={20} className="text-[#e93368]" />
                      </div>
                      {trendingProducts[0] && (
                        <button type="button" onClick={() => setSelectedProduct(trendingProducts[0])} className="mt-5 flex w-full items-center gap-5 text-left">
                          <ProductImage product={trendingProducts[0]} compact className="h-24 w-24 shrink-0 rounded-2xl bg-stone-100 object-cover" />
                          <span>
                            <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-stone-400">{trendingProducts[0].brand}</span>
                            <span className="mt-2 block font-semibold">{trendingProducts[0].name}</span>
                            <span className="mt-2 block text-sm font-semibold text-[#d92f62]">SHE Score {trendingProducts[0].score.toFixed(1)}</span>
                          </span>
                        </button>
                      )}
                    </div>
                  </div>
                </section>

                <section id="shop-by-need" className="mt-14">
                  <p className="text-sm font-semibold text-[#e93368]">Start with you</p>
                  <h2 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">Shop by health need</h2>
                  <p className="mt-2 text-sm leading-6 text-stone-500">Skip the jargon and browse around what you’re actually experiencing or planning for.</p>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {healthNeedCollections.map((item) => (
                      <button key={item.label} type="button" onClick={() => chooseCategory(item)} className={`${item.tone} group rounded-2xl p-6 text-left transition hover:-translate-y-0.5 hover:shadow-md`}>
                        <div className="flex items-start justify-between gap-5">
                          <div>
                            <h3 className="text-lg font-semibold">{item.label}</h3>
                            <p className="mt-2 text-sm leading-6 text-stone-600">{item.description}</p>
                          </div>
                          <ArrowRight size={19} className="mt-1 shrink-0 transition group-hover:translate-x-1" />
                        </div>
                      </button>
                    ))}
                  </div>
                </section>

                {savedProducts.length > 0 && (
                  <CuratedRail eyebrow="Saved by you" title="Pick up where you left off" products={savedProducts} savedIds={savedIds} compareIds={compareIds} onSave={toggleSaved} onCompare={toggleCompare} onOpen={setSelectedProduct} />
                )}

                <CuratedRail eyebrow="Popular now" title="Trending on SHE" description="Popular catalogue products, ranked using retailer review volume and SHE’s editorial selection—not live SHE community activity." products={trendingProducts} savedIds={savedIds} compareIds={compareIds} onSave={toggleSaved} onCompare={toggleCompare} onOpen={setSelectedProduct} />

                <section className="mt-14 grid gap-5 lg:grid-cols-3">
                  <div className="rounded-2xl bg-[#211d1f] p-7 text-white lg:col-span-2">
                    <div className="flex items-center gap-2 text-sm font-semibold text-[#ff9dbc]"><ShieldCheck size={18} /> Independent by design</div>
                    <h2 className="mt-4 text-2xl font-semibold">What the SHE Score means</h2>
                    <p className="mt-3 max-w-2xl text-sm leading-7 text-stone-300">We look at evidence relevance, safety, user feedback, value and transparency. Sponsored placement never changes a score.</p>
                    <button type="button" className="mt-5 text-sm font-semibold text-white underline decoration-[#ff7fa8] underline-offset-4">How scoring works</button>
                  </div>
                  <div className="rounded-2xl border border-stone-200 p-7">
                    <CircleDollarSign size={23} className="text-[#e93368]" />
                    <h2 className="mt-4 text-xl font-semibold">Clear about affiliate links</h2>
                    <p className="mt-3 text-sm leading-6 text-stone-500">SHE may earn a commission from some purchases, at no extra cost to you. Recommendations remain independently scored.</p>
                  </div>
                </section>

                <CuratedRail eyebrow="Smart value" title="Highly rated under £20" description="Useful options that score well without stretching your budget." products={underTwenty} savedIds={savedIds} compareIds={compareIds} onSave={toggleSaved} onCompare={toggleCompare} onOpen={setSelectedProduct} />

                {newProducts.length > 0 && <CuratedRail eyebrow="Just added" title="New and noteworthy" products={newProducts} savedIds={savedIds} compareIds={compareIds} onSave={toggleSaved} onCompare={toggleCompare} onOpen={setSelectedProduct} />}

                <section className="mt-16 rounded-3xl border border-[#f2d0dc] bg-[#fff9fb] px-6 py-10 text-center sm:px-10">
                  <h2 className="text-2xl font-semibold">Looking for something specific?</h2>
                  <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-stone-500">Browse the full women’s-health directory, then narrow it by brand, price, SHE Score or reusable options.</p>
                  <button type="button" onClick={() => setMobileCategoriesOpen(true)} className="mt-6 rounded-xl bg-[#211d1f] px-6 py-3 text-sm font-semibold text-white">Browse the full catalogue</button>
                </section>
              </>
            )}

            {(selection || search.trim()) && <section>
              <div className="border-b border-stone-200 pb-6">
                <div className="flex flex-wrap items-center gap-1.5 text-xs text-stone-400">
                  <button
                    type="button"
                    onClick={() => chooseCategory(null)}
                    className="transition hover:text-[#e93368]"
                  >
                    Women’s health
                  </button>

                  {selection && (
                    <>
                      <ChevronRight size={13} />
                      <span className="text-stone-600">
                        {selection.label}
                      </span>
                    </>
                  )}
                </div>

                <div className="mt-4 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                  <div className="max-w-2xl">
                    <p className="text-sm text-stone-500">
                      Showing {Math.min(visibleCount, filteredProducts.length)} of{" "}
                      {filteredProducts.length}
                    </p>

                    <h2 className="mt-1 text-2xl font-semibold">
                      {selection?.label ||
                        (search.trim()
                          ? "Search results"
                          : "All products")}
                    </h2>

                    <p className="mt-3 text-sm leading-6 text-stone-500">
                      {search.trim()
                        ? `Products matching “${search.trim()}”.`
                        : selectionDescription(selection)}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setFiltersOpen((current) => !current)}
                      className={`flex h-11 items-center gap-2 border px-4 text-sm font-medium transition ${
                        filtersOpen
                          ? "border-[#f43f72] bg-[#fff5f8] text-[#e93368]"
                          : "border-stone-300 bg-white text-stone-600"
                      }`}
                    >
                      <SlidersHorizontal size={16} />
                      Filters
                    </button>

                    <select
                      value={sort}
                      onChange={(event) => setSort(event.target.value)}
                      className="h-11 border border-stone-300 bg-white px-4 text-sm outline-none"
                    >
                      <option>Recommended</option>
                      <option>Highest SHE Score</option>
                      <option>Most reviewed</option>
                      <option>Price: low to high</option>
                      <option>Price: high to low</option>
                    </select>
                  </div>
                </div>
              </div>

              {filtersOpen && (
                <div className="grid gap-5 border-b border-stone-200 bg-[#fffafa] px-5 py-6 md:grid-cols-2 xl:grid-cols-4">
                  <label>
                    <span className="text-xs font-semibold uppercase tracking-[0.12em] text-stone-500">
                      Brand
                    </span>

                    <select
                      value={selectedBrand}
                      onChange={(event) => {
                        setSelectedBrand(event.target.value);
                        setVisibleCount(16);
                      }}
                      className="mt-2 h-11 w-full border border-stone-300 bg-white px-3 text-sm outline-none"
                    >
                      {brandOptions.map((brand) => (
                        <option key={brand}>{brand}</option>
                      ))}
                    </select>
                  </label>

                  <label>
                    <span className="text-xs font-semibold uppercase tracking-[0.12em] text-stone-500">
                      Maximum price
                    </span>

                    <div className="mt-2">
                      <p className="text-sm font-medium">
                        {money.format(maximumPrice)}
                      </p>

                      <input
                        type="range"
                        min="5"
                        max="300"
                        step="5"
                        value={maximumPrice}
                        onChange={(event) => {
                          setMaximumPrice(Number(event.target.value));
                          setVisibleCount(16);
                        }}
                        className="mt-3 w-full accent-[#f43f72]"
                      />
                    </div>
                  </label>

                  <label>
                    <span className="text-xs font-semibold uppercase tracking-[0.12em] text-stone-500">
                      Minimum SHE Score
                    </span>

                    <select
                      value={minimumScore}
                      onChange={(event) => {
                        setMinimumScore(Number(event.target.value));
                        setVisibleCount(16);
                      }}
                      className="mt-2 h-11 w-full border border-stone-300 bg-white px-3 text-sm outline-none"
                    >
                      <option value="0">Any score</option>
                      <option value="7">7.0 and above</option>
                      <option value="8">8.0 and above</option>
                      <option value="8.5">8.5 and above</option>
                      <option value="9">9.0 and above</option>
                    </select>
                  </label>

                  <label className="flex cursor-pointer items-center gap-3 self-end border border-stone-300 bg-white px-4 py-3">
                    <input
                      type="checkbox"
                      checked={reusableOnly}
                      onChange={(event) => {
                        setReusableOnly(event.target.checked);
                        setVisibleCount(16);
                      }}
                      className="h-4 w-4 accent-[#f43f72]"
                    />

                    <span className="text-sm font-medium">
                      Reusable products only
                    </span>
                  </label>
                </div>
              )}

              {filteredProducts.length ? (
                <>
                  <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {filteredProducts
                      .slice(0, visibleCount)
                      .map((product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          saved={savedIds.includes(product.id)}
                          comparing={compareIds.includes(product.id)}
                          onSave={toggleSaved}
                          onCompare={toggleCompare}
                          onOpen={setSelectedProduct}
                        />
                      ))}
                  </div>

                  {visibleCount < filteredProducts.length && (
                    <div className="mt-10 text-center">
                      <button
                        type="button"
                        onClick={() =>
                          setVisibleCount((current) => current + 16)
                        }
                        className="border border-stone-300 px-7 py-3 text-sm font-medium transition hover:border-[#f43f72] hover:text-[#e93368]"
                      >
                        Load more
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="py-24 text-center">
                  <Search size={28} className="mx-auto text-stone-300" />
                  <h3 className="mt-4 font-semibold">
                    No products found yet
                  </h3>
                  <p className="mt-2 text-sm text-stone-500">
                    This category is part of the SHE directory, but its
                    products still need to be added.
                  </p>
                </div>
              )}
            </section>}
        </div>
      </main>

      {mobileCategoriesOpen && (
        <div className="fixed inset-0 z-[1100]">
          <button
            type="button"
            className="absolute inset-0 bg-black/35"
            onClick={() => setMobileCategoriesOpen(false)}
            aria-label="Close categories"
          />

          <aside className="absolute inset-y-0 left-0 w-[86%] max-w-sm bg-white shadow-2xl">
            <CategoryDirectory
              mobile
              selected={selection}
              onSelect={chooseCategory}
              onClose={() => setMobileCategoriesOpen(false)}
            />
          </aside>
        </div>
      )}

      {activeProduct && (
        <ProductModal
          product={activeProduct}
          saved={savedIds.includes(activeProduct.id)}
          onSave={toggleSaved}
          onReview={saveReview}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      <CompareBar
        products={comparedProducts}
        onRemove={toggleCompare}
        onClear={() => setCompareIds([])}
        onCompare={() => setCompareOpen(true)}
      />

      {compareOpen && (
        <CompareModal
          products={comparedProducts}
          onClose={() => setCompareOpen(false)}
          onOpen={(product) => {
            setCompareOpen(false);
            setSelectedProduct(product);
          }}
        />
      )}
    </div>
  );
}
