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
import { useOneShareholder } from "@/services/api-sdk/models/shareholding";
import { useShareholderForm } from "@/lib/governance/shareholding/hooks";
import UpdateShareholderForm from "@/components/governance/shareholding/forms/update-shareholder-form";
import { UpdateShareholderDialogSuspense } from "./suspense";
export function UpdateShareholderDialog({ shareholderId, ...props }) {
  const formId = useId();
  const { data, isLoading, isError } = useOneShareholder(shareholderId);
  const form = useShareholderForm();
  const closeRef = useRef(null);
  if (isError) {
    throw new Error("Failed to fetch data");
  }
  const handleSuccess = useCallback(() => {
    closeRef.current?.click();
  }, []);
  useEffect(() => {
    if (data && !form.formState.isDirty) {
      form.reset({
        name: data.name,
        type: data.type,
        nationality: data.nationality,
        address: data.address,
        corporateType: data.corporateType ?? undefined,
        encumberedShares: data.encumberedShares,
        unencumberedShares: data.unencumberedShares,
      });
    }
  }, [data, form, isLoading]);
  return (
    <Dialog>
      <DialogTrigger {...props} />
      <FormProvider {...form}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Modifier un actionnaire</DialogTitle>
            <DialogDescription>
              Modifier les informations d&apos;un actionnaire.
            </DialogDescription>
          </DialogHeader>
          {isLoading ? (
            <UpdateShareholderDialogSuspense />
          ) : (
            <>
              <UpdateShareholderForm
                formId={formId}
                className="-mx-6 -my-3 max-h-[70vh] overflow-y-auto px-6 py-3"
                shareholderId={shareholderId}
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
