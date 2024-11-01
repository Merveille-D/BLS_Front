"use client";
import { useCallback } from "react";
import { toast } from "@/components/ui/use-toast";
import { useUpdateRecoveryStep } from "@/services/api-sdk/models/recovery";
import RecoveryStepForm from "@/components/recovery/forms/recovery-step-form";
export default function UpdateRecoveryStepForm({
  formId,
  stepId,
  onSuccess,
  onError,
}) {
  const { mutateAsync } = useUpdateRecoveryStep(stepId);
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
    <RecoveryStepForm
      formId={formId}
      onSubmit={handleSubmit}
    />
  );
}
