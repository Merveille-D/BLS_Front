"use client";
import { useCallback, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { useMovableSafetyStepForm } from "@/lib/safety/movable-safety/hooks";
import { useCreateMovableSafetyStep } from "@/services/api-sdk/models/movable-safety";
import MovableSafetyStepForm from "@/components/safety/movable-safety/forms/movable-safety-step-form";
export default function AddMovableSafetyStepForm({
  formId,
  movableSafetyId,
  onSuccess,
  onError,
}) {
  const form = useMovableSafetyStepForm();
  const { mutateAsync } = useCreateMovableSafetyStep(movableSafetyId);
  const handleSubmit = useCallback(
    async (data) => {
      await mutateAsync(data, {
        onSuccess: (createdData) => {
          toast({
            description: "Tâche planifiée avec succès !",
            className: "bg-primary text-primary-foreground",
          });
          onSuccess?.(createdData);
        },
        onError: () => {
          toast({
            description: "Une erreur est survenue lors de la planification.",
            className: "bg-destructive text-destructive-foreground",
          });
          onError?.();
        },
      });
    },
    [mutateAsync, onError, onSuccess],
  );
  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      form.reset();
    }
  }, [form]);
  return (
    <MovableSafetyStepForm
      formId={formId}
      onSubmit={handleSubmit}
    />
  );
}
