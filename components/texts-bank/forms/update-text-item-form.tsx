"use client";
import { useCallback } from "react";
import TextItemForm from "@/components/texts-bank/forms/text-item-form";
import { useUpdateTextItem } from "@/services/api-sdk/models/texts-bank/text-item";
import { toast } from "@/components/ui/use-toast";
export default function UpdateTextItemForm({
  formId,
  textItemId,
  onSuccess,
  onError,
}) {
  const { mutateAsync } = useUpdateTextItem(textItemId);
  const handleSubmit = useCallback(
    async (data) => {
      await mutateAsync(data, {
        onSuccess: (createdData) => {
          toast({
            description: "Le texte a été mis à jour avec succès !",
            className: "bg-primary text-primary-foreground",
          });
          onSuccess?.(createdData);
        },
        onError: () => {
          toast({
            description:
              "Une erreur est survenue lors de la mise à jour du texte.",
            className: "bg-destructive text-destructive-foreground",
          });
          onError?.();
        },
      });
    },
    [mutateAsync, onError, onSuccess],
  );
  return (
    <TextItemForm
      formId={formId}
      onSubmit={handleSubmit}
    />
  );
}
