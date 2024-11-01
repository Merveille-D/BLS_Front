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
import { useOneJudicialItem } from "@/services/api-sdk/models/legal-monitoring/judicial-item";
import { useJudicialItemForm } from "@/lib/legal-monitoring/hooks";
import UpdateJudicialItemForm from "@/components/legal-monitoring/forms/update-judicial-item-form";
import { UpdateJudicialItemDialogSuspense } from "./suspense";
export function UpdateJudicialItemDialogComponent({ itemId, ...props }) {
  const formId = useId();
  const { data, isLoading, isError } = useOneJudicialItem(itemId);
  const form = useJudicialItemForm();
  const closeRef = useRef(null);
  if (isError) {
    throw new Error("Failed to fetch judicial item data");
  }
  const handleSuccess = useCallback(() => {
    closeRef.current?.click();
  }, []);
  useEffect(() => {
    if (data && !form.formState.isDirty) {
      form.reset({
        title: data.title,
        summary: data.summary,
        innovation: data.innovation,
        eventDate: data.eventDate,
        jurisdictionId: data.jurisdiction.id,
        jurisdictionLocation: data.jurisdictionLocation,
        actionType: data.isArchived ? "archive" : "transfer_mail",
        mail: data.mail,
      });
    }
  }, [data, form, isLoading]);
  return (
    <Dialog>
      <DialogTrigger {...props} />
      <FormProvider {...form}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Modifier contrat</DialogTitle>
            <DialogDescription>
              Modifier les détails du contrat.
            </DialogDescription>
          </DialogHeader>
          {isLoading ? (
            <UpdateJudicialItemDialogSuspense />
          ) : (
            <>
              <UpdateJudicialItemForm
                formId={formId}
                itemId={itemId}
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
