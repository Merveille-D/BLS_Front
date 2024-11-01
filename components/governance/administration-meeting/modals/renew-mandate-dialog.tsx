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
import { useRenewMandateForm } from "@/lib/governance/administration-meeting/hooks";
import RenewMandateForm from "@/components/governance/administration-meeting/forms/renew-mandate-form";
export default function RenewMandateDialog({
  administratorId,
  defaultRenewalDate,
  ...props
}) {
  const formId = useId();
  const form = useRenewMandateForm();
  const closeRef = useRef(null);
  const handleSuccess = useCallback(() => {
    closeRef.current?.click();
  }, []);
  useEffect(() => {
    if (!form.formState.isDirty) {
      form.reset({
        startDate: defaultRenewalDate,
      });
    }
  }, [defaultRenewalDate, form]);
  return (
    <Dialog>
      <DialogTrigger {...props} />
      <FormProvider {...form}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Renouveler mandat</DialogTitle>
            <DialogDescription>
              Renouveler le mandat d&apos;un administrateur.
            </DialogDescription>
          </DialogHeader>
          <RenewMandateForm
            formId={formId}
            administratorId={administratorId}
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
              {form.formState.isSubmitting ? <EllipsisLoader /> : "Renouveler"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </FormProvider>
    </Dialog>
  );
}
