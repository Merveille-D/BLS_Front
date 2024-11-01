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
import { useOneContractEvent } from "@/services/api-sdk/models/contract/contract-event";
import { useContractEventForm } from "@/lib/contract/hooks";
import UpdateContractEventForm from "@/components/contract/forms/update-contract-event-form";
import { UpdateContractEventDialogSuspense } from "./suspense";
export function UpdateContractEventDialog({ eventId, ...props }) {
  const formId = useId();
  const { data, isLoading, isError } = useOneContractEvent(eventId);
  const form = useContractEventForm();
  const closeRef = useRef(null);
  if (isError) {
    throw new Error("Failed to fetch contract event");
  }
  const handleSuccess = useCallback(() => {
    closeRef.current?.click();
  }, []);
  useEffect(() => {
    if (data && !form.formState.isDirty) {
      form.reset({
        title: data.title,
        dueDate: data.dueDate,
      });
    }
  }, [data, form, isLoading]);
  return (
    <Dialog>
      <DialogTrigger {...props} />
      <FormProvider {...form}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Modifier événement</DialogTitle>
            <DialogDescription>
              Modifier les détails de l&apos;événement.
            </DialogDescription>
          </DialogHeader>
          {isLoading ? (
            <UpdateContractEventDialogSuspense />
          ) : (
            <>
              <UpdateContractEventForm
                formId={formId}
                eventId={eventId}
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
