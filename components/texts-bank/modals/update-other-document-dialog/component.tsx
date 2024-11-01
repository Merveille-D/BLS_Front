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
import { useOtherDocumentForm } from "@/lib/texts-bank/hooks";
import { useOneOtherDocument } from "@/services/api-sdk/models/texts-bank/other-document";
import UpdateOtherDocumentForm from "@/components/texts-bank/forms/update-other-document-form";
import { UpdateOtherDocumentDialogSuspense } from "./suspense";
export function UpdateOtherDocumentDialogComponent({ documentId, ...props }) {
  const formId = useId();
  const { data, isLoading, isError } = useOneOtherDocument(documentId);
  const form = useOtherDocumentForm(true);
  const closeRef = useRef(null);
  if (isError) {
    throw new Error("Failed to fetch document");
  }
  const handleSuccess = useCallback(() => {
    closeRef.current?.click();
  }, []);
  useEffect(() => {
    if (data && !form.formState.isDirty) {
      form.reset({
        title: data.title,
      });
    }
  }, [data, form, isLoading]);
  return (
    <Dialog>
      <DialogTrigger {...props} />
      <FormProvider {...form}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Modifier document</DialogTitle>
            <DialogDescription>
              Modifier les détails du document.
            </DialogDescription>
          </DialogHeader>
          {isLoading ? (
            <UpdateOtherDocumentDialogSuspense />
          ) : (
            <>
              <UpdateOtherDocumentForm
                formId={formId}
                documentId={documentId}
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
