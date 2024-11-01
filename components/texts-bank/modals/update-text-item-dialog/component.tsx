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
import { useTextItemForm } from "@/lib/texts-bank/hooks";
import { useOneTextItem } from "@/services/api-sdk/models/texts-bank/text-item";
import UpdateTextItemForm from "@/components/texts-bank/forms/update-text-item-form";
import { UpdateTextItemDialogSuspense } from "./suspense";
export function UpdateTextItemDialogComponent({ textItemId, ...props }) {
  const formId = useId();
  const { data, isLoading, isError } = useOneTextItem(textItemId);
  const form = useTextItemForm(true);
  const closeRef = useRef(null);
  if (isError) {
    throw new Error("Failed to fetch text item");
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
            <DialogTitle>Modifier texte</DialogTitle>
            <DialogDescription>
              Modifier les détails du texte.
            </DialogDescription>
          </DialogHeader>
          {isLoading ? (
            <UpdateTextItemDialogSuspense />
          ) : (
            <>
              <UpdateTextItemForm
                formId={formId}
                textItemId={textItemId}
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
