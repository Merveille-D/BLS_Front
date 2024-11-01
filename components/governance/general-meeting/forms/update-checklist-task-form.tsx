"use client";
import { useCallback } from "react";
import { toast } from "@/components/ui/use-toast";
import ChecklistTaskForm from "@/components/governance/general-meeting/forms/checklist-task-form";
import { useUpdateMeetingChecklistTask } from "@/services/api-sdk/models/general-meeting";
export default function UpdateChecklistTaskForm({
  formId,
  taskId,
  onSuccess,
  onError,
}) {
  const { mutateAsync } = useUpdateMeetingChecklistTask(taskId);
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
    <ChecklistTaskForm
      formId={formId}
      onSubmit={handleSubmit}
    />
  );
}
