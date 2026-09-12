import type { Metadata } from "next";
import { Plus } from "lucide-react";
import { PageHeader, Pill } from "@/components/admin/AdminUi";
import ComingSoonButton from "@/components/telecalling/ComingSoonButton";
import { ACTIVE_TONES, rowClass, TableCard, tableClass, theadClass } from "@/components/telecalling/TcUi";
import { requireTelecaller } from "@/lib/admin/auth";
import { getTcFarmers } from "@/lib/admin/telecalling";

export const metadata: Metadata = { title: "Farmers" };

export default async function FarmersPage() {
  await requireTelecaller();
  const farmers = await getTcFarmers();

  return (
    <>
      <PageHeader
        title="Farmers"
        subtitle={`${farmers.length} registered farmers across Odisha`}
        actions={
          <ComingSoonButton message="Adding farmers — coming soon" className="inline-flex h-11 items-center gap-2 rounded-xl bg-manikstu-green px-5 text-sm font-semibold text-white hover:bg-manikstu-leaf">
            <Plus className="h-4 w-4" /> Add Farmer
          </ComingSoonButton>
        }
      />
      <TableCard>
        <table className={tableClass}>
          <thead>
            <tr className={theadClass}>
              {["Farmer", "Phone", "Location", "Goats Owned", "Orders", "Status"].map((h) => (
                <th key={h} className="px-5 py-3.5">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {farmers.map((f) => (
              <tr key={f.name} className={rowClass}>
                <td className="px-5 py-3.5 font-semibold">{f.name}</td>
                <td className="px-5 py-3.5">
                  <a href={`tel:${f.phone}`} className="hover:text-manikstu-green">{f.phone}</a>
                </td>
                <td className="px-5 py-3.5 text-grey">{f.location}</td>
                <td className="px-5 py-3.5">{f.goats}</td>
                <td className="px-5 py-3.5">{f.orders}</td>
                <td className="px-5 py-3.5">
                  <Pill tone={ACTIVE_TONES[f.status] ?? "grey"}>{f.status}</Pill>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableCard>
    </>
  );
}
