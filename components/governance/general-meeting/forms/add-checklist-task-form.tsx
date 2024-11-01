"use client";
import { useCallback, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { useChecklistTaskForm } from "@/lib/governance/general-meeting/hooks";
import ChecklistTaskForm from "@/components/governance/general-meeting/forms/checklist-task-form";
import { useCreateMeetingChecklistTask } from "@/services/api-sdk/models/general-meeting";
export default function AddChecklistTaskForm({
  formId,
  meetingId,
  onSuccess,
  onError,
}) {
  const form = useChecklistTaskForm();
  const { mutateAsync } = useCreateMeetingChecklistTask(meetingId);
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
    <ChecklistTaskForm
      formId={formId}
      onSubmit={handleSubmit}
    />
  );
}
