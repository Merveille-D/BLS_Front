"use client";
import { useCallback } from "react";
import { toast } from "@/components/ui/use-toast";
import { useUpdateMortgageStep } from "@/services/api-sdk/models/mortgage";
import MortgageStepForm from "@/components/safety/mortgage/forms/mortgage-step-form";
export default function UpdateMortgageStepForm({
  formId,
  stepId,
  onSuccess,
  onError,
}) {
  const { mutateAsync } = useUpdateMortgageStep(stepId);
  const handleSubmit = useCallback(
    async (data) => {
      await mutateAsync(data, {
        onSuccess: (updatedData) => {
          toast({
            description: "Tâche modifiée avec succès !",
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
    <MortgageStepForm
      formId={formId}
      onSubmit={handleSubmit}
    />
  );
}
