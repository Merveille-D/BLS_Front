"use client";
import { useCallback, useEffect } from "react";
import { useOtherDocumentForm } from "@/lib/texts-bank/hooks";
import OtherDocumentForm from "@/components/texts-bank/forms/other-document-form";
import { useCreateOtherDocument } from "@/services/api-sdk/models/texts-bank/other-document";
import { toast } from "@/components/ui/use-toast";
export default function AddOtherDocumentForm({ formId, onSuccess, onError }) {
  const form = useOtherDocumentForm();
  const { mutateAsync } = useCreateOtherDocument();
  const handleSubmit = useCallback(
    async (data) => {
      await mutateAsync(data, {
        onSuccess: (createdData) => {
          toast({
            description: "Le document a été ajouté avec succès !",
            className: "bg-primary text-primary-foreground",
          });
          onSuccess?.(createdData);
        },
        onError: () => {
          toast({
            description: "Une erreur est survenue lors de l'ajout du document.",
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
    <OtherDocumentForm
      formId={formId}
      onSubmit={handleSubmit}
    />
  );
}
