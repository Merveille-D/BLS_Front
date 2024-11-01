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
import { useAttendantForm } from "@/lib/governance/administration-meeting/hooks";
import EllipsisLoader from "@/components/ui/ellipsis-loader";
import { useOneMeetingAttendant } from "@/services/api-sdk/models/administration-meeting";
import UpdateAttendantForm from "@/components/governance/administration-meeting/forms/update-attendant-form";
import { UpdateAttendantDialogSuspense } from "./suspense";
export function UpdateAttendantDialog({ attendantId, ...props }) {
  const formId = useId();
  const { data, isLoading, isError } = useOneMeetingAttendant(attendantId);
  const form = useAttendantForm();
  const closeRef = useRef(null);
  if (isError) {
    throw new Error("Failed to fetch meeting attendant");
  }
  const handleSuccess = useCallback(() => {
    closeRef.current?.click();
  }, []);
  useEffect(() => {
    if (data && !form.formState.isDirty) {
      form.reset({
        name: data.name,
        grade: data.grade,
      });
    }
  }, [data, form, isLoading]);
  return (
    <Dialog>
      <DialogTrigger {...props} />
      <FormProvider {...form}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Modifier un participant</DialogTitle>
            <DialogDescription>
              Modifier les détails du participant
            </DialogDescription>
          </DialogHeader>
          {isLoading ? (
            <UpdateAttendantDialogSuspense />
          ) : (
            <>
              <UpdateAttendantForm
                formId={formId}
                attendantId={attendantId}
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
