"use client";
import { Pencil, Plus, Tag, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAllAuditCriteria } from "@/services/api-sdk/models/audit/criteria";
import { Button } from "@/components/ui/button";
import DeleteCriteriaButton from "@/components/audit/buttons/delete-criteria-button";
import AddAuditCriteriaDialog from "@/components/audit/modals/add-audit-criteria-dialog";
import { UpdateAuditCriteriaDialog } from "@/components/audit/modals/update-audit-criteria-dialog";
import { AuditCriteriaViewSuspense } from "./suspense";
export function AuditCriteriaViewComponent({ label, module, className }) {
  const { data, isLoading, isError } = useAllAuditCriteria({ module });
  if (isError) {
    throw new Error("Failed to fetch audit criteria");
  }
  if (isLoading) {
    return (
      <AuditCriteriaViewSuspense
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
              <Tag />
              <span>{maxScore}</span>
            </div>
          </div>

          <div className="flex items-center">
            <UpdateAuditCriteriaDialog criteriaId={id}>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="rounded-full"
              >
                <Pencil />
              </Button>
            </UpdateAuditCriteriaDialog>
            <DeleteCriteriaButton criteriaId={id} />
          </div>
        </div>
      ))}
      <AddAuditCriteriaDialog
        asChild
        module={module}
      >
        <Button
          type="button"
          variant="ghost"
          className="gap-2 self-end"
        >
          <Plus />
          Ajouter un critère
        </Button>
      </AddAuditCriteriaDialog>
    </div>
  );
}
