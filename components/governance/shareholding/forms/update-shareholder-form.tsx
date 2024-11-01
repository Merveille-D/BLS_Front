"use client";
import { useCallback } from "react";
import { toast } from "@/components/ui/use-toast";
import { useUpdateShareholder } from "@/services/api-sdk/models/shareholding";
import ShareholderForm from "@/components/governance/shareholding/forms/shareholder-form";
export default function UpdateShareholderForm({
  formId,
  shareholderId,
  className,
  onSuccess,
  onError,
}) {
  const { mutateAsync } = useUpdateShareholder(shareholderId);
  const handleSubmit = useCallback(
    async (data) => {
      await mutateAsync(data, {
        onSuccess: (createdData) => {
          toast({
            description: "Actionnaire modifié avec succès !",
            className: "bg-primary text-primary-foreground",
          });
          onSuccess?.(createdData);
        },
        onError: () => {
          toast({
            description:
              "Une erreur est survenue lors de la modification de l'actionnaire.",
            className: "bg-destructive text-destructive-foreground",
          });
          onError?.();
        },
      });
    },
    [mutateAsync, onError, onSuccess],
  );
  return (
    <ShareholderForm
      formId={formId}
      className={className}
      onSubmit={handleSubmit}
    />
  );
}
