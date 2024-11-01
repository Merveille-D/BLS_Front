"use client";
import { useCallback } from "react";
import { toast } from "@/components/ui/use-toast";
import { useUpdatePersonalSafetyStep } from "@/services/api-sdk/models/personal-safety";
import PersonalSafetyStepForm from "@/components/safety/personal-safety/forms/personal-safety-step-form";
export default function UpdatePersonalSafetyStepForm({
  formId,
  stepId,
  onSuccess,
  onError,
}) {
  const { mutateAsync } = useUpdatePersonalSafetyStep(stepId);
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
    <PersonalSafetyStepForm
      formId={formId}
      onSubmit={handleSubmit}
    />
  );
}
