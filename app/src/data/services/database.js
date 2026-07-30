const maternityDefaults = {
  country: "Republic of Ireland",
  type: "Public hospital",
  topic: "Pregnancy & maternity",
  topics: [
    "Pregnancy & maternity",
    "Antenatal care",
    "Birth",
    "Postnatal care",
  ],
  speciality:
    "Public maternity, midwifery, obstetric and postnatal services",
  referralRoute:
    "Contact the maternity hospital or unit after confirming your pregnancy. Your GP can also refer or register you through the Maternity and Infant Care Scheme.",
  acceptsSelfReferral: true,
  acceptsGPReferral: true,
  public: true,
  private: true,
  emergencyService: true,
  cost:
    "Public maternity care is normally free for eligible patients through the Maternity and Infant Care Scheme. Private care may involve charges.",
  servicesOffered: [
    "Antenatal appointments",
    "Midwifery care",
    "Obstetric assessment",
    "Labour and birth care",
    "Postnatal care",
    "Infant feeding support",
  ],
  suitableFor: [
    "Pregnant women registering for maternity care",
    "Women requiring antenatal support",
    "Women preparing to give birth",
    "Women requiring postnatal support",
  ],
  lastVerified: "2026-07-30",
};

const roiMaternityLocations = [
  {
    id: "national-maternity-hospital-dublin",
    name: "The National Maternity Hospital",
    county: "Dublin",
    hseRegion: "HSE Dublin and South East",
    locationName: "Holles Street",
    address: "Holles Street, Dublin 2, D02 YH21",
    latitude: 53.3397,
    longitude: -6.2464,
    phone: "01 637 3100",
    website: "https://www.nmh.ie/",
    sourceUrl:
      "https://www2.hse.ie/services/hospitals/national-maternity-hospital-dublin-holles-street/",
  },

  {
    id: "rotunda-hospital-dublin",
    name: "The Rotunda Hospital",
    county: "Dublin",
    hseRegion: "HSE Dublin and North East",
    locationName: "Parnell Square",
    address: "Parnell Square East, Dublin 1, D01 P5W9",
    latitude: 53.3524,
    longitude: -6.2635,
    phone: "01 817 1700",
    website: "https://rotunda.ie/",
    sourceUrl: "https://rotunda.ie/",
  },

  {
    id: "coombe-hospital-dublin",
    name: "The Coombe Hospital",
    county: "Dublin",
    hseRegion: "HSE Dublin and Midlands",
    locationName: "Cork Street",
    address: "Cork Street, Dublin 8, D08 XW7X",
    latitude: 53.3347,
    longitude: -6.295,
    phone: "01 408 5200",
    website: "https://www.coombe.ie/",
    sourceUrl: "https://www.coombe.ie/",
  },

  {
    id: "cork-university-maternity-hospital",
    name: "Cork University Maternity Hospital",
    county: "Cork",
    hseRegion: "HSE South West",
    locationName: "Wilton",
    address: "Wilton Road, Wilton, Cork, T12 YE02",
    latitude: 51.883,
    longitude: -8.5124,
    phone: "021 492 0500",
    website:
      "https://www.cuh.hse.ie/our-services/our-specialities-a-z/cork-university-maternity-hospital/",
    sourceUrl:
      "https://www2.hse.ie/services/hospitals/cork-university-maternity-hospital/",
  },

  {
    id: "university-maternity-hospital-limerick",
    name: "University Maternity Hospital Limerick",
    county: "Limerick",
    hseRegion: "HSE Mid West",
    locationName: "Ennis Road",
    address: "Ennis Road, Limerick, V94 C566",
    latitude: 52.6678,
    longitude: -8.6307,
    phone: "061 483 129",
    website:
      "https://healthservice.hse.ie/healthcare-delivery/ul-hospitals-group/our-hospitals/university-maternity-hospital-limerick/",
    sourceUrl:
      "https://www2.hse.ie/services/hospitals/university-maternity-hospital-limerick/",
  },

  {
    id: "university-hospital-galway-maternity-unit",
    name: "University Hospital Galway Maternity Unit",
    county: "Galway",
    hseRegion: "HSE West and North West",
    locationName: "University Hospital Galway",
    address: "Newcastle Road, Galway, H91 YR71",
    latitude: 53.2769,
    longitude: -9.0663,
    phone: "091 524 222",
    website: "https://www.saolta.ie/hospital/uhg",
    sourceUrl: "https://www.saolta.ie/hospital/uhg",
  },

  {
    id: "portiuncula-university-hospital-maternity-unit",
    name: "Portiuncula University Hospital Maternity Unit",
    county: "Galway",
    hseRegion: "HSE West and North West",
    locationName: "Portiuncula University Hospital",
    address: "Dunlo, Ballinasloe, County Galway, H53 T971",
    latitude: 53.3276,
    longitude: -8.2242,
    phone: "090 964 8200",
    website: "https://www.saolta.ie/hospital/puh",
    sourceUrl: "https://www.saolta.ie/hospital/puh",
  },

  {
    id: "mayo-university-hospital-maternity-unit",
    name: "Mayo University Hospital Maternity Unit",
    county: "Mayo",
    hseRegion: "HSE West and North West",
    locationName: "Mayo University Hospital",
    address: "Westport Road, Castlebar, County Mayo, F23 H529",
    latitude: 53.8504,
    longitude: -9.2995,
    phone: "094 902 1733",
    website: "https://www.saolta.ie/hospital/muh",
    sourceUrl:
      "https://www2.hse.ie/services/hospitals/mayo-university-hospital/",
  },

  {
    id: "sligo-university-hospital-maternity-unit",
    name: "Sligo University Hospital Maternity Unit",
    county: "Sligo",
    hseRegion: "HSE West and North West",
    locationName: "Sligo University Hospital",
    address: "The Mall, Sligo, F91 H684",
    latitude: 54.2766,
    longitude: -8.46,
    phone: "071 917 1111",
    website: "https://www.saolta.ie/hospital/suh",
    sourceUrl: "https://www.saolta.ie/hospital/suh",
  },

  {
    id: "letterkenny-university-hospital-maternity-unit",
    name: "Letterkenny University Hospital Maternity Unit",
    county: "Donegal",
    hseRegion: "HSE West and North West",
    locationName: "Letterkenny University Hospital",
    address:
      "Kilmacrennan Road, Letterkenny, County Donegal, F92 AE81",
    latitude: 54.9566,
    longitude: -7.734,
    phone: "074 912 5888",
    website: "https://www.saolta.ie/hospital/luh",
    sourceUrl: "https://www.saolta.ie/hospital/luh",
  },

  {
    id: "cavan-general-hospital-maternity-unit",
    name: "Cavan General Hospital Maternity Unit",
    county: "Cavan",
    hseRegion: "HSE Dublin and North East",
    locationName: "Cavan General Hospital",
    address: "Lisdarn, County Cavan, H12 Y7W1",
    latitude: 54.0005,
    longitude: -7.3605,
    phone: "049 437 6000",
    website:
      "https://www.hse.ie/eng/services/list/3/acutehospitals/hospitals/cavanmonaghan/",
    sourceUrl:
      "https://www.hse.ie/eng/services/list/3/acutehospitals/hospitals/cavanmonaghan/",
  },

  {
    id: "our-lady-of-lourdes-hospital-maternity-unit",
    name: "Our Lady of Lourdes Hospital Maternity Unit",
    county: "Louth",
    hseRegion: "HSE Dublin and North East",
    locationName: "Our Lady of Lourdes Hospital",
    address: "Windmill Road, Drogheda, County Louth, A92 VW28",
    latitude: 53.7188,
    longitude: -6.3475,
    phone: "041 983 7601",
    website: "https://www.ourladyoflourdes.ie/",
    sourceUrl: "https://www.ourladyoflourdes.ie/",
  },

  {
    id: "regional-hospital-mullingar-maternity-unit",
    name: "Regional Hospital Mullingar Maternity Unit",
    county: "Westmeath",
    hseRegion: "HSE Dublin and Midlands",
    locationName: "Regional Hospital Mullingar",
    address: "Longford Road, Mullingar, County Westmeath, N91 NA43",
    latitude: 53.5356,
    longitude: -7.3548,
    phone: "044 934 0221",
    website:
      "https://www2.hse.ie/services/hospitals/regional-hospital-mullingar/",
    sourceUrl:
      "https://www2.hse.ie/services/hospitals/regional-hospital-mullingar/",
  },

  {
    id: "midland-regional-hospital-portlaoise-maternity-unit",
    name: "Midland Regional Hospital Portlaoise Maternity Unit",
    county: "Laois",
    hseRegion: "HSE Dublin and Midlands",
    locationName: "Midland Regional Hospital Portlaoise",
    address: "Dublin Road, Portlaoise, County Laois, R32 RW61",
    latitude: 53.0369,
    longitude: -7.3009,
    phone: "057 862 1364",
    website:
      "https://www2.hse.ie/services/hospitals/midland-regional-hospital-portlaoise/",
    sourceUrl:
      "https://www2.hse.ie/services/hospitals/midland-regional-hospital-portlaoise/",
  },

  {
    id: "st-lukes-general-hospital-kilkenny-maternity-unit",
    name: "St Luke’s General Hospital Maternity Unit",
    county: "Kilkenny",
    hseRegion: "HSE Dublin and South East",
    locationName: "St Luke’s General Hospital",
    address: "Freshford Road, Kilkenny, R95 FY71",
    latitude: 52.6647,
    longitude: -7.2648,
    phone: "056 778 5000",
    website:
      "https://www2.hse.ie/services/hospitals/st-lukes-general-hospital-kilkenny/",
    sourceUrl:
      "https://www2.hse.ie/services/hospitals/st-lukes-general-hospital-kilkenny/",
  },

  {
    id: "tipperary-university-hospital-maternity-unit",
    name: "Tipperary University Hospital Maternity Unit",
    county: "Tipperary",
    hseRegion: "HSE Dublin and South East",
    locationName: "Tipperary University Hospital",
    address: "Western Road, Clonmel, County Tipperary, E91 V658",
    latitude: 52.3565,
    longitude: -7.7119,
    phone: "052 617 7000",
    website:
      "https://www2.hse.ie/services/hospitals/tipperary-university-hospital/",
    sourceUrl:
      "https://www2.hse.ie/services/hospitals/tipperary-university-hospital/",
  },

  {
    id: "university-hospital-waterford-maternity-unit",
    name: "University Hospital Waterford Maternity Unit",
    county: "Waterford",
    hseRegion: "HSE Dublin and South East",
    locationName: "University Hospital Waterford",
    address: "Dunmore Road, Waterford, X91 ER8E",
    latitude: 52.2481,
    longitude: -7.1119,
    phone: "051 848 000",
    website:
      "https://www2.hse.ie/services/hospitals/university-hospital-waterford/",
    sourceUrl:
      "https://www2.hse.ie/services/hospitals/university-hospital-waterford/",
  },

  {
    id: "wexford-general-hospital-maternity-unit",
    name: "Wexford General Hospital Maternity Unit",
    county: "Wexford",
    hseRegion: "HSE Dublin and South East",
    locationName: "Wexford General Hospital",
    address:
      "Newtown Road, Carricklawn, Wexford, County Wexford, Y35 Y17D",
    latitude: 52.3443,
    longitude: -6.4841,
    phone: "053 915 3000",
    website:
      "https://www2.hse.ie/services/hospitals/wexford-general-hospital/",
    sourceUrl:
      "https://www2.hse.ie/services/hospitals/wexford-general-hospital/",
  },

  {
    id: "university-hospital-kerry-maternity-unit",
    name: "University Hospital Kerry Maternity Unit",
    county: "Kerry",
    hseRegion: "HSE South West",
    locationName: "University Hospital Kerry",
    address: "Rathass, Tralee, County Kerry, V92 NX94",
    latitude: 52.2712,
    longitude: -9.6957,
    phone: "066 718 4000",
    website: "https://www.uhk.ie/",
    sourceUrl:
      "https://www2.hse.ie/services/hospitals/university-hospital-kerry/",
  },
];

const roiMaternityServices = roiMaternityLocations.map((service) => ({
  ...maternityDefaults,
  ...service,
}));
const roiWomensHealthServices = [
  {
    id: "nenagh-complex-menopause-service",
    name: "Complex Menopause Service at Nenagh Hospital",
    country: "Republic of Ireland",
    county: "Tipperary",
    hseRegion: "HSE Mid West",
    type: "Public specialist clinic",
    topic: "Menopause",
    topics: [
      "Menopause",
      "Perimenopause",
      "Premature ovarian insufficiency",
      "Hormone replacement therapy",
    ],
    speciality:
      "Specialist assessment and management of complex menopause symptoms",
    locationName: "Nenagh Hospital",
    address:
      "Nenagh Hospital, Tyone, Nenagh South, Nenagh, County Tipperary, E45 PT86",
    latitude: 52.8645,
    longitude: -8.1967,
    referralRoute:
      "A GP or hospital consultant must submit a referral letter.",
    acceptsSelfReferral: false,
    acceptsGPReferral: true,
    public: true,
    private: false,
    emergencyService: false,
    cost: "Public HSE service",
    phone: "067 423 85",
    email: null,
    website:
      "https://www2.hse.ie/services/hospitals/nenagh-hospital/departments-services/gynaecology-complex-menopause-service/",
    bookingLink: null,
    openingHours: "Monday to Friday, 9am to 5pm",
    servicesOffered: [
      "Complex menopause assessment",
      "Perimenopause assessment",
      "Menopause treatment review",
      "HRT assessment",
      "Management of treatment side effects",
      "Support for women with complex medical histories",
    ],
    suitableFor: [
      "Women whose menopause treatment has not improved symptoms",
      "Women experiencing ongoing treatment side effects",
      "Women who cannot take standard HRT",
      "Women with complex medical histories",
      "Women experiencing premature or early menopause",
    ],
    sourceUrl:
      "https://www2.hse.ie/services/hospitals/nenagh-hospital/departments-services/gynaecology-complex-menopause-service/",
    lastVerified: "2026-07-30",
  },

  {
    id: "nenagh-ambulatory-gynaecology-unit",
    name: "Ambulatory Gynaecology at Nenagh Hospital",
    country: "Republic of Ireland",
    county: "Tipperary",
    hseRegion: "HSE Mid West",
    type: "Public specialist clinic",
    topic: "Gynaecology",
    topics: [
      "Gynaecology",
      "Abnormal bleeding",
      "Pelvic pain",
      "Menstrual health",
      "Hysteroscopy",
    ],
    speciality:
      "Rapid-access outpatient assessment, investigation and treatment of gynaecological conditions",
    locationName: "Nenagh Hospital",
    address:
      "Nenagh Hospital, Tyone, Nenagh South, Nenagh, County Tipperary, E45 PT86",
    latitude: 52.8645,
    longitude: -8.1967,
    referralRoute:
      "A GP or hospital consultant must submit a referral letter.",
    acceptsSelfReferral: false,
    acceptsGPReferral: true,
    public: true,
    private: false,
    emergencyService: false,
    cost: "Public HSE service",
    phone: "067 423 85",
    email: null,
    website:
      "https://www2.hse.ie/services/hospitals/nenagh-hospital/departments-services/rapid-access-ambulatory-gynaecology-unit/",
    bookingLink: null,
    openingHours: "Monday to Friday, 9am to 5pm",
    servicesOffered: [
      "Outpatient gynaecology assessment",
      "Diagnostic investigations",
      "Treatment planning",
      "Minor outpatient procedures",
      "Assessment of abnormal uterine bleeding",
      "Hysteroscopy where clinically appropriate",
    ],
    suitableFor: [
      "Women referred with gynaecological symptoms",
      "Women experiencing abnormal bleeding",
      "Women requiring outpatient investigation",
      "Women who may need a minor gynaecological procedure",
    ],
    sourceUrl:
      "https://www2.hse.ie/services/hospitals/nenagh-hospital/departments-services/rapid-access-ambulatory-gynaecology-unit/",
    lastVerified: "2026-07-30",
  },

  {
    id: "cork-complex-menopause-service",
    name: "Complex Menopause Service at Cork University Maternity Hospital",
    country: "Republic of Ireland",
    county: "Cork",
    hseRegion: "HSE South West",
    type: "Public specialist clinic",
    topic: "Menopause",
    topics: [
      "Menopause",
      "Perimenopause",
      "Premature ovarian insufficiency",
      "Hormone replacement therapy",
    ],
    speciality:
      "Specialist care for women experiencing complex menopause and perimenopause symptoms",
    locationName: "CUMH Kinsale Road Clinic",
    address:
      "Unit 3, CUMH Kinsale Road Clinic, South Ring Business Park, Kinsale Road, Cork, T12 F88X",
    latitude: 51.8734,
    longitude: -8.4717,
    referralRoute:
      "Specialist menopause services generally require referral from a GP or hospital consultant.",
    acceptsSelfReferral: false,
    acceptsGPReferral: true,
    public: true,
    private: false,
    emergencyService: false,
    cost: "Public HSE service",
    phone: "021 492 0500",
    email: null,
    website:
      "https://www2.hse.ie/services/hospitals/cork-university-maternity-hospital/departments-services/complex-menopause-service/",
    bookingLink: null,
    servicesOffered: [
      "Complex menopause assessment",
      "Perimenopause assessment",
      "HRT review",
      "Management of complex menopause symptoms",
      "Support for premature or early menopause",
    ],
    suitableFor: [
      "Women with complex menopause symptoms",
      "Women whose first-line treatment has not helped",
      "Women unable to use standard HRT",
      "Women with complex medical histories",
    ],
    sourceUrl:
      "https://www2.hse.ie/services/hospitals/cork-university-maternity-hospital/departments-services/complex-menopause-service/",
    lastVerified: "2026-07-30",
  },

  {
    id: "cork-endometriosis-service",
    name: "Endometriosis Service at Cork University Maternity Hospital",
    country: "Republic of Ireland",
    county: "Cork",
    hseRegion: "HSE South West",
    type: "Public specialist clinic",
    topic: "Endometriosis",
    topics: [
      "Endometriosis",
      "Pelvic pain",
      "Painful periods",
      "Gynaecology",
      "Fertility",
    ],
    speciality:
      "Specialist assessment and management of suspected or diagnosed endometriosis",
    locationName: "Cork University Maternity Hospital",
    address:
      "Wilton Road, Wilton, Cork City, County Cork, T12 YE02",
    latitude: 51.883,
    longitude: -8.5124,
    referralRoute:
      "A GP or hospital consultant must refer by letter or through Healthlink.",
    acceptsSelfReferral: false,
    acceptsGPReferral: true,
    public: true,
    private: false,
    emergencyService: false,
    cost: "Public HSE service",
    phone: "021 492 0500",
    email: null,
    website:
      "https://www2.hse.ie/services/hospitals/cork-university-maternity-hospital/departments-services/endometriosis-service-cumh/",
    bookingLink: null,
    openingHours: "Thursday mornings",
    servicesOffered: [
      "Endometriosis assessment",
      "Pelvic pain assessment",
      "Review of suspected endometriosis",
      "Treatment planning",
      "Medical management",
      "Referral for surgery where clinically appropriate",
    ],
    suitableFor: [
      "Women with suspected endometriosis",
      "Women with diagnosed endometriosis",
      "Women experiencing persistent pelvic pain",
      "Women experiencing severe or painful periods",
    ],
    sourceUrl:
      "https://www2.hse.ie/services/hospitals/cork-university-maternity-hospital/departments-services/endometriosis-service-cumh/",
    lastVerified: "2026-07-30",
  },

  {
    id: "sligo-womens-health-after-motherhood",
    name: "Women’s Health After Motherhood at Sligo University Hospital",
    country: "Republic of Ireland",
    county: "Sligo",
    hseRegion: "HSE West and North West",
    type: "Public postnatal support service",
    topic: "Postnatal health",
    topics: [
      "Postnatal health",
      "Maternal wellbeing",
      "Postpartum recovery",
      "Women's health education",
    ],
    speciality:
      "Postnatal women’s health education and support following motherhood",
    locationName: "Sligo University Hospital",
    address:
      "The Mall, Rathquarter, Sligo Town, County Sligo, F91 H684",
    latitude: 54.2766,
    longitude: -8.46,
    referralRoute:
      "Contact the service by email to ask about upcoming classes and booking.",
    acceptsSelfReferral: true,
    acceptsGPReferral: false,
    public: true,
    private: false,
    emergencyService: false,
    cost: "Contact the service for current information",
    phone: null,
    email: "marla.kennedy@hse.ie",
    website:
      "https://www2.hse.ie/services/hospitals/sligo-university-hospital/departments-services/womens-health-after-motherhood/",
    bookingLink: null,
    servicesOffered: [
      "Postnatal health education",
      "Postpartum recovery information",
      "Maternal wellbeing support",
      "Women’s health classes",
    ],
    suitableFor: [
      "Women who have recently given birth",
      "Mothers seeking postnatal health information",
      "Women seeking support after pregnancy and birth",
    ],
    sourceUrl:
      "https://www2.hse.ie/services/hospitals/sligo-university-hospital/departments-services/womens-health-after-motherhood/",
    lastVerified: "2026-07-30",
  },

  {
    id: "drogheda-postnatal-recovery-baby-care",
    name: "Postnatal Recovery and Baby Care at Our Lady of Lourdes Hospital",
    country: "Republic of Ireland",
    county: "Louth",
    hseRegion: "HSE Dublin and North East",
    type: "Public postnatal support service",
    topic: "Postnatal health",
    topics: [
      "Postnatal health",
      "Postpartum recovery",
      "Baby care",
      "Maternal wellbeing",
    ],
    speciality:
      "Postnatal recovery education and practical baby-care support",
    locationName: "Our Lady of Lourdes Hospital Drogheda",
    address:
      "Windmill Road, Moneymore, Drogheda, County Louth, A92 VW28",
    latitude: 53.7188,
    longitude: -6.3475,
    referralRoute:
      "Book directly by phone, text or email.",
    acceptsSelfReferral: true,
    acceptsGPReferral: false,
    public: true,
    private: false,
    emergencyService: false,
    cost: "Contact the service for current information",
    phone: "087 954 3898",
    email: "lourdespregnancyclass@hse.ie",
    website:
      "https://www2.hse.ie/services/hospitals/our-lady-of-lourdes-hospital-drogheda/departments-services/postnatal-recovery-and-baby-care/",
    bookingLink: null,
    servicesOffered: [
      "Postnatal recovery information",
      "Newborn care education",
      "Maternal wellbeing support",
      "Practical baby-care guidance",
    ],
    suitableFor: [
      "New mothers",
      "Women preparing for postnatal recovery",
      "Parents seeking practical newborn-care guidance",
    ],
    sourceUrl:
      "https://www2.hse.ie/services/hospitals/our-lady-of-lourdes-hospital-drogheda/departments-services/postnatal-recovery-and-baby-care/",
    lastVerified: "2026-07-30",
  },
];

const roiSpecialistServices = [
  {
    id: "hse-complex-menopause-national",
    name: "HSE Specialist Complex Menopause Service",
    country: "Republic of Ireland",
    type: "National specialist service",
    topic: "Menopause",
    topics: [
      "Menopause",
      "Perimenopause",
      "Hormone Replacement Therapy",
      "Complex menopause"
    ],
    speciality:
      "Assessment and treatment of women with complex menopause symptoms following GP management.",
    referralRoute:
      "Referral from GP or hospital consultant following unsuccessful first-line management.",
    acceptsSelfReferral: false,
    acceptsGPReferral: true,
    public: true,
    private: false,
    website: "https://www2.hse.ie/conditions/menopause/menopause-treatment/",
    servicesOffered: [
      "Complex menopause assessment",
      "Medication review",
      "HRT advice",
      "Management of treatment complications"
    ],
    suitableFor: [
      "Women with complex menopause",
      "Women who cannot tolerate standard HRT",
      "Women with significant co-existing medical conditions"
    ],
    lastVerified: "2026-07-30"
  },

  {
    id: "hse-endometriosis-services",
    name: "HSE Specialist Endometriosis Services",
    country: "Republic of Ireland",
    type: "Regional specialist service",
    topic: "Endometriosis",
    topics: [
      "Endometriosis",
      "Pelvic pain",
      "Infertility",
      "Gynaecology"
    ],
    speciality:
      "Regional multidisciplinary assessment and treatment of moderate and severe endometriosis.",
    referralRoute:
      "Referral from GP or consultant gynaecologist.",
    acceptsSelfReferral: false,
    acceptsGPReferral: true,
    public: true,
    private: false,
    website:
      "https://www.hse.ie/eng/about/who/acute-hospitals-division/woman-infants/gynaecology/",
    servicesOffered: [
      "Diagnosis",
      "Pelvic pain management",
      "Specialist surgery",
      "Fertility assessment",
      "Multidisciplinary care"
    ],
    suitableFor: [
      "Suspected endometriosis",
      "Confirmed endometriosis",
      "Complex pelvic pain"
    ],
    lastVerified: "2026-07-30"
  },

  {
    id: "hse-ambulatory-gynaecology",
    name: "HSE Ambulatory Gynaecology Clinics",
    country: "Republic of Ireland",
    type: "Regional specialist service",
    topic: "Gynaecology",
    topics: [
      "Gynaecology",
      "Heavy periods",
      "Abnormal bleeding",
      "Hysteroscopy"
    ],
    speciality:
      "One-stop assessment, investigation and treatment clinics.",
    referralRoute:
      "GP referral.",
    acceptsSelfReferral: false,
    acceptsGPReferral: true,
    public: true,
    private: false,
    website:
      "https://about.hse.ie/news/gynaecology-see-and-treat-clinics-reducing-waiting-lists/",
    servicesOffered: [
      "Hysteroscopy",
      "Polyp removal",
      "Abnormal bleeding assessment",
      "One-stop treatment"
    ],
    suitableFor: [
      "Heavy menstrual bleeding",
      "Irregular bleeding",
      "General gynaecology referrals"
    ],
    lastVerified: "2026-07-30"
  },

  {
    id: "hse-fertility-hubs",
    name: "HSE Regional Fertility Hubs",
    country: "Republic of Ireland",
    type: "Regional specialist service",
    topic: "Fertility",
    topics: [
      "Fertility",
      "IVF",
      "Infertility",
      "Reproductive medicine"
    ],
    speciality:
      "Regional fertility assessment and treatment pathways.",
    referralRoute:
      "GP referral.",
    acceptsSelfReferral: false,
    acceptsGPReferral: true,
    public: true,
    private: false,
    website:
      "https://www.hse.ie/eng/about/who/acute-hospitals-division/woman-infants/gynaecology/",
    servicesOffered: [
      "Fertility investigations",
      "Ovulation assessment",
      "Reproductive medicine",
      "Referral for IVF"
    ],
    suitableFor: [
      "Couples experiencing infertility",
      "Women with ovulatory disorders",
      "People requiring fertility investigation"
    ],
    lastVerified: "2026-07-30"
  },

  {
    id: "kerry-womens-health-hub",
    name: "Kerry Women's Health Hub",
    country: "Republic of Ireland",
    county: "Kerry",
    type: "Women's Health Hub",
    topic: "Women's Health",
    topics: [
      "Women's Health",
      "Pregnancy",
      "Postnatal",
      "Pelvic Health",
      "Gynaecology"
    ],
    speciality:
      "Integrated women's healthcare delivered through a multidisciplinary team.",
    locationName: "Tralee",
    referralRoute:
      "GP and healthcare professional referral.",
    acceptsSelfReferral: false,
    acceptsGPReferral: true,
    public: true,
    private: false,
    website:
      "https://about.hse.ie/news/womens-health-hub-opening-heralds-a-new-era-for-accessible-care-in-kerry/",
    servicesOffered: [
      "Women's health physiotherapy",
      "Postnatal hub",
      "Midwifery clinics",
      "Infant feeding support",
      "Ambulatory gynaecology",
      "Colposcopy"
    ],
    suitableFor: [
      "Women across the life course"
    ],
    lastVerified: "2026-07-30"
  },
];

const roiAmbulatoryGynaecologyServices = [
  {
    id: "galway-ambulatory-gynaecology",
    name: "Galway Ambulatory Gynaecology Clinic",
    county: "Galway",
    country: "Republic of Ireland",
    hseRegion: "HSE West and North West",
    type: "Ambulatory Gynaecology Clinic",
    topic: "Gynaecology",
    topics: [
      "Gynaecology",
      "Heavy menstrual bleeding",
      "Abnormal bleeding",
      "Hysteroscopy"
    ],
    public: true,
    private: false,
    acceptsGPReferral: true,
    acceptsSelfReferral: false,
    website: "https://www.saolta.ie",
    locationName: "University Hospital Galway",
    lastVerified: "2026-07-30"
  },

  {
    id: "cork-ambulatory-gynaecology",
    name: "Cork Ambulatory Gynaecology Clinic",
    county: "Cork",
    country: "Republic of Ireland",
    hseRegion: "HSE South West",
    type: "Ambulatory Gynaecology Clinic",
    topic: "Gynaecology",
    topics: ["Gynaecology","Heavy periods","Outpatient procedures"],
    public: true,
    private: false,
    acceptsGPReferral: true,
    acceptsSelfReferral: false,
    website: "https://www.cuh.hse.ie",
    locationName: "Cork University Maternity Hospital",
    lastVerified: "2026-07-30"
  },

  {
    id: "waterford-ambulatory-gynaecology",
    name: "Waterford Ambulatory Gynaecology Clinic",
    county: "Waterford",
    country: "Republic of Ireland",
    hseRegion: "HSE Dublin and South East",
    type: "Ambulatory Gynaecology Clinic",
    topic: "Gynaecology",
    topics: ["Gynaecology","Abnormal bleeding"],
    public: true,
    private: false,
    acceptsGPReferral: true,
    acceptsSelfReferral: false,
    website: "https://www2.hse.ie",
    locationName: "University Hospital Waterford",
    lastVerified: "2026-07-30"
  },

  {
    id: "wexford-ambulatory-gynaecology",
    name: "Wexford Ambulatory Gynaecology Clinic",
    county: "Wexford",
    country: "Republic of Ireland",
    hseRegion: "HSE Dublin and South East",
    type: "Ambulatory Gynaecology Clinic",
    topic: "Gynaecology",
    topics: ["Gynaecology","Heavy periods"],
    public: true,
    private: false,
    acceptsGPReferral: true,
    acceptsSelfReferral: false,
    website: "https://www2.hse.ie",
    locationName: "Wexford General Hospital",
    lastVerified: "2026-07-30"
  },

  {
    id: "kerry-ambulatory-gynaecology",
    name: "Kerry Ambulatory Gynaecology Clinic",
    county: "Kerry",
    country: "Republic of Ireland",
    hseRegion: "HSE South West",
    type: "Ambulatory Gynaecology Clinic",
    topic: "Gynaecology",
    topics: ["Gynaecology","Women's Health"],
    public: true,
    private: false,
    acceptsGPReferral: true,
    acceptsSelfReferral: false,
    website: "https://about.hse.ie/news/womens-health-hub-opening-heralds-a-new-era-for-accessible-care-in-kerry/",
    locationName: "Kerry Women's Health Hub",
    lastVerified: "2026-07-30"
  }
];

const roiComplexMenopauseServices = [
  {
    id: "national-maternity-hospital-complex-menopause-service",
    name: "National Maternity Hospital Complex Menopause Service",
    organisation: "National Maternity Hospital",
    country: "Republic of Ireland",
    county: "Dublin",
    city: "Dublin",
    hseRegion: "HSE Dublin and South East",
    type: "Complex Menopause Clinic",
    topic: "Menopause",
    topics: [
      "Menopause",
      "Perimenopause",
      "Premature ovarian insufficiency",
      "Surgical menopause",
      "Complex menopause",
      "Hormone replacement therapy"
    ],
    speciality:
      "Specialist assessment and management for patients whose menopause care is complicated by significant medical conditions, treatment risks or persistent symptoms.",
    address: {
      line1: "National Maternity Hospital",
      line2: "Holles Street",
      city: "Dublin",
      county: "Dublin",
      postcode: "D02 YH21",
      country: "Republic of Ireland"
    },
    coordinates: {
      latitude: 53.3416,
      longitude: -6.2458
    },
    phone: "01 637 3504",
    email: "menopauseclinic@nmh.ie",
    website: "https://nmh.ie/gynaecology/gynaecology-services/menopause/",
    bookingUrl:
      "https://nmh.ie/refer-a-patient/complex-menopause-clinic-referral-information/",
    referralRoute:
      "A GP or hospital consultant must submit a referral that explains the patient's menopause symptoms, relevant medical conditions, previous treatments and reason specialist care is required.",
    referralInformation:
      "The service is intended for complex cases rather than routine menopause care. Published eligibility includes troublesome menopause symptoms alongside co-morbidities that make hormone replacement therapy or other treatment more complicated.",
    acceptsSelfReferral: false,
    acceptsGPReferral: true,
    acceptsConsultantReferral: true,
    public: true,
    private: false,
    cost: "Public HSE service",
    openingHours: null,
    servicesOffered: [
      "Specialist menopause assessment",
      "Review of complex medical history",
      "Hormone replacement therapy assessment",
      "Non-hormonal treatment options",
      "Management of premature menopause",
      "Management of surgical menopause",
      "Medication and treatment review",
      "Individualised menopause care plan"
    ],
    suitableFor: [
      "Patients with persistent or severe menopause symptoms",
      "Patients with significant co-existing medical conditions",
      "Patients for whom standard hormone replacement therapy may be unsuitable",
      "Patients with premature ovarian insufficiency",
      "Patients experiencing surgical or medically induced menopause"
    ],
    accessibilityNotes:
      "Contact the hospital before attending to confirm any individual accessibility requirements.",
    sourceUrl:
      "https://nmh.ie/refer-a-patient/complex-menopause-clinic-referral-information/",
    additionalSourceUrls: [
      "https://nmh.ie/gynaecology/gynaecology-services/menopause/",
      "https://www2.hse.ie/conditions/menopause/menopause-treatment/"
    ],
    lastVerified: "2026-07-30"
  },

  {
    id: "rotunda-hospital-complex-menopause-clinic",
    name: "Rotunda Hospital Menopause Clinic",
    organisation: "Rotunda Hospital",
    country: "Republic of Ireland",
    county: "Dublin",
    city: "Dublin",
    hseRegion: "HSE Dublin and North East",
    type: "Complex Menopause Clinic",
    topic: "Menopause",
    topics: [
      "Menopause",
      "Perimenopause",
      "Complex menopause",
      "Premature ovarian insufficiency",
      "Surgical menopause",
      "Hormone replacement therapy"
    ],
    speciality:
      "Specialist public menopause service for patients with complex health needs that make menopause management in primary care more difficult.",
    address: {
      line1: "Rotunda Hospital",
      line2: "Parnell Square East",
      city: "Dublin",
      county: "Dublin",
      postcode: "D01 P5W9",
      country: "Republic of Ireland"
    },
    coordinates: {
      latitude: 53.3526,
      longitude: -6.2636
    },
    phone: "01 817 1700",
    email: null,
    website: "https://rotunda.ie/menopause-clinic/",
    bookingUrl: "https://rotunda.ie/menopause-clinic/",
    referralRoute:
      "Referral is required from a GP or relevant hospital specialist. Referrals are clinically triaged to confirm that the patient meets the complex menopause service criteria.",
    referralInformation:
      "The clinic does not provide routine menopause management that can safely be delivered in primary care. It prioritises patients with complex medical histories, contraindications, treatment complications or specialist menopause needs.",
    acceptsSelfReferral: false,
    acceptsGPReferral: true,
    acceptsConsultantReferral: true,
    public: true,
    private: false,
    cost: "Public HSE service",
    openingHours: null,
    servicesOffered: [
      "Complex menopause assessment",
      "Specialist medical review",
      "Hormone replacement therapy assessment",
      "Non-hormonal menopause treatment",
      "Management of early menopause",
      "Management of surgical menopause",
      "Review of treatment risks and contraindications",
      "Individualised treatment planning"
    ],
    suitableFor: [
      "Patients with complex menopause symptoms",
      "Patients with medical conditions affecting treatment choices",
      "Patients who have not responded to primary-care treatment",
      "Patients with premature ovarian insufficiency",
      "Patients experiencing menopause following surgery or medical treatment"
    ],
    accessibilityNotes:
      "The clinic is located within the hospital's gynaecology department. Contact the hospital before attending for detailed accessibility information.",
    sourceUrl: "https://rotunda.ie/menopause-clinic/",
    additionalSourceUrls: [
      "https://www2.hse.ie/conditions/menopause/menopause-treatment/"
    ],
    lastVerified: "2026-07-30"
  },

  {
    id: "coombe-hospital-complex-menopause-clinic",
    name: "The Coombe Hospital Complex Menopause Clinic",
    organisation: "The Coombe Hospital",
    country: "Republic of Ireland",
    county: "Dublin",
    city: "Dublin",
    hseRegion: "HSE Dublin and Midlands",
    type: "Complex Menopause Clinic",
    topic: "Menopause",
    topics: [
      "Menopause",
      "Perimenopause",
      "Complex menopause",
      "Hormone replacement therapy",
      "Cancer and menopause",
      "Premature menopause"
    ],
    speciality:
      "Specialist menopause care for patients with serious medical conditions or other clinical factors that make the management of menopause symptoms more complex.",
    address: {
      line1: "The Coombe Hospital",
      line2: "Cork Street",
      city: "Dublin",
      county: "Dublin",
      postcode: "D08 XW7X",
      country: "Republic of Ireland"
    },
    coordinates: {
      latitude: 53.3347,
      longitude: -6.2965
    },
    phone: "01 408 5031",
    email: "gynae@coombe.ie",
    website: "https://www.coombe.ie/complex-menopause",
    bookingUrl: "https://www.coombe.ie/complex-menopause",
    referralRoute:
      "A GP referral is required. Referrals are accepted for patients who satisfy the clinic's complex-care criteria and live within its published catchment area.",
    referralInformation:
      "The clinic currently publishes a catchment covering Dublin postal districts 8, 10, 12, 20, 22 and 24, together with Kildare, Laois, Offaly, Westmeath and West Wicklow. Eligibility should be confirmed before referral because catchment arrangements may change.",
    catchmentAreas: [
      "Dublin 8",
      "Dublin 10",
      "Dublin 12",
      "Dublin 20",
      "Dublin 22",
      "Dublin 24",
      "Kildare",
      "Laois",
      "Offaly",
      "Westmeath",
      "West Wicklow"
    ],
    acceptsSelfReferral: false,
    acceptsGPReferral: true,
    acceptsConsultantReferral: false,
    public: true,
    private: false,
    cost: "Public HSE service",
    openingHours: null,
    servicesOffered: [
      "Complex menopause consultation",
      "Assessment of menopause symptoms",
      "Review of serious co-existing medical conditions",
      "Hormone replacement therapy assessment",
      "Non-hormonal treatment options",
      "Management of treatment-related menopause",
      "Individualised risk assessment",
      "Ongoing specialist care planning"
    ],
    suitableFor: [
      "Patients with serious medical conditions affecting menopause treatment",
      "Patients with complex or persistent menopause symptoms",
      "Patients requiring specialist hormone replacement therapy advice",
      "Patients with contraindications or elevated treatment risks",
      "Eligible patients living within the clinic's referral catchment"
    ],
    accessibilityNotes:
      "Contact the hospital directly for information about accessible entrances, parking and assistance within the hospital.",
    sourceUrl: "https://www.coombe.ie/complex-menopause",
    additionalSourceUrls: [
      "https://www.coombe.ie/home/womens-health",
      "https://www2.hse.ie/conditions/menopause/menopause-treatment/"
    ],
    lastVerified: "2026-07-30"
  },

  {
    id: "university-hospital-galway-complex-menopause-clinic",
    name: "University Hospital Galway Complex Menopause Clinic",
    organisation: "University Hospital Galway",
    country: "Republic of Ireland",
    county: "Galway",
    city: "Galway",
    hseRegion: "HSE West and North West",
    type: "Complex Menopause Clinic",
    topic: "Menopause",
    topics: [
      "Menopause",
      "Perimenopause",
      "Complex menopause",
      "Hormone replacement therapy",
      "Premature ovarian insufficiency",
      "Surgical menopause"
    ],
    speciality:
      "Regional specialist service for patients whose additional medical needs make menopause assessment or treatment more complex.",
    address: {
      line1: "University Hospital Galway",
      line2: "Newcastle Road",
      city: "Galway",
      county: "Galway",
      postcode: "H91 YR71",
      country: "Republic of Ireland"
    },
    coordinates: {
      latitude: 53.2769,
      longitude: -9.0659
    },
    phone: "091 524 222",
    email: null,
    website: "https://www2.hse.ie/conditions/menopause/menopause-treatment/",
    bookingUrl: null,
    referralRoute:
      "Referral is required from a GP or hospital specialist. Referrals are assessed to determine whether the patient's needs require regional complex menopause care.",
    referralInformation:
      "The service is intended for patients with additional or complex needs rather than those who can be appropriately managed through routine GP menopause care.",
    acceptsSelfReferral: false,
    acceptsGPReferral: true,
    acceptsConsultantReferral: true,
    public: true,
    private: false,
    cost: "Public HSE service",
    openingHours: null,
    servicesOffered: [
      "Specialist menopause assessment",
      "Complex medical-history review",
      "Hormone replacement therapy assessment",
      "Non-hormonal treatment planning",
      "Management of premature menopause",
      "Management of surgical or treatment-induced menopause",
      "Review of treatment contraindications",
      "Individualised menopause management"
    ],
    suitableFor: [
      "Patients with complex menopause symptoms",
      "Patients with co-existing medical conditions",
      "Patients requiring specialist treatment-risk assessment",
      "Patients who cannot be managed adequately in primary care",
      "Patients with premature, surgical or medically induced menopause"
    ],
    accessibilityNotes:
      "Contact University Hospital Galway before attending to confirm clinic location and individual accessibility arrangements.",
    sourceUrl:
      "https://www2.hse.ie/conditions/menopause/menopause-treatment/",
    additionalSourceUrls: [
      "https://www.saolta.ie/hospital/university-hospital-galway"
    ],
    lastVerified: "2026-07-30"
  }
];
export const serviceDatabase = [
  ...roiMaternityServices,
  ...roiWomensHealthServices,
  ...roiSpecialistServices,
  ...roiAmbulatoryGynaecologyServices,
  ...roiComplexMenopauseServices,
];