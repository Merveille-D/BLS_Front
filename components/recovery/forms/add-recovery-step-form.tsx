"use client";
import { useCallback, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { useRecoveryStepForm } from "@/lib/recovery/hooks";
import { useCreateRecoveryStep } from "@/services/api-sdk/models/recovery";
import RecoveryStepForm from "@/components/recovery/forms/recovery-step-form";
export default function AddRecoveryStepForm({
  formId,
  recoveryId,
  onSuccess,
  onError,
}) {
  const form = useRecoveryStepForm();
  const { mutateAsync } = useCreateRecoveryStep(recoveryId);
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
    <RecoveryStepForm
      formId={formId}
      onSubmit={handleSubmit}
    />
  );
}
