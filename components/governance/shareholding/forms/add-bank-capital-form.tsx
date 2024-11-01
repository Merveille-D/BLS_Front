"use client";
import { useCallback, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { useBankCapitalForm } from "@/lib/governance/shareholding/hooks";
import { useCreateBankCapital } from "@/services/api-sdk/models/shareholding";
import BankCapitalForm from "@/components/governance/shareholding/forms/bank-capital-form";
export default function AddBankCapitalForm({
  formId,
  className,
  onSuccess,
  onError,
}) {
  const form = useBankCapitalForm();
  const { mutateAsync } = useCreateBankCapital();
  const handleSubmit = useCallback(
    async (data) => {
      await mutateAsync(data, {
        onSuccess: (createdData) => {
          toast({
            description: "Capital ajouté avec succès.",
            className: "bg-primary text-primary-foreground",
          });
          onSuccess?.(createdData);
        },
        onError: () => {
          toast({
            description: "Une erreur est survenue lors de l'ajout du capital.",
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
    <BankCapitalForm
      formId={formId}
      className={className}
      onSubmit={handleSubmit}
    />
  );
}
