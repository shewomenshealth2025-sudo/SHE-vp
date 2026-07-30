/*
  SHE Republic of Ireland Directory
  Maternity Services
  Part 1

  Sources:
  National Maternity Experience Survey
  HSE Maternity Services

  Service arrangements can change.
  Verify before public release.
*/

const verifiedDate = "2026-07-30";

const maternitySource =
  "https://yourexperience.ie/maternity/about-the-survey/participating-maternity-units/";

const roiMaternityServices = [

  {
    id: "national-maternity-hospital",
    name: "National Maternity Hospital",
    type: "HSE",
    topic: "Pregnancy & maternity",
    speciality:
      "Comprehensive maternity care including antenatal, labour, postnatal and specialist obstetric services.",
    locationName: "Holles Street",
    address: "Holles Street, Dublin 2, D02 YH21",
    county: "Dublin",
    country: "Ireland",
    latitude: 53.3397,
    longitude: -6.2464,
    referralRoute:
      "Self-registration with GP referral through the Maternity and Infant Care Scheme.",
    waitingTime:
      "Depends on stage of pregnancy and clinical priority.",
    acceptsSelfReferral: false,
    acceptsGPReferral: true,
    emergencyService: true,
    cost: "Public / Private",
    website: "https://www.nmh.ie/",
    servicesOffered: [
      "Antenatal care",
      "Labour & delivery",
      "Postnatal care",
      "Early pregnancy assessment",
      "Fetal medicine",
      "Neonatal care",
      "Obstetric medicine"
    ],
    suitableFor: [
      "Pregnancy",
      "High-risk pregnancy",
      "Birth",
      "Postnatal recovery"
    ],
    phone: "01 637 3100",
    sourceUrl: maternitySource,
    lastVerified: verifiedDate,
  },

  {
    id: "rotunda-hospital",
    name: "The Rotunda Hospital",
    type: "HSE",
    topic: "Pregnancy & maternity",
    speciality:
      "Ireland's oldest maternity hospital providing maternity, neonatal and gynaecology care.",
    locationName: "Parnell Square",
    address: "Parnell Square East, Dublin 1",
    county: "Dublin",
    country: "Ireland",
    latitude: 53.3524,
    longitude: -6.2635,
    referralRoute:
      "GP referral through the national maternity pathway.",
    waitingTime:
      "Varies depending on pregnancy stage.",
    acceptsSelfReferral: false,
    acceptsGPReferral: true,
    emergencyService: true,
    cost: "Public / Private",
    website: "https://rotunda.ie",
    servicesOffered: [
      "Antenatal clinics",
      "Birth care",
      "Postnatal care",
      "NICU",
      "Gynaecology",
      "Early pregnancy care"
    ],
    suitableFor: [
      "Pregnancy",
      "Birth",
      "Women's health"
    ],
    phone: "01 817 1700",
    sourceUrl: maternitySource,
    lastVerified: verifiedDate,
  },

  {
    id: "coombe-women-infants",
    name: "The Coombe Women & Infants University Hospital",
    type: "HSE",
    topic: "Pregnancy & maternity",
    speciality:
      "Major tertiary maternity hospital providing obstetric and neonatal services.",
    locationName: "The Coombe",
    address: "Dolphin's Barn, Dublin 8",
    county: "Dublin",
    country: "Ireland",
    latitude: 53.3347,
    longitude: -6.2950,
    referralRoute:
      "GP referral into maternity services.",
    waitingTime:
      "Depends on gestation and service demand.",
    acceptsSelfReferral: false,
    acceptsGPReferral: true,
    emergencyService: true,
    cost: "Public /Private",
    website: "https://www.coombe.ie",
    servicesOffered: [
      "Maternity care",
      "Birth",
      "Neonatal medicine",
      "Fetal medicine",
      "Obstetric medicine"
    ],
    suitableFor: [
      "Pregnancy",
      "High-risk pregnancy",
      "Birth"
    ],
    phone: "01 408 5200",
    sourceUrl: maternitySource,
    lastVerified: verifiedDate,
  },

  {
    id: "cork-university-maternity-hospital",
    name: "Cork University Maternity Hospital",
    type: "HSE",
    topic: "Pregnancy & maternity",
    speciality:
      "Regional tertiary maternity hospital for the south of Ireland.",
    locationName: "Wilton",
    address: "Wilton, Cork",
    county: "Cork",
    country: "Ireland",
    latitude: 51.8830,
    longitude: -8.5124,
    referralRoute:
      "GP referral.",
    waitingTime:
      "Depends on maternity pathway.",
    acceptsSelfReferral: false,
    acceptsGPReferral: true,
    emergencyService: true,
    cost: "Public / Private",
    website: "https://www.cuh.hse.ie",
    servicesOffered: [
      "Antenatal care",
      "Labour ward",
      "Postnatal care",
      "Neonatal ICU",
      "Fetal medicine"
    ],
    suitableFor: [
      "Pregnancy",
      "Birth",
      "High-risk pregnancy"
    ],
    phone: "021 492 0500",
    sourceUrl: maternitySource,
    lastVerified: verifiedDate,
  },

  {
    id: "university-maternity-hospital-limerick",
    name: "University Maternity Hospital Limerick",
    type: "HSE",
    topic: "Pregnancy & maternity",
    speciality:
      "Regional maternity hospital serving the Mid-West.",
    locationName: "University Maternity Hospital",
    address: "Ennis Road, Limerick",
    county: "Limerick",
    country: "Ireland",
    latitude: 52.6678,
    longitude: -8.6307,
    referralRoute:
      "GP referral.",
    waitingTime:
      "Varies by clinic.",
    acceptsSelfReferral: false,
    acceptsGPReferral: true,
    emergencyService: true,
    cost: "Public / Private",
    website: "https://www.hse.ie",
    servicesOffered: [
      "Antenatal clinics",
      "Delivery",
      "Postnatal care",
      "Neonatal services"
    ],
    suitableFor: [
      "Pregnancy",
      "Birth"
    ],
    phone: "061 483 760",
    sourceUrl: maternitySource,
    lastVerified: verifiedDate,
  },

  {
    id: "university-hospital-galway-maternity",
    name: "University Hospital Galway Maternity Unit",
    type: "HSE",
    topic: "Pregnancy & maternity",
    speciality:
      "Regional maternity and obstetric care for the west of Ireland.",
    locationName: "University Hospital Galway",
    address: "Newcastle Road, Galway",
    county: "Galway",
    country: "Ireland",
    latitude: 53.2769,
    longitude: -9.0663,
    referralRoute:
      "GP referral.",
    waitingTime:
      "Varies by clinic.",
    acceptsSelfReferral: false,
    acceptsGPReferral: true,
    emergencyService: true,
    cost: "Public / Private",
    website: "https://www.saolta.ie",
    servicesOffered: [
      "Pregnancy care",
      "Birth",
      "Postnatal care",
      "Fetal medicine"
    ],
    suitableFor: [
      "Pregnancy",
      "Birth"
    ],
    phone: "091 544 544",
    sourceUrl: maternitySource,
    lastVerified: verifiedDate,
  },

  {
    id: "university-hospital-waterford-maternity",
    name: "University Hospital Waterford Maternity Unit",
    type: "HSE",
    topic: "Pregnancy & maternity",
    speciality:
      "Regional maternity services for the South East.",
    locationName: "University Hospital Waterford",
    address: "Dunmore Road, Waterford",
    county: "Waterford",
    country: "Ireland",
    latitude: 52.2481,
    longitude: -7.1119,
    referralRoute:
      "GP referral.",
    waitingTime:
      "Varies.",
    acceptsSelfReferral: false,
    acceptsGPReferral: true,
    emergencyService: true,
    cost: "Public / Private",
    website: "https://www.hse.ie",
    servicesOffered: [
      "Antenatal care",
      "Birth",
      "Postnatal care",
      "Obstetrics"
    ],
    suitableFor: [
      "Pregnancy",
      "Birth"
    ],
    phone: "051 848 000",
    sourceUrl: maternitySource,
    lastVerified: verifiedDate,
  },