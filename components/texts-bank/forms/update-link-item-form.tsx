"use client";
import { useCallback } from "react";
import LinkItemForm from "@/components/texts-bank/forms/link-item-form";
import { useUpdateLinkItem } from "@/services/api-sdk/models/texts-bank/link-item";
import { toast } from "@/components/ui/use-toast";
export default function UpdateLinkItemForm({
  formId,
  linkItemId,
  onSuccess,
  onError,
}) {
  const { mutateAsync } = useUpdateLinkItem(linkItemId);
  const handleSubmit = useCallback(
    async (data) => {
      await mutateAsync(data, {
        onSuccess: (createdData) => {
          toast({
            description: "Le lien a été modifié avec succès !",
            className: "bg-primary text-primary-foreground",
          });
          onSuccess?.(createdData);
        },
        onError: () => {
          toast({
            description:
              "Une erreur est survenue lors de la modification du lien.",
            className: "bg-destructive text-destructive-foreground",
          });
          onError?.();
        },
      });
    },
    [mutateAsync, onError, onSuccess],
  );
  return (
    <LinkItemForm
      formId={formId}
      onSubmit={handleSubmit}
    />
  );
}
