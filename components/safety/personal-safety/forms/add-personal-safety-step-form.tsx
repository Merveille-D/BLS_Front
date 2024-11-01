"use client";
import { useCallback, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { usePersonalSafetyStepForm } from "@/lib/safety/personal-safety/hooks";
import { useCreatePersonalSafetyStep } from "@/services/api-sdk/models/personal-safety";
import PersonalSafetyStepForm from "@/components/safety/personal-safety/forms/personal-safety-step-form";
export default function AddPersonalSafetyStepForm({
  formId,
  personalSafetyId,
  onSuccess,
  onError,
}) {
  const form = usePersonalSafetyStepForm();
  const { mutateAsync } = useCreatePersonalSafetyStep(personalSafetyId);
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
    <PersonalSafetyStepForm
      formId={formId}
      onSubmit={handleSubmit}
    />
  );
}
