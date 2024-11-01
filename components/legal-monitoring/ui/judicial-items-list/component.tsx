"use client";
import { useAllJudicialItems } from "@/services/api-sdk/models/legal-monitoring/judicial-item";
import JudicialItemCard from "@/components/legal-monitoring/ui/judicial-item-card";
import Link from "next/link";
import { LegalMonitoringRoutes } from "@/config/routes";
import { useSearchResults } from "@/providers/search-provider";
import { JudicialItemsListSuspense } from "./suspense";
export function JudicialItemsListComponent() {
  const { data, isError, isLoading } = useAllJudicialItems();
  const filteredData = useSearchResults(data ?? []);
  if (isError) {
    throw new Error("An error occurred while fetching the data");
  }
  if (isLoading) {
    return <JudicialItemsListSuspense />;
  }
  if (!data || data.length === 0) {
    return (
      <p className="text-center text-lg italic text-foreground/75">
        Aucun élément trouvé
      </p>
    );
  }
  if (filteredData.length === 0) {
    return (
      <p className="text-center text-lg italic text-foreground/75">
        Aucun élément ne correspond à votre recherche
      </p>
    );
  }
  return (
    <div className="flex flex-wrap justify-center gap-10 md:gap-20">
      {filteredData.map(
        ({ id, title, jurisdiction, eventDate, isArchived }) => (
          <Link
            key={id}
            href={LegalMonitoringRoutes.judicialItemPage(id).index}
          >
            <JudicialItemCard
              title={title}
              jurisdiction={jurisdiction.title}
              eventDate={eventDate}
              isArchived={isArchived}
            />
          </Link>
        ),
      )}
    </div>
  );
}
