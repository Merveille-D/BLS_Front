"use client";
import { useCallback } from "react";
import { toast } from "@/components/ui/use-toast";
import { useUpdateLegislativeItem } from "@/services/api-sdk/models/legal-monitoring/legislative-item";
import LegislativeItemForm from "@/components/legal-monitoring/forms/legislative-item-form";
export default function UpdateLegislativeItemForm({
  itemId,
  formId,
  className,
  onSuccess,
  onError,
}) {
  const { mutateAsync } = useUpdateLegislativeItem(itemId);
  const handleSubmit = useCallback(
    async ({ actionType, ...data }) => {
      const submittedData = {
        ...data,
        isArchived: actionType === "archive",
      };
      await mutateAsync(submittedData, {
        onSuccess: (updatedData) => {
          toast({
            description: "La legislation a été modifiée avec succès !",
            className: "bg-primary text-primary-foreground",
          });
          onSuccess?.(updatedData);
        },
        onError: () => {
          toast({
            description:
              "Une erreur est survenue lors de la modification de la legislation.",
            className: "bg-destructive text-destructive-foreground",
          });
          onError?.();
        },
      });
    },
    [mutateAsync, onError, onSuccess],
  );
  return (
    <LegislativeItemForm
      formId={formId}
      className={className}
      onSubmit={handleSubmit}
    />
  );
}
