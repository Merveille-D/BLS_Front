"use client";
import { useCallback, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { useLegislativeItemForm } from "@/lib/legal-monitoring/hooks";
import { useCreateLegislativeItem } from "@/services/api-sdk/models/legal-monitoring/legislative-item";
import LegislativeItemForm from "@/components/legal-monitoring/forms/legislative-item-form";
export default function AddLegislativeItemForm({
  formId,
  className,
  onSuccess,
  onError,
}) {
  const form = useLegislativeItemForm();
  const { mutateAsync } = useCreateLegislativeItem();
  const handleSubmit = useCallback(
    async ({ actionType, ...data }) => {
      const submittedData = {
        ...data,
        isArchived: actionType === "archive",
      };
      await mutateAsync(submittedData, {
        onSuccess: (createdData) => {
          toast({
            description: "La legislation a été ajoutée avec succès !",
            className: "bg-primary text-primary-foreground",
          });
          onSuccess?.(createdData);
        },
        onError: () => {
          toast({
            description:
              "Une erreur est survenue lors de l'ajout de la législation",
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
    <LegislativeItemForm
      formId={formId}
      className={className}
      onSubmit={handleSubmit}
    />
  );
}
