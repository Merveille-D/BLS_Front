"use client";
import { useCallback, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { useManagementCommitteeForm } from "@/lib/governance/management-committee/hooks";
import { useCreateManagementCommittee } from "@/services/api-sdk/models/management-committee";
import ManagementCommitteeForm from "@/components/governance/management-committee/forms/management-committee-form";
export default function AddManagementCommitteeForm({
  formId,
  onSuccess,
  onError,
}) {
  const form = useManagementCommitteeForm();
  const { mutateAsync } = useCreateManagementCommittee();
  const handleSubmit = useCallback(
    async (data) => {
      await mutateAsync(data, {
        onSuccess: (createdData) => {
          toast({
            description: "Session de CODIR planifiée avec succès !",
            className: "bg-primary text-primary-foreground",
          });
          onSuccess?.(createdData);
        },
        onError: () => {
          toast({
            description: "Une erreur est survenue lors de la planification.",
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
    <ManagementCommitteeForm
      formId={formId}
      onSubmit={handleSubmit}
    />
  );
}
