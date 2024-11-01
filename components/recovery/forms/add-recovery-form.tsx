"use client";
import { useCallback, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { useCreateRecovery } from "@/services/api-sdk/models/recovery/recovery";
import RecoveryForm from "@/components/recovery/forms/recovery-form";
import { useRecoveryForm } from "@/lib/recovery/hooks";
export default function AddRecoveryForm({
  formId,
  className,
  onSuccess,
  onError,
}) {
  const form = useRecoveryForm();
  const { mutateAsync } = useCreateRecovery();
  const handleSubmit = useCallback(
    async (data) => {
      await mutateAsync(data, {
        onSuccess: (createdData) => {
          toast({
            description: "Recouvrement formalisé avec succès",
            className: "bg-primary text-primary-foreground",
          });
          onSuccess?.(createdData);
        },
        onError: () => {
          toast({
            description: "Erreur lors de la formalisation du recouvrement",
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
    <RecoveryForm
      formId={formId}
      className={className}
      onSubmit={handleSubmit}
    />
  );
}
