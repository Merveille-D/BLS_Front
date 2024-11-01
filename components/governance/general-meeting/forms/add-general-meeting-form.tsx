"use client";
import { useCallback, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { useGeneralMeetingForm } from "@/lib/governance/general-meeting/hooks";
import { useCreateGeneralMeeting } from "@/services/api-sdk/models/general-meeting";
import GeneralMeetingForm from "@/components/governance/general-meeting/forms/general-meeting-form";
export default function AddGeneralMeetingForm({ formId, onSuccess, onError }) {
  const form = useGeneralMeetingForm();
  const { mutateAsync } = useCreateGeneralMeeting();
  const handleSubmit = useCallback(
    async (data) => {
      await mutateAsync(data, {
        onSuccess: (createdData) => {
          toast({
            description: "Session d'AG planifiée avec succès !",
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
    <GeneralMeetingForm
      formId={formId}
      onSubmit={handleSubmit}
    />
  );
}
