"use client";
import { useCallback, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { useMovableSafetyForm } from "@/lib/safety/movable-safety/hooks";
import { useCreateMovableSafety } from "@/services/api-sdk/models/movable-safety/movable-safety";
import MovableSafetyForm from "@/components/safety/movable-safety/forms/movable-safety-form";
export default function AddMovableSafetyForm({
  formId,
  className,
  onSuccess,
  onError,
}) {
  const form = useMovableSafetyForm();
  const { mutateAsync } = useCreateMovableSafety();
  const handleSubmit = useCallback(
    async (data) => {
      await mutateAsync(data, {
        onSuccess: (createdData) => {
          toast({
            description: "Sûreté mobilière initiée avec succès",
            className: "bg-primary text-primary-foreground",
          });
          onSuccess?.(createdData);
        },
        onError: () => {
          toast({
            description: "Erreur lors de l'initiation de la sûreté mobilière",
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
    <MovableSafetyForm
      formId={formId}
      className={className}
      onSubmit={handleSubmit}
    />
  );
}
