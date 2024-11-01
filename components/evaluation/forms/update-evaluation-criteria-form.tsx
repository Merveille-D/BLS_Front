"use client";
import { useCallback } from "react";
import { toast } from "@/components/ui/use-toast";
import { useUpdateEvaluationCriteria } from "@/services/api-sdk/models/evaluation/criteria";
import EvaluationCriteriaForm from "@/components/evaluation/forms/evaluation-criteria-form";
export default function UpdateEvaluationCriteriaForm({
  formId,
  criteriaId,
  onSuccess,
  onError,
}) {
  const { mutateAsync } = useUpdateEvaluationCriteria(criteriaId);
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
    <EvaluationCriteriaForm
      formId={formId}
      onSubmit={handleSubmit}
    />
  );
}
