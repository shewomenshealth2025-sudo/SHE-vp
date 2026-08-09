const sources = [
  { title: "NHS — Going into hospital as a patient", url: "https://www.nhs.uk/nhs-services/hospitals/going-into-hospital/going-into-hospital-as-a-patient/" },
  { title: "NHS — Consent to treatment", url: "https://www.nhs.uk/tests-and-treatments/consent-to-treatment/" },
  { title: "HSE — Find hospitals and services", url: "https://www2.hse.ie/services/hospitals/" },
  { title: "HSE — Health App appointments and referrals", url: "https://www2.hse.ie/health-app/about-your-hse-health-app/" },
];

const specs = [
  ["how-hospitals-work", "How Hospitals Work: Departments, Teams and Care Pathways", "Hospitals organise care through emergency, outpatient, diagnostic, day-case, inpatient and specialist services, with different teams responsible at each stage."],
  ["hospital-types", "Types of Hospital and What They Provide", "Local, general, university, specialist and maternity hospitals provide different levels of emergency, diagnostic, surgical and specialist care, so not every service is available at every site."],
  ["emergency-department-explained", "Emergency Departments: Triage, Waiting and Assessment", "Emergency departments prioritise people by clinical urgency rather than arrival order, beginning with triage before examination, tests, treatment, admission or discharge."],
  ["urgent-care-vs-emergency", "Urgent Care vs the Emergency Department", "Urgent-care services manage problems needing prompt attention but not full emergency-hospital resources, while severe or life-threatening symptoms require an emergency department or ambulance."],
  ["hospital-referrals", "How a Hospital Referral Works", "A GP or other clinician sends clinical information to a hospital service, where the referral is reviewed, prioritised and either accepted, redirected, returned for more information or placed on a waiting list."],
  ["outpatient-appointments", "What Happens at an Outpatient Appointment", "Outpatients attend hospital without staying overnight for specialist assessment, examination, treatment planning or follow-up and may be seen by a doctor, nurse or allied-health professional."],
  ["inpatient-admission", "What It Means to Be Admitted as an Inpatient", "An inpatient admission means staying in a hospital bed for monitoring, treatment or recovery, with daily reviews, medicine administration, nursing care and discharge planning."],
  ["day-case-hospital-care", "Day-Case Procedures and Same-Day Discharge", "Day-case patients are formally admitted for a procedure and use a hospital bed but are expected to leave the same day after meeting recovery and safety criteria."],
  ["preoperative-assessment", "Pre-Assessment Before an Operation", "Pre-assessment reviews health conditions, medicines, allergies, anaesthetic risk, home support and practical instructions such as fasting and which medicines to take or pause."],
  ["gynaecology-outpatient-clinic", "Inside a Gynaecology Outpatient Clinic", "A gynaecology clinic may review bleeding, pain, vulval, ovarian, fertility or menopause concerns through history-taking, examination and plans for scans, tests, treatment or procedures."],
  ["early-pregnancy-assessment-unit", "Early Pregnancy Assessment Units", "Early pregnancy units assess pain, bleeding, pregnancy location and viability using history, examination, ultrasound and sometimes repeat hCG blood tests."],
  ["maternity-triage", "Maternity Triage: When and How to Contact It", "Maternity triage provides urgent pregnancy assessment for concerns such as bleeding, reduced movement, severe pain, waters breaking, contractions, headache or feeling acutely unwell."],
  ["antenatal-clinic", "What Happens in an Antenatal Clinic", "Antenatal clinics monitor pregnancy through blood pressure, urine testing, growth assessment, blood tests, scans and specialist review according to individual risk and gestation."],
  ["labour-ward-delivery-suite", "Labour Ward and Delivery Suite Explained", "A labour ward or delivery suite cares for people during labour, birth and immediate recovery, with midwives leading care and obstetric, anaesthetic and neonatal teams available when needed."],
  ["gynaecology-procedure-unit", "Hospital Gynaecology Procedure Units", "Procedure units may provide colposcopy, hysteroscopy, biopsy, coil procedures or minor surgery without an overnight stay, using local anaesthetic, sedation or other pain relief as appropriate."],
  ["hospital-tests-results", "Hospital Tests, Scans and Results", "Tests may be completed before, during or after a clinic visit, and results can be given immediately, by letter, electronically, through a GP or at a follow-up appointment."],
  ["hospital-team-roles", "Who Is Who in a Hospital Team?", "Hospital care can involve consultants, registrars, junior doctors, midwives, nurses, healthcare assistants, pharmacists, physiotherapists, radiographers and other specialists with distinct responsibilities."],
  ["hospital-consent-chaperones", "Consent, Intimate Examinations and Chaperones", "Valid consent must be voluntary and informed, and patients can ask questions, request a chaperone, pause an examination or withdraw consent before or during non-emergency care."],
  ["hospital-records-letters", "Hospital Letters, Medical Records and Information Sharing", "Hospitals record assessments and treatment, usually send correspondence to the referring clinician and allow patients to request access to records under applicable information law."],
  ["hospital-discharge", "Hospital Discharge and Safety-Netting", "Discharge planning should explain diagnoses, medicine changes, wound or activity advice, follow-up, pending results and exactly who to contact if symptoms worsen."],
  ["hospital-waiting-lists", "Hospital Waiting Lists and Clinical Priority", "Waiting times depend on clinical urgency, service capacity and pathway rules; worsening symptoms should be reported because a referral can sometimes require reassessment or reprioritisation."],
  ["missed-cancelled-appointments", "Cancelled or Missed Hospital Appointments", "Patients should contact the hospital promptly if they cannot attend or if an appointment is cancelled, because local rules determine rebooking and whether a new referral is required."],
  ["second-opinion-hospital", "Asking for a Second Opinion", "A second opinion is another clinician’s assessment of a diagnosis or treatment plan; access is not always automatic, but concerns can be discussed with the current consultant or referring clinician."],
  ["hospital-advocacy-complaints", "Patient Advocacy, Feedback and Hospital Complaints", "Patient liaison or advocacy services can help with communication, accessibility, concerns and complaints without replacing urgent clinical escalation when someone is becoming more unwell."],
  ["preparing-specialist-appointment", "Preparing for a Hospital Specialist Appointment", "A concise symptom timeline, medicine list, relevant records and prioritised questions help a specialist understand what has changed and what outcome matters most to the patient."],
  ["hospital-accessibility-support", "Accessibility, Interpreters and Support People in Hospital", "Patients can tell the hospital about mobility, sensory, communication, learning, language, trauma-informed or support-person needs so reasonable arrangements can be planned in advance."],
];

function createGuide([id, title, summary]) {
  return {
    id, slug: id, title, category: "Hospitals and healthcare navigation", readTime: 8, summary,
    quickFacts: [summary, "Names and pathways vary between hospitals, Northern Ireland, Ireland and Great Britain.", "Appointment letters and the hospital’s own instructions take priority for practical details."],
    symptoms: ["hospital referral questions", "appointment uncertainty", "care pathway confusion", "need for practical preparation"],
    causes: ["The route through hospital depends on clinical urgency, specialty, tests required and whether care is emergency, planned or follow-up.", "Local staffing, facilities and referral rules determine which site or team provides each part of care."],
    riskFactors: ["Communication barriers, disability, language needs, transport, caring responsibilities and fragmented records can make hospital care harder to navigate.", "Worsening symptoms while waiting can change clinical priority and should be reported rather than saved for the eventual appointment."],
    diagnosis: ["Hospital teams review the referral and then combine history, examination, observations and targeted tests to decide the next step.", "Not every appointment results in a diagnosis; the outcome may be further testing, treatment, surveillance, another referral or discharge."],
    treatments: ["Care may be advice, medication, a procedure, surgery, rehabilitation, monitoring or referral to another team.", "The patient should receive an explanation of benefits, material risks, reasonable alternatives and what happens if treatment is declined."],
    selfCare: ["Bring an up-to-date medicine list, relevant letters, symptom timeline and the questions you most want answered.", "Check the location, time, fasting or medicine instructions and transport arrangements before attending."],
    whenToSeeGP: ["You need a referral, symptoms have changed while waiting or you do not understand the hospital plan.", "You need help coordinating results, medicines, fit notes or follow-up after discharge."],
    emergencySigns: ["Do not wait for a routine appointment if you develop severe breathing difficulty, collapse, stroke symptoms, uncontrolled bleeding, sudden severe pain or serious pregnancy warning signs."],
    sources, clinicalReviewer: null, lastReviewed: "9 August 2026", reviewed: "9 August 2026", version: 1,
  };
}

export const hospitalNavigationConditions = specs.map(createGuide);
