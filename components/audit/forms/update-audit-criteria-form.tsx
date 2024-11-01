"use client";
import { useCallback } from "react";
import { toast } from "@/components/ui/use-toast";
import { useUpdateAuditCriteria } from "@/services/api-sdk/models/audit/criteria";
import AuditCriteriaForm from "@/components/audit/forms/audit-criteria-form";
export default function UpdateAuditCriteriaForm({
  formId,
  criteriaId,
  onSuccess,
  onError,
}) {
  const { mutateAsync } = useUpdateAuditCriteria(criteriaId);
  const handleSubmit = useCallback(
    async (data) => {
      await mutateAsync(data, {
        onSuccess: (updatedData) => {
          toast({
            description: "Critère d'évaluation modifié avec succès !",
            className: "bg-primary text-primary-foreground",
          });
          onSuccess?.(updatedData);
        },
        onError: () => {
          toast({
            description: "Une erreur est survenue lors de la modification.",
            className: "bg-destructive text-destructive-foreground",
          });
          onError?.();
        },
      });
    },
    [mutateAsync, onError, onSuccess],
  );
  return (
    <AuditCriteriaForm
      formId={formId}
      onSubmit={handleSubmit}
    />
  );
}
