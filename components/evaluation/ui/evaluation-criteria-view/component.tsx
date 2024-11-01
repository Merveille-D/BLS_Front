"use client";
import { Pencil, Plus, Tag, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAllEvaluationCriteria } from "@/services/api-sdk/models/evaluation/criteria";
import { Button } from "@/components/ui/button";
import DeleteCriteriaButton from "@/components/evaluation/buttons/delete-criteria-button";
import AddEvaluationCriteriaDialog from "@/components/evaluation/modals/add-evaluation-criteria-dialog";
import { UpdateEvaluationCriteriaDialog } from "@/components/evaluation/modals/update-evaluation-criteria-dialog";
import { EvaluationCriteriaViewSuspense } from "./suspense";
export function EvaluationCriteriaViewComponent({
  label,
  profileId,
  className,
}) {
  const { data, isLoading, isError } = useAllEvaluationCriteria({ profileId });
  if (isError) {
    throw new Error("Failed to fetch evaluation criteria");
  }
  if (isLoading) {
    return (
      <EvaluationCriteriaViewSuspense
        label={label}
        className={className}
      />
    );
  }
  return (
    <div
      className={cn(
        "relative flex flex-col gap-5 rounded-xl border-2 p-5",
        className,
      )}
    >
      {label && (
        <span className="absolute left-3 top-0 -translate-y-1/2 bg-background px-2 text-sm font-semibold">
          {label}
        </span>
      )}
      {(!data || data.length === 0) && (
        <p className="text-md text-center italic text-muted-foreground">
          Aucun critère trouvé
        </p>
      )}
      {data?.map(({ id, title, maxScore }) => (
        <div
          key={id}
          className="flex items-start gap-5"
        >
          <div className="flex-1 space-y-2">
            <span className="text-sm italic text-muted-foreground">
              Critère
            </span>
            <div className="flex items-center gap-2">
              <User className="flex-shrink-0" />
              <span>{title}</span>
            </div>
          </div>

          <div className="flex-1 space-y-2">
            <span className="text-sm italic text-muted-foreground">
              Note maximale
            </span>
            <div className="flex items-center gap-2">
              <Tag className="flex-shrink-0" />
              <span>{maxScore}</span>
            </div>
          </div>

          <div className="flex items-center">
            <UpdateEvaluationCriteriaDialog criteriaId={id}>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="rounded-full"
              >
                <Pencil />
              </Button>
            </UpdateEvaluationCriteriaDialog>
            <DeleteCriteriaButton criteriaId={id} />
          </div>
        </div>
      ))}
      <AddEvaluationCriteriaDialog
        asChild
        profileId={profileId}
      >
        <Button
          type="button"
          variant="ghost"
          className="gap-2 self-end"
        >
          <Plus />
          Ajouter un critère
        </Button>
      </AddEvaluationCriteriaDialog>
    </div>
  );
}
