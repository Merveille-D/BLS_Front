"use client";
import { useCallback, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { usePersonalSafetyForm } from "@/lib/safety/personal-safety/hooks";
import { useCreatePersonalSafety } from "@/services/api-sdk/models/personal-safety/personal-safety";
import PersonalSafetyForm from "@/components/safety/personal-safety/forms/personal-safety-form";
export default function AddPersonalSafetyForm({
  formId,
  className,
  onSuccess,
  onError,
}) {
  const form = usePersonalSafetyForm();
  const { mutateAsync } = useCreatePersonalSafety();
  const handleSubmit = useCallback(
    async (data) => {
      await mutateAsync(data, {
        onSuccess: (createdData) => {
          toast({
            description: "Sûreté personnelle initiée avec succès",
            className: "bg-primary text-primary-foreground",
          });
          onSuccess?.(createdData);
        },
        onError: () => {
          toast({
            description: "Erreur lors de l'initiation de la sûreté personnelle",
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
    <PersonalSafetyForm
      formId={formId}
      className={className}
      onSubmit={handleSubmit}
    />
  );
}
