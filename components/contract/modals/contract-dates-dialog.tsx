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
import React, { useCallback, useId, useRef } from "react";
import { FormProvider } from "react-hook-form";
import EllipsisLoader from "@/components/ui/ellipsis-loader";
import { useContractDatesForm } from "@/lib/contract/hooks/use-contract-dates-form";
import ContractDatesForm from "@/components/contract/forms/contract-dates-form";
export default function ContractDatesDialog({
  contractId,
  dateType,
  defaultDate,
  ...props
}) {
  const formId = useId();
  const form = useContractDatesForm(dateType);
  const closeRef = useRef(null);
  const handleSuccess = useCallback(() => {
    closeRef.current?.click();
  }, []);
  return (
    <Dialog>
      <DialogTrigger {...props} />
      <FormProvider {...form}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Planifier le contrat</DialogTitle>
            <DialogDescription>
              Modifier les dates du contrat.
            </DialogDescription>
          </DialogHeader>
          <ContractDatesForm
            dateType={dateType}
            contractId={contractId}
            defaultDate={defaultDate}
            formId={formId}
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
              {form.formState.isSubmitting ? <EllipsisLoader /> : "Planifier"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </FormProvider>
    </Dialog>
  );
}
