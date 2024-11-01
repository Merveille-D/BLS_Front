"use client";
import { useAllMortgages } from "@/services/api-sdk/models/mortgage";
import MortgageCard from "@/components/safety/mortgage/ui/mortgage-card";
import { useSearchResults } from "@/providers/search-provider";
import { MortgagesListSuspense } from "./suspense";
export function MortgagesListComponent() {
  const { data, isError, isLoading } = useAllMortgages();
  const filteredData = useSearchResults(data ?? []);
  if (isError) {
    throw new Error("An error occurred while fetching the data");
  }
  if (isLoading) {
    return <MortgagesListSuspense />;
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
      {filteredData.map(({ id, title, reference, phase, contractId }) => (
        <MortgageCard
          key={id}
          mortgageId={id}
          reference={reference}
          phase={phase}
          title={title}
          contractId={contractId}
        />
      ))}
    </div>
  );
}
