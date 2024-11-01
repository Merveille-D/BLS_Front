"use client";
import { useAllContracts } from "@/services/api-sdk/models/contract/contract";
import ContractCard from "@/components/contract/ui/contract-card";
import { useSearchResults } from "@/providers/search-provider";
import { ContractsListSuspense } from "./suspense";
export function ContractsListComponent() {
  const { data, isError, isLoading } = useAllContracts();
  const filteredData = useSearchResults(data ?? []);
  if (isError) {
    throw new Error("An error occurred while fetching the data");
  }
  if (isLoading) {
    return <ContractsListSuspense />;
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
        ({ id, title, category, categoryType, categorySubType }) => (
          <ContractCard
            key={id}
            contractId={id}
            title={title}
            category={category.label}
            categoryType={categoryType?.label}
            categorySubType={categorySubType?.label}
          />
        ),
      )}
    </div>
  );
}
