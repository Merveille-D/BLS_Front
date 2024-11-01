"use client";
import { useCallback, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { useAttendantForm } from "@/lib/governance/general-meeting/hooks";
import { useCreateMeetingAttendant } from "@/services/api-sdk/models/general-meeting";
import AttendantForm from "@/components/governance/general-meeting/forms/attendant-form";
export default function AddAttendantForm({
  formId,
  meetingId,
  onSuccess,
  onError,
}) {
  const form = useAttendantForm();
  const { mutateAsync } = useCreateMeetingAttendant(meetingId);
  const handleSubmit = useCallback(
    async (data) => {
      await mutateAsync(data, {
        onSuccess: (createdData) => {
          toast({
            description: "Le participant a été ajouté avec succès.",
            className: "bg-primary text-primary-foreground",
          });
          onSuccess?.(createdData);
        },
        onError: () => {
          toast({
            description:
              "Une erreur est survenue lors de l'ajout du participant.",
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
    <AttendantForm
      formId={formId}
      onSubmit={handleSubmit}
    />
  );
}
