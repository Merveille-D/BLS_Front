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
import { useCollaboratorForm } from "@/lib/evaluation/hooks";
import { useOneCollaborator } from "@/services/api-sdk/models/evaluation/collaborator";
import UpdateCollaboratorForm from "@/components/evaluation/forms/update-collaborator-form";
import { UpdateCollaboratorDialogSuspense } from "./suspense";
export function UpdateCollaboratorDialog({ collaboratorId, ...props }) {
  const formId = useId();
  const { data, isLoading, isError } = useOneCollaborator(collaboratorId);
  const form = useCollaboratorForm();
  const closeRef = useRef(null);
  if (isError) {
    throw new Error("Failed to fetch collaborator");
  }
  const handleSuccess = useCallback(() => {
    closeRef.current?.click();
  }, []);
  useEffect(() => {
    if (data && !form.formState.isDirty) {
      form.reset({
        firstname: data.firstname,
        lastname: data.lastname,
      });
    }
  }, [data, form, isLoading]);
  return (
    <Dialog>
      <DialogTrigger {...props} />
      <FormProvider {...form}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Modifier collaborateur</DialogTitle>
            <DialogDescription>
              Modifier les détails du collaborateur
            </DialogDescription>
          </DialogHeader>
          {isLoading ? (
            <UpdateCollaboratorDialogSuspense />
          ) : (
            <>
              <UpdateCollaboratorForm
                formId={formId}
                collaboratorId={collaboratorId}
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
