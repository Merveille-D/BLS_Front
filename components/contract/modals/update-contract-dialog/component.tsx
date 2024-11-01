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
import { useUpdateContractForm } from "@/lib/contract/hooks";
import { useOneContract } from "@/services/api-sdk/models/contract/contract";
import UpdateContractForm from "@/components/contract/forms/update-contract-form";
import { UpdateContractDialogSuspense } from "./suspense";
export function UpdateContractDialogComponent({ contractId, ...props }) {
  const formId = useId();
  const { data, isLoading, isError } = useOneContract(contractId);
  const { form } = useUpdateContractForm();
  const closeRef = useRef(null);
  if (isError) {
    throw new Error("Failed to fetch contract data");
  }
  const handleSuccess = useCallback(() => {
    closeRef.current?.click();
  }, []);
  useEffect(() => {
    if (data && !form.formState.isDirty) {
      form.reset({
        title: data.title,
        category: data.category.id,
        categoryType: data.categoryType?.id,
        categorySubType: data.categorySubType?.id,
        firstStakeholdersGroup: data.firstStakeholdersGroup,
        secondStakeholdersGroup: data.secondStakeholdersGroup,
      });
    }
  }, [data, form, isLoading]);
  return (
    <Dialog>
      <DialogTrigger {...props} />
      <FormProvider {...form}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Modifier contrat</DialogTitle>
            <DialogDescription>
              Modifier les détails du contrat.
            </DialogDescription>
          </DialogHeader>
          {isLoading ? (
            <UpdateContractDialogSuspense />
          ) : (
            <>
              <UpdateContractForm
                formId={formId}
                contractId={contractId}
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
