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
import { useLinkItemForm } from "@/lib/texts-bank/hooks";
import { useOneLinkItem } from "@/services/api-sdk/models/texts-bank/link-item";
import UpdateLinkItemForm from "@/components/texts-bank/forms/update-link-item-form";
import { UpdateLinkItemDialogSuspense } from "./suspense";
export function UpdateLinkItemDialogComponent({ linkItemId, ...props }) {
  const formId = useId();
  const { data, isLoading, isError } = useOneLinkItem(linkItemId);
  const form = useLinkItemForm();
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
        link: data.link,
      });
    }
  }, [data, form, isLoading]);
  return (
    <Dialog>
      <DialogTrigger {...props} />
      <FormProvider {...form}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Modifier lien</DialogTitle>
            <DialogDescription>Modifier les détails du lien.</DialogDescription>
          </DialogHeader>
          {isLoading ? (
            <UpdateLinkItemDialogSuspense />
          ) : (
            <>
              <UpdateLinkItemForm
                formId={formId}
                linkItemId={linkItemId}
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
