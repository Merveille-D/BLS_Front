"use client";
import { useCallback } from "react";
import { toast } from "@/components/ui/use-toast";
import { useUpdateLitigationTask } from "@/services/api-sdk/models/litigation";
import LitigationTaskForm from "@/components/litigation/forms/litigation-task-form";
export default function UpdateLitigationTaskForm({
  formId,
  taskId,
  onSuccess,
  onError,
}) {
  const { mutateAsync } = useUpdateLitigationTask(taskId);
  const handleSubmit = useCallback(
    async (data) => {
      await mutateAsync(data, {
        onSuccess: (updatedData) => {
          toast({
            description: "Tâche modifiée avec succès !",
            className: "bg-primary text-primary-foreground",
          });
          onSuccess?.(updatedData);
        },
        onError: () => {
          toast({
            description: "Une erreur est survenue lors de la modification.",
            className: "bg-destructive text-destructive-foreground",
          });
          onError?.();
        },
      });
    },
    [mutateAsync, onError, onSuccess],
  );
  return (
    <LitigationTaskForm
      formId={formId}
      onSubmit={handleSubmit}
    />
  );
}
