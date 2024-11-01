"use client";
import { useCallback, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { useAdministrationMeetingForm } from "@/lib/governance/administration-meeting/hooks";
import { useCreateAdministrationMeeting } from "@/services/api-sdk/models/administration-meeting";
import AdministrationMeetingForm from "@/components/governance/administration-meeting/forms/administration-meeting-form";
export default function AddAdministrationMeetingForm({
  formId,
  onSuccess,
  onError,
}) {
  const form = useAdministrationMeetingForm();
  const { mutateAsync } = useCreateAdministrationMeeting();
  const handleSubmit = useCallback(
    async (data) => {
      await mutateAsync(data, {
        onSuccess: (createdData) => {
          toast({
            description: "Session de CA planifiée avec succès !",
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
    <AdministrationMeetingForm
      formId={formId}
      onSubmit={handleSubmit}
    />
  );
}
