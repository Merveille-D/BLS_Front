"use client";
import { useCallback } from "react";
import { toast } from "@/components/ui/use-toast";
import { useUpdateManagementCommittee } from "@/services/api-sdk/models/management-committee";
import ManagementCommitteeForm from "@/components/governance/management-committee/forms/management-committee-form";
export default function UpdateManagementCommitteeForm({
  formId,
  meetingId,
  onSuccess,
  onError,
}) {
  const { mutateAsync } = useUpdateManagementCommittee(meetingId);
  const handleSubmit = useCallback(
    async (data) => {
      await mutateAsync(data, {
        onSuccess: (createdData) => {
          toast({
            description: "Session de CODIR modifiée avec succès !",
            className: "bg-primary text-primary-foreground",
          });
          onSuccess?.(createdData);
        },
        onError: () => {
          toast({
            description: "Une erreur est survenue lors de la modification.",
            className: "bg-destructive text-destructive-foreground",
          });
          onError?.();
        },
      });
    },
    [mutateAsync, onError, onSuccess],
  );
  return (
    <ManagementCommitteeForm
      formId={formId}
      onSubmit={handleSubmit}
    />
  );
}
