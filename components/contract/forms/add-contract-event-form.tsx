"use client";
import { useCallback, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { useContractEventForm } from "@/lib/contract/hooks";
import { useCreateContractEvent } from "@/services/api-sdk/models/contract/contract-event";
import ContractEventForm from "@/components/contract/forms/contract-event-form";
export default function AddContractEventForm({
  formId,
  contractId,
  onSuccess,
  onError,
}) {
  const form = useContractEventForm();
  const { mutateAsync } = useCreateContractEvent(contractId);
  const handleSubmit = useCallback(
    async (data) => {
      await mutateAsync(data, {
        onSuccess: (createdData) => {
          toast({
            description: "Événement planifié avec succès !",
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
    <ContractEventForm
      formId={formId}
      onSubmit={handleSubmit}
    />
  );
}
