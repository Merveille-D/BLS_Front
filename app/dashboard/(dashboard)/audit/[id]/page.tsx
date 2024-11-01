"use client";
import { notFound } from "next/navigation";
import { AuditDetailsPageBreadcrumb } from "@/components/audit/breadcrumbs";
import { useOneAudit } from "@/services/api-sdk/models/audit/audit";
import { AuditDetailsTable } from "@/components/audit/tables/audit-details-table";
import { Button } from "@/components/ui/button";
import { CheckCheck, Forward, History, Printer } from "lucide-react";
import { useCurrentUser } from "@/services/api-sdk/models/user/user";
import ForwardAuditDialog from "@/components/audit/modals/forward-audit-dialog";
import CompleteAuditDialog from "@/components/audit/modals/complete-audit-dialog";
import { useMemo } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import AuditForwardsDialog from "@/components/audit/modals/audit-forwards-dialog";
import PrintAuditButton from "@/components/audit/buttons/print-audit-button";
import AuditDetailsPageLoading from "./loading";
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
export default function AuditDetailsPage({ params: { id } }) {
  const { data: currentUser } = useCurrentUser();
  const { data, isLoading, isError } = useOneAudit(id);
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
    return <AuditDetailsPageLoading />;
  }
  if (!data) {
    notFound();
  }
  return (
    <div className="container flex flex-1 flex-col gap-10 overflow-y-auto py-5">
      <AuditDetailsPageBreadcrumb auditTitle={data.title} />
      <h1 className="text-center text-2xl font-bold sm:text-3xl md:text-4xl">
        {data.title} - {data.module}
      </h1>

      <div className="flex items-center justify-end gap-2">
        {canForward(
          { forwards: data.forwards, createdBy: data.createdBy },
          currentUser,
        ) && (
          <ForwardAuditDialog
            asChild
            auditId={id}
          >
            <Button className="gap-2">
              <Forward />
              <span className="sr-only sm:not-sr-only">
                Transférer le dossier
              </span>
            </Button>
          </ForwardAuditDialog>
        )}

        {canComplete({ forwards: data.forwards }, currentUser) && (
          <CompleteAuditDialog
            asChild
            audit={{
              id: data.id,
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
          </CompleteAuditDialog>
        )}

        <PrintAuditButton
          auditId={id}
          variant="secondary"
          className="gap-2"
        >
          <Printer />
          <span className="sr-only sm:not-sr-only">Imprimer</span>
        </PrintAuditButton>

        {data.forwards && data.forwards?.length > 0 && (
          <Tooltip>
            <AuditForwardsDialog
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
            </AuditForwardsDialog>
            <TooltipContent>Historique des transferts</TooltipContent>
          </Tooltip>
        )}
      </div>

      <AuditDetailsTable
        id={id}
        reference={data.reference}
        moduleTitle={data.title}
        canEdit={canForward(
          { forwards: data.forwards, createdBy: data.createdBy },
          currentUser,
        )}
        currentUser={currentUser?.id}
        scoresHistory={scoresHistory}
      />
    </div>
  );
}
