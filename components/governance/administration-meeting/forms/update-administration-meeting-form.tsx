"use client";
import { useCallback } from "react";
import { toast } from "@/components/ui/use-toast";
import { useUpdateAdministrationMeeting } from "@/services/api-sdk/models/administration-meeting";
import AdministrationMeetingForm from "@/components/governance/administration-meeting/forms/administration-meeting-form";
export default function UpdateAdministrationMeetingForm({
  formId,
  meetingId,
  onSuccess,
  onError,
}) {
  const { mutateAsync } = useUpdateAdministrationMeeting(meetingId);
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
    <AdministrationMeetingForm
      formId={formId}
      onSubmit={handleSubmit}
    />
  );
}
