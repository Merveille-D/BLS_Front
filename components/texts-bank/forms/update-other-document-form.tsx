"use client";
import { useCallback } from "react";
import { toast } from "@/components/ui/use-toast";
import { useUpdateOtherDocument } from "@/services/api-sdk/models/texts-bank/other-document";
import OtherDocumentForm from "@/components/texts-bank/forms/other-document-form";
export default function UpdateOtherDocumentForm({
  formId,
  documentId,
  onSuccess,
  onError,
}) {
  const { mutateAsync } = useUpdateOtherDocument(documentId);
  const handleSubmit = useCallback(
    async (data) => {
      await mutateAsync(data, {
        onSuccess: (createdData) => {
          toast({
            description: "Le document a été mis à jour avec succès !",
            className: "bg-primary text-primary-foreground",
          });
          onSuccess?.(createdData);
        },
        onError: () => {
          toast({
            description:
              "Une erreur est survenue lors de la mise à jour du document.",
            className: "bg-destructive text-destructive-foreground",
          });
          onError?.();
        },
      });
    },
    [mutateAsync, onError, onSuccess],
  );
  return (
    <OtherDocumentForm
      formId={formId}
      onSubmit={handleSubmit}
    />
  );
}
