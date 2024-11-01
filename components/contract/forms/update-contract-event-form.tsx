"use client";
import { useCallback } from "react";
import { toast } from "@/components/ui/use-toast";
import { useUpdateContractEvent } from "@/services/api-sdk/models/contract/contract-event";
import ContractEventForm from "@/components/contract/forms/contract-event-form";
export default function UpdateContractEventForm({
  formId,
  eventId,
  onSuccess,
  onError,
}) {
  const { mutateAsync } = useUpdateContractEvent(eventId);
  const handleSubmit = useCallback(
    async (data) => {
      await mutateAsync(data, {
        onSuccess: (updatedData) => {
          toast({
            description: "Evénement modifié avec succès !",
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
    <ContractEventForm
      formId={formId}
      onSubmit={handleSubmit}
    />
  );
}
