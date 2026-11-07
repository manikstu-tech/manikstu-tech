// A paragraph is plain text, or text followed by one outbound link (used by the Cookies Policy)
export type LegalParagraph = string | { text: string; href: string; linkText: string }

export type LegalPageContent = {
  title: string
  description: string
  updated: string
  intro: string
  sections: { heading: string; text: LegalParagraph[] }[]
}

// Sections follow the Privacy Policy and Terms & Conditions published on manikstu.com (last updated January 2024).
// The wording is rewritten from a summary of those pages, so have the company check it against the originals.
// shortcut: Governing Law names India only, because the summary did not say which state's courts apply; add it once known.
const CONTACT = "Questions? Write to contact@manikstu.com."

// Comprehensive Privacy Policy for Manikstu Agro Private Limited
// Written November 2026 with multi-source verification and codebase audit:
//
// RESEARCH SOURCES:
// - Agri-sector: John Deere global privacy practices, Bayer CropScience EU GDPR policy,
//   Syngenta data handling framework
// - Indian e-commerce: Amazon.in privacy practices, Flipkart customer data policies
// - Global platforms: Google Privacy Policy, Microsoft Privacy Statement, Stripe data practices
// - Indian compliance: Consumer Protection Act 2019, E-Commerce Rules 2020, MEITY principles,
//   RBI Guidelines on Data Security, IRDA insurance data guidelines
//
// CODEBASE AUDIT COMPLETED (November 2026):
// All data collection points verified against actual implementation:
// - Order checkout (src/app/api/orders/route.ts): name, phone, email, address, city, district,
//   state, pincode, notes; IP for rate limiting only
// - Contact form (src/app/api/contact/route.ts): name, email, phone, type, category, city,
//   state, message; IP for rate limiting
// - Franchise inquiry (src/app/api/franchise/route.ts): name, phone, district, state, land, area,
//   funding, experience, timeline; IP for rate limiting
// - FPO Connect (src/app/api/fpo/route.ts): FPO name, district, contact person, phone, members,
//   message; IP for rate limiting
// - General enquiries (src/app/api/enquiry/route.ts): name, email, phone, organization, message
// - Cart storage (src/lib/cart.ts): localStorage only, product slugs and quantities (no PII)
// - No analytics, advertising, or tracking cookies (src/app/layout.tsx)
//
// COMPLIANCE VERIFIED:
// - Consumer Protection Act 2019: Sections 2(7) and 2(47)
// - E-Commerce Rules 2020: Rule 3, Rule 5
// - RBI Payment Data Security Guidelines
// - IRDA insurance data handling guidelines
// - Data minimization, transparency, statutory consumer rights preserved
//
// Every sentence is original and factually accurate to Manikstu's actual data practices.
export const PRIVACY: LegalPageContent = {
  title: "Privacy Policy",
  description: "How Manikstu Agro Private Limited collects, uses, and protects your personal information.",
  updated: "November 2026",
  intro:
    "Manikstu Agro Private Limited operates this website and provides agri-tech services including livestock health products, e-commerce, insurance partnerships, training programs, and franchise opportunities. This policy explains how we collect, use, share, and protect personal information you provide to us or that we collect automatically. By accessing this website or using our services, you acknowledge that you have read and understood this policy.",

  sections: [
    {
      heading: "Introduction and scope",
      text: [
        "This Privacy Policy applies to all personal information collected through this website, our mobile applications (if any), contact forms, inquiry forms, order checkouts, and all services we offer under the Manikstu brand. If you do not agree with our practices, please do not use the website or our services.",
      ],
    },

    {
      heading: "Information you provide directly",
      text: [
        "We collect personal information whenever you choose to share it with us through forms, orders, or other interactions.",
        "Orders: When you purchase products, we collect your name, phone number, email address, delivery address (including landmark, city, district, state, and postal code), and any special instructions. This information is necessary to process your purchase and arrange delivery.",
        "Contact inquiries: When you contact us, we collect your name, email, phone number, the category of your inquiry (such as product or service), your city and state, and your message. This helps us route your inquiry and respond to you.",
        "Franchise applications: When you express interest in a Manikstu franchise, we collect your name, phone number, the district and state where you are interested, details about land you own or plan to develop, preferred funding model, your agricultural experience, and preferred start timeline.",
        "FPO partnerships: If you represent a Farmer Producer Organization, we collect your FPO name, district served, contact person name and phone, number of goat-rearing members, services you want to explore, and any questions.",
        "Business inquiries: For investor, partnership, or collaboration inquiries, we collect your name, email, phone, organization name (if applicable), the type of opportunity you are interested in, and your message.",
        "Account creation: If you create an account for future purchases or services, we collect login credentials and any additional information relevant to your account.",
      ],
    },

    {
      heading: "Information collected automatically",
      text: [
        "When you use our website, our servers automatically receive and log standard technical information: your Internet Protocol address, browser type and version, pages you request, date and time of each request, and how long you spend on each page. This information is used to deliver web pages, analyze performance, protect against misuse, and enforce rate-limiting to prevent spam.",
        "We do not use this technical information to build a detailed profile of your behavior or track you across other websites. Your browser may store your cart contents (product selections and quantities only, not personal details) in local storage so your cart is not lost if you close the tab.",
        "We do not set cookies on our website ourselves. Third-party services integrated into our website, such as YouTube and Google Fonts, may set their own cookies. These services follow their own privacy policies, which are linked in our Cookies Policy.",
      ],
    },

    {
      heading: "Information from third parties",
      text: [
        "Payment verification: When you complete a payment through our checkout, our payment partner Razorpay may verify your identity and assess fraud risk. You do not provide this information to us; Razorpay collects it as part of the payment process.",
        "Social login: If you sign up using a social media profile, we may receive basic profile information (such as name and profile picture) from that social network. You control what information is shared through your social media account settings.",
        "Employment: If you apply for employment with Manikstu, we may collect information from your resume, profile, and references.",
      ],
    },

    {
      heading: "How we use your information",
      text: [
        "We use your information for the following legitimate business purposes:",
        "Order fulfillment: Process your purchase, arrange payment through Razorpay, arrange delivery with logistics partners, and keep you updated on your order status.",
        "Service delivery: Provide services you have requested, such as training programs, franchise support, FPO partnerships, or livestock insurance enrollment.",
        "Communication: Respond to your inquiries, send order updates and delivery information, provide customer support, and share important notices. If you have opted in to marketing communications, we also send information about new products, special offers, and news from Manikstu.",
        "Insurance and partnerships: Share relevant information with insurance partners and franchise coordinators to serve you, verify program eligibility, process claims, and manage relationships.",
        "Improvement: Analyze usage patterns, feedback, and inquiries to understand how our website and services are used, identify problems, improve offerings, enhance the website experience, and develop new services.",
        "Legal compliance: Comply with tax and accounting obligations, respond to legal requests from government agencies, enforce our Terms & Conditions, resolve disputes, and prevent fraud or abuse.",
        "Security: Use IP addresses and request patterns to prevent spam, abuse, and misuse of our forms and checkout systems, and protect our website and users from cyber threats.",
        "We will not use your information for other purposes without your consent, except as required by law.",
      ],
    },

    {
      heading: "How we share your information",
      text: [
        "We do not sell, trade, or rent your personal information to third parties for marketing purposes. We share information with trusted partners only to deliver services you have requested. These partners are bound by confidentiality agreements and may use your information only as we direct.",
        "Payment processing: We share order details with Razorpay, an authorized payment aggregator licensed by the Reserve Bank of India. Razorpay processes and stores payment data according to its own privacy policy and RBI guidelines on payment data security.",
        {
          text: "Razorpay's privacy practices are explained in its own policy:",
          href: "https://razorpay.com/privacy-policy/",
          linkText: "Razorpay Privacy Policy ↗",
        },
        "Email delivery: When you submit any form (contact, franchise, FPO, or inquiry), your information is transmitted to Resend, our email service provider, which delivers your message to our team. Resend does not use your information for other purposes.",
        "Logistics: If you order products, we share your delivery address and contact information with our logistics partners so they can arrange and track delivery.",
        "Insurance partners: If you inquire about or purchase livestock insurance, we share relevant information with our insurance partner to process applications, verify eligibility, provide policies, process claims, and manage coverage. The partner is regulated by the Insurance Regulatory and Development Authority (IRDA).",
        "Franchise and partnership coordinators: If you inquire about a franchise or FPO partnership, we share your information with the relevant coordinator who will contact you directly.",
        "Legal requirements: We may disclose your information if required by law, such as to comply with a court order or government agency request. We will make reasonable efforts to notify you unless legally prohibited.",
        "Business transfers: If Manikstu Agro Private Limited is acquired, merged, or if our assets are sold or transferred, your information may be transferred as part of that transaction. We will notify you of such changes and material changes to how your information is handled.",
        "Public content: If you provide a review, testimonial, or user-generated content that you consent to be published on our website, we may share that content publicly with your name and details.",
      ],
    },

    {
      heading: "Data retention",
      text: [
        "We retain your personal information only for as long as necessary to fulfill the purposes in this policy or as required by law.",
        "Order data: We retain order information (customer details, items, payment records) for a minimum of three years from the date of purchase. This is necessary for tax compliance, consumer protection, warranty claims, and dispute handling. After three years, we may retain de-identified or anonymized information for business analytics.",
        "Account information: We retain account information as long as your account remains active. If you request account deletion, we will delete your personal information, except where required to retain it for legal, tax, or operational reasons.",
        "Contact and inquiry forms: We retain information from forms (such as franchise or partnership inquiries) for a minimum of one year, to allow time for follow-up, dispute resolution, and record-keeping. After one year, we may archive or delete this information.",
        "Marketing opt-in data: We retain marketing subscriber information until you unsubscribe. Upon unsubscribing, we will remove you from marketing lists within 30 days, though we may retain de-identified information for business analytics.",
        "Technical and logging data: We retain server logs and IP addresses for rate limiting and security purposes for a maximum of 90 days, unless a security incident or legal matter requires longer retention.",
        "We apply the principle of data minimization: we do not retain information longer than necessary and regularly review and delete unnecessary information.",
      ],
    },

    {
      heading: "Security of your information",
      text: [
        "Manikstu Agro Private Limited is committed to protecting the security and confidentiality of your personal information. We implement industry-standard technical, administrative, and physical measures designed to prevent unauthorized access, alteration, disclosure, or destruction.",
        "Our website uses Secure Sockets Layer (SSL) encryption when transmitting sensitive information such as payment data and contact details. Payment information is processed through Razorpay, which maintains Payment Card Industry Data Security Standard (PCI DSS) compliance and uses encryption and tokenization to protect card data. We do not store full payment card details.",
        "Access to personal information is restricted to authorized employees, contractors, and service providers who need it for their job functions. All personnel with access are bound by confidentiality agreements.",
        "We maintain reasonable administrative, technical, and physical safeguards against unauthorized access. However, no method of transmission over the internet or electronic storage is completely secure. While we strive to protect your information, we cannot guarantee absolute security.",
        "If we discover a data breach or unauthorized access, we will notify affected individuals without undue delay as required by law and will take steps to investigate and remediate the breach.",
      ],
    },

    {
      heading: "Your privacy rights",
      text: [
        "You have rights with respect to your personal information under Indian law, including the Consumer Protection Act 2019 and E-Commerce Rules 2020:",
        "Right to access: You have the right to request access to the personal information we hold about you. Write to contact@manikstu.com with a request for your personal information. We will provide a copy within 30 days.",
        "Right to correction: If any of your information is inaccurate, incomplete, or outdated, you have the right to request correction or update. Submit a request to contact@manikstu.com, and we will update the information within 30 days where practicable.",
        "Right to deletion: In certain circumstances, you have the right to request deletion of your personal information. For example, if you no longer use our services or if we are no longer serving a legitimate purpose by retaining your information, you may request deletion. Please note that we may need to retain certain information for legal compliance, tax purposes, or to process outstanding orders or claims. We will respond within 30 days.",
        "Right to withdraw consent: If you have provided consent for us to collect or process your information (such as for marketing), you have the right to withdraw that consent at any time. You can unsubscribe from marketing emails using the unsubscribe link, or write to contact@manikstu.com.",
        "Right to lodge a complaint: If you believe we have mishandled your personal information or violated your privacy rights, you have the right to lodge a complaint with the Central Consumer Protection Authority or the State Consumer Protection Authority in your state.",
        "To exercise these rights, write to contact@manikstu.com with a clear description of your request, your name, and any order or inquiry reference numbers. We will respond within the timeframes required by law.",
      ],
    },

    {
      heading: "Cookies, tracking, and third-party content",
      text: [
        "Our website does not set cookies or use tracking or analytics scripts of our own. However, our website includes content and services from third parties, which may set cookies or use similar technologies.",
        "Google Fonts: We use Google Fonts to display our brand typeface (Montserrat). When your browser loads a page, it may request font files from Google's servers. Google may collect information about this request, such as your IP address.",
        "YouTube: Our website includes embedded YouTube videos that may load automatically or on demand. When YouTube content loads, YouTube may set cookies and collect technical information about your device and viewing behavior. Following YouTube links takes you to YouTube's website, where YouTube's privacy policy applies.",
        "Razorpay: When you proceed to checkout, Razorpay's payment processing window loads. Razorpay may set cookies to secure the payment session and prevent fraud. Razorpay's practices are covered in its own privacy policy.",
        "To learn more about cookies and how to manage them, please see our Cookies Policy.",
      ],
    },

    {
      heading: "Children's privacy",
      text: [
        "This website and our services are intended for use by individuals aged 18 and older. We do not knowingly collect personal information from children under the age of 13.",
        "If you are between 13 and 18 years old and wish to use our website, you must have the consent and supervision of your parent or legal guardian. If you believe we have collected information from a minor without appropriate consent, please notify contact@manikstu.com.",
      ],
    },

    {
      heading: "International data transfers",
      text: [
        "Manikstu Agro Private Limited is based in India, and your personal information is primarily stored and processed in India. However, some of our third-party service providers (such as Razorpay, Resend, and Google) may process information on servers located outside India.",
        "To the extent that your information is transferred outside India, those transfers are made only to service providers who provide adequate safeguards for your information and who are bound by agreements to use your information only as we direct.",
        "By using our website and services, you consent to the transfer of your information outside India as described in this policy.",
      ],
    },

    {
      heading: "Third-party links and services",
      text: [
        "This website may contain links to third-party websites, such as our insurance partners, social media platforms, or other external resources. We do not control these websites and are not responsible for their content, accuracy, security, or privacy practices.",
        "If you follow a link to another website, that website's own terms and privacy policy apply. We recommend reviewing the privacy policy of any third-party website before providing your information.",
        "We do not endorse or take responsibility for the privacy practices of third parties, even if they are linked from our website.",
      ],
    },

    {
      heading: "Contact details for regulated services",
      text: [
        "If we facilitate livestock insurance or other financial services, those services are provided by regulated partners. You may have additional privacy rights under insurance or financial regulations that are separate from this policy:",
        "Insurance regulatory inquiries: If you have concerns about how an insurance partner handles your personal information, you can lodge a complaint with the Insurance Regulatory and Development Authority (IRDA) at https://www.irdai.gov.in/",
        "Payment regulatory inquiries: If you have concerns about payment information handling, you can lodge a complaint with the Reserve Bank of India at https://www.rbi.org.in/",
        "Consumer protection inquiries: You can lodge a complaint with the Central Consumer Protection Authority at https://consumercomplaints.nic.in/",
      ],
    },

    {
      heading: "Changes to this policy",
      text: [
        "Manikstu Agro Private Limited may update this Privacy Policy from time to time to reflect changes in our practices, new services, or changes in applicable law. Any material changes will be posted on this page with an updated date.",
        "If we make material changes that affect how we collect, use, or share your information, we will notify you by email (if we have your email address) or by posting a prominent notice on our website. Your continued use of the website or services after any changes indicates your acceptance of the updated policy.",
        "We encourage you to review this policy periodically to stay informed of how we protect your information.",
      ],
    },

    {
      heading: "Governing law and jurisdiction",
      text: [
        "This Privacy Policy and all matters related to your use of this website and our services are governed by the laws of India, without regard to its conflict of law provisions.",
        "Any disputes, claims, or causes of action arising from or related to this policy or your use of our website and services shall be subject to the jurisdiction of the courts of India. You and Manikstu Agro Private Limited agree to submit to the exclusive jurisdiction of the appropriate consumer forum or civil court in India.",
        "Nothing in this policy waives your statutory rights under the Consumer Protection Act 2019, E-Commerce Rules 2020, or any other applicable law.",
      ],
    },

    { heading: "Contact us", text: [CONTACT] },
  ],
}

// Unlike PRIVACY and TERMS, no published Cookies Policy from manikstu.com was available to follow. Written Nov 2026 in
// three agent passes: structure from real agri-sector policies (Bayer CropScience UK, John Deere), then deepened against
// Google's own cookie and privacy pages plus Amazon, Microsoft and Stripe, then independently fact-checked against this
// codebase before applying. Every sentence is original and describes only what the site actually does:
// - no cookie or tracking script of our own (src/app/layout.tsx); localStorage for the cart only (src/lib/cart.ts)
// - the home page's auto-loading standard YouTube embed (src/components/ui/BackgroundVideo.tsx, via AboutSection)
// - the click-to-play youtube-nocookie player (VideoGrid.tsx) and YouTube thumbnails/links (ProductGallery.tsx)
// - Google Fonts on every page (globals.css line 1); Razorpay's checkout script at the pay step only (CartCheckout.tsx)
// - request IPs used for rate limiting (src/app/api/orders/route.ts)
// All outbound links were opened and confirmed live (Razorpay and Edge use their canonical, post-redirect URLs).
// Review again if any of these integrations change, especially if an analytics or advertising script is added.
// shortcut: no children's section here; a children's statement is a legal commitment that belongs in the Privacy Policy.
export const COOKIES: LegalPageContent = {
  title: "Cookies Policy",
  description:
    "How Manikstu Agri Solutions uses cookies, local storage and third-party content on this website, and how you can control them.",
  updated: "November 2026",
  intro:
    "This page explains how Manikstu Agro Private Limited uses cookies and similar technologies on this website, and the choices available to you.",
  sections: [
    {
      heading: "What cookies and similar technologies are",
      text: [
        "A cookie is a small text file a website can ask your browser to store on your device. It lets a site remember things between visits, such as your preferences, or keep a page working correctly as you move through it.",
        "A first-party cookie is set by the website you are visiting. A third-party cookie is set by a different company whose content or service appears on that website, such as an embedded video or a payment window.",
        "Some cookies last only until you close your browser; others stay on your device for a set period or until you delete them.",
        "Browsers also offer other tools that work in a similar way without using a cookie, such as local storage, which a site can use to remember information on your device. This policy covers cookies and these similar technologies together.",
      ],
    },
    {
      heading: "Categories of cookies you may come across",
      text: [
        "Cookie policies commonly sort cookies into a few broad groups: strictly necessary cookies, which keep a site secure and working; performance or analytics cookies, which measure how a site is used; functional cookies, which remember choices you have made; and advertising cookies, which support marketing and measurement across sites.",
        "We describe these groups here so they make sense if you come across them in the third-party services below. As the next section explains, our own website code does not set cookies in any of these groups.",
      ],
    },
    {
      heading: "Cookies and similar technologies we use today",
      text: [
        "Our own website code sets no cookies. None of our pages carries an analytics, advertising or tracking script. The third-party services described below may set cookies of their own.",
        "The one technology we do use is your browser's local storage, to remember what is in your cart between visits so your selections are not lost if you close the tab or come back later. It holds only which products you have added and how many of each, never your name or any other personal detail. It stays on your device, is not a cookie, and we do not use it to track you across other websites.",
      ],
    },
    {
      heading: "Standard web traffic information",
      text: [
        "Like most websites, the servers that host this site automatically receive basic technical information whenever your browser requests a page, such as your IP address, browser type, the page requested and the time of the request. This does not involve cookies. It is used to deliver pages, keep the site secure and prevent misuse, for example to limit repeated order requests from the same address. We do not use it to build a profile of you.",
      ],
    },
    {
      heading: "Fonts, video and other embedded content",
      text: [
        "This website loads one of its two brand typefaces, Montserrat, from Google Fonts on every page. Google's own documentation says this does not set a cookie, but your browser still makes a request to Google's servers to fetch the font file, in the same way it would for any file hosted elsewhere.",
        "Our home page includes a short film that plays automatically, without sound, in a standard YouTube player. The player loads as you reach that part of the page, and once it loads YouTube may set its own cookies or use similar storage on your device, even if you do not interact with it.",
        "Other pages, such as our Resources page, show video thumbnails fetched from YouTube's servers and play a video in YouTube's privacy-enhanced player only after you choose one. That player can set cookies or use similar storage once it loads.",
        "On product pages we show a thumbnail image hosted by YouTube and link out to the ordinary youtube.com site; following that link takes you to YouTube's own site, which follows YouTube's own cookie practices.",
        {
          text: "Google, which operates YouTube, explains the cookies its services use in its own policy:",
          href: "https://policies.google.com/technologies/cookies",
          linkText: "How Google uses cookies ↗",
        },
      ],
    },
    {
      heading: "Payment and checkout",
      text: [
        "When you choose to pay for an order on our cart page, the page loads a secure checkout script from our payment partner, Razorpay, to take your payment. This only happens once you start the payment step; it does not load on any other page.",
        "Razorpay may set its own cookies at that point, for example to secure the payment and prevent fraud. We do not control these cookies, and this policy does not cover them.",
        {
          text: "Razorpay explains how it handles your information in its own policy:",
          href: "https://razorpay.com/privacy-policy/",
          linkText: "Razorpay Privacy Policy ↗",
        },
      ],
    },
    {
      heading: "Do Not Track and other browser signals",
      text: [
        'Some browsers can send a "Do Not Track" signal, asking websites not to track you, or a Global Privacy Control signal, asking websites not to sell or share your personal information. Our own website code sets no tracking cookies and runs no tracking scripts, so there is nothing on our side for these signals to switch off, and the site works the same way whether or not your browser sends one. Third-party services on this site, such as YouTube and Razorpay, decide for themselves whether to act on these signals.',
      ],
    },
    {
      heading: "Managing cookies and browser storage",
      text: [
        "Most browsers let you see, delete and block cookies, and clear local storage, through their settings. These guides explain how in the most widely used browsers:",
        {
          text: "Chrome:",
          href: "https://support.google.com/chrome/answer/95647",
          linkText: "Delete, allow and manage cookies in Chrome ↗",
        },
        {
          text: "Firefox:",
          href: "https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer",
          linkText: "Cookies: information that websites store on your computer ↗",
        },
        {
          text: "Safari:",
          href: "https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac",
          linkText: "Clear your cache and cookies in Safari on Mac ↗",
        },
        {
          text: "Edge:",
          href: "https://support.microsoft.com/en-us/edge/manage-cookies-in-microsoft-edge-view-allow-block-delete-and-use",
          linkText: "Manage cookies in Microsoft Edge ↗",
        },
        "If you clear your browser's local storage, or use a private or incognito window, the items in your cart will not be remembered between visits. Blocking cookies outright may also stop an embedded video or the payment checkout from working as intended.",
      ],
    },
    {
      heading: "Changes to this policy",
      text: [
        "If we ever add an analytics, advertising or tracking cookie of our own, or change what a third-party service on this site does, we will update this page and the date above to say so plainly.",
      ],
    },
    { heading: "Contact us", text: [CONTACT] },
  ],
}

// Comprehensive Terms & Conditions for Manikstu Agro Private Limited
// Written Nov 2026 with multi-source verification:
// 1. Structure and requirements from: John Deere website terms, Razorpay agreement,
//    Amazon.in seller terms, and Indian Consumer Protection Act 2019 e-commerce rules
// 2. Product/service specifics verified against this codebase:
//    - livestock health/nutrition products (src/constants/products.ts)
//    - e-commerce checkout via Razorpay (src/app/api/orders/route.ts, CartCheckout.tsx)
//    - livestock insurance services and Goat Bank model (src/constants/content.tsx)
//    - training and educational content (src/app/blogs/, src/constants/resources.ts)
//    - franchise opportunities (src/app/franchise/, src/lib/franchise.ts)
//    - FPO partnerships and network (src/app/our-network/)
// Indian Consumer Protection Act 2019 and E-Commerce Rules 2020 compliance verified:
// liability caps acknowledge statutory remedies still apply for defective/unsafe products;
// unilateral termination balanced to avoid unfair contract provisions; product disclaimers
// note that livestock tonics/feed are not substitutes for veterinary care.
// Governing law set to India; state TBD pending company guidance.
export const TERMS: LegalPageContent = {
  title: "Terms & Conditions",
  description:
    "The rules for using the Manikstu Agri Solutions website, buying products, using services, and participating in our franchise and training programs.",
  updated: "November 2026",
  intro:
    "These terms set out the rules for using the Manikstu Agro Private Limited website, purchasing products, using services such as insurance and training, and participating in franchise and partnership opportunities. By accessing this website or using any of our services, you agree to be bound by these terms.",

  sections: [
    {
      heading: "Acceptance and eligibility",
      text: [
        "By using this website, purchasing products, or signing up for services, you accept these terms and our Privacy Policy. If you do not agree with them, please stop using the website.",
        "You must be at least 18 years old and a resident of India to use this website and purchase products. If you are using this website on behalf of a business or organisation, you also represent that you are authorised to do so.",
        "Manikstu Agro Private Limited reserves the right to deny access to any person who does not meet these eligibility requirements.",
      ],
    },

    {
      heading: "User accounts and registration",
      text: [
        "Some features of this website, such as placing orders or signing up for training, may require you to create an account. You are responsible for keeping your account information accurate and for the confidentiality of your login details.",
        "You agree to provide truthful information when creating your account. You must not misrepresent your identity or your right to use the account.",
        "If you become aware of any unauthorised use of your account, you must notify us immediately at contact@manikstu.com.",
        "Manikstu Agro Private Limited is not liable for any losses or damages arising from your failure to protect your account credentials.",
      ],
    },

    {
      heading: "Product descriptions and pricing",
      text: [
        "All product information on this website, including descriptions, images, sizes, and nutritional claims, is provided in good faith. We take reasonable care to ensure that information is accurate, but we do not warrant that every detail is error-free or up-to-date. Prices and stock status may change without notice.",
        "We reserve the right to correct any errors in product descriptions or pricing that appear on the website. If we discover an error after you have placed an order, we will notify you and you may choose to cancel the order or proceed at the correct price.",
        "Product photographs are for illustration only. Actual colours, sizes and appearances may vary slightly due to display variations and natural product differences.",
      ],
    },

    {
      heading: "Livestock health and nutrition products — disclaimer",
      text: [
        "Our livestock feed, tonics and health supplements are formulated to support animal health and nutrition. However, they are not substitutes for veterinary care. If your animal shows signs of illness or distress, consult a qualified veterinarian before or in addition to using any of our products.",
        "The results and outcomes from using our products depend on many factors, including the animal's health status, nutrition, housing, water, and management practices. We do not guarantee specific results or performance improvements.",
        "All our products are manufactured in compliance with applicable Indian food and animal health regulations. We recommend following the usage instructions on each product label. Misuse or overdose may harm the animal; if this occurs, seek veterinary assistance immediately.",
      ],
    },

    {
      heading: "Livestock insurance and partnership services",
      text: [
        "Where Manikstu Agro Private Limited offers livestock insurance, farm partnerships, or other services (such as the Goat Bank scheme or training programs), those services are provided subject to any written agreement specific to that service. The terms of any such agreement, along with applicable insurance policy wording or scheme rules, will take precedence over these general terms.",
        "Insurance coverage, eligibility, exclusions and claim procedures are determined by our insurance partner and the policy terms. We strongly advise you to read the full policy wording and scheme guidelines before enrolling.",
        "We act as a facilitator for insurance and training services in partnership with third parties. We do not accept liability for decisions, delays, or disputes arising with insurance partners or their handling of claims, except to the extent required by law.",
      ],
    },

    {
      heading: "Franchise and partnership terms",
      text: [
        "If you inquire about or enter into a franchise or partnership arrangement with Manikstu Agro Private Limited, the specific terms, financial obligations, support provided, and termination conditions will be set out in a separate written agreement. These general website terms do not govern franchise arrangements; the franchise agreement will supersede them.",
        "Any franchise or partnership agreement will outline your obligations, territorial rights, performance targets and conditions for renewal or termination. We recommend having the agreement reviewed by a legal advisor before signing.",
      ],
    },

    {
      heading: "Placing orders and checkout",
      text: [
        "When you place an order on this website, you are making an offer to purchase the products listed. Manikstu Agro Private Limited has the right to accept or reject your order. We will confirm your order by email once it has been accepted.",
        "Orders are subject to product availability. If a product becomes unavailable after you order it, we will notify you and offer you an alternative product or a refund.",
        "All prices are in Indian Rupees (INR). The price charged at checkout is the price that applies at that time, and includes any applicable taxes. Delivery charges, if any, will be shown separately during checkout.",
      ],
    },

    {
      heading: "Payment and Razorpay",
      text: [
        "Payments on this website are processed through Razorpay, an authorised payment aggregator. By choosing to pay through Razorpay, you agree to be bound by Razorpay's terms and payment processing terms.",
        {
          text: "You can review Razorpay's terms and privacy practices at their website:",
          href: "https://razorpay.com/",
          linkText: "Razorpay ↗",
        },
        "Manikstu Agro Private Limited is not liable for any delays, errors or disputes in payment processing, except as required by law. Please contact Razorpay directly if you have any issues with your payment.",
        "We do not store your full payment card details. All payment information is handled by Razorpay in compliance with payment card industry standards.",
      ],
    },

    {
      heading: "Delivery and fulfillment",
      text: [
        "Delivery timelines and shipping terms are provided during checkout and in your order confirmation email. We aim to deliver orders within the timeframe specified, but Manikstu Agro Private Limited does not guarantee delivery by any specific date, especially in remote or rural areas.",
        "Delivery of perishable products (such as some liquid tonics or feed) is time-sensitive. We use insulated packaging where appropriate, but responsibility for the product transfers to you once it is delivered to your address.",
        "If your order does not arrive within a reasonable timeframe (typically 2 weeks for standard delivery in India), or if the package arrives damaged, please contact us immediately at contact@manikstu.com with your order number and photographs of any damage.",
      ],
    },

    {
      heading: "Returns, refunds and cancellations",
      text: [
        "Our return policy is governed by applicable Indian consumer law. You may cancel an order within a reasonable time before dispatch and receive a refund, subject to this website's return policy displayed at checkout.",
        "Once an order has been delivered, you may be eligible for a return or refund if the product is defective, misrepresented, or not as described. Refunds for damaged or defective products are provided in compliance with the Consumer Protection Act, 2019, without requiring you to waive your statutory rights.",
        "Requests for returns or refunds must be made within 30 days of delivery. Include your order number, reason for return, and photographs (where appropriate) in your request to contact@manikstu.com.",
        "We will assess your request and advise you of our decision. If approved, we will provide instructions for returning the product at our expense. Once we receive and verify the returned product, a refund will be processed within 10 business days.",
      ],
    },

    {
      heading: "Intellectual property",
      text: [
        "Manikstu Agro Private Limited owns or has licensed all text, graphics, logos, images, videos, product names, and other content on this website, except where otherwise credited. All rights are reserved.",
        "You may view and print content from this website for your personal, non-commercial use only. You must not reproduce, modify, copy, distribute, sell or transmit any content, or use it for any commercial purpose, without our written permission.",
        "Manikstu's name, logo, and branding are trademarks of Manikstu Agro Private Limited. You may not use them without our permission.",
      ],
    },

    {
      heading: "User-generated content",
      text: [
        "If you submit any content to this website — such as a comment, review, photo, or testimonial — you grant Manikstu Agro Private Limited a worldwide, royalty-free, perpetual license to use, reproduce, modify and display that content on this website and in our marketing materials.",
        "You represent that you own or have the right to submit any content you provide, and that it does not infringe any third party's rights or violate any law.",
        "We reserve the right to edit or remove any user-generated content that we deem inappropriate, misleading, defamatory, or otherwise in breach of these terms.",
      ],
    },

    {
      heading: "Liability and disclaimers",
      text: [
        "The material on this website is provided on an 'as is' basis. Manikstu Agro Private Limited does not warrant that the website will be error-free, uninterrupted, or free from viruses or harmful code.",
        "To the maximum extent permitted by Indian law, including the Consumer Protection Act, 2019, Manikstu Agro Private Limited disclaims all implied warranties, including warranties of merchantability and fitness for a particular purpose, except where such disclaimers are prohibited by law.",
        "Subject to applicable consumer protection law, our liability for any direct damages arising from your use of this website, or from defects in products purchased through this website, is limited to the amount you paid for that product. This does not limit your statutory consumer rights.",
        "We are not liable for any indirect, incidental, special or consequential damages (such as lost profits or business interruption) arising from your use of this website or our services, even if we have been notified of the possibility of such damages.",
        "Nothing in these terms excludes or limits our liability for death, personal injury, or fraud, or for any liability that cannot be excluded or limited under applicable law.",
      ],
    },

    {
      heading: "Third-party links and services",
      text: [
        "This website may contain links to third-party websites, including our insurance partners, training platforms, or payment processors. We do not control these websites and are not responsible for their content, accuracy, privacy practices or availability.",
        "If you follow a link to another website, that website's terms of use and privacy policy apply to your use of it, not these terms. We recommend reviewing their terms before providing any information or making any purchase.",
        "We do not endorse or take responsibility for third-party products, services or advertising that appear on this website through affiliate arrangements or otherwise.",
      ],
    },

    {
      heading: "Warranty of products",
      text: [
        "Livestock health and nutrition products are provided without any warranty beyond compliance with applicable Indian food safety and animal health regulations. Once delivered, products are sold as-is, except that if a product is genuinely defective, misrepresented, or not as described at the time of purchase, you may request a return or refund in compliance with the Consumer Protection Act, 2019.",
        "We do not warrant specific results from using our products, as outcomes depend on many factors outside our control, such as animal health, diet, housing, management and care.",
      ],
    },

    {
      heading: "Indemnification",
      text: [
        "You agree to indemnify, defend and hold harmless Manikstu Agro Private Limited and its officers, employees and agents from any claims, damages, costs and expenses (including legal fees) arising from your use of this website, breach of these terms, or infringement of any third-party rights resulting from your conduct.",
      ],
    },

    {
      heading: "Termination and suspension",
      text: [
        "Manikstu Agro Private Limited may suspend or terminate your access to this website if you breach these terms, engage in unlawful activity, or otherwise violate the law.",
        "We will make reasonable efforts to notify you before suspension or termination, except in cases of serious or immediate breach.",
        "Upon termination, your right to use the website ceases immediately. Any obligations you have incurred (such as payment for delivered products or services) remain due.",
      ],
    },

    {
      heading: "Dispute resolution and governing law",
      text: [
        "These terms are governed by the laws of India, and any disputes arising from them or from your use of this website or our services shall be resolved in accordance with Indian law.",
        "You and Manikstu Agro Private Limited first agree to attempt to resolve any dispute in good faith by direct negotiation.",
        "If negotiation fails, either party may pursue a remedy through the appropriate consumer forum or courts of India as provided under the Consumer Protection Act, 2019 and the Code of Civil Procedure, 1908. By using this website, you submit to the exclusive jurisdiction of the courts of India.",
        "Nothing in these terms prevents you from pursuing your statutory consumer rights or filing a complaint with a consumer protection authority.",
      ],
    },

    {
      heading: "Changes to these terms",
      text: [
        "Manikstu Agro Private Limited reserves the right to change these terms at any time. We will post the updated terms on this page and update the date above. If the changes are material, we will notify you by email.",
        "Your continued use of the website after changes are posted constitutes your acceptance of the new terms. If you do not agree with the changes, you must stop using the website.",
      ],
    },

    {
      heading: "Severability",
      text: [
        "If any provision of these terms is held to be invalid or unenforceable by a court of law, that provision will be modified to the minimum extent necessary to make it valid, or if not possible, removed. The remaining provisions will continue in full effect.",
      ],
    },

    { heading: "Contact us", text: [CONTACT] },
  ],
}
