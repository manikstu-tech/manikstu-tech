// Content for the Teams, Investors and Partners pages, taken from manikstu.com/about, /investors and /collaborate.

export type Person = {
  name: string
  role: string
  bio: string
  // File under manikstu.com/team
  photo: string
}

export const LEADERSHIP: Person[] = [
  {
    name: "Biren Sahoo",
    role: "Founder & CEO",
    bio: "Pioneering sustainable rural development and livestock empowerment across Odisha.",
    photo: "biren-sahoo.jpg",
  },
  {
    name: "Jayanti Mahapatra",
    role: "Managing Director",
    bio: "Driving strategic vision, business growth, and organizational excellence.",
    photo: "jayanti-mahapatra.png",
  },
  {
    name: "Biswabandhu Padhi",
    role: "Director, Growth",
    bio: "Driving strategic partnerships, commercial market reach, and enterprise growth.",
    photo: "biswabandhu-padhi.webp",
  },
  {
    name: "Om Singh",
    role: "SVP Accounts",
    bio: "Ensuring financial governance, sustainable capital strategy, and investor relations.",
    photo: "om-singh.webp",
  },
  {
    name: "Sidhant Mohanty",
    role: "Vice President, Finance & Strategy",
    bio: "Building robust financial systems, expanding investor reach, and strengthening farmer finance support.",
    photo: "sidhant-mohanty.jpg",
  },
]

export const MANAGEMENT: Person[] = [
  {
    name: "Suman Sourav",
    role: "Assistant Vice President, Infrastructure & Quality",
    bio: "B.Tech Civil Engineering from IGIT Sarang. 6+ years in structural design and quality maintenance across reputed engineering organizations.",
    photo: "suman-sourav.jpg",
  },
  {
    name: "Aftab Khan",
    role: "AVP Tech & Operations",
    bio: "Technology leader driving digital transformation, product innovation, and scalable technology strategy.",
    photo: "aftab-khan.jpeg",
  },
  {
    name: "Rashmi Dash",
    role: "Manager HR",
    bio: "Rashmi Dash is a passionate HR professional who effectively manages the diverse rural talent and organizational culture.",
    photo: "rashmi-dash.jpg",
  },
  {
    name: "Nabin Meher",
    role: "Sr. Manager, Sales",
    bio: "Nabin Meher is a highly energetic professional managing the Manikstu Goat Bank franchise business expansion.",
    photo: "nabin-meher.jpg",
  },
  {
    name: "Manoj Sahoo",
    role: "Manager Sales",
    bio: "With over 15 years of experience in rural sales, Manoj is a vital member of the team driving farmer outreach and market connectivity.",
    photo: "manoj-sahoo.jpg",
  },
]

export const ADVISORS: Person[] = [
  {
    name: "Mr. Sujeet Kumar",
    role: "Statutory & Legal Advisor",
    bio: "MBA from Oxford, second master's from Harvard, 20 years in development sector (UNDP, WEF). Now a Supreme Court legal practitioner and Rajya Sabha member.",
    photo: "sujeet-kumar.jpg",
  },
  {
    name: "Dr. C Vijaya",
    role: "Project & Compliance Advisor",
    bio: "A Veteran of the development sector with PhD in Statistics, Retd. Deputy Director of MICM & Director of Corporate Society.",
    photo: "c-vijaya.webp",
  },
  {
    name: "Swati Sinha",
    role: "Board Advisor",
    bio: "Board advisor supporting strategic governance and organizational growth.",
    photo: "swati-sinha.jpg",
  },
  {
    name: "Dr. Deepak Ahiwale",
    role: "Technical & Medical Advisor",
    bio: "A Veteran Doctor with specialization into Animal Science having 25 years of experience with NARI.",
    photo: "deepak-ahiwale.webp",
  },
]

export type InfoItem = { title: string; text: string }

export const WAYS_TO_FUND: InfoItem[] = [
  {
    title: "Impact Equity",
    text: "Growth capital for investors seeking both financial returns and verified social impact as we expand across states.",
  },
  {
    title: "Grants & CSR Partnerships",
    text: "Grants and structured CSR programmes that fund women-entrepreneur cohorts, training and last-mile veterinary infrastructure, with transparent reporting on livelihoods created and outcomes delivered.",
  },
  {
    title: "Debt & Working Capital",
    text: "Responsible debt to scale livestock financing, insurance cover and farmer supply chains.",
  },
]

export const WHY_TRUST: InfoItem[] = [
  {
    title: "Proven, Scalable Model",
    text: "An integrated goat-farming ecosystem already replicated across villages and states, ready to scale with capital.",
  },
  {
    title: "Measurable Social Returns",
    text: "Clear metrics on incomes raised, women empowered and livestock protected, reported with transparency.",
  },
  {
    title: "Award-Winning Team",
    text: "Recognised by FICCI, OCF and others, with leadership named among 40 Under 40 for rural innovation.",
  },
  {
    title: "Trusted Institutional Backing",
    text: "Supported by Miller Center for Global Impact, Upaya Social Ventures and government partners.",
  },
]

export const PARTNER_TYPES: InfoItem[] = [
  {
    title: "FPOs & SHGs",
    text: "Strengthen farmer producer organizations with training, governance and market linkages.",
  },
  {
    title: "Corporates & CSR",
    text: "Co-create CSR programs that deliver measurable rural impact.",
  },
  {
    title: "NGOs & Development Orgs",
    text: "Combine on-ground reach with technical expertise for scalable solutions.",
  },
  {
    title: "Government & Research",
    text: "Partner on schemes, pilots and research that transform rural livelihoods.",
  },
  {
    title: "Supply Chain & Retail",
    text: "Source ethically produced goat products and create fair market access.",
  },
  {
    title: "Financial Institutions",
    text: "Enable credit, insurance and financial literacy for rural farmers.",
  },
]

export const PARTNER_STEPS: InfoItem[] = [
  {
    title: "Discover",
    text: "We listen to communities and partners to understand real needs on the ground.",
  },
  {
    title: "Design",
    text: "We co-create programs tailored to local context, resources and goals.",
  },
  {
    title: "Deploy",
    text: "We implement on the ground with trained teams and community leaders.",
  },
  {
    title: "Measure",
    text: "We track outcomes, share results and continuously improve our approach.",
  },
]

