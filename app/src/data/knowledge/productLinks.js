const PRODUCT_GROUPS = {
  periodCare: ["wuka-medium-flow", "moon-cup", "bodyform-ultra", "natracare-pads"],
  periodPain: ["beyou-monthly-patches", "beurer-em50", "hot-water-bottle", "thermacare-menstrual"],
  fertilityTracking: ["clearblue-advanced-ovulation", "tempdrop-sensor", "natural-cycles-thermometer"],
  pregnancyTesting: ["clearblue-pregnancy-test", "first-response-test", "boots-folic-acid"],
  earlyPregnancy: ["boots-folic-acid", "pregnacare-original", "acupressure-bands"],
  laterPregnancy: ["bbhugme-pillow", "serola-pregnancy-belt", "compression-socks"],
  postpartum: ["frida-mom-peri-bottle", "frida-mom-cooling-pads", "my-expert-midwife-spritz"],
  breastfeeding: ["lansinoh-nipple-cream", "medela-harmony", "haakaa-silicone-pump"],
  menopause: ["yes-vm-moisturiser", "chillow-cooling-pillow", "cooling-blanket"],
  vaginalComfort: ["yes-vm-moisturiser", "yes-wb-lubricant", "hydromol-ointment"],
  pelvicFloor: ["elvie-trainer", "squeezy-app", "tena-lady-discreet"],
  migraine: ["theraice-migraine-cap", "manta-sleep-mask"],
  pots: ["compression-socks", "hydralyte", "fitbit-charge"],
};

const links = new Map();
const assign = (ids, group) => ids.forEach((id) => links.set(id, PRODUCT_GROUPS[group]));

assign(["period-products", "period-poverty-support", "periods-starting", "menarche", "heavy-periods-detailed"], "periodCare");
assign(["period-pain", "adenomyosis", "endometriosis", "deep-endometriosis", "pelvic-girdle-pain"], "periodPain");
assign(["ovulation", "ovulatory-phase", "cervical-mucus", "basal-body-temperature", "fertile-window"], "fertilityTracking");
assign(["early-pregnancy", "pregnancy-test-timing", "chemical-pregnancy"], "pregnancyTesting");
assign(["folic-acid", "preconception-health", "pregnancy-screening"], "earlyPregnancy");
assign(["postpartum-bleeding", "perineal-tears", "episiotomy-recovery", "sex-after-birth"], "postpartum");
assign(["mastitis", "breast-engorgement", "blocked-milk-duct", "nipple-pain-feeding", "low-milk-supply"], "breastfeeding");
assign(["hot-flushes", "menopause-sleep", "perimenopause", "menopause", "perimenopause-diagnosis"], "menopause");
assign(["vaginal-dryness", "vaginal-oestrogen", "menopause-libido", "painful-sex", "vulval-skin-care", "vulval-dermatitis"], "vaginalComfort");
assign(["stress-incontinence", "bladder-leaks", "pelvic-floor-exercises", "pelvic-floor-dysfunction", "pelvic-organ-prolapse"], "pelvicFloor");
assign(["migraine", "menstrual-migraine", "premenstrual-headache", "pregnancy-headache"], "migraine");
assign(["pots", "dysautonomia", "orthostatic-hypotension"], "pots");

export function relatedProductsFor(condition) {
  if (links.has(condition.id)) return links.get(condition.id);
  const match = condition.id.match(/^pregnancy-week-(\d+)$/);
  if (!match) return [];
  const week = Number(match[1]);
  return week <= 13 ? PRODUCT_GROUPS.earlyPregnancy : PRODUCT_GROUPS.laterPregnancy;
}

