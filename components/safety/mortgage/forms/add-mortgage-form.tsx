"use client";
import { useCallback, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { useMortgageForm } from "@/lib/safety/mortgage/hooks";
import { useCreateMortgage } from "@/services/api-sdk/models/mortgage/mortgage";
import MortgageForm from "@/components/safety/mortgage/forms/mortgage-form";
export default function AddMortgageForm({
  formId,
  className,
  onSuccess,
  onError,
}) {
  const form = useMortgageForm();
  const { mutateAsync } = useCreateMortgage();
  const handleSubmit = useCallback(
    async (data) => {
      await mutateAsync(data, {
        onSuccess: (createdData) => {
          toast({
            description: "Hypothèque initiée avec succès",
            className: "bg-primary text-primary-foreground",
          });
          onSuccess?.(createdData);
        },
        onError: () => {
          toast({
            description: "Erreur lors de l'initiation de l'hypothèque",
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
    <MortgageForm
      formId={formId}
      className={className}
      onSubmit={handleSubmit}
    />
  );
}
