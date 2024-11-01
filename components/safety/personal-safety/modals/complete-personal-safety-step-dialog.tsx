"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import React, { useCallback, useId, useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import EllipsisLoader from "@/components/ui/ellipsis-loader";
import CompletePersonalSafetyStepForm from "@/components/safety/personal-safety/forms/complete-personal-safety-step-form";
import CompletePersonalSafetyStepButton from "@/components/safety/personal-safety/buttons/complete-personal-safety-step-button";
export default function CompletePersonalSafetyStepDialog({
  stepId,
  stepForm,
  ...props
}) {
  const formId = useId();
  const form = useForm();
  const closeRef = useRef(null);
  const handleSuccess = useCallback(() => {
    closeRef.current?.click();
  }, []);
  return stepForm ? (
    <Dialog>
      <DialogTrigger {...props} />
      <FormProvider {...form}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{stepForm.title}</DialogTitle>
          </DialogHeader>
          <CompletePersonalSafetyStepForm
            formId={formId}
            stepId={stepId}
            stepForm={stepForm}
            className="-mx-6 -my-3 max-h-[70vh] overflow-y-auto px-6 py-3"
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
              {form.formState.isSubmitting ? <EllipsisLoader /> : "Completer"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </FormProvider>
    </Dialog>
  ) : (
    <CompletePersonalSafetyStepButton
      stepId={stepId}
      {...props}
    />
  );
}
