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
import { useBankInfos } from "@/services/api-sdk/models/shareholding";
import { useBankInfosForm } from "@/lib/governance/shareholding/hooks";
import UpdateBankInfosForm from "@/components/governance/shareholding/forms/update-bank-infos-form";
import { UpdateBankInfosDialogSuspense } from "./suspense";
export function UpdateBankInfosDialogComponent(props) {
  const formId = useId();
  const { data, isLoading, isError } = useBankInfos();
  const form = useBankInfosForm();
  const closeRef = useRef(null);
  if (isError) {
    throw new Error("Failed to fetch bank infos");
  }
  const handleSuccess = useCallback(() => {
    closeRef.current?.click();
  }, []);
  useEffect(() => {
    if (data && !form.formState.isDirty) {
      form.reset({
        name: data.name,
        headOffice: data.headOffice,
      });
    }
  }, [data, form, isLoading]);
  return (
    <Dialog>
      <DialogTrigger {...props} />
      <FormProvider {...form}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Modifier les informations de la banque</DialogTitle>
            <DialogDescription>
              Mettre à jour les informations de la banque
            </DialogDescription>
          </DialogHeader>
          {isLoading ? (
            <UpdateBankInfosDialogSuspense />
          ) : (
            <>
              <UpdateBankInfosForm
                formId={formId}
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
