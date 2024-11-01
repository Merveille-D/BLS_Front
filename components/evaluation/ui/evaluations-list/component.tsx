"use client";
import { useAllEvaluations } from "@/services/api-sdk/models/evaluation/evaluation";
import EvaluationCard from "@/components/evaluation/ui/evaluation-card";
import { useSearchResults } from "@/providers/search-provider";
import { EvaluationsListSuspense } from "./suspense";
export function EvaluationsListComponent() {
  const { data, isError, isLoading } = useAllEvaluations();
  const filteredData = useSearchResults(data ?? []);
  if (isError) {
    throw new Error("An error occurred while fetching the data");
  }
  if (isLoading) {
    return <EvaluationsListSuspense />;
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
        ({ id, currentGlobalScore, currentStatus, collaborator }) => (
          <EvaluationCard
            key={id}
            evaluationId={id}
            globalScore={currentGlobalScore}
            status={currentStatus}
            collaborator={collaborator}
          />
        ),
      )}
    </div>
  );
}
