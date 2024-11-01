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
import CompleteLitigationTaskForm from "@/components/litigation/forms/complete-litigation-task-form";
import CompleteLitigationTaskButton from "@/components/litigation/buttons/complete-litigation-task-button";
export default function CompleteLitigationTaskDialog({
  taskId,
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
          <CompleteLitigationTaskForm
            formId={formId}
            taskId={taskId}
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
    <CompleteLitigationTaskButton
      taskId={taskId}
      {...props}
    />
  );
}
