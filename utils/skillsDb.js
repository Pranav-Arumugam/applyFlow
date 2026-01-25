const TECH_SKILLS = [
  // Programming Languages
  "python",
  "java",
  "javascript",
  "typescript",
  "c",
  "c++",
  "c#",
  "go",
  "rust",
  "ruby",
  "php",
  "swift",
  "kotlin",
  "scala",
  "r",
  "matlab",
  "perl",
  "dart",

  // Web Technologies
  "html",
  "css",
  "react",
  "angular",
  "vue",
  "node.js",
  "django",
  "flask",
  "spring",
  "laravel",
  "nextjs",
  "express",
  "tailwind",
  "bootstrap",

  // Databases
  "sql",
  "mysql",
  "postgresql",
  "mongodb",
  "redis",
  "oracle",
  "cassandra",
  "elasticsearch",
  "firebase",
  "dynamodb",

  // Cloud & DevOps
  "aws",
  "azure",
  "gcp",
  "docker",
  "kubernetes",
  "terraform",
  "jenkins",
  "git",
  "github",
  "gitlab",
  "ci/cd",
  "ansible",
  "linux",
  "nginx",

  // Data Science & AI
  "machine-learning",
  "deep-learning",
  "tensorflow",
  "pytorch",
  "pandas",
  "numpy",
  "nlp",
  "computer-vision",
  "data-analysis",
  "statistics",
]

// ===== BUSINESS & FINANCE =====
const BUSINESS_SKILLS = [
  // General Business
  "business-analysis",
  "strategic-planning",
  "business-development",
  "market-research",
  "competitive-analysis",
  "business-intelligence",
  "kpi-tracking",
  "roi-analysis",
  "swot-analysis",
  "stakeholder-management",

  // Finance & Accounting
  "financial-analysis",
  "budgeting",
  "forecasting",
  "financial-modeling",
  "accounting",
  "bookkeeping",
  "gaap",
  "ifrs",
  "tax-preparation",
  "financial-reporting",
  "accounts-payable",
  "accounts-receivable",
  "cost-accounting",
  "variance-analysis",
  "cash-flow-management",
  "financial-planning",
  "investment-analysis",
  "risk-management",
  "audit",
  "compliance",
  "sarbanes-oxley",
  "quickbooks",
  "sap",
  "oracle-financials",

  // Economics
  "economics",
  "econometrics",
  "microeconomics",
  "macroeconomics",
  "monetary-policy",
  "fiscal-policy",
  "economic-forecasting",
]

// ===== MARKETING & SALES =====
const MARKETING_SKILLS = [
  // Digital Marketing
  "digital-marketing",
  "seo",
  "sem",
  "social-media-marketing",
  "content-marketing",
  "email-marketing",
  "ppc",
  "google-ads",
  "facebook-ads",
  "instagram-marketing",
  "linkedin-marketing",
  "marketing-automation",
  "hubspot",
  "mailchimp",
  "google-analytics",

  // Traditional Marketing
  "brand-management",
  "market-research",
  "consumer-behavior",
  "campaign-management",
  "public-relations",
  "advertising",
  "copywriting",
  "creative-strategy",
  "media-planning",

  // Sales
  "sales",
  "business-development",
  "lead-generation",
  "cold-calling",
  "negotiation",
  "account-management",
  "crm",
  "salesforce",
  "pipedrive",
  "sales-forecasting",
  "b2b-sales",
  "b2c-sales",
  "consultative-selling",
  "closing-techniques",
]

// ===== DESIGN & CREATIVE =====
const DESIGN_SKILLS = [
  // Graphic Design
  "graphic-design",
  "adobe-photoshop",
  "adobe-illustrator",
  "adobe-indesign",
  "figma",
  "sketch",
  "canva",
  "typography",
  "color-theory",
  "layout-design",
  "brand-identity",

  // UI/UX Design
  "ui-design",
  "ux-design",
  "user-research",
  "wireframing",
  "prototyping",
  "usability-testing",
  "interaction-design",
  "information-architecture",
  "design-systems",
  "accessibility",

  // Video & Animation
  "video-editing",
  "adobe-premiere",
  "adobe-after-effects",
  "final-cut-pro",
  "motion-graphics",
  "animation",
  "3d-modeling",
  "blender",
  "maya",
  "cinema-4d",
]

// ===== HEALTHCARE & MEDICAL =====
const HEALTHCARE_SKILLS = [
  // Clinical
  "patient-care",
  "clinical-assessment",
  "vital-signs",
  "medication-administration",
  "wound-care",
  "phlebotomy",
  "iv-therapy",
  "cpr",
  "bls",
  "acls",
  "telemetry",
  "emergency-medicine",
  "critical-care",
  "surgical-assistance",

  // Medical Specialties
  "cardiology",
  "neurology",
  "pediatrics",
  "oncology",
  "radiology",
  "anesthesiology",
  "psychiatry",
  "orthopedics",
  "obstetrics",
  "gynecology",

  // Healthcare Administration
  "hipaa",
  "medical-coding",
  "icd-10",
  "cpt",
  "medical-billing",
  "ehr",
  "epic",
  "cerner",
  "healthcare-compliance",
  "quality-improvement",

  // Pharmacy
  "pharmacology",
  "medication-dispensing",
  "drug-interactions",
  "pharmacy-management",
  "compounding",
]

// ===== EDUCATION & TRAINING =====
const EDUCATION_SKILLS = [
  // Teaching
  "curriculum-development",
  "lesson-planning",
  "classroom-management",
  "differentiated-instruction",
  "assessment",
  "student-engagement",
  "educational-technology",
  "special-education",
  "esl",
  "tutoring",

  // Training & Development
  "training",
  "instructional-design",
  "e-learning",
  "lms",
  "articulate",
  "captivate",
  "training-evaluation",
  "needs-assessment",
  "adult-learning",
  "onboarding",
  "talent-development",
]

// ===== ENGINEERING (Non-Software) =====
const ENGINEERING_SKILLS = [
  // Mechanical Engineering
  "cad",
  "autocad",
  "solidworks",
  "catia",
  "mechanical-design",
  "thermodynamics",
  "fluid-mechanics",
  "manufacturing",
  "quality-control",
  "six-sigma",
  "lean-manufacturing",
  "process-improvement",

  // Electrical Engineering
  "circuit-design",
  "pcb-design",
  "embedded-systems",
  "plc",
  "scada",
  "electrical-testing",
  "power-systems",
  "control-systems",

  // Civil Engineering
  "structural-engineering",
  "construction-management",
  "project-management",
  "civil-3d",
  "surveying",
  "geotechnical",
  "transportation-engineering",

  // Chemical Engineering
  "process-engineering",
  "chemical-processes",
  "process-optimization",
  "quality-assurance",
  "safety-management",
]

// ===== HUMAN RESOURCES =====
const HR_SKILLS = [
  "recruitment",
  "talent-acquisition",
  "onboarding",
  "employee-relations",
  "performance-management",
  "compensation",
  "benefits-administration",
  "hris",
  "workday",
  "adp",
  "talent-management",
  "succession-planning",
  "diversity-inclusion",
  "labor-relations",
  "employment-law",
  "organizational-development",
  "training-development",
  "hr-compliance",
]

// ===== OPERATIONS & LOGISTICS =====
const OPERATIONS_SKILLS = [
  "supply-chain-management",
  "logistics",
  "inventory-management",
  "warehouse-management",
  "procurement",
  "vendor-management",
  "operations-management",
  "process-optimization",
  "lean",
  "six-sigma",
  "project-management",
  "quality-assurance",
  "shipping",
  "receiving",
  "erp",
  "sap",
  "oracle-scm",
  "demand-planning",
  "forecasting",
]

// ===== LEGAL =====
const LEGAL_SKILLS = [
  "legal-research",
  "contract-law",
  "litigation",
  "corporate-law",
  "intellectual-property",
  "patent-law",
  "trademark",
  "compliance",
  "regulatory-affairs",
  "legal-writing",
  "contract-negotiation",
  "due-diligence",
  "legal-analysis",
  "westlaw",
  "lexisnexis",
]

// ===== CUSTOMER SERVICE =====
const CUSTOMER_SERVICE_SKILLS = [
  "customer-service",
  "customer-support",
  "customer-success",
  "technical-support",
  "helpdesk",
  "ticketing-systems",
  "zendesk",
  "freshdesk",
  "customer-retention",
  "complaint-resolution",
  "call-center",
  "phone-support",
  "email-support",
  "chat-support",
  "customer-relationship-management",
]

// ===== SOFT SKILLS (Cross-Domain) =====
const SOFT_SKILLS = [
  "communication",
  "teamwork",
  "leadership",
  "problem-solving",
  "critical-thinking",
  "time-management",
  "organization",
  "adaptability",
  "collaboration",
  "presentation",
  "public-speaking",
  "negotiation",
  "conflict-resolution",
  "decision-making",
  "analytical-thinking",
  "attention-to-detail",
  "multitasking",
  "self-motivation",
  "creativity",
  "emotional-intelligence",
  "interpersonal-skills",
  "work-ethic",
]

// ===== RESEARCH & SCIENCE =====
const RESEARCH_SKILLS = [
  "research",
  "literature-review",
  "data-collection",
  "experimental-design",
  "statistical-analysis",
  "spss",
  "r-programming",
  "lab-techniques",
  "microscopy",
  "chromatography",
  "spectroscopy",
  "molecular-biology",
  "cell-culture",
  "pcr",
  "western-blot",
  "elisa",
  "grant-writing",
  "scientific-writing",
  "peer-review",
]

// ===== HOSPITALITY & CULINARY =====
const HOSPITALITY_SKILLS = [
  // Hospitality
  "hospitality",
  "guest-services",
  "hotel-management",
  "front-desk",
  "reservations",
  "concierge",
  "event-planning",
  "food-service",

  // Culinary
  "culinary",
  "food-preparation",
  "cooking",
  "baking",
  "pastry",
  "menu-planning",
  "food-safety",
  "haccp",
  "servsafe",
  "kitchen-management",
  "recipe-development",
  "plating",
  "wine-knowledge",
  "mixology",
]

// ===== MEDIA & JOURNALISM =====
const MEDIA_SKILLS = [
  "journalism",
  "reporting",
  "investigative-journalism",
  "news-writing",
  "editing",
  "proofreading",
  "ap-style",
  "fact-checking",
  "interviewing",
  "broadcast-journalism",
  "photography",
  "photojournalism",
  "video-journalism",
  "social-media",
  "content-creation",
  "storytelling",
]

// ===== REAL ESTATE =====
const REAL_ESTATE_SKILLS = [
  "real-estate",
  "property-management",
  "leasing",
  "sales",
  "market-analysis",
  "property-valuation",
  "negotiations",
  "contract-management",
  "tenant-relations",
  "mls",
  "real-estate-law",
]

// ===== MANUFACTURING & PRODUCTION =====
const MANUFACTURING_SKILLS = [
  "manufacturing",
  "production",
  "assembly",
  "quality-control",
  "cnc-machining",
  "welding",
  "fabrication",
  "tooling",
  "production-planning",
  "capacity-planning",
  "materials-management",
  "gmp",
  "iso-9001",
  "kaizen",
  "5s",
  "root-cause-analysis",
]
//by category
export const SKILLS_BY_CATEGORY = {
  technology: TECH_SKILLS,
  business: BUSINESS_SKILLS,
  marketing: MARKETING_SKILLS,
  design: DESIGN_SKILLS,
  healthcare: HEALTHCARE_SKILLS,
  education: EDUCATION_SKILLS,
  engineering: ENGINEERING_SKILLS,
  hr: HR_SKILLS,
  operations: OPERATIONS_SKILLS,
  legal: LEGAL_SKILLS,
  customerService: CUSTOMER_SERVICE_SKILLS,
  soft: SOFT_SKILLS,
  research: RESEARCH_SKILLS,
  hospitality: HOSPITALITY_SKILLS,
  media: MEDIA_SKILLS,
  realEstate: REAL_ESTATE_SKILLS,
  manufacturing: MANUFACTURING_SKILLS,
}

// all master list of skills

export const ALL_SKILLS = [
  ...TECH_SKILLS,
  ...BUSINESS_SKILLS,
  ...MARKETING_SKILLS,
  ...DESIGN_SKILLS,
  ...HEALTHCARE_SKILLS,
  ...EDUCATION_SKILLS,
  ...ENGINEERING_SKILLS,
  ...HR_SKILLS,
  ...OPERATIONS_SKILLS,
  ...LEGAL_SKILLS,
  ...CUSTOMER_SERVICE_SKILLS,
  ...SOFT_SKILLS,
  ...RESEARCH_SKILLS,
  ...HOSPITALITY_SKILLS,
  ...MEDIA_SKILLS,
  ...REAL_ESTATE_SKILLS,
  ...MANUFACTURING_SKILLS,
]

export const getSkillsByCategories = (categories) => {
  return categories.flatMap((cat) => SKILLS_BY_CATEGORY[cat] || [])
}

export const searchSkills = (query) => {
  const lowerQuery = query.toLowerCase()
  return ALL_SKILLS.filter((skill) => skill.toLowerCase().includes(lowerQuery))
}

export const getSkillCategory = (skill) => {
  const lowerSkill = skill.toLowerCase()

  for (const [category, skills] of Object.entries(SKILLS_BY_CATEGORY)) {
    if (skills.includes(lowerSkill)) {
      return category
    }
  }

  return null
}
