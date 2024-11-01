"use client";
import { useCallback, useEffect } from "react";
import { useLinkItemForm } from "@/lib/texts-bank/hooks";
import LinkItemForm from "@/components/texts-bank/forms/link-item-form";
import { useCreateLinkItem } from "@/services/api-sdk/models/texts-bank/link-item";
import { toast } from "@/components/ui/use-toast";
export default function AddLinkForm({ formId, onSuccess, onError }) {
  const form = useLinkItemForm();
  const { mutateAsync } = useCreateLinkItem();
  const handleSubmit = useCallback(
    async (data) => {
      await mutateAsync(data, {
        onSuccess: (createdData) => {
          toast({
            description: "Le lien a été ajouté avec succès !",
            className: "bg-primary text-primary-foreground",
          });
          onSuccess?.(createdData);
        },
        onError: () => {
          toast({
            description: "Une erreur est survenue lors de l'ajout du lien.",
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
    <LinkItemForm
      formId={formId}
      onSubmit={handleSubmit}
    />
  );
}
