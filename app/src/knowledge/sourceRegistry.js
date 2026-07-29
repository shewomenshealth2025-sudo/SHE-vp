export const sourceRegistry = {
  nhs: {
    id: "nhs",
    name: "NHS",
    type: "National health service",
    country: "United Kingdom",
    domain: "nhs.uk",
  },

  hse: {
    id: "hse",
    name: "Health Service Executive",
    shortName: "HSE",
    type: "National health service",
    country: "Ireland",
    domain: "hse.ie",
  },

  nice: {
    id: "nice",
    name: "National Institute for Health and Care Excellence",
    shortName: "NICE",
    type: "Clinical guidance body",
    country: "United Kingdom",
    domain: "nice.org.uk",
  },

  rcog: {
    id: "rcog",
    name: "Royal College of Obstetricians and Gynaecologists",
    shortName: "RCOG",
    type: "Medical royal college",
    country: "United Kingdom",
    domain: "rcog.org.uk",
  },

  fsrh: {
    id: "fsrh",
    name: "Faculty of Sexual and Reproductive Healthcare",
    shortName: "FSRH",
    type: "Medical faculty",
    country: "United Kingdom",
    domain: "fsrh.org",
  },

  bms: {
    id: "bms",
    name: "British Menopause Society",
    shortName: "BMS",
    type: "Specialist medical society",
    country: "United Kingdom",
    domain: "thebms.org.uk",
  },

  who: {
    id: "who",
    name: "World Health Organization",
    shortName: "WHO",
    type: "International public-health body",
    country: "International",
    domain: "who.int",
  },
};

export function resolveSource(source) {
  const organisation =
    sourceRegistry[source.organisationId] ?? {
      id: source.organisationId,
      name: source.organisationId,
      shortName: source.organisationId,
      type: "Medical source",
      domain: "",
    };

  return {
    ...organisation,
    ...source,
    organisationName:
      source.organisationName ??
      organisation.shortName ??
      organisation.name,
  };
}
