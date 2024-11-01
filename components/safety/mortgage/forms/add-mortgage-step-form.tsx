"use client";
import { useCallback, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { useMortgageStepForm } from "@/lib/safety/mortgage/hooks";
import { useCreateMortgageStep } from "@/services/api-sdk/models/mortgage";
import MortgageStepForm from "@/components/safety/mortgage/forms/mortgage-step-form";
export default function AddMortgageStepForm({
  formId,
  mortgageId,
  onSuccess,
  onError,
}) {
  const form = useMortgageStepForm();
  const { mutateAsync } = useCreateMortgageStep(mortgageId);
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
    <MortgageStepForm
      formId={formId}
      onSubmit={handleSubmit}
    />
  );
}
