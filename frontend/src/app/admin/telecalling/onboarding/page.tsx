import type { Metadata } from "next";
import { CheckCircle2, FileCheck, ShieldCheck, UserCheck } from "lucide-react";
import { PageHeader } from "@/components/admin/AdminUi";
import StaffOnboardingSection from "@/components/telecalling/StaffOnboardingSection";
import { requireTelecaller } from "@/lib/admin/auth";

export const metadata: Metadata = { title: "Staff Onboarding" };

const ONBOARDING_STEPS = [
  {
    step: "01",
    title: "Basic Info & Identity",
    desc: "Collect full name, contact number, official email, and identity proof.",
    icon: UserCheck,
    color: "bg-manikstu-green/12 text-manikstu-leaf"
  },
  {
    step: "02",
    title: "Region & Role Assignment",
    desc: "Allocate operating district, telecalling queue, or field territory.",
    icon: ShieldCheck,
    color: "bg-manikstu-gold/15 text-[#8A6414]"
  },
  {
    step: "03",
    title: "Supervisor Mapping",
    desc: "Assign a senior lead for daily review, mentorship, and escalation.",
    icon: FileCheck,
    color: "bg-[#5B8DEF]/12 text-[#3E6FD0]"
  },
  {
    step: "04",
    title: "Credentials & Training",
    desc: "Provision telecaller portal login and share standard call scripts.",
    icon: CheckCircle2,
    color: "bg-purple-100 text-purple-700"
  }
];

export default async function StaffOnboardingPage() {
  await requireTelecaller();

  return (
    <>
      <PageHeader
        title="Staff Onboarding"
        subtitle="Onboard telecallers, sales reps, and field executives into the Manikstu Agro network."
      />

      {/* Workflow Process Cards */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {ONBOARDING_STEPS.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.step} className="relative overflow-hidden rounded-2xl border border-[#ECE7DC] bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${s.color}`}>
                  <Icon className="h-5 w-5" />
                </span>
                <span className="font-heading text-xs font-bold text-grey/60">STEP {s.step}</span>
              </div>
              <h3 className="mt-3 text-sm font-bold text-charcoal">{s.title}</h3>
              <p className="mt-1 text-xs text-grey leading-relaxed">{s.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Main Staff Onboarding Section Component */}
      <StaffOnboardingSection />
    </>
  );
}
