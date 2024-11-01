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
import { useOneMortgageStep } from "@/services/api-sdk/models/mortgage";
import { useMortgageStepForm } from "@/lib/safety/mortgage/hooks";
import UpdateMortgageStepForm from "@/components/safety/mortgage/forms/update-mortgage-step-form";
import { UpdateMortgageStepDialogSuspense } from "./suspense";
export function UpdateMortgageStepDialog({ stepId, ...props }) {
  const formId = useId();
  const { data, isLoading, isError } = useOneMortgageStep(stepId);
  const form = useMortgageStepForm();
  const closeRef = useRef(null);
  if (isError) {
    throw new Error("Failed to fetch mortgage step");
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
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Modifier tâche</DialogTitle>
            <DialogDescription>
              Modifier les détails de la tâche
            </DialogDescription>
          </DialogHeader>
          {isLoading ? (
            <UpdateMortgageStepDialogSuspense />
          ) : (
            <>
              <UpdateMortgageStepForm
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
