"use client";
import { useCallback } from "react";
import { toast } from "@/components/ui/use-toast";
import { useUpdateCollaboratorProfile } from "@/services/api-sdk/models/evaluation/profile";
import CollaboratorProfileForm from "@/components/evaluation/forms/collaborator-profile-form";
export default function UpdateCollaboratorProfileForm({
  formId,
  profileId,
  onSuccess,
  onError,
}) {
  const { mutateAsync } = useUpdateCollaboratorProfile(profileId);
  const handleSubmit = useCallback(
    async (data) => {
      await mutateAsync(data, {
        onSuccess: (updatedData) => {
          toast({
            description: "Le profil a été mis à jour avec succès.",
            className: "bg-primary text-primary-foreground",
          });
          onSuccess?.(updatedData);
        },
        onError: () => {
          toast({
            description:
              "Une erreur est survenue lors de la mise à jour du profil.",
            className: "bg-destructive text-destructive-foreground",
          });
          onError?.();
        },
      });
    },
    [mutateAsync, onError, onSuccess],
  );
  return (
    <CollaboratorProfileForm
      formId={formId}
      onSubmit={handleSubmit}
    />
  );
}
