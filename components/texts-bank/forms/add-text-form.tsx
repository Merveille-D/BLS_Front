"use client";
import { useCallback, useEffect } from "react";
import { useTextItemForm } from "@/lib/texts-bank/hooks";
import TextItemForm from "@/components/texts-bank/forms/text-item-form";
import { useCreateTextItem } from "@/services/api-sdk/models/texts-bank/text-item";
import { toast } from "@/components/ui/use-toast";
export default function AddTextForm({ formId, onSuccess, onError }) {
  const form = useTextItemForm();
  const { mutateAsync } = useCreateTextItem();
  const handleSubmit = useCallback(
    async (data) => {
      await mutateAsync(data, {
        onSuccess: (createdData) => {
          toast({
            description: "Le texte a été ajouté avec succès !",
            className: "bg-primary text-primary-foreground",
          });
          onSuccess?.(createdData);
        },
        onError: () => {
          toast({
            description: "Une erreur est survenue lors de l'ajout du texte.",
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
    <TextItemForm
      formId={formId}
      onSubmit={handleSubmit}
    />
  );
}
