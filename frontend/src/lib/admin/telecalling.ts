import "server-only";
import { adminFetch } from "./api";

// Shapes of the telecalling API. Apart from the dashboard, notifications and
// profile, the rows are the demo data the Blade panel shows (TelecallingDemo).

export interface Lead {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  type: string | null;
  message: string;
  status: string;
  created_at: string;
}

export interface TcDashboard {
  stats: { new: number; contacted: number; converted: number; closed: number; total: number; today: number };
  queue: Lead[];
  recent: Lead[];
}

export interface TcNotification {
  icon: string;
  title: string;
  text: string;
  time: string;
  unread: boolean;
}

export interface TcNotifications {
  items: TcNotification[];
  unread: number;
}

export interface Farmer {
  name: string;
  phone: string;
  location: string;
  goats: number;
  orders: number;
  status: string;
}

export interface TcOrder {
  id: string;
  farmer: string;
  phone: string;
  location: string;
  product: string;
  qty: string;
  seller: string;
  amount: number;
  payment: string;
  status: string;
  date: string;
}

export interface Step {
  label: string;
  note: string;
}

export interface Complaint {
  id: string;
  farmer: string;
  order: string;
  issue: string;
  priority: string;
  status: string;
  date: string;
  report: string;
}

export interface ComplaintDetail extends Omit<Complaint, "farmer"> {
  farmer: Farmer | null;
  order_details: TcOrder | null;
  status_steps: Step[];
  status_done: number;
  invest_steps: Step[];
  invest_done: number;
}

export interface FranchiseLead {
  id: string;
  name: string;
  mobile: string;
  location: string;
  investment: string;
  status: string;
  date: string;
  experience: string;
  land: string;
  farmSize: string;
  source: string;
  assigned: string;
  next: { title: string; date: string; location: string };
  notes: string;
  calls: { time: string; by: string; activity: string; remarks: string }[];
}

export interface TcCalls {
  queue: { name: string; phone: string; note: string; tag: string; due: string }[];
  recent: { name: string; time: string; type: string; duration: string }[];
}

export interface Delivery {
  id: string;
  farmer: string;
  location: string;
  product: string;
  status: string;
  expected: string;
}

export interface TcReports {
  kpis: { label: string; value: string; delta: string; up: boolean; icon: string; tint: string }[];
  ordersPerMonth: { month: string; value: number }[];
  statusBreakdown: { total: number; items: { label: string; count: number; pct: number; color: string }[] };
  topProducts: { product: string; units: number; revenue: number }[];
}

export interface TcProfile {
  name: string;
  email: string;
  role: string;
  phone: string | null;
  region: string | null;
}

export interface TcSettings {
  profile: TcProfile;
  notifications: { label: string; desc: string; on: boolean }[];
  team: { name: string; role: string; region: string; status: string }[];
}

type Envelope<T> = { data: T; meta?: Record<string, number> };

const get = <T>(path: string) => adminFetch<Envelope<T>>(`/telecalling${path}`);

export const getTcDashboard = async () => (await get<TcDashboard>("/dashboard")).data;
export const getTcNotifications = async () => (await get<TcNotifications>("/notifications")).data;
export const getTcFarmers = async () => (await get<Farmer[]>("/farmers")).data;
export const getTcCalls = async () => (await get<TcCalls>("/calls")).data;
export const getTcDelivery = async () => (await get<Delivery[]>("/delivery")).data;
export const getTcReports = async () => (await get<TcReports>("/reports")).data;
export const getTcSettings = async () => (await get<TcSettings>("/settings")).data;

/** A status-filtered demo list; meta.total counts the unfiltered list. */
export function getTcList<T>(key: "orders" | "complaints" | "franchise", status?: string) {
  const query = status && status !== "All" ? `?status=${encodeURIComponent(status)}` : "";
  return get<T[]>(`/${key}${query}`);
}

export async function getTcItem<T>(key: "orders" | "complaints" | "franchise", id: string): Promise<T> {
  return (await get<T>(`/${key}/${encodeURIComponent(id)}`)).data;
}

export async function markTcNotificationsRead(): Promise<void> {
  await adminFetch("/telecalling/notifications/read", { method: "POST" });
}

export async function updateTcProfile(input: FormData): Promise<TcProfile> {
  const out = new FormData();
  for (const key of ["name", "phone", "region"]) out.set(key, String(input.get(key) ?? ""));
  return (await adminFetch<{ data: TcProfile }>("/telecalling/profile", { method: "POST", body: out })).data;
}
