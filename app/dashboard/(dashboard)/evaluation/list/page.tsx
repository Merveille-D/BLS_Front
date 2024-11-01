import { Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EvaluationsListPageBreadcrumb } from "@/components/evaluation/breadcrumbs";
import Link from "next/link";
import { EvaluationRoutes } from "@/config/routes/evaluation";
import EvaluationsList from "@/components/evaluation/ui/evaluations-list";
import { SearchInput, SearchProvider } from "@/providers/search-provider";
import { Portal } from "@/components/ui/portal";
export default function EvaluationsListPage() {
  return (
    <SearchProvider>
      <Portal containerId="search-input-container">
        <SearchInput />
      </Portal>
      <div className="container flex flex-1 flex-col gap-10 overflow-y-auto py-5">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-center sm:justify-between">
          <EvaluationsListPageBreadcrumb />
          <Button
            asChild
            className="gap-2"
          >
            <Link href={EvaluationRoutes.profilesList}>
              <Scale />
              <span className="sr-only sm:not-sr-only">Gérer les profils</span>
            </Link>
          </Button>
        </div>
        <h1 className="relative text-center text-2xl font-bold sm:text-3xl md:text-4xl">
          Choisir une évaluation
        </h1>
        <EvaluationsList />
      </div>
    </SearchProvider>
  );
}
