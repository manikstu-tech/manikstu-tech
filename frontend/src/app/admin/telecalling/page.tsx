import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  AlertTriangle, ArrowDown, ArrowUp, Calendar, CheckCircle2, ChevronRight, Clock, MessageSquare, Package,
  Phone, PhoneCall, ShoppingBag, Sun, Truck, UserPlus, Users, type LucideIcon,
} from "lucide-react";
import { Pill } from "@/components/admin/AdminUi";
import { GoatSolidIcon } from "@/components/icons/BenefitIcons";
import { Donut, ORDER_TONES, PRIORITY_TONES, rowClass, rupees, tableClass, theadClass, ViewLink } from "@/components/telecalling/TcUi";
import { requireTelecaller } from "@/lib/admin/auth";

export const metadata: Metadata = { title: "Telecalling Dashboard" };

const BASE = "/admin/telecalling";

/* ---- static demo content matching the reference dashboard ---- */
const STATS: { label: string; value: string; delta: string; up: boolean; icon: LucideIcon; tint: string }[] = [
  { label: "Today's Orders", value: "128", delta: "18%", up: true, icon: ShoppingBag, tint: "bg-manikstu-gold/15 text-[#B4711A]" },
  { label: "Pending Calls", value: "34", delta: "12%", up: true, icon: Phone, tint: "bg-manikstu-green/12 text-manikstu-leaf" },
  { label: "Delivery Issues", value: "12", delta: "5%", up: false, icon: Truck, tint: "bg-manikstu-red/10 text-manikstu-red" },
  { label: "New Franchise Leads", value: "21", delta: "8%", up: true, icon: Users, tint: "bg-[#5B8DEF]/12 text-[#3E6FD0]" },
];

const PRIORITY: { dot: string; text: string; pri: string }[] = [
  { dot: "bg-manikstu-red", text: "5 products not delivered", pri: "High" },
  { dot: "bg-manikstu-gold", text: "4 seller confirmations pending", pri: "Medium" },
  { dot: "bg-manikstu-gold", text: "3 farmer callbacks due", pri: "Medium" },
  { dot: "bg-manikstu-green", text: "8 new franchise enquiries", pri: "Low" },
];

const ACTIVITY: { icon: LucideIcon; tint: string; title: string; sub: string; time: string }[] = [
  { icon: Truck, tint: "bg-[#5B8DEF]/12 text-[#3E6FD0]", title: "Order #MS-2026-00482 is in transit", sub: "Ramesh Kumar · Goat Feed", time: "10:42 AM" },
  { icon: MessageSquare, tint: "bg-manikstu-red/10 text-manikstu-red", title: "Complaint #CMP-10245 opened", sub: "Ramesh Kumar · Not received", time: "10:15 AM" },
  { icon: UserPlus, tint: "bg-manikstu-green/12 text-manikstu-leaf", title: "New franchise lead from website", sub: "Suresh Kumar · Mayurbhanj", time: "09:30 AM" },
  { icon: CheckCircle2, tint: "bg-manikstu-green/12 text-manikstu-leaf", title: "Order #MS-2026-00480 delivered", sub: "Mohan Nayak · Equipment Set", time: "Yesterday, 04:20 PM" },
];

const TEAM: { label: string; value: string; delta: string }[] = [
  { label: "Calls Made", value: "47", delta: "12%" },
  { label: "Connected", value: "32", delta: "8%" },
  { label: "Follow-ups Done", value: "18", delta: "9%" },
  { label: "Complaints Handled", value: "7", delta: "22%" },
];

const ORDERS: { id: string; farmer: string; product: string; amount: number; status: string; date: string }[] = [
  { id: "MS-2026-00482", farmer: "Ramesh Kumar", product: "Goat Feed - 100 KG", amount: 2400, status: "In Transit", date: "01 Sep 2026" },
  { id: "MS-2026-00481", farmer: "Sita Tudu", product: "Goat Medicine", amount: 1280, status: "Issue Reported", date: "01 Sep 2026" },
  { id: "MS-2026-00480", farmer: "Mohan Nayak", product: "Equipment Set", amount: 3560, status: "Delivered", date: "31 Aug 2026" },
  { id: "MS-2026-00479", farmer: "Ganga Majhi", product: "Mineral Mixture", amount: 950, status: "Pending", date: "31 Aug 2026" },
  { id: "MS-2026-00478", farmer: "Laxman Sahu", product: "Vaccination Kit", amount: 1750, status: "Confirmed", date: "31 Aug 2026" },
];

const STATUS_SEGMENTS = [
  { label: "Delivered", count: 72, pct: 56, color: "#4A8C3F" },
  { label: "In Transit", count: 28, pct: 22, color: "#5B8DEF" },
  { label: "Pending", count: 14, pct: 11, color: "#E0A33A" },
  { label: "Cancelled", count: 8, pct: 6, color: "#D4342C" },
  { label: "Issue Reported", count: 6, pct: 5, color: "#E88AA6" },
];

/* ---- small decorative bits ---- */
function Hills() {
  return (
    <svg viewBox="0 0 200 60" preserveAspectRatio="none" aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-10 w-full text-manikstu-gold opacity-[0.13]" fill="currentColor">
      <path d="M0 60V42q26-20 52-8t52 2 44-14 52 14v24Z" />
    </svg>
  );
}

function Gauge({ pct }: { pct: number }) {
  const r = 26;
  const c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 64 64" className="h-16 w-16 shrink-0">
      <g transform="rotate(-90 32 32)">
        <circle cx="32" cy="32" r={r} fill="none" stroke="#EDE9E1" strokeWidth="7" />
        <circle cx="32" cy="32" r={r} fill="none" stroke="#4A8C3F" strokeWidth="7" strokeLinecap="round" strokeDasharray={`${(pct / 100) * c} ${c}`} />
      </g>
      <text x="32" y="33" textAnchor="middle" dominantBaseline="middle" className="fill-charcoal font-heading font-bold" style={{ fontSize: "15px" }}>
        {pct}%
      </text>
    </svg>
  );
}

function MiniBars() {
  const bars = [38, 56, 30, 64, 48, 72];
  return (
    <svg viewBox="0 0 84 40" aria-hidden className="h-10 w-24 shrink-0 text-manikstu-green" fill="currentColor">
      {bars.map((h, i) => (
        <rect key={i} x={i * 14 + 2} y={40 - (h / 72) * 36} width="9" height={(h / 72) * 36} rx="2" opacity={0.35 + (i / bars.length) * 0.55} />
      ))}
    </svg>
  );
}

function CardHead({ icon: Icon, title, link }: { icon: LucideIcon; title: string; link?: { label: string; href: string } }) {
  return (
    <div className="flex items-center justify-between border-b border-[#F0ECE2] px-5 py-3.5">
      <h2 className="flex items-center gap-2 text-[15px] font-bold text-charcoal">
        <Icon className="h-[18px] w-[18px] text-manikstu-leaf" />
        {title}
      </h2>
      {link && (
        <Link href={link.href} className="text-xs font-semibold text-manikstu-green hover:underline">
          {link.label}
        </Link>
      )}
    </div>
  );
}

function Section({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`overflow-hidden rounded-2xl border border-[#ECE7DC] bg-white shadow-sm ${className}`}>{children}</section>;
}

export default async function TelecallingDashboard() {
  const user = await requireTelecaller();
  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";
  const firstName = user.name.split(" ")[0];
  const dateStr = now.toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" });
  const weekday = now.toLocaleDateString("en-IN", { weekday: "long" });

  return (
    <>
      {/* Header */}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="flex items-center gap-2 font-heading text-3xl font-bold text-[#2D5016]">
            {greeting}, {firstName}!
            <Sun className="h-6 w-6 text-manikstu-gold" />
          </h1>
          <p className="mt-1 text-sm text-grey">Here&apos;s what needs your attention today.</p>
        </div>
        <div className="flex items-center gap-2.5 self-start rounded-xl border border-[#E8E2D6] bg-white px-3.5 py-2 shadow-sm">
          <Calendar className="h-4 w-4 shrink-0 text-manikstu-green" />
          <div className="text-right leading-tight">
            <p className="text-sm font-semibold text-charcoal">{dateStr}</p>
            <p className="text-xs text-grey">{weekday}</p>
          </div>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {STATS.map(({ label, value, delta, up, icon: Icon, tint }) => (
          <div key={label} className="relative overflow-hidden rounded-2xl border border-[#ECE7DC] bg-white p-5 shadow-sm">
            <Hills />
            <div className="relative flex items-center gap-2.5">
              <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${tint}`}>
                <Icon className="h-5 w-5" />
              </span>
              <span className="text-[13px] font-semibold text-grey">{label}</span>
            </div>
            <p className="relative mt-3 font-heading text-4xl font-bold lining-nums tabular-nums text-charcoal">{value}</p>
            <p className={`relative mt-2 flex items-center gap-1 text-xs font-semibold ${up ? "text-manikstu-green" : "text-manikstu-red"}`}>
              {up ? <ArrowUp className="h-3.5 w-3.5" /> : <ArrowDown className="h-3.5 w-3.5" />}
              {delta}
              <span className="font-medium text-grey">from yesterday</span>
            </p>
          </div>
        ))}
      </div>

      {/* Priority Actions · Recent Activity · Team Today */}
      <div className="mt-5 grid items-start gap-5 lg:grid-cols-3">
        {/* Priority Actions */}
        <Section>
          <CardHead icon={AlertTriangle} title="Priority Actions" link={{ label: "View All", href: `${BASE}/complaints` }} />
          <ul className="space-y-2.5 p-4">
            {PRIORITY.map((p) => (
              <li key={p.text} className="flex items-center gap-3 rounded-xl border border-[#F0ECE2] px-3 py-2.5">
                <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${p.dot}`} />
                <span className="min-w-0 flex-1 truncate text-sm font-medium text-charcoal">{p.text}</span>
                <Pill tone={PRIORITY_TONES[p.pri] ?? "grey"}>{p.pri}</Pill>
                <ChevronRight className="h-4 w-4 shrink-0 text-grey" />
              </li>
            ))}
          </ul>
        </Section>

        {/* Recent Activity */}
        <Section>
          <CardHead icon={Clock} title="Recent Activity" link={{ label: "View All", href: `${BASE}/calls` }} />
          <ul className="divide-y divide-[#F4F1EA] px-2">
            {ACTIVITY.map((a) => {
              const Icon = a.icon;
              return (
                <li key={a.title} className="flex items-start gap-3 px-3 py-3">
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${a.tint}`}>
                    <Icon className="h-[18px] w-[18px]" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-semibold text-charcoal">{a.title}</p>
                    <p className="truncate text-xs text-grey">{a.sub}</p>
                  </div>
                  <span className="shrink-0 whitespace-nowrap text-[11px] text-[#9A9A8E]">{a.time}</span>
                </li>
              );
            })}
          </ul>
        </Section>

        {/* Telecalling Team Today */}
        <Section>
          <CardHead icon={PhoneCall} title="Telecalling Team Today" link={{ label: "View Team", href: `${BASE}/settings` }} />
          <div className="grid grid-cols-2 gap-3 p-4">
            {TEAM.map((t) => (
              <div key={t.label} className="rounded-xl bg-manikstu-cream/40 p-3">
                <p className="text-[11px] font-medium text-grey">{t.label}</p>
                <p className="mt-0.5 font-heading text-2xl font-bold lining-nums text-charcoal">{t.value}</p>
                <p className="mt-0.5 flex items-center gap-0.5 text-[11px] font-semibold text-manikstu-green">
                  <ArrowUp className="h-3 w-3" />
                  {t.delta}
                </p>
              </div>
            ))}
          </div>
          <div className="mx-4 mb-4 flex items-center gap-3 rounded-xl border border-[#F0ECE2] bg-white p-3.5">
            <Gauge pct={68} />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-charcoal">Team Productivity</p>
              <p className="text-xs text-grey">Good progress! Keep it up.</p>
            </div>
            <MiniBars />
          </div>
        </Section>
      </div>

      {/* Recent Orders · Order Status + Quote */}
      <div className="mt-5 grid items-start gap-5 lg:grid-cols-[1.7fr_1fr]">
        <Section>
          <CardHead icon={Package} title="Recent Orders" link={{ label: "View All", href: `${BASE}/orders` }} />
          <div className="overflow-x-auto">
            <table className={tableClass}>
              <thead>
                <tr className={theadClass}>
                  {["Order ID", "Farmer", "Product", "Amount", "Status", "Date", "Action"].map((h) => (
                    <th key={h} className="px-5 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ORDERS.map((o) => (
                  <tr key={o.id} className={rowClass}>
                    <td className="whitespace-nowrap px-5 py-3 font-semibold text-charcoal">{o.id}</td>
                    <td className="whitespace-nowrap px-5 py-3">{o.farmer}</td>
                    <td className="px-5 py-3 text-grey">{o.product}</td>
                    <td className="whitespace-nowrap px-5 py-3 font-semibold">{rupees(o.amount)}</td>
                    <td className="px-5 py-3"><Pill tone={ORDER_TONES[o.status] ?? "grey"}>{o.status}</Pill></td>
                    <td className="whitespace-nowrap px-5 py-3 text-grey">{o.date}</td>
                    <td className="px-5 py-3"><ViewLink href={`${BASE}/orders`} label={`View order ${o.id}`} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <div className="space-y-5">
          <Section>
            <CardHead icon={Package} title="Order Status Overview" />
            <div className="p-5">
              <Donut total={128} caption="Total Orders" segments={STATUS_SEGMENTS} />
            </div>
          </Section>

          {/* Quote */}
          <div className="relative overflow-hidden rounded-2xl border border-[#ECE7DC] bg-manikstu-cream/40 p-5 shadow-sm">
            <GoatSolidIcon aria-hidden className="pointer-events-none absolute -bottom-3 -right-2 h-24 w-24 text-manikstu-leaf opacity-[0.08]" />
            <p className="relative font-heading text-base italic leading-relaxed text-charcoal">
              &ldquo;Every call is a step towards a stronger farmer community.&rdquo;
            </p>
            <p className="relative mt-2 text-sm font-semibold text-manikstu-leaf">— Manikstu</p>
          </div>
        </div>
      </div>
    </>
  );
}
