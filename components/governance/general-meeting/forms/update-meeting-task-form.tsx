"use client";
import { useCallback } from "react";
import { toast } from "@/components/ui/use-toast";
import MeetingTaskForm from "@/components/governance/general-meeting/forms/meeting-task-form";
import { useUpdateMeetingTask } from "@/services/api-sdk/models/general-meeting";
export default function UpdateMeetingTaskForm({
  formId,
  taskId,
  onSuccess,
  onError,
}) {
  const { mutateAsync } = useUpdateMeetingTask(taskId);
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
    <MeetingTaskForm
      formId={formId}
      onSubmit={handleSubmit}
    />
  );
}
