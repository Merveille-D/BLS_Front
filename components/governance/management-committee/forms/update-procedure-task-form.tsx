"use client";
import { useCallback } from "react";
import { toast } from "@/components/ui/use-toast";
import ProcedureTaskForm from "@/components/governance/management-committee/forms/procedure-task-form";
import { useUpdateMeetingProcedureTask } from "@/services/api-sdk/models/management-committee";
export default function UpdateProcedureTaskForm({
  formId,
  taskId,
  onSuccess,
  onError,
}) {
  const { mutateAsync } = useUpdateMeetingProcedureTask(taskId);
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
    <ProcedureTaskForm
      formId={formId}
      onSubmit={handleSubmit}
    />
  );
}
