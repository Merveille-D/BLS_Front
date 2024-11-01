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
import { useOneLitigation } from "@/services/api-sdk/models/litigation/litigation";
import { useAssignCollaboratorsForm } from "@/lib/litigation/hooks";
import AssignCollaboratorsForm from "@/components/litigation/forms/assign-collaborators-form";
import { AssignCollaboratorsDialogSuspense } from "./suspense";
export function AssignCollaboratorsDialogComponent({ litigationId, ...props }) {
  const formId = useId();
  const { data, isLoading, isError } = useOneLitigation(litigationId);
  const { form } = useAssignCollaboratorsForm();
  const closeRef = useRef(null);
  if (isError) {
    throw new Error("Failed to fetch litigation");
  }
  const handleSuccess = useCallback(() => {
    closeRef.current?.click();
  }, []);
  useEffect(() => {
    if (data && !form.formState.isDirty) {
      form.reset({
        users: data.users.map(({ id }) => ({ id })),
        lawyers: data.lawyers.map(({ id }) => ({ id })),
      });
    }
  }, [data, form, isLoading]);
  return (
    <Dialog>
      <DialogTrigger {...props} />
      <FormProvider {...form}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Assigner des collaborateurs / avocats</DialogTitle>
            <DialogDescription>
              Assigner des collaborateurs et des avocats à ce dossier.
            </DialogDescription>
          </DialogHeader>
          {isLoading ? (
            <AssignCollaboratorsDialogSuspense />
          ) : (
            <>
              <AssignCollaboratorsForm
                formId={formId}
                litigationId={litigationId}
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
                  {form.formState.isSubmitting ? (
                    <EllipsisLoader />
                  ) : (
                    "Assigner"
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
