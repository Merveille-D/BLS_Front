"use client";
import { useCallback, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { useTaskForm } from "@/lib/governance/administration-meeting/hooks";
import MeetingTaskForm from "@/components/governance/administration-meeting/forms/meeting-task-form";
import { useCreateMeetingTask } from "@/services/api-sdk/models/administration-meeting";
export default function AddMeetingTaskForm({
  formId,
  meetingId,
  onSuccess,
  onError,
}) {
  const form = useTaskForm();
  const { mutateAsync } = useCreateMeetingTask(meetingId);
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
    <MeetingTaskForm
      formId={formId}
      onSubmit={handleSubmit}
    />
  );
}
