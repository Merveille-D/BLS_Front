"use client";
import { useCallback, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { useStakeholderForm } from "@/lib/contract/hooks";
import { useCreateStakeholder } from "@/services/api-sdk/models/contract/stakeholder";
import StakeholderForm from "@/components/contract/forms/stakeholder-form";
export default function AddStakeholderForm({
  formId,
  className,
  onSuccess,
  onError,
}) {
  const form = useStakeholderForm();
  const { mutateAsync } = useCreateStakeholder();
  const handleSubmit = useCallback(
    async (data) => {
      await mutateAsync(data, {
        onSuccess: (createdData) => {
          toast({
            description: "Le membre a été ajouté avec succès.",
            className: "bg-primary text-primary-foreground",
          });
          onSuccess?.(createdData);
        },
        onError: () => {
          toast({
            description: "Une erreur est survenue lors de l'ajout du membre.",
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
    <StakeholderForm
      formId={formId}
      className={className}
      onSubmit={handleSubmit}
    />
  );
}
