"use client";
import { useCallback, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { useShareholderForm } from "@/lib/governance/shareholding/hooks";
import { useCreateShareholder } from "@/services/api-sdk/models/shareholding";
import ShareholderForm from "@/components/governance/shareholding/forms/shareholder-form";
export default function AddShareholderForm({
  formId,
  className,
  onSuccess,
  onError,
}) {
  const form = useShareholderForm();
  const { mutateAsync } = useCreateShareholder();
  const handleSubmit = useCallback(
    async (data) => {
      await mutateAsync(data, {
        onSuccess: (createdData) => {
          toast({
            description: "Actionnaire ajouté avec succès !",
            className: "bg-primary text-primary-foreground",
          });
          onSuccess?.(createdData);
        },
        onError: () => {
          toast({
            description:
              "Une erreur est survenue lors de l'ajout de l'actionnaire.",
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
    <ShareholderForm
      formId={formId}
      className={className}
      onSubmit={handleSubmit}
    />
  );
}
