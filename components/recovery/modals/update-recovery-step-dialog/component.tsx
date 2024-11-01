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
import UpdateRecoveryStepForm from "@/components/recovery/forms/update-recovery-step-form";
import { useOneRecoveryStep } from "@/services/api-sdk/models/recovery";
import { useRecoveryStepForm } from "@/lib/recovery/hooks";
import { UpdateRecoveryStepDialogSuspense } from "./suspense";
export function UpdateRecoveryStepDialog({ stepId, ...props }) {
  const formId = useId();
  const { data, isLoading, isError } = useOneRecoveryStep(stepId);
  const form = useRecoveryStepForm();
  const closeRef = useRef(null);
  if (isError) {
    throw new Error("Failed to fetch recovery step");
  }
  const handleSuccess = useCallback(() => {
    closeRef.current?.click();
  }, []);
  useEffect(() => {
    if (data && !form.formState.isDirty) {
      form.reset({
        title: data.title,
        dueDate: data.maxDueDate ?? data.minDueDate,
      });
    }
  }, [data, form, isLoading]);
  return (
    <Dialog>
      <DialogTrigger {...props} />
      <FormProvider {...form}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Modifier tâche</DialogTitle>
            <DialogDescription>
              Modifier les détails de la tâche
            </DialogDescription>
          </DialogHeader>
          {isLoading ? (
            <UpdateRecoveryStepDialogSuspense />
          ) : (
            <>
              <UpdateRecoveryStepForm
                formId={formId}
                stepId={stepId}
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
