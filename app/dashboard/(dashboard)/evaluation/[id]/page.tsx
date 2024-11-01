"use client";
import { notFound } from "next/navigation";
import { EvaluationDetailsPageBreadcrumb } from "@/components/evaluation/breadcrumbs";
import { useOneEvaluation } from "@/services/api-sdk/models/evaluation/evaluation";
import { EvaluationDetailsTable } from "@/components/evaluation/tables/evaluation-details-table";
import { Button } from "@/components/ui/button";
import { CheckCheck, Forward, History, Printer } from "lucide-react";
import { useCurrentUser } from "@/services/api-sdk/models/user/user";
import ForwardEvaluationDialog from "@/components/evaluation/modals/forward-evaluation-dialog";
import CompleteEvaluationDialog from "@/components/evaluation/modals/complete-evaluation-dialog";
import { useMemo } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import EvaluationForwardsDialog from "@/components/evaluation/modals/evaluation-forwards-dialog";
import PrintEvaluationButton from "@/components/evaluation/buttons/print-evaluation-button";
import EvaluationDetailsPageLoading from "./loading";
const canForward = ({ forwards, createdBy }, currentUser) => {
  if (forwards && forwards.length > 0) {
    return forwards[0].completed && forwards[0].receiver.id === currentUser?.id;
  }
  return createdBy.id === currentUser?.id;
};
const canComplete = ({ forwards }, currentUser) =>
  forwards &&
  forwards.length > 0 &&
  !forwards[0].completed &&
  forwards[0].receiver.id === currentUser?.id;
export default function EvaluationDetailsPage({ params: { id } }) {
  const { data: currentUser } = useCurrentUser();
  const { data, isLoading, isError } = useOneEvaluation(id);
  const scoresHistory = useMemo(
    () =>
      data?.forwards
        ?.filter((forward) => forward.completed)
        .map((forward) => ({
          id: forward.id,
          evaluator: {
            id: forward.receiver.id,
            firstname: forward.receiver.firstname,
            lastname: forward.receiver.lastname,
          },
          globalScore: forward.globalScore,
          status: forward.title,
          scores: forward.scores.map((score) => ({
            score: score.score,
            criteria: score.criteria,
          })),
        }))
        .concat({
          id: data.id,
          evaluator: data.createdBy,
          globalScore: data.originalGlobalScore,
          status: data.originalStatus,
          scores: data.originalScores.map((score) => ({
            score: score.score,
            criteria: score.criteria,
          })),
        }) ?? [],
    [
      data?.id,
      data?.createdBy,
      data?.forwards,
      data?.originalGlobalScore,
      data?.originalScores,
      data?.originalStatus,
    ],
  );
  if (isError) {
    throw new Error("An error occurred while fetching the data");
  }
  if (isLoading) {
    return <EvaluationDetailsPageLoading />;
  }
  if (!data) {
    notFound();
  }
  return (
    <div className="container flex flex-1 flex-col gap-10 overflow-y-auto py-5">
      <EvaluationDetailsPageBreadcrumb
        evaluationTitle={`${data.collaborator.lastname} ${data.collaborator.firstname}`}
      />
      <h1 className="text-center text-2xl font-bold sm:text-3xl md:text-4xl">
        {data.collaborator.lastname} {data.collaborator.firstname} (
        {data.collaborator.profile.title})
      </h1>

      <div className="flex items-center justify-end gap-2">
        {canForward(
          { forwards: data.forwards, createdBy: data.createdBy },
          currentUser,
        ) && (
          <ForwardEvaluationDialog
            asChild
            evaluationId={id}
          >
            <Button className="gap-2">
              <Forward />
              <span className="sr-only sm:not-sr-only">
                Transférer le dossier
              </span>
            </Button>
          </ForwardEvaluationDialog>
        )}

        {canComplete({ forwards: data.forwards }, currentUser) && (
          <CompleteEvaluationDialog
            asChild
            evaluation={{
              id: data.id,
              collaborator: data.collaborator,
              scores: data.currentScores,
            }}
            transferId={data.forwards[0].id}
          >
            <Button className="gap-2">
              <CheckCheck />
              <span className="sr-only sm:not-sr-only">
                {data.forwards?.[0].title ?? "Mettre à jour l'évaluation"}
              </span>
            </Button>
          </CompleteEvaluationDialog>
        )}

        <PrintEvaluationButton
          evaluationId={id}
          variant="secondary"
          className="gap-2"
        >
          <Printer />
          <span className="sr-only sm:not-sr-only">Imprimer</span>
        </PrintEvaluationButton>

        {data.forwards && data.forwards?.length > 0 && (
          <Tooltip>
            <EvaluationForwardsDialog
              asChild
              forwards={data.forwards}
            >
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                >
                  <History />
                </Button>
              </TooltipTrigger>
            </EvaluationForwardsDialog>
            <TooltipContent>Historique des transferts</TooltipContent>
          </Tooltip>
        )}
      </div>

      <EvaluationDetailsTable
        id={id}
        reference={data.reference}
        canEdit={canForward(
          { forwards: data.forwards, createdBy: data.createdBy },
          currentUser,
        )}
        collaborator={data.collaborator}
        currentUser={currentUser?.id}
        scoresHistory={scoresHistory}
      />
    </div>
  );
}
