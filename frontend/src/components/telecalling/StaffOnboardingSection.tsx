"use client";

import { useState, type FormEvent } from "react";
import {
  Calendar, Check, CheckCircle2, Clock, Eye, EyeOff, Filter,
  Loader2, Mail, MapPin, Phone, Plus, Search, ShieldCheck, Sparkles, UserPlus, Users, X
} from "lucide-react";
import { initials } from "./TcUi";

export interface OnboardedStaff {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "Telecaller" | "Telesales Executive" | "Field Officer" | "Customer Support" | "HR Specialist";
  region: string;
  supervisor: string;
  status: "Active" | "In Training" | "Docs Pending";
  joinedDate: string;
  notes?: string;
}

const INITIAL_STAFF: OnboardedStaff[] = [
  {
    id: "STF-2026-001",
    name: "Priya Das",
    email: "priya.das@manikstu.com",
    phone: "+91 98765 12345",
    role: "Telecaller",
    region: "Mayurbhanj",
    supervisor: "Ramesh Kumar",
    status: "Active",
    joinedDate: "2026-09-20",
    notes: "Completed initial telecalling & product pitch training."
  },
  {
    id: "STF-2026-002",
    name: "Amitabh Jena",
    email: "amitabh.j@manikstu.com",
    phone: "+91 98765 67890",
    role: "Field Officer",
    region: "Keonjhar",
    supervisor: "Anita Mohanty",
    status: "In Training",
    joinedDate: "2026-09-18",
    notes: "Undergoing village outreach orientation."
  },
  {
    id: "STF-2026-003",
    name: "Smita Pattnaik",
    email: "smita.p@manikstu.com",
    phone: "+91 98765 54321",
    role: "Telesales Executive",
    region: "Cuttack",
    supervisor: "Prakash Chandra",
    status: "Active",
    joinedDate: "2026-09-15",
    notes: "Specialized in Goat Feed & Farmer Kit onboarding."
  },
  {
    id: "STF-2026-004",
    name: "Rajesh Mohanta",
    email: "rajesh.m@manikstu.com",
    phone: "+91 98765 99887",
    role: "Customer Support",
    region: "Balasore",
    supervisor: "Ramesh Kumar",
    status: "Docs Pending",
    joinedDate: "2026-09-21",
    notes: "KYC documents awaiting final verification."
  }
];

const ROLES = [
  "Telecaller",
  "Telesales Executive",
  "Field Officer",
  "Customer Support",
  "HR Specialist"
] as const;

const REGIONS = [
  "Mayurbhanj",
  "Keonjhar",
  "Balasore",
  "Cuttack",
  "Bhubaneswar",
  "Sambalpur",
  "Puri",
  "Ganjam"
];

const SUPERVISORS = [
  "Ramesh Kumar (Lead Telecaller)",
  "Anita Mohanty (Field Operations)",
  "Prakash Chandra (Sales Manager)",
  "Sanjay Rout (Regional Head)"
];

const STATUS_CLASSES: Record<OnboardedStaff["status"], string> = {
  Active: "bg-manikstu-green/12 text-manikstu-leaf border-manikstu-green/20",
  "In Training": "bg-manikstu-gold/15 text-[#8A6414] border-manikstu-gold/30",
  "Docs Pending": "bg-[#5B8DEF]/15 text-[#3E6FD0] border-[#5B8DEF]/30"
};

export default function StaffOnboardingSection() {
  const [staffList, setStaffList] = useState<OnboardedStaff[]>(INITIAL_STAFF);
  const [showForm, setShowForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "Telecaller" as OnboardedStaff["role"],
    region: "Mayurbhanj",
    supervisor: "Ramesh Kumar (Lead Telecaller)",
    password: "",
    status: "Active" as OnboardedStaff["status"],
    joinedDate: new Date().toISOString().slice(0, 10),
    notes: ""
  });

  const filteredStaff = staffList.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      s.region.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === "All" || s.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const totalStaff = staffList.length;
  const activeStaff = staffList.filter((s) => s.status === "Active").length;
  const trainingStaff = staffList.filter((s) => s.status === "In Training").length;
  const telecallersCount = staffList.filter((s) => s.role === "Telecaller").length;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) return;

    setLoading(true);
    setTimeout(() => {
      const newMember: OnboardedStaff = {
        id: `STF-2026-00${staffList.length + 1}`,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        role: formData.role,
        region: formData.region,
        supervisor: formData.supervisor.split(" (")[0],
        status: formData.status,
        joinedDate: formData.joinedDate,
        notes: formData.notes
      };

      setStaffList([newMember, ...staffList]);
      setLoading(false);
      setSuccessMessage(`Staff member ${formData.name} has been successfully onboarded!`);

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        role: "Telecaller",
        region: "Mayurbhanj",
        supervisor: "Ramesh Kumar (Lead Telecaller)",
        password: "",
        status: "Active",
        joinedDate: new Date().toISOString().slice(0, 10),
        notes: ""
      });

      // Hide notification after 4s
      setTimeout(() => setSuccessMessage(null), 4000);
    }, 600);
  };

  return (
    <section className="mt-8 overflow-hidden rounded-2xl border border-[#ECE7DC] bg-white shadow-sm">
      {/* Header Bar */}
      <div className="flex flex-col gap-4 border-b border-[#F0ECE2] bg-[#FBFAF7] px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-manikstu-green/12 text-manikstu-leaf">
              <UserPlus className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-lg font-bold text-charcoal">Staff Onboarding Directory</h2>
              <p className="text-xs text-grey">Onboard and manage telecalling & operations staff members</p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowForm((v) => !v)}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-manikstu-green px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-manikstu-leaf focus:outline-none focus:ring-2 focus:ring-manikstu-green/40"
        >
          {showForm ? (
            <>
              <X className="h-4 w-4" /> Close Form
            </>
          ) : (
            <>
              <Plus className="h-4 w-4" /> Onboard New Staff
            </>
          )}
        </button>
      </div>

      {/* Quick Summary Badges */}
      <div className="grid grid-cols-2 gap-3 border-b border-[#F0ECE2] bg-manikstu-cream/30 p-4 sm:grid-cols-4">
        <div className="flex items-center gap-3 rounded-xl border border-[#F0ECE2] bg-white p-3 shadow-2xs">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#5B8DEF]/12 text-[#3E6FD0]">
            <Users className="h-4 w-4" />
          </span>
          <div>
            <p className="text-[11px] font-semibold text-grey">Total Staff</p>
            <p className="font-heading text-xl font-bold text-charcoal">{totalStaff}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-xl border border-[#F0ECE2] bg-white p-3 shadow-2xs">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-manikstu-green/12 text-manikstu-leaf">
            <CheckCircle2 className="h-4 w-4" />
          </span>
          <div>
            <p className="text-[11px] font-semibold text-grey">Active Staff</p>
            <p className="font-heading text-xl font-bold text-charcoal">{activeStaff}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-xl border border-[#F0ECE2] bg-white p-3 shadow-2xs">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-manikstu-gold/15 text-[#8A6414]">
            <Clock className="h-4 w-4" />
          </span>
          <div>
            <p className="text-[11px] font-semibold text-grey">In Training</p>
            <p className="font-heading text-xl font-bold text-charcoal">{trainingStaff}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-xl border border-[#F0ECE2] bg-white p-3 shadow-2xs">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-purple-100 text-purple-700">
            <ShieldCheck className="h-4 w-4" />
          </span>
          <div>
            <p className="text-[11px] font-semibold text-grey">Telecallers</p>
            <p className="font-heading text-xl font-bold text-charcoal">{telecallersCount}</p>
          </div>
        </div>
      </div>

      {/* Success Notification Banner */}
      {successMessage && (
        <div role="status" className="flex items-center gap-2 border-b border-manikstu-green/20 bg-manikstu-green/10 px-6 py-3 text-sm font-medium text-manikstu-leaf">
          <Check className="h-4 w-4 shrink-0 text-manikstu-leaf" />
          {successMessage}
        </div>
      )}

      {/* Expandable Staff Onboarding Form */}
      {showForm && (
        <div className="border-b border-[#F0ECE2] bg-[#FAF8F3] p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-base font-bold text-charcoal">
              <Sparkles className="h-4 w-4 text-manikstu-gold" />
              New Staff Onboarding Form
            </h3>
            <span className="text-xs text-grey">Fields marked * are required</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-charcoal">
                  Full Name <span className="text-manikstu-red">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ananya Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1.5 h-10 w-full rounded-xl border border-[#E8E2D6] bg-white px-3.5 text-sm text-charcoal outline-none transition focus:border-manikstu-green focus:ring-2 focus:ring-manikstu-green/20"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-charcoal">
                  Email Address <span className="text-manikstu-red">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. ananya@manikstu.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-1.5 h-10 w-full rounded-xl border border-[#E8E2D6] bg-white px-3.5 text-sm text-charcoal outline-none transition focus:border-manikstu-green focus:ring-2 focus:ring-manikstu-green/20"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-semibold text-charcoal">
                  Phone Number <span className="text-manikstu-red">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="mt-1.5 h-10 w-full rounded-xl border border-[#E8E2D6] bg-white px-3.5 text-sm text-charcoal outline-none transition focus:border-manikstu-green focus:ring-2 focus:ring-manikstu-green/20"
                />
              </div>

              {/* Role */}
              <div>
                <label className="block text-xs font-semibold text-charcoal">
                  Role / Position <span className="text-manikstu-red">*</span>
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value as OnboardedStaff["role"] })}
                  className="mt-1.5 h-10 w-full rounded-xl border border-[#E8E2D6] bg-white px-3.5 text-sm text-charcoal outline-none transition focus:border-manikstu-green focus:ring-2 focus:ring-manikstu-green/20"
                >
                  {ROLES.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              {/* Region */}
              <div>
                <label className="block text-xs font-semibold text-charcoal">Region / Territory</label>
                <select
                  value={formData.region}
                  onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                  className="mt-1.5 h-10 w-full rounded-xl border border-[#E8E2D6] bg-white px-3.5 text-sm text-charcoal outline-none transition focus:border-manikstu-green focus:ring-2 focus:ring-manikstu-green/20"
                >
                  {REGIONS.map((reg) => (
                    <option key={reg} value={reg}>
                      {reg}
                    </option>
                  ))}
                </select>
              </div>

              {/* Supervisor */}
              <div>
                <label className="block text-xs font-semibold text-charcoal">Assigned Supervisor / Lead</label>
                <select
                  value={formData.supervisor}
                  onChange={(e) => setFormData({ ...formData, supervisor: e.target.value })}
                  className="mt-1.5 h-10 w-full rounded-xl border border-[#E8E2D6] bg-white px-3.5 text-sm text-charcoal outline-none transition focus:border-manikstu-green focus:ring-2 focus:ring-manikstu-green/20"
                >
                  {SUPERVISORS.map((sup) => (
                    <option key={sup} value={sup}>
                      {sup}
                    </option>
                  ))}
                </select>
              </div>

              {/* Password Option */}
              <div>
                <label className="block text-xs font-semibold text-charcoal">
                  Portal Password <span className="text-manikstu-red">*</span>
                </label>
                <div className="relative mt-1.5">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    minLength={8}
                    placeholder="Set account password (min 8 chars)"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="h-10 w-full rounded-xl border border-[#E8E2D6] bg-white pl-3.5 pr-10 text-sm text-charcoal outline-none transition focus:border-manikstu-green focus:ring-2 focus:ring-manikstu-green/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-grey hover:text-charcoal focus:outline-none"
                    title={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="block text-xs font-semibold text-charcoal">Initial Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as OnboardedStaff["status"] })}
                  className="mt-1.5 h-10 w-full rounded-xl border border-[#E8E2D6] bg-white px-3.5 text-sm text-charcoal outline-none transition focus:border-manikstu-green focus:ring-2 focus:ring-manikstu-green/20"
                >
                  <option value="Active">Active</option>
                  <option value="In Training">In Training</option>
                  <option value="Docs Pending">Docs Pending</option>
                </select>
              </div>

              {/* Joining Date */}
              <div>
                <label className="block text-xs font-semibold text-charcoal">Joining Date</label>
                <input
                  type="date"
                  value={formData.joinedDate}
                  onChange={(e) => setFormData({ ...formData, joinedDate: e.target.value })}
                  className="mt-1.5 h-10 w-full rounded-xl border border-[#E8E2D6] bg-white px-3.5 text-sm text-charcoal outline-none transition focus:border-manikstu-green focus:ring-2 focus:ring-manikstu-green/20"
                />
              </div>

              {/* Notes */}
              <div className="sm:col-span-2 lg:col-span-3">
                <label className="block text-xs font-semibold text-charcoal">Onboarding Notes / Training Instructions</label>
                <textarea
                  rows={2}
                  placeholder="Add any specific assignments, system access permissions, or training notes..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-[#E8E2D6] bg-white p-3 text-sm text-charcoal outline-none transition focus:border-manikstu-green focus:ring-2 focus:ring-manikstu-green/20"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-xl border border-[#E8E2D6] bg-white px-4 py-2 text-sm font-semibold text-grey hover:bg-[#F5F2EA]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-xl bg-manikstu-green px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-manikstu-leaf disabled:opacity-70"
              >
                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                {loading ? "Onboarding Staff..." : "Complete Onboarding"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Directory Filter & Search Bar */}
      <div className="flex flex-col gap-3 border-b border-[#F0ECE2] px-6 py-3.5 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-xs">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-grey" />
          <input
            type="text"
            placeholder="Search staff by name or region..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 w-full rounded-xl border border-[#E8E2D6] bg-manikstu-cream/40 pl-9 pr-3 text-xs text-charcoal outline-none transition placeholder:text-grey/60 focus:border-manikstu-green focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="h-3.5 w-3.5 text-grey" />
          <span className="text-xs font-semibold text-grey">Role:</span>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="h-9 rounded-xl border border-[#E8E2D6] bg-white px-3 text-xs font-medium text-charcoal outline-none focus:border-manikstu-green"
          >
            <option value="All">All Roles</option>
            {ROLES.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Onboarded Staff Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-sm">
          <thead>
            <tr className="bg-[#FBF8F1] text-left text-[11px] font-bold uppercase tracking-[0.06em] text-[#5A6B4E]">
              <th className="px-6 py-3">Staff Member</th>
              <th className="px-5 py-3">Role & Region</th>
              <th className="px-5 py-3">Supervisor</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Joined Date</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F4F1EA]">
            {filteredStaff.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-10 text-center text-sm text-grey">
                  No onboarded staff members match your criteria.
                </td>
              </tr>
            ) : (
              filteredStaff.map((staff) => (
                <tr key={staff.id} className="transition hover:bg-[#FBF9F4]">
                  {/* Staff Info */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-manikstu-green/10 text-xs font-bold text-manikstu-leaf">
                        {initials(staff.name)}
                      </span>
                      <div>
                        <p className="font-semibold text-charcoal">{staff.name}</p>
                        <div className="flex items-center gap-3 text-xs text-grey">
                          <span className="flex items-center gap-1">
                            <Mail className="h-3 w-3 text-grey/70" /> {staff.email}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Role & Region */}
                  <td className="px-5 py-4">
                    <div className="space-y-1">
                      <span className="inline-block rounded-md bg-[#F0ECE2] px-2 py-0.5 text-xs font-semibold text-charcoal">
                        {staff.role}
                      </span>
                      <p className="flex items-center gap-1 text-xs text-grey">
                        <MapPin className="h-3 w-3 text-manikstu-leaf" /> {staff.region}
                      </p>
                    </div>
                  </td>

                  {/* Supervisor */}
                  <td className="px-5 py-4 font-medium text-charcoal">
                    {staff.supervisor}
                  </td>

                  {/* Status */}
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${STATUS_CLASSES[staff.status]}`}>
                      <span className="h-1.5 w-1.5 rounded-full fill-current" />
                      {staff.status}
                    </span>
                  </td>

                  {/* Joined Date */}
                  <td className="whitespace-nowrap px-5 py-4 text-xs font-medium text-grey">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-grey/70" />
                      {staff.joinedDate}
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <a
                        href={`tel:${staff.phone}`}
                        title={`Call ${staff.name}`}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#ECE7DC] bg-white text-grey hover:border-manikstu-green/40 hover:text-manikstu-green"
                      >
                        <Phone className="h-3.5 w-3.5" />
                      </a>
                      <a
                        href={`mailto:${staff.email}`}
                        title={`Email ${staff.name}`}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#ECE7DC] bg-white text-grey hover:border-manikstu-green/40 hover:text-manikstu-green"
                      >
                        <Mail className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
