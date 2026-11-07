export const CONTACT_HOURS = "Monday to Saturday, 9:00 AM to 6:00 PM"
export const REPLY_TIME = "We typically reply within 24 hours"

// Extra mailboxes shown under the main email on the contact page
export const TEAM_EMAILS = [
  {
    label: "Email sales",
    email: "sales@manikstu.com",
    purpose: "Product orders, prices and bulk requests.",
  },
  {
    label: "Email business",
    email: "collaborate@manikstu.com",
    purpose: "Partnerships, investors and collaboration.",
  },
]

export const ENQUIRY_TYPES = ["Enquiry", "Complaint"]

// manikstu.com fills its category list with script, so these are our own groupings, one list per type.
export const CATEGORIES: Record<string, string[]> = {
  Enquiry: [
    "General enquiry",
    "Partnership and collaboration",
    "Services",
    "Products",
    "Training and awareness",
    "Investors and funders",
    "Media",
    "Careers",
    "Other",
  ],
  Complaint: [
    "Product quality",
    "Order or delivery",
    "Services",
    "Training and awareness",
    "Staff or conduct",
    "Other",
  ],
}

export type Office = {
  id: string
  name: string
  place: string
  state: string
  streetAddress: string
  locality: string
  region: string
  postalCode: string
  // Exact Google Maps share link; the address search is used when this is not set
  mapUrl?: string
  // Position on the 600-wide map in src/constants/indiaMap.ts
  pin: [number, number]
}

export const OFFICES: Office[] = [
  {
    id: "registered",
    name: "Registered office",
    place: "Pune, Maharashtra",
    state: "Maharashtra",
    streetAddress:
      "Row House No 94, Ravi Garden, Pune Solapur Road, Manjri Budruk, Hadapsar",
    locality: "Pune",
    region: "Maharashtra",
    postalCode: "412307",
    mapUrl: "https://maps.app.goo.gl/uWkcGSwZmqnEKJGt6",
    pin: [118, 411],
  },
  {
    id: "corporate",
    name: "Corporate office",
    place: "Bhubaneswar, Odisha",
    state: "Odisha",
    streetAddress:
      "Plot No 754, 14, Gangadhar Meher Marg, near Pabitra Guest House, Jayadev Vihar",
    locality: "Bhubaneswar",
    region: "Odisha",
    postalCode: "751013",
    mapUrl: "https://maps.app.goo.gl/3FTfPw2HKS7J527DA",
    pin: [362, 372],
  },
  {
    id: "farm",
    name: "Farm office",
    place: "Kalahandi, Odisha",
    state: "Odisha",
    streetAddress: "At/Po Salebhata, P.S. Kegaon, via Borda",
    locality: "Kalahandi",
    region: "Odisha",
    postalCode: "766036",
    mapUrl: "https://maps.app.goo.gl/h2q14w5o3faiBYXw7",
    pin: [304, 377],
  },
  {
    id: "regional",
    name: "Regional office",
    place: "Raipur, Chhattisgarh",
    state: "Chhattisgarh",
    streetAddress: "CMTC Campus, Serikhedi",
    locality: "Raipur",
    region: "Chhattisgarh",
    postalCode: "492012",
    mapUrl: "https://maps.app.goo.gl/rSps4jwjTnoPgFwSA",
    pin: [278, 350],
  },
]

export const officeAddress = (o: Office) =>
  `${o.streetAddress}, ${o.locality}, ${o.region} ${o.postalCode}`

export const mapsLink = (o: Office) =>
  o.mapUrl ??
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(officeAddress(o))}`
