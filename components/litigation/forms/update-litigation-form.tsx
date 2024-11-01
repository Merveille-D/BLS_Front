"use client";
import { useCallback } from "react";
import { toast } from "@/components/ui/use-toast";
import { useUpdateLitigation } from "@/services/api-sdk/models/litigation/litigation";
import LitigationForm from "@/components/litigation/forms/litigation-form";
export default function UpdateLitigationForm({
  formId,
  litigationId,
  className,
  onSuccess,
  onError,
}) {
  const { mutateAsync } = useUpdateLitigation(litigationId);
  const handleSubmit = useCallback(
    async (data) => {
      await mutateAsync(data, {
        onSuccess: (createdData) => {
          toast({
            description: "Le dossier a été modifié avec succès.",
            className: "bg-primary text-primary-foreground",
          });
          onSuccess?.(createdData);
        },
        onError: () => {
          toast({
            description:
              "Une erreur est survenue lors de la modification du dossier.",
            className: "bg-destructive text-destructive-foreground",
          });
          onError?.();
        },
      });
    },
    [mutateAsync, onError, onSuccess],
  );
  return (
    <LitigationForm
      formId={formId}
      className={className}
      onSubmit={handleSubmit}
    />
  );
}
