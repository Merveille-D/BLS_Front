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
import EllipsisLoader from "@/components/ui/ellipsis-loader";
import { useOneMandate } from "@/services/api-sdk/models/administration-meeting";
import { useUpdateMandateForm } from "@/lib/governance/administration-meeting/hooks";
import { UpdateMandateDialogSuspense } from "@/components/governance/administration-meeting/modals/update-mandate-dialog/suspense";
import UpdateMandateForm from "@/components/governance/administration-meeting/forms/update-mandate-form";
export function UpdateMandateDialog({ mandateId, ...props }) {
  const formId = useId();
  const { data, isLoading, isError } = useOneMandate(mandateId);
  const form = useUpdateMandateForm();
  const closeRef = useRef(null);
  if (isError) {
    throw new Error("Failed to fetch mandate");
  }
  const handleSuccess = useCallback(() => {
    closeRef.current?.click();
  }, []);
  useEffect(() => {
    if (data && !form.formState.isDirty) {
      form.reset({
        startDate: data.startDate,
      });
    }
  }, [data, form, isLoading]);
  return (
    <Dialog>
      <DialogTrigger {...props} />
      <FormProvider {...form}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Modifier mandat</DialogTitle>
            <DialogDescription>
              Modifier les détails du mandat.
            </DialogDescription>
          </DialogHeader>
          {isLoading ? (
            <UpdateMandateDialogSuspense />
          ) : (
            <>
              <UpdateMandateForm
                formId={formId}
                mandateId={mandateId}
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
