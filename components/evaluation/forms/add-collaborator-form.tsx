"use client";
import { useCallback, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { useCollaboratorForm } from "@/lib/evaluation/hooks";
import CollaboratorForm from "@/components/evaluation/forms/collaborator-form";
import { useCreateCollaborator } from "@/services/api-sdk/models/evaluation/collaborator";
export default function AddCollaboratorForm({
  formId,
  profileId,
  className,
  onSuccess,
  onError,
}) {
  const form = useCollaboratorForm();
  const { mutateAsync } = useCreateCollaborator();
  const handleSubmit = useCallback(
    async (data) => {
      await mutateAsync(
        {
          ...data,
          profileId,
        },
        {
          onSuccess: (createdData) => {
            toast({
              description: "Le collaborateur a été ajouté avec succès.",
              className: "bg-primary text-primary-foreground",
            });
            onSuccess?.(createdData);
          },
          onError: () => {
            toast({
              description:
                "Une erreur est survenue lors de l'ajout du collaborateur.",
              className: "bg-destructive text-destructive-foreground",
            });
            onError?.();
          },
        },
      );
    },
    [mutateAsync, onError, onSuccess, profileId],
  );
  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      form.reset();
    }
  }, [form]);
  return (
    <CollaboratorForm
      formId={formId}
      className={className}
      onSubmit={handleSubmit}
    />
  );
}
