"use client";
import { useCallback, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { useProcedureTaskForm } from "@/lib/governance/management-committee/hooks";
import ProcedureTaskForm from "@/components/governance/management-committee/forms/procedure-task-form";
import { useCreateMeetingProcedureTask } from "@/services/api-sdk/models/management-committee";
export default function AddProcedureTaskForm({
  formId,
  meetingId,
  onSuccess,
  onError,
}) {
  const form = useProcedureTaskForm();
  const { mutateAsync } = useCreateMeetingProcedureTask(meetingId);
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
    <ProcedureTaskForm
      formId={formId}
      onSubmit={handleSubmit}
    />
  );
}
