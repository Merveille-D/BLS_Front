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
import { useOneLitigationTask } from "@/services/api-sdk/models/litigation";
import { useLitigationTaskForm } from "@/lib/litigation/hooks";
import UpdateLitigationTaskForm from "@/components/litigation/forms/update-litigation-task-form";
import { UpdateLitigationTaskDialogSuspense } from "./suspense";
export function UpdateLitigationTaskDialog({ taskId, ...props }) {
  const formId = useId();
  const { data, isLoading, isError } = useOneLitigationTask(taskId);
  const form = useLitigationTaskForm();
  const closeRef = useRef(null);
  if (isError) {
    throw new Error("Failed to fetch litigation task");
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
            <UpdateLitigationTaskDialogSuspense />
          ) : (
            <>
              <UpdateLitigationTaskForm
                formId={formId}
                taskId={taskId}
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
