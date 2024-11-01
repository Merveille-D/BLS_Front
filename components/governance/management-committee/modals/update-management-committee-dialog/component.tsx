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
import { useManagementCommitteeForm } from "@/lib/governance/management-committee/hooks";
import EllipsisLoader from "@/components/ui/ellipsis-loader";
import { useOneManagementCommittee } from "@/services/api-sdk/models/management-committee";
import UpdateManagementCommitteeForm from "@/components/governance/management-committee/forms/update-management-committee-form";
import { UpdateManagementCommitteeDialogSuspense } from "./suspense";
export function UpdateManagementCommitteeDialog({ meetingId, ...props }) {
  const formId = useId();
  const { data, isLoading, isError } = useOneManagementCommittee(meetingId);
  const form = useManagementCommitteeForm();
  const closeRef = useRef(null);
  if (isError) {
    throw new Error("Failed to fetch data");
  }
  const handleSuccess = useCallback(() => {
    closeRef.current?.click();
  }, []);
  useEffect(() => {
    if (data && !form.formState.isDirty) {
      form.reset({
        title: data.title,
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
            <DialogTitle>Modifier CODIR</DialogTitle>
            <DialogDescription>
              Modifier les informations de la session du CODIR
            </DialogDescription>
          </DialogHeader>
          {isLoading ? (
            <UpdateManagementCommitteeDialogSuspense />
          ) : (
            <>
              <UpdateManagementCommitteeForm
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
