"use client";
import { useAllPersonalSafeties } from "@/services/api-sdk/models/personal-safety";
import PersonalSafetyCard from "@/components/safety/personal-safety/ui/personal-safety-card";
import { useSearchResults } from "@/providers/search-provider";
import { PersonalSafetiesListSuspense } from "./suspense";
export function PersonalSafetiesListComponent() {
  const { data, isError, isLoading } = useAllPersonalSafeties();
  const filteredData = useSearchResults(data ?? []);
  if (isError) {
    throw new Error("An error occurred while fetching the data");
  }
  if (isLoading) {
    return <PersonalSafetiesListSuspense />;
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
        <PersonalSafetyCard
          key={id}
          personalSafetyId={id}
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
