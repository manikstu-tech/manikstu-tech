/**
 * Admin sections rendered by the generic list/form screens. Plain data, so both
 * server pages and client forms import it. Field names match the Laravel API.
 */

export type FieldType =
  | "text" | "textarea" | "number" | "email" | "url" | "date" | "select"
  | "toggle" | "lines" | "richtext" | "image" | "password" | "category";

export interface Option {
  value: string;
  label: string;
}

export interface FieldDef {
  name: string;
  label: string;
  type?: FieldType;
  required?: boolean;
  help?: string;
  placeholder?: string;
  options?: Option[];
  /** Category type a "category" field offers. */
  categoryType?: "blog" | "product" | "gallery" | "training";
  rows?: number;
  /** Render in the narrow right-hand column. */
  side?: boolean;
  defaultValue?: string | number | boolean;
  /** Only shown when creating (an order's total can't change later). */
  createOnly?: boolean;
  min?: number;
  max?: number;
  step?: number | string;
}

export type Tone = "green" | "amber" | "red" | "blue" | "purple" | "grey";
export type CellType = "text" | "status" | "date" | "money" | "image" | "pill" | "rating";

export interface ColumnDef {
  /** Dot path into the record, e.g. "category.name". */
  key: string;
  label: string;
  type?: CellType;
  /** Links to the record (detail page, or edit form). */
  link?: boolean;
  /** Value → label for "pill" cells. */
  labels?: Record<string, string>;
  tones?: Record<string, Tone>;
  /** Labels for true/false in "status" cells. */
  on?: string;
  off?: string;
}

export interface FilterDef {
  name: string;
  label: string;
  /** Fixed options, or the key of a list the API returns in meta. */
  options: Option[] | { meta: string };
}

export interface SectionDef {
  key: string;
  title: string;
  singular: string;
  subtitle: string;
  titleField: string;
  fields: FieldDef[];
  columns: ColumnDef[];
  filters?: FilterDef[];
  searchPlaceholder?: string;
  canCreate?: boolean;
  canEdit?: boolean;
  /** Has a read-only detail page (orders, enquiries). */
  hasDetail?: boolean;
  developerOnly?: boolean;
  /** Blog-style per-locale title / excerpt / content. */
  translations?: boolean;
}

const options = (map: Record<string, string>): Option[] => Object.entries(map).map(([value, label]) => ({ value, label }));

export const CATEGORY_TYPES = { blog: "Blog", product: "Product", gallery: "Gallery", training: "Training" };
export const JOB_TYPES = { full_time: "Full-time", part_time: "Part-time", contract: "Contract", internship: "Internship" };
export const ORDER_STATUSES = { pending: "Pending", confirmed: "Confirmed", shipped: "Shipped", delivered: "Delivered", cancelled: "Cancelled" };
export const PAYMENT_STATUSES = { unpaid: "Unpaid", paid: "Paid", refunded: "Refunded" };
export const ENQUIRY_STATUSES = { new: "New", read: "Read", replied: "Replied", archived: "Archived" };
export const ENQUIRY_TYPES = { general: "General", sales: "Sales", partnership: "Partnership", career: "Career" };
export const ROLES = { developer: "Developer", telesales: "Telesales", hr: "HR", telecaller: "Telecaller" };

export const ORDER_TONES: Record<string, Tone> = { pending: "amber", confirmed: "blue", shipped: "blue", delivered: "green", cancelled: "red" };
export const PAYMENT_TONES: Record<string, Tone> = { unpaid: "amber", paid: "green", refunded: "grey" };
export const ENQUIRY_TONES: Record<string, Tone> = { new: "amber", read: "blue", replied: "green", archived: "grey" };

export const TRANSLATION_LOCALES: Option[] = options({
  hi: "Hindi", bn: "Bengali", ta: "Tamil", te: "Telugu", mr: "Marathi", gu: "Gujarati", kn: "Kannada",
  ml: "Malayalam", or: "Odia", ja: "Japanese", de: "German", fr: "French", es: "Spanish",
});

const orderField: FieldDef = { name: "order", label: "Order", type: "number", side: true, defaultValue: 0, help: "Lower numbers show first." };
const activeField: FieldDef = { name: "is_active", label: "Active", type: "toggle", side: true, defaultValue: true };
const activeColumn: ColumnDef = { key: "is_active", label: "Status", type: "status", on: "Active", off: "Inactive" };
const publishedColumn: ColumnDef = { key: "is_published", label: "Status", type: "status", on: "Published", off: "Draft" };
const publishFilter: FilterDef = { name: "status", label: "Status", options: options({ published: "Published", draft: "Draft" }) };

const pressFields: FieldDef[] = [
  { name: "title", label: "Title", required: true },
  { name: "slug", label: "Slug", help: "Leave blank to generate it from the title." },
  { name: "excerpt", label: "Excerpt", type: "textarea", rows: 3, help: "Short summary, up to 500 characters." },
  { name: "content", label: "Content", type: "richtext" },
  { name: "is_published", label: "Published", type: "toggle", side: true, defaultValue: false, help: "Off = draft, hidden from the website." },
  { name: "featured_image", label: "Image", type: "image", side: true },
  { name: "category_id", label: "Category", type: "category", categoryType: "blog", side: true },
];

export const SECTIONS: SectionDef[] = [
  {
    key: "orders",
    title: "Orders",
    singular: "Order",
    subtitle: "Track orders, payment and delivery",
    titleField: "order_number",
    hasDetail: true,
    searchPlaceholder: "Search order number…",
    fields: [
      { name: "total", label: "Total (₹)", type: "number", required: true, createOnly: true, min: 0, step: "0.01" },
      { name: "status", label: "Order Status", type: "select", required: true, options: options(ORDER_STATUSES), defaultValue: "pending", side: true },
      { name: "payment_status", label: "Payment Status", type: "select", required: true, options: options(PAYMENT_STATUSES), defaultValue: "unpaid", side: true },
      { name: "payment_method", label: "Payment Method", placeholder: "e.g. UPI, Cash on delivery" },
      { name: "notes", label: "Notes", type: "textarea", rows: 4 },
    ],
    columns: [
      { key: "order_number", label: "Order", link: true },
      { key: "customer.name", label: "Customer" },
      { key: "total", label: "Total", type: "money" },
      { key: "status", label: "Status", type: "pill", labels: ORDER_STATUSES, tones: ORDER_TONES },
      { key: "payment_status", label: "Payment", type: "pill", labels: PAYMENT_STATUSES, tones: PAYMENT_TONES },
      { key: "created_at", label: "Placed", type: "date" },
    ],
    filters: [
      { name: "status", label: "Status", options: options(ORDER_STATUSES) },
      { name: "payment_status", label: "Payment", options: options(PAYMENT_STATUSES) },
    ],
  },
  {
    key: "enquiries",
    title: "Enquiries",
    singular: "Enquiry",
    subtitle: "Messages sent from the website contact form",
    titleField: "name",
    canCreate: false,
    canEdit: false,
    hasDetail: true,
    searchPlaceholder: "Search name or email…",
    fields: [],
    columns: [
      { key: "name", label: "From", link: true },
      { key: "email", label: "Email" },
      { key: "type", label: "Type", type: "pill", labels: ENQUIRY_TYPES },
      { key: "status", label: "Status", type: "pill", labels: ENQUIRY_STATUSES, tones: ENQUIRY_TONES },
      { key: "created_at", label: "Received", type: "date" },
    ],
    filters: [
      { name: "status", label: "Status", options: options(ENQUIRY_STATUSES) },
      { name: "type", label: "Type", options: options(ENQUIRY_TYPES) },
    ],
  },
  {
    key: "customers",
    title: "Customers",
    singular: "Customer",
    subtitle: "People who order from Manikstu",
    titleField: "name",
    searchPlaceholder: "Search name or email…",
    fields: [
      { name: "name", label: "Name", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "phone", label: "Phone" },
      { name: "address", label: "Address", type: "textarea", rows: 3 },
      { name: "city", label: "City" },
      { name: "state", label: "State" },
      { name: "pincode", label: "Pincode" },
      activeField,
    ],
    columns: [
      { key: "name", label: "Name", link: true },
      { key: "email", label: "Email" },
      { key: "phone", label: "Phone" },
      { key: "city", label: "City" },
      activeColumn,
    ],
  },
  {
    key: "categories",
    title: "Categories",
    singular: "Category",
    subtitle: "Group products, blog posts, gallery and training",
    titleField: "name",
    fields: [
      { name: "name", label: "Name", required: true },
      { name: "slug", label: "Slug", help: "Leave blank to generate it from the name." },
      { name: "description", label: "Description", type: "textarea", rows: 3 },
      { name: "type", label: "Type", type: "select", required: true, options: options(CATEGORY_TYPES), side: true },
      orderField,
      activeField,
    ],
    columns: [
      { key: "name", label: "Name", link: true },
      { key: "type", label: "Type", type: "pill", labels: CATEGORY_TYPES },
      { key: "slug", label: "Slug" },
      activeColumn,
    ],
    filters: [{ name: "type", label: "Type", options: options(CATEGORY_TYPES) }],
  },
  {
    key: "blog",
    title: "Blog",
    singular: "Blog Post",
    subtitle: "Articles and stories on the Media page",
    titleField: "title",
    translations: true,
    searchPlaceholder: "Search title…",
    fields: [
      ...pressFields.slice(0, 5),
      { name: "is_featured", label: "Featured", type: "toggle", side: true, defaultValue: false },
      ...pressFields.slice(5),
    ],
    columns: [
      { key: "featured_image_url", label: "", type: "image" },
      { key: "title", label: "Title", link: true },
      { key: "category.name", label: "Category" },
      publishedColumn,
      { key: "created_at", label: "Created", type: "date" },
    ],
    filters: [publishFilter],
  },
  {
    key: "press",
    title: "Press",
    singular: "Press Release",
    subtitle: "Press releases and news coverage",
    titleField: "title",
    searchPlaceholder: "Search title…",
    fields: pressFields,
    columns: [
      { key: "featured_image_url", label: "", type: "image" },
      { key: "title", label: "Title", link: true },
      { key: "category.name", label: "Category" },
      publishedColumn,
      { key: "created_at", label: "Created", type: "date" },
    ],
    filters: [publishFilter],
  },
  {
    key: "testimonials",
    title: "Testimonials",
    singular: "Testimonial",
    subtitle: "What farmers and partners say about Manikstu",
    titleField: "name",
    fields: [
      { name: "name", label: "Name", required: true },
      { name: "location", label: "Location", placeholder: "e.g. Kalahandi, Odisha" },
      { name: "quote", label: "Quote", type: "textarea", rows: 4, required: true },
      { name: "rating", label: "Rating (1–5)", type: "number", min: 1, max: 5, step: 1, side: true },
      orderField,
      activeField,
    ],
    columns: [
      { key: "name", label: "Name", link: true },
      { key: "location", label: "Location" },
      { key: "rating", label: "Rating", type: "rating" },
      activeColumn,
    ],
  },
  {
    key: "partners",
    title: "Partners",
    singular: "Partner",
    subtitle: "Organisations Manikstu works with",
    titleField: "name",
    fields: [
      { name: "name", label: "Name", required: true },
      { name: "website_url", label: "Website URL", type: "url", placeholder: "https://…" },
      { name: "category", label: "Category", placeholder: "e.g. Incubation, Government, CSR" },
      orderField,
      activeField,
    ],
    columns: [
      { key: "name", label: "Name", link: true },
      { key: "category", label: "Category" },
      { key: "website_url", label: "Website" },
      activeColumn,
    ],
    filters: [{ name: "category", label: "Category", options: { meta: "categories" } }],
  },
  {
    key: "team",
    title: "Team",
    singular: "Team Member",
    subtitle: "People shown on the About page",
    titleField: "name",
    fields: [
      { name: "name", label: "Name", required: true },
      { name: "role", label: "Role", required: true, placeholder: "e.g. Founder & CEO" },
      { name: "bio", label: "Bio", type: "textarea", rows: 4 },
      { name: "email", label: "Email", type: "email" },
      { name: "phone", label: "Phone" },
      { name: "image", label: "Photo", type: "image", side: true },
      orderField,
      activeField,
    ],
    columns: [
      { key: "image_url", label: "", type: "image" },
      { key: "name", label: "Name", link: true },
      { key: "role", label: "Role" },
      { key: "email", label: "Email" },
      activeColumn,
    ],
  },
  {
    key: "careers",
    title: "Careers",
    singular: "Job Opening",
    subtitle: "Open positions on the Careers page",
    titleField: "title",
    searchPlaceholder: "Search job title…",
    fields: [
      { name: "title", label: "Job Title", required: true },
      { name: "department", label: "Department" },
      { name: "location", label: "Location" },
      { name: "description", label: "Description", type: "textarea", rows: 5 },
      { name: "requirements", label: "Requirements", type: "lines", rows: 5, help: "One requirement per line." },
      { name: "benefits", label: "Benefits", type: "lines", rows: 4, help: "One benefit per line." },
      { name: "type", label: "Job Type", type: "select", required: true, options: options(JOB_TYPES), defaultValue: "full_time", side: true },
      { name: "deadline", label: "Apply By", type: "date", side: true },
      activeField,
    ],
    columns: [
      { key: "title", label: "Title", link: true },
      { key: "department", label: "Department" },
      { key: "type", label: "Type", type: "pill", labels: JOB_TYPES },
      { key: "deadline", label: "Apply By", type: "date" },
      activeColumn,
    ],
    filters: [{ name: "department", label: "Department", options: { meta: "departments" } }],
  },
  {
    key: "training",
    title: "Training",
    singular: "Training Program",
    subtitle: "Programs on the Training & Awareness page",
    titleField: "title",
    fields: [
      { name: "title", label: "Title", required: true },
      { name: "description", label: "Description", type: "textarea", rows: 4 },
      { name: "icon", label: "Icon", help: "Icon name used by the website." },
      orderField,
      activeField,
    ],
    columns: [
      { key: "title", label: "Title", link: true },
      { key: "icon", label: "Icon" },
      { key: "order", label: "Order" },
      activeColumn,
    ],
  },
  {
    key: "awareness",
    title: "Awareness",
    singular: "Awareness Initiative",
    subtitle: "Awareness initiatives on the Training & Awareness page",
    titleField: "title",
    fields: [
      { name: "title", label: "Title", required: true },
      { name: "description", label: "Description", type: "textarea", rows: 4 },
      { name: "icon", label: "Icon", help: "Icon name used by the website." },
      orderField,
      activeField,
    ],
    columns: [
      { key: "title", label: "Title", link: true },
      { key: "icon", label: "Icon" },
      { key: "order", label: "Order" },
      activeColumn,
    ],
  },
  {
    key: "users",
    title: "Users",
    singular: "User",
    subtitle: "Staff accounts and their roles",
    titleField: "name",
    developerOnly: true,
    searchPlaceholder: "Search name or email…",
    fields: [
      { name: "name", label: "Name", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "password", label: "Password", type: "password", help: "At least 8 characters. When editing, leave blank to keep the current one." },
      { name: "password_confirmation", label: "Confirm Password", type: "password" },
      { name: "role", label: "Role", type: "select", required: true, options: options(ROLES), defaultValue: "hr", side: true },
      activeField,
    ],
    columns: [
      { key: "name", label: "Name", link: true },
      { key: "email", label: "Email" },
      { key: "role", label: "Role", type: "pill", labels: ROLES },
      activeColumn,
    ],
    filters: [{ name: "role", label: "Role", options: options(ROLES) }],
  },
];

export function getSection(key: string): SectionDef | undefined {
  return SECTIONS.find((s) => s.key === key);
}

/** Site settings, grouped the way the form shows them. */
export const SETTINGS_GROUPS: { title: string; fields: FieldDef[] }[] = [
  {
    title: "General",
    fields: [
      { name: "site_name", label: "Site Name" },
      { name: "site_tagline", label: "Tagline" },
    ],
  },
  {
    title: "Contact",
    fields: [
      { name: "phone", label: "Phone" },
      { name: "whatsapp", label: "WhatsApp Number" },
      { name: "email", label: "Email", type: "email" },
      { name: "secondary_email", label: "Secondary Email", type: "email" },
      { name: "address", label: "Address", type: "textarea", rows: 3 },
    ],
  },
  {
    title: "Social Links",
    fields: [
      { name: "facebook", label: "Facebook", placeholder: "https://facebook.com/…", help: "Full link, or # for none." },
      { name: "instagram", label: "Instagram", placeholder: "https://instagram.com/…", help: "Full link, or # for none." },
      { name: "linkedin", label: "LinkedIn", placeholder: "https://linkedin.com/…", help: "Full link, or # for none." },
      { name: "twitter", label: "X / Twitter", placeholder: "https://x.com/…", help: "Full link, or # for none." },
      { name: "youtube", label: "YouTube", placeholder: "https://youtube.com/…", help: "Full link, or # for none." },
    ],
  },
  {
    title: "About & Footer",
    fields: [
      { name: "about_text", label: "About Text", type: "textarea", rows: 4 },
      { name: "footer_text", label: "Footer Text", type: "textarea", rows: 3 },
    ],
  },
  {
    title: "Legal",
    fields: [
      { name: "gst_number", label: "GST Number" },
      { name: "cin_number", label: "CIN Number" },
    ],
  },
];

export const SETTINGS_KEYS = SETTINGS_GROUPS.flatMap((g) => g.fields.map((f) => f.name));
