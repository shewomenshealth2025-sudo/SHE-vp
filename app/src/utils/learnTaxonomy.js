const CATEGORY_RULES = [
  ["Endometriosis & adenomyosis", /endometriosis|adenomyosis/i],
  ["Pregnancy week by week", /pregnancy week by week/i],
  ["Postpartum & infant feeding", /postpartum|postnatal|infant feeding|breastfeeding/i],
  ["Pregnancy & maternity", /pregnancy|early pregnancy|birth|antenatal|placent|obstetric/i],
  ["Fertility & fertility treatment", /fertility|conception|assisted reproduction/i],
  ["Mental health & neurodiversity", /mental health|mood|neurodiversity|anxiety|depression/i],
  ["Screening & cancer prevention", /screening|cancer awareness|colposcopy/i],
  ["Breast health", /breast/i],
  ["Menopause", /menopause|perimenopause/i],
  ["Periods, puberty & hormones", /menstrual|puberty|hormonal/i],
  ["Sexual, pelvic & bladder health", /sexual|contraception|vaginal|vulval|vulva|pelvic|bladder|urinary/i],
  ["Gynaecology", /gynaecological|gynaecology|ovarian|cervical|fibroid|reproductive development/i],
  ["Autoimmune & whole-body health", /autoimmune|whole-body|neurological|autonomic|circulation|blood health|bone health|skin health/i],
];

export function getLearnCategory(condition = {}) {
  const searchable = `${condition.category || ""} ${condition.title || ""}`;
  return CATEGORY_RULES.find(([, pattern]) => pattern.test(searchable))?.[0] || "Whole-body health";
}

export const learnCategoryNames = CATEGORY_RULES.map(([name]) => name);

