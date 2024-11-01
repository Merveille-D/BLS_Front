"use client";
import { useCallback, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { useEvaluationCriteriaForm } from "@/lib/evaluation/hooks";
import { useCreateEvaluationCriteria } from "@/services/api-sdk/models/evaluation/criteria";
import EvaluationCriteriaForm from "@/components/evaluation/forms/evaluation-criteria-form";
export default function AddEvaluationCriteriaForm({
  formId,
  profileId,
  className,
  onSuccess,
  onError,
}) {
  const form = useEvaluationCriteriaForm();
  const { mutateAsync } = useCreateEvaluationCriteria();
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
              description: "Le critère d'évaluation a été ajouté avec succès.",
              className: "bg-primary text-primary-foreground",
            });
            onSuccess?.(createdData);
          },
          onError: () => {
            toast({
              description:
                "Une erreur est survenue lors de l'ajout du critère d'évaluation.",
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
    <EvaluationCriteriaForm
      formId={formId}
      className={className}
      onSubmit={handleSubmit}
    />
  );
}
