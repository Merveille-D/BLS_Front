"use client";
import { useCallback, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { useAddLitigationProvisions } from "@/services/api-sdk/models/litigation/litigation";
import { useLitigationProvisionsForm } from "@/lib/litigation/hooks/use-litigation-provisions-form";
import LitigationProvisionsForm from "@/components/litigation/forms/litigation-provisions-form";
export default function AddLitigationProvisionsForm({
  formId,
  litigationId,
  addedAmountTotal,
  className,
  onSuccess,
  onError,
}) {
  const form = useLitigationProvisionsForm();
  const { mutateAsync } = useAddLitigationProvisions(litigationId);
  const handleSubmit = useCallback(
    async (data) => {
      await mutateAsync(data, {
        onSuccess: (createdData) => {
          toast({
            description: "Les provisions ont été ajoutées avec succès.",
            className: "bg-primary text-primary-foreground",
          });
          onSuccess?.(createdData);
        },
        onError: () => {
          toast({
            description:
              "Une erreur est survenue lors de l'ajout des provisions.",
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
    <LitigationProvisionsForm
      formId={formId}
      addedAmountTotal={addedAmountTotal}
      className={className}
      onSubmit={handleSubmit}
    />
  );
}
