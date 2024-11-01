"use client";
import { useCallback, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { useCollaboratorProfileForm } from "@/lib/evaluation/hooks";
import { useCreateCollaboratorProfile } from "@/services/api-sdk/models/evaluation/profile";
import CollaboratorProfileForm from "@/components/evaluation/forms/collaborator-profile-form";
export default function AddCollaboratorProfileForm({
  formId,
  onSuccess,
  onError,
}) {
  const form = useCollaboratorProfileForm();
  const { mutateAsync } = useCreateCollaboratorProfile();
  const handleSubmit = useCallback(
    async (data) => {
      await mutateAsync(data, {
        onSuccess: (createdData) => {
          toast({
            description: "Le profil a été créé avec succès",
            className: "bg-primary text-primary-foreground",
          });
          onSuccess?.(createdData);
        },
        onError: () => {
          toast({
            description:
              "Une erreur est survenue lors de la création du profil",
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
    <CollaboratorProfileForm
      formId={formId}
      onSubmit={handleSubmit}
    />
  );
}
