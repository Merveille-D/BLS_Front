"use client";
import { useCallback } from "react";
import { toast } from "@/components/ui/use-toast";
import { useUpdateCollaborator } from "@/services/api-sdk/models/evaluation/collaborator";
import CollaboratorForm from "@/components/evaluation/forms/collaborator-form";
export default function UpdateCollaboratorForm({
  formId,
  collaboratorId,
  onSuccess,
  onError,
}) {
  const { mutateAsync } = useUpdateCollaborator(collaboratorId);
  const handleSubmit = useCallback(
    async (data) => {
      await mutateAsync(data, {
        onSuccess: (updatedData) => {
          toast({
            description: "Collaborateur modifié avec succès.",
            className: "bg-primary text-primary-foreground",
          });
          onSuccess?.(updatedData);
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
    <CollaboratorForm
      formId={formId}
      onSubmit={handleSubmit}
    />
  );
}
