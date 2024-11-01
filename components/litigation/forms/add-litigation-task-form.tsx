"use client";
import { useCallback, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { useLitigationTaskForm } from "@/lib/litigation/hooks";
import { useCreateLitigationTask } from "@/services/api-sdk/models/litigation";
import LitigationTaskForm from "@/components/litigation/forms/litigation-task-form";
export default function AddLitigationTaskForm({
  formId,
  litigationId,
  onSuccess,
  onError,
}) {
  const form = useLitigationTaskForm();
  const { mutateAsync } = useCreateLitigationTask(litigationId);
  const handleSubmit = useCallback(
    async (data) => {
      await mutateAsync(data, {
        onSuccess: (createdData) => {
          toast({
            description: "Tâche planifiée avec succès !",
            className: "bg-primary text-primary-foreground",
          });
          onSuccess?.(createdData);
        },
        onError: () => {
          toast({
            description: "Une erreur est survenue lors de la planification.",
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
    <LitigationTaskForm
      formId={formId}
      onSubmit={handleSubmit}
    />
  );
}
