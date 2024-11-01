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
import { useAdministrationMeetingForm } from "@/lib/governance/administration-meeting/hooks";
import EllipsisLoader from "@/components/ui/ellipsis-loader";
import { useOneAdministrationMeeting } from "@/services/api-sdk/models/administration-meeting";
import UpdateAdministrationMeetingForm from "@/components/governance/administration-meeting/forms/update-administration-meeting-form";
import { UpdateAdministrationMeetingDialogSuspense } from "./suspense";
export function UpdateAdministrationMeetingDialog({ meetingId, ...props }) {
  const formId = useId();
  const { data, isLoading, isError } = useOneAdministrationMeeting(meetingId);
  const form = useAdministrationMeetingForm();
  const closeRef = useRef(null);
  if (isError) {
    throw new Error("Failed to fetch administration meeting");
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
            <DialogTitle>Modifier CA</DialogTitle>
            <DialogDescription>
              Modifier les informations de la session de conseil
              d&apos;administration.
            </DialogDescription>
          </DialogHeader>
          {isLoading ? (
            <UpdateAdministrationMeetingDialogSuspense />
          ) : (
            <>
              <UpdateAdministrationMeetingForm
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
