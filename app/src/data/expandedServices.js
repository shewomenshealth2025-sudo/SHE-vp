/*
  SHE Northern Ireland service-directory expansion.

  Public-facing service details must be reconfirmed before launch.
  Clinic schedules, referrals and availability can change.

  Coordinates identify the relevant facility or community centre.
*/

const verifiedDate = "2026-07-29";

export const expandedServices = [
  // ======================================================
  // BELFAST TRUST
  // ======================================================

  {
    id: "belfast-royal-sexual-health",
    name: "Belfast Sexual Health and HIV Service",
    type: "NHS",
    topic: "Contraception",
    speciality: "Sexual health, STI testing, HIV care and reproductive-health advice",
    locationName: "Royal Victoria Hospital, Belfast",
    address: "274 Grosvenor Road, Belfast, BT12 6BA",
    latitude: 54.5947,
    longitude: -5.9547,
    referralRoute: "Direct clinic contact or GP referral",
    waitingTime: "Contact the service for current appointment availability",
    servicesOffered: [
      "Sexual-health assessment",
      "STI testing and treatment",
      "HIV services",
      "Contraception advice",
    ],
    suitableFor: [
      "People seeking confidential sexual-health advice",
      "People concerned about an STI",
      "People needing specialist HIV care",
    ],
    phone: "028 9615 2111",
    sourceUrl:
      "https://belfasttrust.hscni.net/service/sexual-health-and-hiv-services/",
    lastVerified: verifiedDate,
  },

  {
    id: "belfast-royal-gynaecology",
    name: "Royal Victoria Hospital Gynaecology Services",
    type: "NHS",
    topic: "Periods & pelvic pain",
    speciality: "Hospital gynaecology assessment and specialist women’s healthcare",
    locationName: "Royal Victoria Hospital, Belfast",
    address: "274 Grosvenor Road, Belfast, BT12 6BA",
    latitude: 54.5949,
    longitude: -5.9543,
    referralRoute: "GP or hospital-clinician referral",
    waitingTime: "Varies by pathway and clinical priority",
    servicesOffered: [
      "Gynaecology assessment",
      "Investigation of pelvic symptoms",
      "Specialist outpatient care",
    ],
    sourceUrl: "https://belfasttrust.hscni.net/hospitals/rvh/",
    lastVerified: verifiedDate,
  },

  {
    id: "belfast-city-gynae-oncology",
    name: "Belfast City Hospital Gynaecological Cancer Services",
    type: "Specialist",
    topic: "Periods & pelvic pain",
    speciality: "Regional investigation and treatment pathways for gynaecological cancers",
    locationName: "Belfast City Hospital",
    address: "51 Lisburn Road, Belfast, BT9 7AB",
    latitude: 54.5872,
    longitude: -5.9417,
    referralRoute: "Clinical or GP referral through the relevant cancer pathway",
    waitingTime: "Determined by urgent and routine cancer pathways",
    servicesOffered: [
      "Specialist cancer assessment",
      "Oncology treatment pathways",
      "Outpatient and multidisciplinary care",
    ],
    sourceUrl:
      "https://belfasttrust.hscni.net/hospitals/bch/contact-details/",
    lastVerified: verifiedDate,
  },

  {
    id: "belfast-grove-fertility",
    name: "Regional Fertility Centre Outpatient Clinic",
    type: "Specialist",
    topic: "Fertility",
    speciality: "Regional fertility investigation and treatment support",
    locationName: "Grove Wellbeing and Treatment Centre, Belfast",
    address: "120 York Road, Belfast, BT15 3HF",
    latitude: 54.6235,
    longitude: -5.9212,
    referralRoute: "Referral through an eligible fertility pathway",
    waitingTime: "Contact the Regional Fertility Centre for current information",
    servicesOffered: [
      "Fertility consultation",
      "Fertility investigations",
      "Treatment planning",
      "Outpatient follow-up",
    ],
    sourceUrl:
      "https://belfasttrust.hscni.net/services/rfc/contact-us/",
    lastVerified: verifiedDate,
  },

  {
    id: "belfast-carlisle-reproductive",
    name: "Carlisle Sexual and Reproductive Healthcare",
    type: "NHS",
    topic: "Contraception",
    speciality: "Contraception and reproductive-health support",
    locationName: "Carlisle Wellbeing and Treatment Centre",
    address: "40 Antrim Road, Belfast, BT15 2AX",
    latitude: 54.6133,
    longitude: -5.9344,
    referralRoute: "Self-referral or service appointment pathway",
    waitingTime: "Contact the service for clinic availability",
    servicesOffered: [
      "Contraception",
      "Reproductive-health advice",
      "Family-planning support",
    ],
    phone: "028 9504 2500",
    sourceUrl:
      "https://belfasttrust.hscni.net/about/facilities/wellbeing-centres/carlisle-centre/",
    lastVerified: verifiedDate,
  },

  {
    id: "belfast-crumlin-sexual-health",
    name: "Crumlin Road Sexual Health Clinic",
    type: "NHS",
    topic: "Contraception",
    speciality: "Community-based sexual health and HIV services",
    locationName: "Crumlin Road Health Centre",
    address: "94–100 Crumlin Road, Belfast, BT14 6AR",
    latitude: 54.6131,
    longitude: -5.9462,
    referralRoute: "Contact the sexual-health service directly",
    waitingTime: "Contact the clinic for current appointment availability",
    servicesOffered: [
      "Sexual-health support",
      "STI assessment",
      "HIV-related services",
    ],
    phone: "028 9504 2610",
    sourceUrl:
      "https://belfasttrust.hscni.net/about/facilities/health-centres/crumlin-road-health-centre/",
    lastVerified: verifiedDate,
  },

  {
    id: "belfast-beech-hall-reproductive",
    name: "Beech Hall Sexual and Reproductive Healthcare",
    type: "NHS",
    topic: "Contraception",
    speciality: "Community contraception and reproductive-health services",
    locationName: "Beech Hall Wellbeing and Treatment Centre",
    address: "Andersonstown Road, Belfast",
    latitude: 54.5767,
    longitude: -5.9827,
    referralRoute: "Contact the service for access information",
    waitingTime: "Contact the centre for current clinics",
    servicesOffered: [
      "Sexual and reproductive healthcare",
      "Contraception advice",
      "Community health support",
    ],
    phone: "028 9504 0305",
    sourceUrl:
      "https://belfasttrust.hscni.net/about/facilities/wellbeing-centres/beech-hall/",
    lastVerified: verifiedDate,
  },

  {
    id: "belfast-brackenburn-psychosexual",
    name: "Regional Psychosexual Service",
    type: "Specialist",
    topic: "Support & wellbeing",
    speciality: "Specialist psychosexual assessment, therapy and relationship support",
    locationName: "Brackenburn Clinic, Knockbracken Healthcare Park",
    address: "Saintfield Road, Belfast, BT8 8BH",
    latitude: 54.5392,
    longitude: -5.9005,
    referralRoute: "Specialist referral pathway",
    waitingTime: "Contact the service for current referral information",
    servicesOffered: [
      "Psychosexual assessment",
      "Therapeutic support",
      "Relationship and sexual-wellbeing support",
    ],
    phone: "028 9504 1471",
    sourceUrl:
      "https://belfasttrust.hscni.net/service/regional-psychosexual-service/frequently-asked-questions/",
    lastVerified: verifiedDate,
  },

  // ======================================================
  // SOUTHERN TRUST
  // ======================================================

  {
    id: "newry-daisy-hill-womens-hub",
    name: "Daisy Hill Women’s Health Hub",
    type: "NHS",
    topic: "Periods & pelvic pain",
    speciality: "Rapid-access gynaecological and early-pregnancy support",
    locationName: "Daisy Hill Hospital, Newry",
    address: "5 Hospital Road, Newry, BT35 8DR",
    latitude: 54.1755,
    longitude: -6.3407,
    referralRoute: "Referral route depends on the gynaecology or early-pregnancy pathway",
    waitingTime: "Contact the hub for current clinic arrangements",
    servicesOffered: [
      "Gynaecology assessment",
      "Early-pregnancy support",
      "Specialist nursing and medical review",
    ],
    sourceUrl:
      "https://southerntrust.hscni.net/new-womens-health-hub-for-daisy-hill-hospital/",
    lastVerified: verifiedDate,
  },

  {
    id: "newry-daisy-hill-early-pregnancy",
    name: "Daisy Hill Early Pregnancy Problem Clinic",
    type: "Specialist",
    topic: "Fertility",
    speciality: "Assessment of pain, bleeding and other early-pregnancy concerns",
    locationName: "Women’s Health Hub, Daisy Hill Hospital",
    address: "5 Hospital Road, Newry, BT35 8DR",
    latitude: 54.1758,
    longitude: -6.3403,
    referralRoute: "Self-referral is available through the published clinic numbers",
    waitingTime: "Clinical review is based on symptoms and clinic availability",
    servicesOffered: [
      "Early-pregnancy assessment",
      "Specialist midwife clinics",
      "Medical review",
    ],
    phone: "028 3756 2754",
    sourceUrl:
      "https://southerntrust.hscni.net/services/maternity-services/your-maternity-care/early-pregnancy-problem-clinic-eppc/",
    lastVerified: verifiedDate,
  },

  {
    id: "craigavon-gynaecology",
    name: "Craigavon Area Hospital Gynaecology",
    type: "NHS",
    topic: "Periods & pelvic pain",
    speciality: "Inpatient, outpatient and emergency gynaecological care",
    locationName: "Craigavon Area Hospital",
    address: "68 Lurgan Road, Portadown, BT63 5QQ",
    latitude: 54.4343,
    longitude: -6.4127,
    referralRoute: "GP, emergency or hospital-clinician referral",
    waitingTime: "Varies by pathway and clinical priority",
    servicesOffered: [
      "Gynaecology assessment",
      "Gynaecological admissions",
      "Outpatient investigation",
    ],
    sourceUrl:
      "https://southerntrust.hscni.net/services/maternity-services/your-maternity-care/gynaecology-ward/",
    lastVerified: verifiedDate,
  },

  {
    id: "craigavon-grace-clinic",
    name: "Gynae Rapid Access Clinic East",
    type: "Specialist",
    topic: "Periods & pelvic pain",
    speciality: "One-stop specialist gynaecology assessment and investigation",
    locationName: "Southern Trust area",
    address: "Craigavon and eastern Southern Trust pathway",
    latitude: 54.435,
    longitude: -6.4117,
    referralRoute: "Referral through the Southern Trust gynaecology pathway",
    waitingTime: "Contact the Trust for current availability",
    servicesOffered: [
      "Specialist gynaecology review",
      "Assessment and investigation",
      "Personalised management planning",
    ],
    sourceUrl:
      "https://southerntrust.hscni.net/new-one-stop-specialist-gynae-clinic/",
    lastVerified: verifiedDate,
  },

  {
    id: "portadown-contraception",
    name: "Portadown Contraception Clinic",
    type: "NHS",
    topic: "Contraception",
    speciality: "Contraception and sexual-health services",
    locationName: "Portadown Health and Care Centre",
    address: "Tavanagh Avenue, Portadown, BT62 3BU",
    latitude: 54.4209,
    longitude: -6.4463,
    referralRoute: "Contact the Southern Trust contraception service",
    waitingTime: "Clinic availability varies",
    servicesOffered: [
      "Contraception advice",
      "Sexual-health support",
      "Reproductive-health information",
    ],
    sourceUrl:
      "https://southerntrust.hscni.net/your-health/health-improvement/contraception-and-sexual-health/cash-clinics-contraception-and-sexual-health/",
    lastVerified: verifiedDate,
  },

  {
    id: "newry-contraception",
    name: "Newry Contraception Clinic",
    type: "NHS",
    topic: "Contraception",
    speciality: "Contraception and sexual-health services",
    locationName: "John Mitchel Place, Newry",
    address: "Hill Street, Newry, BT34 3BU",
    latitude: 54.1769,
    longitude: -6.3381,
    referralRoute: "Contact the Southern Trust contraception service",
    waitingTime: "Clinic availability varies",
    servicesOffered: [
      "Contraception advice",
      "Sexual-health support",
      "Reproductive-health information",
    ],
    sourceUrl:
      "https://southerntrust.hscni.net/your-health/health-improvement/contraception-and-sexual-health/cash-clinics-contraception-and-sexual-health/",
    lastVerified: verifiedDate,
  },

  {
    id: "dungannon-health-hub",
    name: "Dungannon Young People’s Sexual Health Hub",
    type: "Community",
    topic: "Contraception",
    speciality: "Confidential contraception, STI and sexual-health support for young people",
    locationName: "Dungannon",
    address: "Dungannon, County Tyrone",
    latitude: 54.5035,
    longitude: -6.769,
    referralRoute: "Seasonal drop-in or pre-arranged clinic",
    waitingTime: "Confirm current clinic schedule with the Southern Trust",
    servicesOffered: [
      "Contraception advice",
      "Free condoms",
      "STI information",
      "Sexual-health nursing support",
    ],
    sourceUrl:
      "https://southerntrust.hscni.net/your-health/health-improvement/contraception-and-sexual-health/the-health-clinic/",
    lastVerified: verifiedDate,
  },

  {
    id: "armagh-health-hub",
    name: "Armagh Young People’s Sexual Health Hub",
    type: "Community",
    topic: "Contraception",
    speciality: "Confidential sexual-health and contraception support for young people",
    locationName: "Armagh",
    address: "Armagh City",
    latitude: 54.3503,
    longitude: -6.6528,
    referralRoute: "Seasonal drop-in or pre-arranged clinic",
    waitingTime: "Confirm current clinic schedule",
    servicesOffered: [
      "Contraception advice",
      "STI support",
      "Sexual-health information",
    ],
    sourceUrl:
      "https://southerntrust.hscni.net/your-health/health-improvement/contraception-and-sexual-health/the-health-clinic/",
    lastVerified: verifiedDate,
  },

  // ======================================================
  // SOUTH EASTERN TRUST
  // ======================================================

  {
    id: "ulster-maternity",
    name: "Ulster Hospital Maternity Unit",
    type: "NHS",
    topic: "Support & wellbeing",
    speciality: "Antenatal, maternity, birth and postnatal services",
    locationName: "Ulster Hospital, Dundonald",
    address: "Upper Newtownards Road, Dundonald, BT16 1RH",
    latitude: 54.5967,
    longitude: -5.8108,
    referralRoute: "Maternity self-referral and clinical pathways",
    waitingTime: "Care is scheduled according to pregnancy stage and clinical need",
    servicesOffered: [
      "Antenatal care",
      "Maternity assessment",
      "Birth services",
      "Postnatal care",
    ],
    sourceUrl:
      "https://setrust.hscni.net/service/maternity-2/ulster-hospital-maternity/",
    lastVerified: verifiedDate,
  },

  {
    id: "ulster-early-pregnancy",
    name: "South Eastern Trust Early Pregnancy Clinic",
    type: "Specialist",
    topic: "Fertility",
    speciality: "Nurse-led assessment for early-pregnancy pain and bleeding",
    locationName: "Ulster Hospital, Dundonald",
    address: "Upper Newtownards Road, Dundonald, BT16 1RH",
    latitude: 54.5972,
    longitude: -5.8115,
    referralRoute: "Access according to the Trust’s early-pregnancy pathway",
    waitingTime: "Assessment is based on symptoms and clinical need",
    servicesOffered: [
      "Early-pregnancy assessment",
      "Support for bleeding or abdominal pain",
      "Medical-team review where required",
    ],
    sourceUrl:
      "https://setrust.hscni.net/service/early-pregnancy-clinic/",
    lastVerified: verifiedDate,
  },

  {
    id: "ulster-gynae-oncology",
    name: "Ulster Hospital Gynaecological Oncology",
    type: "Specialist",
    topic: "Periods & pelvic pain",
    speciality: "Assessment and surgical pathways for gynaecological cancer",
    locationName: "Ulster Hospital, Dundonald",
    address: "Upper Newtownards Road, Dundonald, BT16 1RH",
    latitude: 54.5962,
    longitude: -5.812,
    referralRoute: "A&E, GP or clinician referral",
    waitingTime: "Managed under cancer referral pathways",
    servicesOffered: [
      "Specialist assessment",
      "Gynaecological cancer surgery",
      "Multidisciplinary treatment planning",
    ],
    sourceUrl:
      "https://setrust.hscni.net/service/cancer-services/gynaecology/",
    lastVerified: verifiedDate,
  },

  {
    id: "lagan-valley-maternity",
    name: "Lagan Valley Antenatal and Postnatal Care",
    type: "NHS",
    topic: "Support & wellbeing",
    speciality: "Antenatal and community postnatal maternity care",
    locationName: "Lagan Valley Hospital, Lisburn",
    address: "39 Hillsborough Road, Lisburn, BT28 1JP",
    latitude: 54.5098,
    longitude: -6.0514,
    referralRoute: "Maternity self-referral",
    waitingTime: "Care is scheduled according to pregnancy stage",
    servicesOffered: [
      "Antenatal care",
      "Community postnatal care",
      "Midwifery support",
    ],
    sourceUrl:
      "https://setrust.hscni.net/service/maternity-2/lagan-valley-hospital-maternity/",
    lastVerified: verifiedDate,
  },

  {
    id: "lagan-valley-tulip",
    name: "Tulip Service",
    type: "Specialist",
    topic: "Support & wellbeing",
    speciality: "Confidential abortion-care information and treatment pathway",
    locationName: "Lagan Valley Hospital, Lisburn",
    address: "Ward 9, 39 Hillsborough Road, Lisburn, BT28 1JP",
    latitude: 54.5102,
    longitude: -6.0506,
    referralRoute: "Contact the designated regional pathway for assessment",
    waitingTime: "Based on clinical circumstances and service availability",
    servicesOffered: [
      "Pregnancy-options information",
      "Abortion-care pathway",
      "Counselling signposting",
    ],
    sourceUrl:
      "https://setrust.hscni.net/service/abortion-service-tulip-service/",
    lastVerified: verifiedDate,
  },

  {
    id: "downe-maternity",
    name: "Downe Hospital Maternity Services",
    type: "NHS",
    topic: "Support & wellbeing",
    speciality: "Midwifery-led maternity services and pregnancy care",
    locationName: "Downe Hospital, Downpatrick",
    address: "2 Struell Wells Road, Downpatrick, BT30 6RL",
    latitude: 54.3267,
    longitude: -5.7158,
    referralRoute: "Maternity self-referral and community-midwifery pathway",
    waitingTime: "Scheduled by pregnancy stage and clinical need",
    servicesOffered: [
      "Maternity care",
      "Midwifery support",
      "Pregnancy information",
    ],
    sourceUrl: "https://setrust.hscni.net/service/maternity-2/",
    lastVerified: verifiedDate,
  },

  {
    id: "downe-sexual-health",
    name: "Downe Hospital Sexual Health Service",
    type: "NHS",
    topic: "Contraception",
    speciality: "Sexual and reproductive healthcare",
    locationName: "Downe Hospital, Downpatrick",
    address: "2 Struell Wells Road, Downpatrick, BT30 6RL",
    latitude: 54.3272,
    longitude: -5.7152,
    referralRoute: "Contact the South Eastern Trust central sexual-health service",
    waitingTime: "Contact the service for current clinic arrangements",
    servicesOffered: [
      "Sexual-health advice",
      "Contraception support",
      "Confidential reproductive healthcare",
    ],
    sourceUrl:
      "https://setrust.hscni.net/our-hospitals/downehospital/",
    lastVerified: verifiedDate,
  },

  // ======================================================
  // NORTHERN TRUST
  // ======================================================

  {
    id: "antrim-gynaecology",
    name: "Antrim Area Hospital Gynaecology",
    type: "NHS",
    topic: "Periods & pelvic pain",
    speciality: "Inpatient, outpatient and community-based gynaecological care",
    locationName: "Antrim Area Hospital",
    address: "45 Bush Road, Antrim, BT41 2RL",
    latitude: 54.7198,
    longitude: -6.205,
    referralRoute: "GP or clinical referral",
    waitingTime: "Varies by service and clinical priority",
    servicesOffered: [
      "Gynaecology assessment",
      "Outpatient investigation",
      "Specialist women’s healthcare",
    ],
    sourceUrl:
      "https://www.northerntrust.hscni.net/service/gynaecology/",
    lastVerified: verifiedDate,
  },

  {
    id: "antrim-hysteroscopy",
    name: "Antrim Gynaecology Treatment Suite",
    type: "Specialist",
    topic: "Periods & pelvic pain",
    speciality: "Ambulatory gynaecology and outpatient hysteroscopy pathways",
    locationName: "Antrim Area Hospital",
    address: "45 Bush Road, Antrim, BT41 2RL",
    latitude: 54.7203,
    longitude: -6.2043,
    referralRoute: "Specialist gynaecology referral",
    waitingTime: "Contact the Northern Trust for pathway information",
    servicesOffered: [
      "Outpatient hysteroscopy",
      "Ambulatory gynaecology",
      "Specialist assessment",
    ],
    sourceUrl:
      "https://www.northerntrust.hscni.net/service/gynaecology/",
    lastVerified: verifiedDate,
  },

  {
    id: "antrim-contraception",
    name: "Northern Trust Contraceptive Services",
    type: "NHS",
    topic: "Contraception",
    speciality: "Contraception advice and treatment, including support for heavy or painful periods",
    locationName: "Northern Trust area",
    address: "Antrim Area Hospital, Bush Road, Antrim, BT41 2RL",
    latitude: 54.7192,
    longitude: -6.206,
    referralRoute: "Contact the Northern Trust contraceptive service",
    waitingTime: "Clinic location and availability vary",
    servicesOffered: [
      "Contraception advice",
      "Oral contraception",
      "Hormone-releasing intrauterine systems",
      "Support for heavy or painful periods",
    ],
    sourceUrl:
      "https://www.northerntrust.hscni.net/service/contraceptive-and-sexual-health-services/contraceptive-services/",
    lastVerified: verifiedDate,
  },

  {
    id: "causeway-womens-health",
    name: "Causeway Hospital Women’s Health Services",
    type: "NHS",
    topic: "Periods & pelvic pain",
    speciality: "Hospital-based women’s health and outpatient services",
    locationName: "Causeway Hospital, Coleraine",
    address: "4 Newbridge Road, Coleraine, BT52 1HS",
    latitude: 55.122,
    longitude: -6.6561,
    referralRoute: "GP or clinical referral",
    waitingTime: "Varies by pathway",
    servicesOffered: [
      "Women’s-health assessment",
      "Outpatient services",
      "Diagnostic pathways",
    ],
    sourceUrl:
      "https://www.northerntrust.hscni.net/service/gynaecology/",
    lastVerified: verifiedDate,
  },

  {
    id: "mid-ulster-outpatients",
    name: "Mid Ulster Hospital Women’s Health Outpatients",
    type: "NHS",
    topic: "Periods & pelvic pain",
    speciality: "Local outpatient access and hospital services",
    locationName: "Mid Ulster Hospital, Magherafelt",
    address: "59 Hospital Road, Magherafelt, BT45 5EX",
    latitude: 54.7574,
    longitude: -6.6057,
    referralRoute: "GP or clinical referral according to pathway",
    waitingTime: "Confirm clinic availability with the Northern Trust",
    servicesOffered: [
      "Outpatient assessment",
      "Hospital diagnostic access",
      "Care-pathway signposting",
    ],
    sourceUrl:
      "https://www.northerntrust.hscni.net/our-hospitals/mid-ulster-hospital/",
    lastVerified: verifiedDate,
  },

  // ======================================================
  // WESTERN TRUST
  // ======================================================

  {
    id: "derry-brae-reproductive",
    name: "Brae Sexual and Reproductive Health Clinic",
    type: "NHS",
    topic: "Contraception",
    speciality: "Sexual and reproductive-health clinics",
    locationName: "Waterside Health Centre, Derry",
    address: "127–147 Spencer Road, Derry, BT47 6AH",
    latitude: 54.9915,
    longitude: -7.3087,
    referralRoute: "Appointment through the Western Trust clinic",
    waitingTime: "Contact the service for current appointments",
    servicesOffered: [
      "Contraception",
      "Sexual-health advice",
      "Reproductive-health support",
    ],
    phone: "028 7132 1758",
    sourceUrl:
      "https://westerntrust.hscni.net/service/sexual-and-reproductive-health-services/",
    lastVerified: verifiedDate,
  },

  {
    id: "derry-altnagelvin-maternity",
    name: "Altnagelvin Maternity Department",
    type: "NHS",
    topic: "Support & wellbeing",
    speciality: "Antenatal, maternity and postnatal services",
    locationName: "Altnagelvin Area Hospital",
    address: "Glenshane Road, Derry, BT47 6SB",
    latitude: 54.9851,
    longitude: -7.2953,
    referralRoute: "Maternity pathway and self-referral where available",
    waitingTime: "Care is scheduled according to pregnancy stage",
    servicesOffered: [
      "Antenatal care",
      "Birth services",
      "Postnatal support",
    ],
    sourceUrl:
      "https://westerntrust.hscni.net/service/maternity-services/",
    lastVerified: verifiedDate,
  },

  {
    id: "derry-altnagelvin-antenatal",
    name: "Anderson House Antenatal Clinic",
    type: "NHS",
    topic: "Support & wellbeing",
    speciality: "Dedicated antenatal outpatient care",
    locationName: "Altnagelvin Hospital campus",
    address: "Glenshane Road, Derry, BT47 6SB",
    latitude: 54.9845,
    longitude: -7.2944,
    referralRoute: "Western Trust maternity pathway",
    waitingTime: "Appointments are scheduled through maternity services",
    servicesOffered: [
      "Antenatal appointments",
      "Pregnancy monitoring",
      "Midwifery and obstetric review",
    ],
    sourceUrl:
      "https://westerntrust.hscni.net/official-opening-of-new-antenatal-clinic-at-altnagelvin-hospital/",
    lastVerified: verifiedDate,
  },

  {
    id: "derry-cedar-clinic",
    name: "Cedar Clinic",
    type: "Specialist",
    topic: "Support & wellbeing",
    speciality: "Confidential abortion-care assessment and treatment",
    locationName: "Altnagelvin Area Hospital",
    address: "Glenshane Road, Derry, BT47 6SB",
    latitude: 54.9857,
    longitude: -7.296,
    referralRoute: "Contact the designated abortion-care pathway",
    waitingTime: "Based on gestation, clinical circumstances and availability",
    servicesOffered: [
      "Early medical abortion",
      "Surgical abortion under local anaesthetic within service criteria",
      "Telephone consultation and assessment",
    ],
    sourceUrl:
      "https://westerntrust.hscni.net/service/abortion-service-cedar-clinic/",
    lastVerified: verifiedDate,
  },

  {
    id: "omagh-reproductive-health",
    name: "Omagh Sexual and Reproductive Health Clinic",
    type: "NHS",
    topic: "Contraception",
    speciality: "Sexual and reproductive-health appointments",
    locationName: "Omagh Hospital and Primary Care Complex",
    address: "7 Donaghanie Road, Omagh, BT79 0NR",
    latitude: 54.6124,
    longitude: -7.2728,
    referralRoute: "Appointment through the Western Trust clinic",
    waitingTime: "Contact the clinic for current availability",
    servicesOffered: [
      "Contraception support",
      "Sexual-health advice",
      "Reproductive-health care",
    ],
    phone: "028 8283 5536",
    sourceUrl:
      "https://westerntrust.hscni.net/service/sexual-and-reproductive-health-services/",
    lastVerified: verifiedDate,
  },

  {
    id: "omagh-womens-health",
    name: "Omagh Women’s Health Clinics",
    type: "NHS",
    topic: "Periods & pelvic pain",
    speciality: "Women’s-health and gynaecology outpatient clinics",
    locationName: "Omagh Hospital and Primary Care Complex",
    address: "7 Donaghanie Road, Omagh, BT79 0NR",
    latitude: 54.6129,
    longitude: -7.272,
    referralRoute: "GP or specialist clinical referral",
    waitingTime: "Varies by clinic and pathway",
    servicesOffered: [
      "Women’s-health clinics",
      "Gynaecology outpatient assessment",
      "Referral-pathway support",
    ],
    sourceUrl:
      "https://westerntrust.hscni.net/services/",
    lastVerified: verifiedDate,
  },

  {
    id: "enniskillen-reproductive-health",
    name: "Enniskillen Sexual and Reproductive Health Clinic",
    type: "NHS",
    topic: "Contraception",
    speciality: "Sexual and reproductive-health appointments",
    locationName: "South West Acute Hospital",
    address: "124 Irvinestown Road, Enniskillen, BT74 6DN",
    latitude: 54.3626,
    longitude: -7.6767,
    referralRoute: "Appointment through the Western Trust clinic",
    waitingTime: "Contact the clinic for current availability",
    servicesOffered: [
      "Contraception advice",
      "Sexual-health support",
      "Reproductive healthcare",
    ],
    phone: "028 6638 2693",
    sourceUrl:
      "https://westerntrust.hscni.net/service/sexual-and-reproductive-health-services/",
    lastVerified: verifiedDate,
  },

  {
    id: "enniskillen-womens-health",
    name: "South West Acute Hospital Women’s Health Clinics",
    type: "NHS",
    topic: "Periods & pelvic pain",
    speciality: "Hospital women’s-health and gynaecology clinics",
    locationName: "South West Acute Hospital",
    address: "124 Irvinestown Road, Enniskillen, BT74 6DN",
    latitude: 54.3631,
    longitude: -7.6758,
    referralRoute: "GP or clinical referral",
    waitingTime: "Varies by service and clinical priority",
    servicesOffered: [
      "Women’s-health clinics",
      "Gynaecology assessment",
      "Specialist outpatient care",
    ],
    sourceUrl:
      "https://westerntrust.hscni.net/hospitals/south-west-acute-hospital/womens-health-clinics-at-south-west-acute-hospitals/",
    lastVerified: verifiedDate,
  },

  {
    id: "enniskillen-maternity",
    name: "South West Acute Hospital Maternity Department",
    type: "NHS",
    topic: "Support & wellbeing",
    speciality: "Antenatal, maternity and postnatal care",
    locationName: "South West Acute Hospital",
    address: "124 Irvinestown Road, Enniskillen, BT74 6DN",
    latitude: 54.3621,
    longitude: -7.6759,
    referralRoute: "Western Trust maternity pathway",
    waitingTime: "Care scheduled according to pregnancy stage and clinical need",
    servicesOffered: [
      "Antenatal care",
      "Birth services",
      "Postnatal care",
    ],
    sourceUrl:
      "https://westerntrust.hscni.net/service/maternity-services/",
    lastVerified: verifiedDate,
  },

  // ======================================================
  // COMMUNITY WOMEN'S CENTRES
  // ======================================================

  {
    id: "windsor-womens-centre",
    name: "Windsor Women’s Centre",
    type: "Community",
    topic: "Support & wellbeing",
    speciality: "Community support, wellbeing, education and family services for women",
    locationName: "Village area, South Belfast",
    address: "136–144 Broadway, Belfast",
    latitude: 54.586,
    longitude: -5.9575,
    referralRoute: "Contact the centre directly",
    waitingTime: "Programme availability varies",
    servicesOffered: [
      "Women’s wellbeing support",
      "Community programmes",
      "Education and family support",
    ],
    sourceUrl:
      "https://www.familysupportni.gov.uk/Service/3300",
    lastVerified: verifiedDate,
  },

  {
    id: "shankill-womens-centre",
    name: "Shankill Women’s Centre",
    type: "Community",
    topic: "Support & wellbeing",
    speciality: "Community-based support and development services for women",
    locationName: "Shankill Road, Belfast",
    address: "151–157 Shankill Road, Belfast, BT13 1FD",
    latitude: 54.6058,
    longitude: -5.952,
    referralRoute: "Contact or visit the centre",
    waitingTime: "Depends on programme availability",
    servicesOffered: [
      "Women’s support",
      "Community programmes",
      "Family and wellbeing services",
    ],
    phone: "028 9024 0642",
    sourceUrl:
      "https://www.familysupportni.gov.uk/Service/5010",
    lastVerified: verifiedDate,
  },

  {
    id: "greenway-womens-centre",
    name: "Greenway Women’s Centre",
    type: "Community",
    topic: "Support & wellbeing",
    speciality: "Women’s community support, health and wellbeing programmes",
    locationName: "Cregagh, Belfast",
    address: "19 Greenway, Belfast, BT6 0DT",
    latitude: 54.5779,
    longitude: -5.889,
    referralRoute: "Contact the centre directly",
    waitingTime: "Depends on programme availability",
    servicesOffered: [
      "Health and wellbeing programmes",
      "Community support",
      "Women’s development activities",
    ],
    phone: "028 9079 9912",
    sourceUrl:
      "https://www.familysupportni.gov.uk/Service/3302",
    lastVerified: verifiedDate,
  },

  {
    id: "ballybeen-womens-centre",
    name: "Ballybeen Women’s Centre",
    type: "Community",
    topic: "Support & wellbeing",
    speciality: "Community support and wellbeing services for women and families",
    locationName: "Dundonald",
    address: "34 Ballybeen Square, Dundonald, BT16 2QE",
    latitude: 54.5914,
    longitude: -5.7887,
    referralRoute: "Contact the centre directly",
    waitingTime: "Depends on programme availability",
    servicesOffered: [
      "Women’s support",
      "Health and wellbeing activities",
      "Family and community programmes",
    ],
    phone: "028 9048 1632",
    sourceUrl:
      "https://www.familysupportni.gov.uk/Service/2843",
    lastVerified: verifiedDate,
  },

  {
    id: "first-steps-womens-centre",
    name: "First Steps Women’s Centre",
    type: "Community",
    topic: "Support & wellbeing",
    speciality: "Women’s community support, education and wellbeing services",
    locationName: "Dungannon",
    address: "21a William Street, Dungannon, BT70 1DX",
    latitude: 54.5024,
    longitude: -6.7681,
    referralRoute: "Contact the centre directly",
    waitingTime: "Depends on programme availability",
    servicesOffered: [
      "Women’s support",
      "Education and employability",
      "Community wellbeing programmes",
    ],
    phone: "028 8772 7648",
    sourceUrl:
      "https://www.familysupportni.gov.uk/Service/4264",
    lastVerified: verifiedDate,
  },

  {
    id: "chrysalis-womens-centre",
    name: "Chrysalis Women’s Centre",
    type: "Community",
    topic: "Support & wellbeing",
    speciality: "Community health, wellbeing and support programmes for women",
    locationName: "Craigavon",
    address: "520–523 Burnside, Craigavon, BT65 5DE",
    latitude: 54.4485,
    longitude: -6.3881,
    referralRoute: "Contact the centre directly",
    waitingTime: "Depends on programme availability",
    servicesOffered: [
      "Women’s wellbeing support",
      "Community programmes",
      "Health and family support",
    ],
    phone: "028 3834 1846",
    sourceUrl:
      "https://www.familysupportni.gov.uk/Service/2973/health-and-wellbeing/chrysalis-womens-centre-craigavon",
    lastVerified: verifiedDate,
  },

  {
    id: "falls-womens-centre",
    name: "Falls Women’s Centre",
    type: "Community",
    topic: "Support & wellbeing",
    speciality: "Women’s wellbeing, family support and community development",
    locationName: "West Belfast",
    address: "Falls Road, Belfast",
    latitude: 54.5925,
    longitude: -5.9665,
    referralRoute: "Contact the centre directly",
    waitingTime: "Depends on programme availability",
    servicesOffered: [
      "Women’s support",
      "Community development",
      "Family and wellbeing programmes",
    ],
    sourceUrl:
      "https://www.familysupportni.gov.uk/Service/4776",
    lastVerified: verifiedDate,
  },
];
