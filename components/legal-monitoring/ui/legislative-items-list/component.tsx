"use client";
import { useAllLegislativeItems } from "@/services/api-sdk/models/legal-monitoring/legislative-item";
import LegislativeItemCard from "@/components/legal-monitoring/ui/legislative-item-card";
import Link from "next/link";
import { LegalMonitoringRoutes } from "@/config/routes";
import { LegislativeItemsListSuspense } from "./suspense";
export function LegislativeItemsListComponent() {
  const { data, isError, isLoading } = useAllLegislativeItems();
  if (isError) {
    throw new Error("An error occurred while fetching the data");
  }
  if (isLoading) {
    return <LegislativeItemsListSuspense />;
  }
  if (!data || data.length === 0) {
    return (
      <p className="text-center text-lg italic text-foreground/75">
        Aucun élément trouvé
      </p>
    );
  }
  return (
    <div className="flex flex-wrap justify-center gap-10 md:gap-20">
      {data.map(
        ({ id, title, isArchived, nature, effectiveDate, reference, type }) => (
          <Link
            key={id}
            href={LegalMonitoringRoutes.legislativeItemPage(id).index}
          >
            <LegislativeItemCard
              key={id}
              title={title}
              reference={reference}
              type={type}
              effectiveDate={effectiveDate}
              nature={nature.title}
              isArchived={isArchived}
            />
          </Link>
        ),
      )}
    </div>
  );
}
