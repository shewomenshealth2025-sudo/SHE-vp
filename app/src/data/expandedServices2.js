/*
  SHE Northern Ireland Directory Expansion 2

  Focus:
  - Perinatal mental health
  - Pelvic-health physiotherapy
  - Breast screening and assessment
  - Postnatal and specialist maternity support

  Service arrangements, referrals and clinic locations can change.
  Confirm all records directly before public launch.
*/

const verifiedDate = "2026-07-29";

export const expandedServices2 = [
  // ======================================================
  // SPECIALIST PERINATAL MENTAL HEALTH
  // ======================================================

  {
    id: "belfast-perinatal-mental-health",
    name: "Belfast Community Perinatal Mental Health Service",
    type: "Specialist",
    topic: "Support & wellbeing",
    speciality:
      "Specialist mental-health treatment and monitoring during pregnancy and the first year after birth",
    locationName: "Belfast Health and Social Care Trust",
    address: "Royal Victoria Hospital campus, Belfast, BT12 6BA",
    latitude: 54.5943,
    longitude: -5.9556,
    referralRoute:
      "Referral from maternity, GP, health-visiting or mental-health services",
    waitingTime:
      "Assessment priority depends on symptoms and clinical need",
    servicesOffered: [
      "Specialist psychiatric assessment",
      "Mental-health treatment during pregnancy",
      "Postnatal mental-health support",
      "Medication and care-plan review",
      "Family-focused support",
    ],
    suitableFor: [
      "Women with moderate or severe perinatal mental-health needs",
      "Women with an existing serious mental-health condition",
      "Women requiring specialist monitoring during pregnancy or after birth",
    ],
    phone: "028 9504 6223",
    sourceUrl:
      "https://belfasttrust.hscni.net/service/community-mental-health-perinatal-service/",
    lastVerified: verifiedDate,
  },

  {
    id: "southern-perinatal-mental-health",
    name: "Southern Trust Perinatal Mental Health Team",
    type: "Specialist",
    topic: "Support & wellbeing",
    speciality:
      "Specialist maternity and mental-health support during pregnancy and up to the baby’s first birthday",
    locationName: "Craigavon Area Hospital",
    address: "68 Lurgan Road, Portadown, BT63 5QQ",
    latitude: 54.4348,
    longitude: -6.4137,
    referralRoute:
      "Referral from a GP, midwife, health visitor or mental-health team",
    waitingTime:
      "Assessment depends on referral information and clinical need",
    servicesOffered: [
      "Perinatal psychiatric assessment",
      "Psychological and nursing support",
      "Medication review",
      "Care planning with maternity services",
      "Postnatal mental-health care",
    ],
    suitableFor: [
      "Women with moderate or severe mental-health conditions",
      "Women from 12 weeks of pregnancy",
      "Women up to one year after birth",
    ],
    sourceUrl:
      "https://southerntrust.hscni.net/service/perinatal-mental-health-team/",
    lastVerified: verifiedDate,
  },

  {
    id: "south-eastern-perinatal-mental-health",
    name: "South Eastern Trust Community Perinatal Mental Health Service",
    type: "Specialist",
    topic: "Support & wellbeing",
    speciality:
      "Specialist mental-health interventions throughout pregnancy and the first postnatal year",
    locationName: "Ulster Hospital, Dundonald",
    address: "Upper Newtownards Road, Dundonald, BT16 1RH",
    latitude: 54.5974,
    longitude: -5.811,
    referralRoute:
      "Referral through maternity, GP, health-visiting or mental-health services",
    waitingTime:
      "Managed according to mental-health and maternity clinical need",
    servicesOffered: [
      "Specialist perinatal assessment",
      "Mental-health interventions",
      "Family and infant-focused support",
      "Joint maternity and mental-health care",
    ],
    sourceUrl:
      "https://setrust.hscni.net/mums-and-babies-at-heart-of-new-perinatal-service/",
    lastVerified: verifiedDate,
  },

  {
    id: "northern-perinatal-mental-health",
    name: "Northern Trust Specialist Perinatal Mental Health Team",
    type: "Specialist",
    topic: "Support & wellbeing",
    speciality:
      "Trust-wide specialist support for significant mental-health needs during pregnancy and after birth",
    locationName: "Antrim Area Hospital",
    address: "45 Bush Road, Antrim, BT41 2RL",
    latitude: 54.7205,
    longitude: -6.2057,
    referralRoute:
      "Professional referral through maternity, primary-care or mental-health pathways",
    waitingTime:
      "Assessment is prioritised according to clinical need",
    servicesOffered: [
      "Perinatal mental-health assessment",
      "Psychiatric and psychological support",
      "Medication advice",
      "Postnatal monitoring",
      "Multidisciplinary care planning",
    ],
    sourceUrl:
      "https://www.publichealth.hscni.net/services-and-teams/population-health-and-wellbeing/midwifery/perinatal-mental-health",
    lastVerified: verifiedDate,
  },

  {
    id: "western-perinatal-mental-health-derry",
    name: "Western Trust Perinatal Mental Health Service — Derry",
    type: "Specialist",
    topic: "Support & wellbeing",
    speciality:
      "Trust-wide specialist community mental-health support during pregnancy and following birth",
    locationName: "Old Bridge House, Derry",
    address: "Glendermott Road, Derry, BT47 6AU",
    latitude: 54.9905,
    longitude: -7.2978,
    referralRoute:
      "Referral by a GP, midwife, health visitor or Trust mental-health team",
    waitingTime:
      "Assessment depends on clinical priority",
    servicesOffered: [
      "Specialist perinatal assessment",
      "Community mental-health support",
      "Medication and treatment review",
      "Pregnancy and postnatal care planning",
    ],
    phone: "028 7161 0784",
    sourceUrl:
      "https://westerntrust.hscni.net/services/mental-health-services/adult-mh-services/perinatal-mental-health-service/",
    lastVerified: verifiedDate,
  },

  {
    id: "western-perinatal-mental-health-omagh",
    name: "Western Trust Perinatal Mental Health Service — Omagh",
    type: "Specialist",
    topic: "Support & wellbeing",
    speciality:
      "Specialist community perinatal mental-health assessment and support",
    locationName: "Omagh Hospital and Primary Care Complex",
    address: "7 Donaghanie Road, Omagh, BT79 0NR",
    latitude: 54.6135,
    longitude: -7.2728,
    referralRoute:
      "Professional referral from maternity, primary-care, health-visiting or mental-health teams",
    waitingTime:
      "Managed according to clinical need",
    servicesOffered: [
      "Specialist mental-health assessment",
      "Pregnancy and postnatal support",
      "Care coordination",
      "Psychiatric and psychological input",
    ],
    sourceUrl:
      "https://westerntrust.hscni.net/services/mental-health-services/adult-mh-services/perinatal-mental-health-service/",
    lastVerified: verifiedDate,
  },

  // ======================================================
  // BELFAST PELVIC HEALTH AND MATERNITY PHYSIOTHERAPY
  // ======================================================

  {
    id: "belfast-maternity-physiotherapy",
    name: "Belfast Trust Maternity Physiotherapy",
    type: "Specialist",
    topic: "Pelvic health",
    speciality:
      "Antenatal and postnatal physiotherapy for pregnancy-related pelvic, back and mobility problems",
    locationName: "Royal Jubilee Maternity Service",
    address: "Royal Victoria Hospital, Belfast, BT12 6BA",
    latitude: 54.5941,
    longitude: -5.9565,
    referralRoute:
      "Referral during pregnancy or within the early postnatal period",
    waitingTime:
      "Appointment availability depends on referral and clinical need",
    servicesOffered: [
      "Pregnancy-related pelvic-girdle pain support",
      "Back-pain physiotherapy",
      "Postnatal rehabilitation",
      "Movement and exercise advice",
      "Pelvic-floor guidance",
    ],
    sourceUrl:
      "https://belfasttrust.hscni.net/services/maternity/supporting-you/maternity-physiotherapy/",
    lastVerified: verifiedDate,
  },

  // ======================================================
  // SOUTHERN TRUST PELVIC HEALTH
  // ======================================================

  {
    id: "craigavon-pelvic-health-physiotherapy",
    name: "Craigavon Pelvic Health Physiotherapy",
    type: "Specialist",
    topic: "Pelvic health",
    speciality:
      "Pregnancy, postnatal and pelvic-floor physiotherapy",
    locationName: "Craigavon Area Hospital",
    address: "68 Lurgan Road, Portadown, BT63 5QQ",
    latitude: 54.4337,
    longitude: -6.4142,
    referralRoute:
      "Referral from a GP, consultant, midwife, health visitor or other healthcare professional",
    waitingTime:
      "Contact physiotherapy for current clinic availability",
    servicesOffered: [
      "Pelvic-floor assessment",
      "Pregnancy-related back and pelvic pain",
      "Postnatal rehabilitation",
      "Bladder and bowel symptom support",
    ],
    phone: "028 3756 3025",
    sourceUrl:
      "https://southerntrust.hscni.net/services/maternity-services/pelvic-health-physiotherapy-service/",
    lastVerified: verifiedDate,
  },

  {
    id: "daisy-hill-pelvic-health-physiotherapy",
    name: "Daisy Hill Pelvic Health Physiotherapy",
    type: "Specialist",
    topic: "Pelvic health",
    speciality:
      "Pelvic-floor, pregnancy and postnatal physiotherapy",
    locationName: "Daisy Hill Hospital, Newry",
    address: "5 Hospital Road, Newry, BT35 8DR",
    latitude: 54.1749,
    longitude: -6.3412,
    referralRoute:
      "Referral from a GP, consultant, midwife, health visitor or other healthcare professional",
    waitingTime:
      "Contact the service for current availability",
    servicesOffered: [
      "Pelvic-health physiotherapy",
      "Pregnancy-related discomfort management",
      "Postnatal recovery support",
      "Pelvic-floor rehabilitation",
    ],
    phone: "028 3756 2935",
    sourceUrl:
      "https://southerntrust.hscni.net/services/allied-health-professions/musculoskeletal-physiotherapy/",
    lastVerified: verifiedDate,
  },

  {
    id: "south-tyrone-pelvic-health-physiotherapy",
    name: "South Tyrone Pelvic Health Physiotherapy",
    type: "Specialist",
    topic: "Pelvic health",
    speciality:
      "Pelvic-health and maternity physiotherapy support",
    locationName: "South Tyrone Hospital, Dungannon",
    address: "Carland Road, Dungannon, BT71 4AU",
    latitude: 54.508,
    longitude: -6.7819,
    referralRoute:
      "Healthcare-professional referral",
    waitingTime:
      "Contact the physiotherapy department for availability",
    servicesOffered: [
      "Pelvic-floor rehabilitation",
      "Pregnancy-related pelvic pain support",
      "Postnatal recovery",
      "Bladder and bowel symptom management",
    ],
    phone: "028 3756 5545",
    sourceUrl:
      "https://southerntrust.hscni.net/services/allied-health-professions/musculoskeletal-physiotherapy/",
    lastVerified: verifiedDate,
  },

  {
    id: "armagh-pelvic-health-physiotherapy",
    name: "Armagh Pelvic Health Physiotherapy",
    type: "Specialist",
    topic: "Pelvic health",
    speciality:
      "Pelvic-health and women’s physiotherapy services",
    locationName: "Clover Building, Armagh",
    address: "Armagh Community Hospital, Tower Hill, Armagh, BT61 9DR",
    latitude: 54.3512,
    longitude: -6.657,
    referralRoute:
      "Referral from a healthcare professional",
    waitingTime:
      "Contact the clinic for current availability",
    servicesOffered: [
      "Pelvic-floor support",
      "Pregnancy and postnatal physiotherapy",
      "Pelvic-pain rehabilitation",
    ],
    phone: "028 3756 5274",
    sourceUrl:
      "https://southerntrust.hscni.net/services/allied-health-professions/musculoskeletal-physiotherapy/",
    lastVerified: verifiedDate,
  },

  {
    id: "lurgan-pelvic-health-physiotherapy",
    name: "Lurgan Pelvic Health Physiotherapy",
    type: "Specialist",
    topic: "Pelvic health",
    speciality:
      "Pelvic-health, maternity and postnatal physiotherapy",
    locationName: "Lurgan Hospital",
    address: "100 Sloan Street, Lurgan, BT66 8NX",
    latitude: 54.462,
    longitude: -6.329,
    referralRoute:
      "Healthcare-professional referral",
    waitingTime:
      "Contact physiotherapy for current appointments",
    servicesOffered: [
      "Pelvic-floor rehabilitation",
      "Postnatal recovery support",
      "Pregnancy-related pain management",
    ],
    phone: "028 3756 6018",
    sourceUrl:
      "https://southerntrust.hscni.net/services/allied-health-professions/musculoskeletal-physiotherapy/",
    lastVerified: verifiedDate,
  },

  {
    id: "banbridge-pelvic-health-physiotherapy",
    name: "Banbridge Pelvic Health Physiotherapy",
    type: "Specialist",
    topic: "Pelvic health",
    speciality:
      "Community pelvic-health and maternity physiotherapy",
    locationName: "Banbridge Health and Care Centre",
    address: "10 Old Hospital Road, Banbridge, BT32 3GN",
    latitude: 54.3467,
    longitude: -6.2763,
    referralRoute:
      "Referral from a GP, consultant, midwife or healthcare professional",
    waitingTime:
      "Contact the centre for current clinic availability",
    servicesOffered: [
      "Pelvic-floor rehabilitation",
      "Pregnancy and postnatal physiotherapy",
      "Pelvic-pain support",
    ],
    phone: "028 4062 1602",
    sourceUrl:
      "https://southerntrust.hscni.net/services/allied-health-professions/musculoskeletal-physiotherapy/",
    lastVerified: verifiedDate,
  },

  // ======================================================
  // WESTERN TRUST PELVIC HEALTH
  // ======================================================

  {
    id: "altnagelvin-pelvic-health-physiotherapy",
    name: "Altnagelvin Pelvic Health Physiotherapy",
    type: "Specialist",
    topic: "Pelvic health",
    speciality:
      "Pelvic-health care for pregnancy, postnatal recovery, bladder, bowel and pelvic-pain symptoms",
    locationName: "Altnagelvin Area Hospital",
    address: "Glenshane Road, Derry, BT47 6SB",
    latitude: 54.9847,
    longitude: -7.2963,
    referralRoute:
      "GP, maternity, urogynaecology or healthcare-professional referral",
    waitingTime:
      "Contact the Western Trust for current availability",
    servicesOffered: [
      "Pregnancy and postnatal physiotherapy",
      "Pelvic-pain rehabilitation",
      "Bladder and bowel support",
      "Urogynaecology physiotherapy",
      "Pelvic-floor rehabilitation",
    ],
    sourceUrl:
      "https://westerntrust.hscni.net/service/physiotherapy/pelvic-health-physiotherapy/",
    lastVerified: verifiedDate,
  },

  {
    id: "omagh-pelvic-health-physiotherapy",
    name: "Omagh Pelvic Health Physiotherapy",
    type: "Specialist",
    topic: "Pelvic health",
    speciality:
      "Pelvic-health, pregnancy, postnatal and urogynaecology physiotherapy",
    locationName: "Omagh Hospital and Primary Care Complex",
    address: "7 Donaghanie Road, Omagh, BT79 0NR",
    latitude: 54.612,
    longitude: -7.274,
    referralRoute:
      "Referral through GP, maternity or specialist services",
    waitingTime:
      "Contact the service for appointment information",
    servicesOffered: [
      "Pelvic-floor rehabilitation",
      "Pregnancy and postnatal physiotherapy",
      "Pelvic-pain support",
      "Continence rehabilitation",
    ],
    sourceUrl:
      "https://westerntrust.hscni.net/service/physiotherapy/pelvic-health-physiotherapy/",
    lastVerified: verifiedDate,
  },

  {
    id: "enniskillen-pelvic-health-physiotherapy",
    name: "South West Acute Hospital Pelvic Health Physiotherapy",
    type: "Specialist",
    topic: "Pelvic health",
    speciality:
      "Pelvic-floor, maternity, continence and pelvic-pain physiotherapy",
    locationName: "South West Acute Hospital, Enniskillen",
    address: "124 Irvinestown Road, Enniskillen, BT74 6DN",
    latitude: 54.3637,
    longitude: -7.6772,
    referralRoute:
      "Referral from primary care, maternity or urogynaecology services",
    waitingTime:
      "Contact the Western Trust for current availability",
    servicesOffered: [
      "Pelvic-floor assessment",
      "Bladder and bowel rehabilitation",
      "Pregnancy and postnatal support",
      "Pelvic-pain physiotherapy",
    ],
    sourceUrl:
      "https://westerntrust.hscni.net/service/physiotherapy/pelvic-health-physiotherapy/",
    lastVerified: verifiedDate,
  },

  // ======================================================
  // NORTHERN AND SOUTH EASTERN PELVIC HEALTH
  // ======================================================

  {
    id: "antrim-pelvic-health-physiotherapy",
    name: "Northern Trust Pelvic Health Physiotherapy — Antrim",
    type: "Specialist",
    topic: "Pelvic health",
    speciality:
      "Pelvic-health physiotherapy for continence, prolapse, pelvic pain and maternity-related symptoms",
    locationName: "Antrim Area Hospital",
    address: "45 Bush Road, Antrim, BT41 2RL",
    latitude: 54.7189,
    longitude: -6.204,
    referralRoute:
      "Referral through GP, consultant, maternity or relevant clinical services",
    waitingTime:
      "Contact physiotherapy for current clinic information",
    servicesOffered: [
      "Pelvic-floor rehabilitation",
      "Continence support",
      "Pelvic-pain physiotherapy",
      "Pregnancy and postnatal support",
    ],
    sourceUrl:
      "https://www.northerntrust.hscni.net/service/physiotherapy-services/",
    lastVerified: verifiedDate,
  },

  {
    id: "causeway-pelvic-health-physiotherapy",
    name: "Northern Trust Pelvic Health Physiotherapy — Causeway",
    type: "Specialist",
    topic: "Pelvic health",
    speciality:
      "Pelvic-health physiotherapy and women’s rehabilitation",
    locationName: "Causeway Hospital, Coleraine",
    address: "4 Newbridge Road, Coleraine, BT52 1HS",
    latitude: 55.1212,
    longitude: -6.6571,
    referralRoute:
      "Referral through primary care or hospital services",
    waitingTime:
      "Contact the Northern Trust for clinic availability",
    servicesOffered: [
      "Pelvic-floor rehabilitation",
      "Continence management",
      "Pelvic-pain physiotherapy",
      "Postnatal support",
    ],
    sourceUrl:
      "https://www.northerntrust.hscni.net/service/physiotherapy-services/",
    lastVerified: verifiedDate,
  },

  {
    id: "ulster-pelvic-health-physiotherapy",
    name: "Ulster Hospital Pelvic Health Physiotherapy",
    type: "Specialist",
    topic: "Pelvic health",
    speciality:
      "Obstetric, pelvic-pain, continence and prolapse rehabilitation",
    locationName: "Ulster Hospital, Dundonald",
    address: "Upper Newtownards Road, Dundonald, BT16 1RH",
    latitude: 54.5958,
    longitude: -5.8098,
    referralRoute:
      "Referral through GP, maternity, gynaecology or continence services",
    waitingTime:
      "Contact South Eastern Trust physiotherapy for availability",
    servicesOffered: [
      "Pelvic-pain treatment",
      "Obstetric physiotherapy",
      "Continence rehabilitation",
      "Prolapse rehabilitation",
      "Pelvic-floor exercises and education",
    ],
    sourceUrl:
      "https://setrust.hscni.net/service/physiotherapy/",
    lastVerified: verifiedDate,
  },

  {
    id: "lagan-valley-pelvic-health-physiotherapy",
    name: "Lagan Valley Pelvic Health Physiotherapy",
    type: "Specialist",
    topic: "Pelvic health",
    speciality:
      "Pelvic-health, obstetric and continence physiotherapy",
    locationName: "Lagan Valley Hospital, Lisburn",
    address: "39 Hillsborough Road, Lisburn, BT28 1JP",
    latitude: 54.5092,
    longitude: -6.0523,
    referralRoute:
      "Healthcare-professional referral",
    waitingTime:
      "Contact the Trust for current clinic arrangements",
    servicesOffered: [
      "Pelvic-floor rehabilitation",
      "Pregnancy-related pain support",
      "Postnatal physiotherapy",
      "Continence rehabilitation",
    ],
    sourceUrl:
      "https://setrust.hscni.net/service/physiotherapy/",
    lastVerified: verifiedDate,
  },

  {
    id: "downe-pelvic-health-physiotherapy",
    name: "Downe Hospital Pelvic Health Physiotherapy",
    type: "Specialist",
    topic: "Pelvic health",
    speciality:
      "Pelvic-health, obstetric and continence rehabilitation",
    locationName: "Downe Hospital, Downpatrick",
    address: "2 Struell Wells Road, Downpatrick, BT30 6RL",
    latitude: 54.3261,
    longitude: -5.7168,
    referralRoute:
      "Referral through GP, maternity or hospital services",
    waitingTime:
      "Contact physiotherapy for current availability",
    servicesOffered: [
      "Pelvic-floor physiotherapy",
      "Pelvic-pain rehabilitation",
      "Pregnancy and postnatal support",
      "Continence care",
    ],
    sourceUrl:
      "https://setrust.hscni.net/service/physiotherapy/",
    lastVerified: verifiedDate,
  },

  // ======================================================
  // BREAST SCREENING AND ASSESSMENT
  // ======================================================

  {
    id: "belfast-linenhall-breast-screening",
    name: "Regional Breast Screening Unit",
    type: "Diagnostics",
    topic: "Breast health",
    speciality:
      "Regional routine breast-screening mammography programme",
    locationName: "Linenhall Street, Belfast",
    address: "12–22 Linenhall Street, Belfast, BT2 8BS",
    latitude: 54.5941,
    longitude: -5.9314,
    referralRoute:
      "Eligible women are invited automatically through the regional screening programme",
    waitingTime:
      "Appointments are issued according to the regional screening timetable",
    servicesOffered: [
      "Routine mammography",
      "Breast-screening appointments",
      "Screening-result pathways",
      "Over-70 appointment requests",
    ],
    phone: "028 9033 3700",
    sourceUrl:
      "https://belfasttrust.hscni.net/service/breast-screening-programme/",
    lastVerified: verifiedDate,
  },

  {
    id: "belfast-city-breast-clinic",
    name: "Belfast City Hospital Breast Outpatient Clinic",
    type: "Specialist",
    topic: "Breast health",
    speciality:
      "Clinical breast assessment and investigation of breast symptoms",
    locationName: "Belfast City Hospital",
    address: "51 Lisburn Road, Belfast, BT9 7AB",
    latitude: 54.5868,
    longitude: -5.9427,
    referralRoute:
      "GP or clinical referral, including urgent breast pathways",
    waitingTime:
      "Priority is determined by referral pathway and clinical need",
    servicesOffered: [
      "Clinical breast examination",
      "Breast-symptom assessment",
      "Diagnostic investigation",
      "Specialist breast-care support",
    ],
    sourceUrl:
      "https://belfasttrust.hscni.net/services/cancer/types/breast-cancers/",
    lastVerified: verifiedDate,
  },

  {
    id: "craigavon-glenanne-breast-unit",
    name: "Glenanne Breast Care and Screening Unit",
    type: "Diagnostics",
    topic: "Breast health",
    speciality:
      "Breast screening and assessment following routine or red-flag referrals",
    locationName: "Craigavon Area Hospital",
    address: "68 Lurgan Road, Portadown, BT63 5QQ",
    latitude: 54.4354,
    longitude: -6.413,
    referralRoute:
      "Screening invitation or GP and clinical referral for breast assessment",
    waitingTime:
      "Depends on screening schedule and referral pathway",
    servicesOffered: [
      "Routine breast screening",
      "Breast assessment",
      "Mammography",
      "Assessment following red-flag referral",
    ],
    sourceUrl:
      "https://southerntrust.hscni.net/service/glenanne-unit/",
    lastVerified: verifiedDate,
  },

  {
    id: "altnagelvin-breast-screening-unit",
    name: "Altnagelvin Breast Screening Unit",
    type: "Diagnostics",
    topic: "Breast health",
    speciality:
      "Breast screening, assessment and specialist breast-care support",
    locationName: "Altnagelvin Area Hospital",
    address: "Glenshane Road, Derry, BT47 6SB",
    latitude: 54.9862,
    longitude: -7.2948,
    referralRoute:
      "Screening invitation or referral through a breast-symptom pathway",
    waitingTime:
      "Appointments depend on screening timetable and clinical pathway",
    servicesOffered: [
      "Breast-screening mammography",
      "Further assessment after recall",
      "Specialist breast-care nursing",
      "Breast-symptom assessment pathways",
    ],
    phone: "028 7161 1363",
    sourceUrl:
      "https://westerntrust.hscni.net/service/breast-services/",
    lastVerified: verifiedDate,
  },

  {
    id: "antrim-very-high-risk-breast-screening",
    name: "Very High Risk Breast Screening Unit",
    type: "Specialist",
    topic: "Breast health",
    speciality:
      "Regional surveillance screening for women with a very high risk of breast cancer",
    locationName: "Antrim Area Hospital",
    address: "45 Bush Road, Antrim, BT41 2RL",
    latitude: 54.721,
    longitude: -6.2048,
    referralRoute:
      "Referral by an eligible specialist healthcare professional",
    waitingTime:
      "Screening frequency is based on individual surveillance criteria",
    servicesOffered: [
      "High-risk breast surveillance",
      "Annual breast screening where appropriate",
      "Screening from a younger age where eligible",
      "Specialist risk-based monitoring",
    ],
    phone: "028 9442 4426",
    sourceUrl:
      "https://www.northerntrust.hscni.net/service/breast-care-and-breast-screening/very-high-risk-breast-screening-programme/",
    lastVerified: verifiedDate,
  },

  {
    id: "antrim-routine-breast-screening",
    name: "Antrim Breast Screening Mobile Unit Base",
    type: "Diagnostics",
    topic: "Breast health",
    speciality:
      "Routine invited breast-screening mammography",
    locationName: "Antrim Area Hospital",
    address: "45 Bush Road, Antrim, BT41 2RL",
    latitude: 54.7214,
    longitude: -6.206,
    referralRoute:
      "Invitation through the Northern Ireland Breast Screening Programme",
    waitingTime:
      "Availability follows the Northern Trust screening timetable",
    servicesOffered: [
      "Routine mammography",
      "Invited breast screening",
      "Screening follow-up pathways",
    ],
    sourceUrl:
      "https://www.northerntrust.hscni.net/service/breast-care-and-breast-screening/breast-screening-what-to-expect-and-how-our-routine-screening-programme-works/northern-trust-breast-screening-timetable/",
    lastVerified: verifiedDate,
  },

  {
    id: "ballymena-breast-screening-base",
    name: "Ballymena Breast Screening Mobile Unit Base",
    type: "Diagnostics",
    topic: "Breast health",
    speciality:
      "Mobile breast-screening location used according to the Trust timetable",
    locationName: "Ballymena Health and Care Centre",
    address: "86 Cushendall Road, Ballymena, BT43 6HB",
    latitude: 54.8702,
    longitude: -6.2685,
    referralRoute:
      "Invitation through the Northern Ireland Breast Screening Programme",
    waitingTime:
      "Operates according to the current mobile-screening timetable",
    servicesOffered: [
      "Invited breast screening",
      "Mammography",
      "Screening-result pathway",
    ],
    sourceUrl:
      "https://www.northerntrust.hscni.net/women-invited-to-receive-breast-screening-in-ballymena-and-antrim/",
    lastVerified: verifiedDate,
  },
];
