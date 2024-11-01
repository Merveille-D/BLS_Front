"use client";
import { useCallback, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { useLitigationPartyForm } from "@/lib/litigation/hooks";
import { useCreateLitigationParty } from "@/services/api-sdk/models/litigation/litigation-party";
import LitigationPartyForm from "@/components/litigation/forms/litigation-party-form";
export default function AddLitigationPartyForm({
  formId,
  className,
  onSuccess,
  onError,
}) {
  const form = useLitigationPartyForm();
  const { mutateAsync } = useCreateLitigationParty();
  const handleSubmit = useCallback(
    async (data) => {
      await mutateAsync(data, {
        onSuccess: (createdData) => {
          toast({
            description: "La partie a été ajoutée avec succès.",
            className: "bg-primary text-primary-foreground",
          });
          onSuccess?.(createdData);
        },
        onError: () => {
          toast({
            description:
              "Une erreur est survenue lors de l'ajout de la partie.",
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
    <LitigationPartyForm
      formId={formId}
      className={className}
      onSubmit={handleSubmit}
    />
  );
}
