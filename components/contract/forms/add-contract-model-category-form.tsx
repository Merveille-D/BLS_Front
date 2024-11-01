"use client";
import { useCallback, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { useContractModelCategoryForm } from "@/lib/contract/hooks";
import ContractModelCategoryForm from "@/components/contract/forms/contract-model-category-form";
import { useCreateContractModel } from "@/services/api-sdk/models/contract/contract-model";
export default function AddContractModelCategoryForm({
  formId,
  parentId,
  onSuccess,
  onError,
}) {
  const form = useContractModelCategoryForm();
  const { mutateAsync } = useCreateContractModel();
  const handleSubmit = useCallback(
    async (data) => {
      await mutateAsync(
        {
          parentId,
          name: data.name,
          type: "folder",
        },
        {
          onSuccess: (createdData) => {
            toast({
              description: "La catégorie a été créée avec succès",
              className: "bg-primary text-primary-foreground",
            });
            onSuccess?.(createdData);
          },
          onError: () => {
            toast({
              description:
                "Une erreur est survenue lors de la création de la catégorie",
              className: "bg-destructive text-destructive-foreground",
            });
            onError?.();
          },
        },
      );
    },
    [mutateAsync, onError, onSuccess, parentId],
  );
  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      form.reset();
    }
  }, [form]);
  return (
    <ContractModelCategoryForm
      formId={formId}
      onSubmit={handleSubmit}
    />
  );
}
