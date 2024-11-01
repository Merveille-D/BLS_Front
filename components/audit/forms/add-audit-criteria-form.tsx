"use client";
import { useCallback, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { useAuditCriteriaForm } from "@/lib/audit/hooks";
import { useCreateAuditCriteria } from "@/services/api-sdk/models/audit/criteria";
import AuditCriteriaForm from "@/components/audit/forms/audit-criteria-form";
export default function AddAuditCriteriaForm({
  formId,
  module,
  className,
  onSuccess,
  onError,
}) {
  const form = useAuditCriteriaForm();
  const { mutateAsync } = useCreateAuditCriteria();
  const handleSubmit = useCallback(
    async (data) => {
      await mutateAsync(
        {
          ...data,
          module,
        },
        {
          onSuccess: (createdData) => {
            toast({
              description: "Le critère d'évaluation a été ajouté avec succès.",
              className: "bg-primary text-primary-foreground",
            });
            onSuccess?.(createdData);
          },
          onError: () => {
            toast({
              description:
                "Une erreur est survenue lors de l'ajout du critère d'évaluation.",
              className: "bg-destructive text-destructive-foreground",
            });
            onError?.();
          },
        },
      );
    },
    [module, mutateAsync, onError, onSuccess],
  );
  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      form.reset();
    }
  }, [form]);
  return (
    <AuditCriteriaForm
      formId={formId}
      className={className}
      onSubmit={handleSubmit}
    />
  );
}
