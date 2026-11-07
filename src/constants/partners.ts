// Logos are the files on manikstu.com, saved under public/partners. A partner with no logo file shows its name instead.
// wide: a long, short wordmark (about 4:1 or wider) that may use the plate's side padding so it is not tiny
export type Logo = { name: string; src?: string; wide?: boolean }

export type LogoGroup = { id: string; title: string; text: string; logos: Logo[] }

const KIIT_TBI: Logo = { name: "KIIT TBI", src: "/partners/kiit-tbi.png" }

export const PARTNER_GROUPS: LogoGroup[] = [
  {
    id: "operational",
    title: "Operational partners",
    text: "Organisations that work with us on day-to-day operations.",
    logos: [
      { name: "Krimanshi", src: "/partners/krimanshi.png" },
      { name: "Bharat Herbs Co.", src: "/partners/bharat-herbs.png" },
      { name: "Goat Veda", src: "/partners/goat-veda.jpg" },
    ],
  },
  {
    id: "incubation",
    title: "Incubation partners",
    text: "Incubators and programmes that support Manikstu as a growing startup.",
    logos: [
      KIIT_TBI,
      { name: "BRIC-Institute of Life Sciences", src: "/partners/ils.png" },
      { name: "Startup Odisha", src: "/partners/startup-odisha.png" },
      { name: "Startup India", src: "/partners/startup-india.png" },
      { name: "MSME", src: "/partners/msme.png" },
      { name: "AIC", src: "/partners/aic.png" },
    ],
  },
  {
    id: "csr",
    title: "CSR partners",
    text: "Organisations that support our work through CSR programmes.",
    logos: [
      { name: "Kalinga Kusum", src: "/partners/kalinga-kusum.png" },
      { name: "HDFC Parivartan", src: "/partners/hdfc-parivartan.png" },
      { name: "Oxfam", src: "/partners/oxfam.png" },
    ],
  },
  {
    id: "financial",
    title: "Financial partners",
    text: "Banks and financial institutions that partner with Manikstu.",
    logos: [
      { name: "ICICI Bank", src: "/partners/icici-bank.svg" },
      { name: "HDFC Bank", src: "/partners/hdfc-bank.png" },
      { name: "State Bank of India", src: "/partners/sbi.png" },
      { name: "Samunnati", src: "/partners/samunnati.svg", wide: true },
    ],
  },
]

export const INVESTOR_GROUP: LogoGroup = {
  id: "investing",
  title: "Investing partners",
  text: "The impact investors and funders who have put capital behind Manikstu.",
  logos: [
    { name: "Upaya", src: "/partners/upaya.png" },
    { name: "Beneficial Returns", src: "/partners/beneficial-returns.jpeg" },
    KIIT_TBI,
    { name: "Next Bharat", src: "/partners/next-bharat.png" },
  ],
}
