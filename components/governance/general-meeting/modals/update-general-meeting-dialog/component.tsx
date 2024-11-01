"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import React, { useCallback, useEffect, useId, useRef } from "react";
import { FormProvider } from "react-hook-form";
import { useGeneralMeetingForm } from "@/lib/governance/general-meeting/hooks";
import EllipsisLoader from "@/components/ui/ellipsis-loader";
import { useOneGeneralMeeting } from "@/services/api-sdk/models/general-meeting";
import UpdateGeneralMeetingForm from "@/components/governance/general-meeting/forms/update-general-meeting-form";
import { UpdateGeneralMeetingDialogSuspense } from "./suspense";
export function UpdateGeneralMeetingDialog({ meetingId, ...props }) {
  const formId = useId();
  const { data, isLoading, isError } = useOneGeneralMeeting(meetingId);
  const form = useGeneralMeetingForm();
  const closeRef = useRef(null);
  if (isError) {
    throw new Error("Failed to fetch general meeting");
  }
  const handleSuccess = useCallback(() => {
    closeRef.current?.click();
  }, []);
  useEffect(() => {
    if (data && !form.formState.isDirty) {
      form.reset({
        title: data.title,
        meetingType: data.meetingType,
        meetingDate: data.meetingDate,
      });
    }
  }, [data, form, isLoading]);
  return (
    <Dialog>
      <DialogTrigger {...props} />
      <FormProvider {...form}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Modifier AG</DialogTitle>
            <DialogDescription>
              Modifier les informations de la session d&apos;assemblée générale.
            </DialogDescription>
          </DialogHeader>
          {isLoading ? (
            <UpdateGeneralMeetingDialogSuspense />
          ) : (
            <>
              <UpdateGeneralMeetingForm
                formId={formId}
                meetingId={meetingId}
                onSuccess={handleSuccess}
              />
              <DialogFooter className="gap-2">
                <DialogClose ref={closeRef} />
                <DialogClose asChild>
                  <Button
                    variant="muted"
                    onClick={() => form.reset()}
                  >
                    Annuler
                  </Button>
                </DialogClose>
                <Button
                  type="submit"
                  form={formId}
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? (
                    <EllipsisLoader />
                  ) : (
                    "Modifier"
                  )}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </FormProvider>
    </Dialog>
  );
}
