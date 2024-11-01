"use client";
import { useCallback } from "react";
import { toast } from "@/components/ui/use-toast";
import { useUpdateMovableSafetyStep } from "@/services/api-sdk/models/movable-safety";
import MovableSafetyStepForm from "@/components/safety/movable-safety/forms/movable-safety-step-form";
export default function UpdateMovableSafetyStepForm({
  formId,
  stepId,
  onSuccess,
  onError,
}) {
  const { mutateAsync } = useUpdateMovableSafetyStep(stepId);
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
    <MovableSafetyStepForm
      formId={formId}
      onSubmit={handleSubmit}
    />
  );
}
