import archive from "@/data/blogArchive.json"
import videos from "@/data/videos.json"

export type Video = { id: string; title: string; date: string; category: string }

// Filter chips for the video grid, in display order
export const VIDEO_CATEGORIES = ["Project", "Products", "Health", "Farming", "More"]

// The 26 YouTube videos listed on the live manikstu.com media page
export const VIDEOS: Video[] = videos

export const PHOTOS = [
  { src: "/resources/images/ManikstuMedia1.webp", width: 1280, height: 720, caption: "The team sharing a meal together" },
  { src: "/resources/images/ManikstuMedia2.webp", width: 1280, height: 720, caption: "The team together in front of product shelves" },
  { src: "/resources/images/ManikstuMedia3.webp", width: 1280, height: 960, caption: "Women farmers and staff visiting a goat shed" },
  { src: "/resources/images/ManikstuMedia4.webp", width: 1280, height: 960, caption: "The team at the Project AJAH exhibit stall" },
  { src: "/resources/images/ManikstuMedia5.webp", width: 1280, height: 720, caption: "The team and visitors at the Manikstu Agro farm gate" },
  { src: "/resources/images/ManikstuMedia6.webp", width: 1280, height: 960, caption: "Visitors at a Project AJAH goat shed" },
  { src: "/resources/images/ManikstuMedia7.webp", width: 756, height: 496, caption: "On stage at a SOCAP and Sorenson Impact Institute event" },
  { src: "/resources/images/ManikstuMedia8.webp", width: 1280, height: 853, caption: "With fellow social entrepreneurs at an international programme" },
  { src: "/resources/images/ManikstuMedia9.webp", width: 1280, height: 853, caption: "Visitors meeting women farmers at a village gathering" },
  { src: "/resources/images/ManikstuMedia10.webp", width: 1280, height: 960, caption: "The team and visitors in front of the raised goat sheds" },
  { src: "/resources/images/ManikstuMedia11.webp", width: 955, height: 851, caption: "The team and visitors outside a Project AJAH goat shed" },
  { src: "/resources/images/ManikstuMedia12.webp", width: 747, height: 487, caption: "Visitors with the goats inside a raised shed" },
  { src: "/resources/images/ManikstuMedia13.webp", width: 1000, height: 566, caption: "A raised goat shed with its wooden entry ramp" },
  { src: "/resources/images/ManikstuMedia14.webp", width: 1280, height: 960, caption: "A meeting with women farmers and staff at the Manikstu office" },
  { src: "/resources/images/ManikstuMedia15.webp", width: 1280, height: 960, caption: "The team and women farmers in a discussion at the Manikstu office" },
  { src: "/resources/images/ManikstuMedia16.webp", width: 1280, height: 960, caption: "Women farmers and staff gathered at the Manikstu office" },
]

// Stories about Manikstu on other sites, newest first. Dates are shown only where the page states one.
// Each was opened and checked on 5 Nov 2026: the page loads, the date is the one it states, and it covers Manikstu.
// Hindi headlines are shown in a plain English translation. Where a story's own picture is not about Manikstu
// (a generic PM graphic, or another person), one of our own photos is shown instead.
export const PRESS = [
  {
    publisher: "Miller Center for Global Impact",
    title: "Miller Center Capital Backs Manikstu Agro to Expand Goat Farming Livelihoods in Rural India",
    url: "https://millercenterglobal.org/?p=70172",
    date: "June 2026",
    image: "https://millercenterglobal.org/wp-content/uploads/2026/06/funded-maniksu-1.jpeg",
    width: 1280,
    height: 1280,
    fit: "contain" as const,
  },
  {
    // Hindi: "CCTV और अलर्ट सायरन से बकरियों की मॉनिटरिंग, ब्रीडिंग कमांड सेंटर की जानिए A टू Z खासियत"
    // Project AJAH's breeding command centre at Serikhedi, Raipur; quotes Manikstu director Biren Sahu
    publisher: "ETV Bharat (Hindi)",
    title: "Goats monitored with CCTV and alert sirens: inside the breeding command centre",
    url: "https://www.etvbharat.com/hi/state/goats-are-being-monitored-with-cctv-sirens-breeding-command-center-opened-in-serikhedi-of-raipur-chhattisgarh-news-cts26032502456",
    date: "March 2026",
    image: "https://imgs.etvbharat.com/etvbharat/prod-images/25-03-2026/1200-675-26323854-thumbnail-16x9-banb.jpg",
    width: 1200,
    height: 675,
    fit: "cover" as const,
  },
  {
    publisher: "Krishi Jagran",
    title: "Jayanti Mahapatra's Goat Bank Empowers Women in Rural India",
    url: "https://krishijagran.com/success-story/women-empowerment-jayanti-mahapatras-goat-bank-empowers-women-in-rural-india/",
    date: "Updated July 2024",
    image: "https://img-cdn.krishijagran.com/99237/img-20240717-wa0014.jpg",
    width: 1600,
    height: 1044,
    fit: "cover" as const,
  },
  {
    // The headline, "The Saga of the Drone Lady", is about another of the three women, so the card shows the
    // story's own standfirst instead; its picture is of her too, so our photo is used
    publisher: "Open Magazine",
    title: "A drone operative, a goat banker and an organic farmer catch the Prime Minister's eye",
    url: "https://openthemagazine.com/cover-stories/the-saga-of-the-drone-lady",
    date: "March 2024",
    image: "/manikstu/about-hero.webp",
    width: 1402,
    height: 1122,
    fit: "cover" as const,
  },
  {
    publisher: "Orissa Post (IANS)",
    title: "Women's Day: Quitting her banker's job, she took up goat farming; receives accolades from PM Modi, others",
    url: "https://www.orissapost.com/womens-day-quitting-her-bankers-job-she-took-up-goat-farming-receives-accolades-from-pm-modi-others/amp/",
    // The story's picture is filed under March 2024 on the publisher's site
    date: "March 2024",
    image: "https://www.orissapost.com/wp-content/uploads/2024/03/Odisha-Kalahandi-Bhawanipatna-Jayanti-Mahapatra-Narendra-Modi-Man-Ki-Baat-Manikstu-Agro.jpg",
    width: 627,
    height: 471,
    fit: "cover" as const,
  },
  {
    publisher: "Orissa Post",
    title: "We compete with ourselves: Mahapatra",
    url: "https://www.orissapost.com/we-compete-with-ourselves-mahapatra/amp/",
    date: "March 2024",
    image: "https://www.orissapost.com/wp-content/uploads/2024/03/manikstu-interview.jpeg",
    width: 762,
    height: 780,
    // Square pictures are shown whole instead of cropped
    fit: "contain" as const,
  },
  {
    // Hindi: "सुर्खियों में ऐसे आया आईजीकेवी का यह स्टार्टअप"; an interview with Jayanti Mahapatra about the goat bank
    // incubated at IGKV Raipur. Its picture is a still of the Mann Ki Baat broadcast.
    publisher: "Patrika (Hindi)",
    title: "How this IGKV startup made headlines",
    url: "https://www.patrika.com/raipur-news/startup-of-igkv-raipur-in-mann-ki-baat-8757518",
    date: "March 2024",
    image: "https://cms.patrika.com/wp-content/uploads/2024/03/04/got_bank.jpg",
    width: 835,
    height: 547,
    fit: "cover" as const,
  },
  {
    // The story's own picture is a generic Mann Ki Baat graphic of the PM, so our Goat Bank photo is used
    publisher: "OdishaTV",
    title: "PM Modi lauds Odisha couple for setting up 'Goat bank' and promoting goat rearing",
    url: "https://odishatv.in/news/odisha/pm-modi-lauds-odisha-couple-for-setting-up-goat-bank-and-promoting-goat-rearing-228715",
    date: "February 2024",
    image: "/manikstu/hero-slide-2-photo.webp",
    width: 896,
    height: 640,
    fit: "cover" as const,
  },
]

// Filter chips for the blog list, in display order
export const POST_CATEGORIES = ["Featured", "Press", "Event", "Media"]

export type Post = {
  // Posts with a slug have their own page; the rest are summary cards only
  slug?: string
  title: string
  category: string
  dateLabel: string
  sort: string
  excerpt: string
  body?: string[]
  // Figures stated in the source, shown as a key-facts panel beside the article
  facts?: { value: string; label: string }[]
  sources?: { label: string; url: string }[]
}

// Written for this site from the facts in the linked stories, not copied from them.
const WRITTEN: Post[] = [
  {
    slug: "banker-to-goat-entrepreneur",
    title: "From banker to goat entrepreneur: how Manikstu Agro began",
    category: "Press",
    dateLabel: "March 2024",
    sort: "2024-03-02",
    excerpt:
      "Jayanti Mahapatra left a banking career in Bengaluru and returned to Kalahandi to build a goat-rearing business around marginal farmers, especially women.",
    body: [
      "Jayanti Mahapatra, who comes from Odisha, was a banker in Bengaluru. She left that job and moved to Salebhata, her husband's village in Kalahandi district. In 2015 she founded Manikstu Agro Pvt. Ltd there, with the aim of treating agriculture as a business that lifts the whole community.",
      "The company chose community goat rearing, a part of animal husbandry she saw as neglected. Its name comes from the goddess Maa Manikeswari. Early on, Mahapatra worked with the Nimbkar Agricultural Research Institute (NARI) in Maharashtra to learn the work.",
      "The start was not easy. According to Orissa Post, some people doubted that she was serious, many saw goats only as animals kept for meat, and families often left for work elsewhere once the cotton season ended.",
      "The model focuses on marginal farmers, especially women. A family receives two female goats to look after for 24 months, with insurance, seed, fodder, health care and diet support. Unemployed local youth are trained as Pashu Seva Adhikari (PSA) and are paid per visit for animal care and awareness work.",
      "Orissa Post reports that about 1,000 to 1,500 farmers in Kalahandi alone are connected to the company, with farmers in nearby districts also benefiting. The Prime Minister highlighted her story in his Mann Ki Baat radio address, an episode you can watch in our Videos section.",
    ],
    sources: [
      {
        label: "Orissa Post (IANS): Women's Day: Quitting her banker's job, she took up goat farming",
        url: "https://www.orissapost.com/womens-day-quitting-her-bankers-job-she-took-up-goat-farming-receives-accolades-from-pm-modi-others/amp/",
      },
    ],
  },
  {
    slug: "how-the-goat-bank-works",
    title: "How the Goat Bank works",
    category: "Featured",
    dateLabel: "July 2024",
    sort: "2024-07-17",
    excerpt:
      "A family receives two goats for two years, keeps part of the kids, and passes the rest on so that new families can begin.",
    body: [
      "The Goat Bank gives village women goats, not just a loan. A family receives two goats to look after for two years. Over that time the goats have kids, and part of the herd goes back to the bank so that other families can start in the same way.",
      "Orissa Post reports that the goats typically give birth to nine or ten kids in the period. Of these, four or five stay with the company and the rest go to the participating families. Krishi Jagran describes the same cycle from the family's side: keep some of the offspring, return the rest to the bank, which passes them to new families.",
      "Training is part of the package. Women learn goat rearing, basic medication and fodder collection. They are also taught about marketing and how to set prices in line with the market. Krishi Jagran notes that women make up about 70 percent of the workforce.",
      "The same article puts the early reach at more than 1,000 farmers, mostly women, from 50 villages. It also records the obstacles Mahapatra names: cultural attitudes towards goat rearing, and the stigma that women entrepreneurs face. It adds that she plans to take the Goat Bank to other states within five years.",
    ],
    sources: [
      {
        label: "Krishi Jagran: Jayanti Mahapatra's Goat Bank Empowers Women in Rural India",
        url: "https://krishijagran.com/success-story/women-empowerment-jayanti-mahapatras-goat-bank-empowers-women-in-rural-india/",
      },
      {
        label: "Orissa Post (IANS): Women's Day: Quitting her banker's job, she took up goat farming",
        url: "https://www.orissapost.com/womens-day-quitting-her-bankers-job-she-took-up-goat-farming-receives-accolades-from-pm-modi-others/amp/",
      },
    ],
  },
  {
    slug: "we-compete-with-ourselves",
    title: "\"We compete with ourselves\": Jayanti Mahapatra on building Manikstu",
    category: "Press",
    dateLabel: "March 2024",
    sort: "2024-03-01",
    excerpt:
      "In an interview with Orissa Post, the founder talks about organising goat farming, working with government and measuring progress against ourselves.",
    body: [
      "In an interview with Orissa Post, Jayanti Mahapatra explains what Manikstu Agro, founded in 2015, is trying to do: make goat farming in India more organised and double the incomes of goat farmers in Kalahandi district.",
      "She says her earlier work in banking, particularly its corporate social responsibility projects, showed her what villages needed and where the market demand was. That is what led her to invest in goat farming.",
      "She sees growing interest in agriculture, with people from many backgrounds returning to it as a way to build a better livelihood. For her own company, she says the yardstick is its own past performance, not its rivals, because steady hard work is what moves things forward.",
      "Her advice to people who want to start a business is to build determination, honesty and strong values. She welcomes government support for agribusiness but stresses integrity and a real partnership between government and private companies, and says relationships with partners are central to the company's growth.",
    ],
    sources: [
      { label: "Orissa Post: We compete with ourselves: Mahapatra", url: "https://www.orissapost.com/we-compete-with-ourselves-mahapatra/amp/" },
    ],
  },
  {
    slug: "miller-center-capital-investment",
    title: "Miller Center Capital backs Manikstu Agro to scale goat livelihoods",
    category: "Press",
    dateLabel: "June 2026",
    sort: "2026-06-01",
    facts: [
      { value: "800+", label: "villages in Odisha and Chhattisgarh" },
      { value: "~8,000", label: "sheds operating under the National Rural Livelihood Mission" },
      { value: "Under 10%", label: "goat mortality once a unit is running, as reported by the company" },
    ],
    excerpt:
      "A catalytic loan from Miller Center Capital will help scale government-supported livestock units for smallholder households.",
    body: [
      "In June 2026, Miller Center Capital, the impact investing arm of the Miller Center for Global Impact at Santa Clara University, announced a catalytic loan to Manikstu Agro. The fund manager Beneficial Returns partnered on the investment. The amount was not disclosed.",
      "The money will help scale government-supported livestock units for smallholder households. Manikstu's package for each unit includes a steel shed, a starter herd, farmer training, remote monitoring and support from para-vets.",
      "According to the announcement, Manikstu works across more than 800 villages in Odisha and Chhattisgarh, and nearly 8,000 sheds are operational under India's National Rural Livelihood Mission. The company reports that goat mortality stays below 10 percent once a unit is running.",
      "The company works with women-led household enterprises that it calls Goatpreneurs, and offers farmers market access through a guaranteed buyback programme. Co-founder Biren Sahoo said that nearly nine years of groundwork is now meeting government backing and real demand, and called the timing right for hiring, technology and infrastructure.",
    ],
    sources: [
      {
        label: "Miller Center for Global Impact: Miller Center Capital Backs Manikstu Agro to Expand Goat Farming Livelihoods in Rural India",
        url: "https://millercenterglobal.org/?p=70172",
      },
    ],
  },
]

// The eight entries on the live manikstu.com blog. They have a title, date and summary only.
const ARCHIVE: Post[] = archive.map(({ title, category, date, excerpt }) => ({
  title,
  category,
  dateLabel: new Date(date).toLocaleDateString("en-IN", { month: "short", year: "numeric", timeZone: "UTC" }),
  sort: date,
  excerpt,
}))

export const POSTS: Post[] = [...WRITTEN, ...ARCHIVE].sort((a, b) => b.sort.localeCompare(a.sort))
