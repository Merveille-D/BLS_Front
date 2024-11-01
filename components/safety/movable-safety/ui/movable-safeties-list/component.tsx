"use client";
import { useAllMovableSafeties } from "@/services/api-sdk/models/movable-safety";
import MovableSafetyCard from "@/components/safety/movable-safety/ui/movable-safety-card";
import { useSearchResults } from "@/providers/search-provider";
import { MovableSafetiesListSuspense } from "./suspense";
export function MovableSafetiesListComponent() {
  const { data, isError, isLoading } = useAllMovableSafeties();
  const filteredData = useSearchResults(data ?? []);
  if (isError) {
    throw new Error("An error occurred while fetching the data");
  }
  if (isLoading) {
    return <MovableSafetiesListSuspense />;
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
      {filteredData.map(({ id, title, reference, type, phase, contractId }) => (
        <MovableSafetyCard
          key={id}
          movableSafetyId={id}
          reference={reference}
          type={type}
          phase={phase}
          title={title}
          contractId={contractId}
        />
      ))}
    </div>
  );
}
