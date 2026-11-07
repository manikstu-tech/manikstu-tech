import type { InfoItem } from "@/constants/subpages"

// Resumes go to this address, from every button on the Careers page
export const HR_EMAIL = "hr@manikstu.com"
export const applyLink = (role?: string) =>
  `mailto:${HR_EMAIL}?subject=${encodeURIComponent(role ? `Application: ${role}` : "Application")}`

// Wording follows the careers page on the live manikstu.com
export const CAREER_VALUES = ["Impact-driven culture", "Continuous learning", "Collaborative teams", "Inclusive growth"]

export const WHY_JOIN: InfoItem[] = [
  { title: "Impact that matters", text: "Your work directly contributes to improving rural livelihoods and farmer incomes across India." },
  { title: "Learning and growth", text: "Opportunities to learn continuously through field exposure, mentorship and cross-functional projects." },
  { title: "Collaborative culture", text: "Work with passionate people who support, challenge and grow together as a team." },
  { title: "Sustainability at heart", text: "Contribute to ethical and sustainable agricultural practices that protect the environment." },
]

export const PERKS: InfoItem[] = [
  { title: "Health and wellness", text: "Comprehensive health support for you and your family." },
  { title: "Learning support", text: "Access to training and professional development." },
  { title: "Flexible work", text: "Balanced work arrangements to support your lifestyle." },
  { title: "Impact leave", text: "Time to contribute to community development projects." },
  { title: "Growth path", text: "Clear career progression and leadership opportunities." },
]

export type Opening = { title: string; department: string; location: string; type: string; summary: string }

// Add a role here to list it on the Careers page. Leave it empty while there are no open positions.
export const OPENINGS: Opening[] = []
