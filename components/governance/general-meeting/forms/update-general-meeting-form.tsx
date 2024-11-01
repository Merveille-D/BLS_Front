"use client";
import { useCallback } from "react";
import { toast } from "@/components/ui/use-toast";
import { useUpdateGeneralMeeting } from "@/services/api-sdk/models/general-meeting";
import GeneralMeetingForm from "@/components/governance/general-meeting/forms/general-meeting-form";
export default function UpdateGeneralMeetingForm({
  formId,
  meetingId,
  onSuccess,
  onError,
}) {
  const { mutateAsync } = useUpdateGeneralMeeting(meetingId);
  const handleSubmit = useCallback(
    async (data) => {
      await mutateAsync(data, {
        onSuccess: (createdData) => {
          toast({
            description: "Session d'AG modifiée avec succès !",
            className: "bg-primary text-primary-foreground",
          });
          onSuccess?.(createdData);
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
    <GeneralMeetingForm
      formId={formId}
      onSubmit={handleSubmit}
    />
  );
}
