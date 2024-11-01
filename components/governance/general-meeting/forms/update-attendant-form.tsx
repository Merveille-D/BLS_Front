"use client";
import { useCallback } from "react";
import { toast } from "@/components/ui/use-toast";
import { useUpdateMeetingAttendant } from "@/services/api-sdk/models/general-meeting";
import AttendantForm from "@/components/governance/general-meeting/forms/attendant-form";
export default function UpdateAttendantForm({
  formId,
  attendantId,
  onSuccess,
  onError,
}) {
  const { mutateAsync } = useUpdateMeetingAttendant(attendantId);
  const handleSubmit = useCallback(
    async (data) => {
      await mutateAsync(data, {
        onSuccess: (updatedData) => {
          toast({
            description: "Le participant a été modifié avec succès.",
            className: "bg-primary text-primary-foreground",
          });
          onSuccess?.(updatedData);
        },
        onError: () => {
          toast({
            description:
              "Une erreur est survenue lors de la modification du participant.",
            className: "bg-destructive text-destructive-foreground",
          });
          onError?.();
        },
      });
    },
    [mutateAsync, onError, onSuccess],
  );
  return (
    <AttendantForm
      formId={formId}
      onSubmit={handleSubmit}
    />
  );
}
