"use client";
import { useCallback, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { useJudicialItemForm } from "@/lib/legal-monitoring/hooks";
import { useCreateJudicialItem } from "@/services/api-sdk/models/legal-monitoring/judicial-item";
import JudicialItemForm from "@/components/legal-monitoring/forms/judicial-item-form";
export default function AddJudicialItemForm({
  formId,
  className,
  onSuccess,
  onError,
}) {
  const form = useJudicialItemForm();
  const { mutateAsync } = useCreateJudicialItem();
  const handleSubmit = useCallback(
    async ({ actionType, ...data }) => {
      const submittedData = {
        ...data,
        isArchived: actionType === "archive",
      };
      await mutateAsync(submittedData, {
        onSuccess: (createdData) => {
          toast({
            description: "L'affaire a été ajoutée avec succès !",
            className: "bg-primary text-primary-foreground",
          });
          onSuccess?.(createdData);
        },
        onError: () => {
          toast({
            description:
              "Une erreur est survenue lors de l'ajout de l'affaire.",
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
    <JudicialItemForm
      formId={formId}
      className={className}
      onSubmit={handleSubmit}
    />
  );
}
