"use client";
import { useCallback } from "react";
import { toast } from "@/components/ui/use-toast";
import { useUpdateJudicialItem } from "@/services/api-sdk/models/legal-monitoring/judicial-item";
import JudicialItemForm from "@/components/legal-monitoring/forms/judicial-item-form";
export default function UpdateJudicialItemForm({
  itemId,
  formId,
  className,
  onSuccess,
  onError,
}) {
  const { mutateAsync } = useUpdateJudicialItem(itemId);
  const handleSubmit = useCallback(
    async ({ actionType, ...data }) => {
      const submittedData = {
        ...data,
        isArchived: actionType === "archive",
      };
      await mutateAsync(submittedData, {
        onSuccess: (updatedData) => {
          toast({
            description: "L'affaire a été modifiée avec succès !",
            className: "bg-primary text-primary-foreground",
          });
          onSuccess?.(updatedData);
        },
        onError: () => {
          toast({
            description:
              "Une erreur est survenue lors de la modification de l'affaire.",
            className: "bg-destructive text-destructive-foreground",
          });
          onError?.();
        },
      });
    },
    [mutateAsync, onError, onSuccess],
  );
  return (
    <JudicialItemForm
      formId={formId}
      className={className}
      onSubmit={handleSubmit}
    />
  );
}
