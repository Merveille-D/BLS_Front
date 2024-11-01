import { Newspaper, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { EvaluationRoutes } from "@/config/routes/evaluation";
import EvaluateCollaboratorCard from "@/components/evaluation/ui/evaluate-collaborator-card";
import { HomePageBreadcrumb } from "@/components/evaluation/breadcrumbs";
export default function EvaluationPage() {
  return (
    <div className="container flex flex-1 flex-col gap-10 overflow-y-auto py-5">
      <div className="flex flex-col gap-10 sm:flex-row sm:items-center sm:justify-between">
        <HomePageBreadcrumb />
        <div className="flex items-center justify-end gap-2">
          <Button
            asChild
            variant="secondary"
            className="gap-2"
          >
            <Link href={EvaluationRoutes.profilesList}>
              <Scale />
              <span className="sr-only sm:not-sr-only">
                Insérer les critères
              </span>
            </Link>
          </Button>
          <Button
            asChild
            className="gap-2"
          >
            <Link href={EvaluationRoutes.evaluationsList}>
              <Newspaper />
              <span className="sr-only sm:not-sr-only">
                Consulter les évaluations
              </span>
            </Link>
          </Button>
        </div>
      </div>
      <EvaluateCollaboratorCard />
    </div>
  );
}
