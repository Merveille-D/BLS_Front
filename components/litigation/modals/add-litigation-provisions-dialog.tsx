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
import { useLitigationProvisionsForm } from "@/lib/litigation/hooks/use-litigation-provisions-form";
import AddLitigationProvisionsForm from "@/components/litigation/forms/add-litigation-provisions-form";
export default function AddLitigationProvisionsDialog({
  litigationId,
  estimatedAmount,
  addedAmountTotal,
  remainingAmount,
  ...props
}) {
  const formId = useId();
  const { reset, formState, ...form } = useLitigationProvisionsForm();
  const closeRef = useRef(null);
  const handleSuccess = useCallback(() => {
    closeRef.current?.click();
  }, []);
  useEffect(() => {
    if ((estimatedAmount || remainingAmount) && !formState.isDirty) {
      reset({
        estimatedAmount: estimatedAmount ?? 0,
        addedAmount: 0,
        remainingAmount: remainingAmount ?? 0,
      });
    }
  }, [estimatedAmount, formState.isDirty, remainingAmount, reset]);
  return (
    <Dialog>
      <DialogTrigger {...props} />
      <FormProvider
        reset={reset}
        formState={formState}
        {...form}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Ajouter des provisions</DialogTitle>
            <DialogDescription>
              Mettre à jour les provisions du contentieux
            </DialogDescription>
          </DialogHeader>
          <AddLitigationProvisionsForm
            formId={formId}
            litigationId={litigationId}
            addedAmountTotal={addedAmountTotal}
            className="-mx-6 -my-3 max-h-[70vh] overflow-y-auto px-6 py-3"
            onSuccess={handleSuccess}
          />
          <DialogFooter className="gap-2">
            <DialogClose ref={closeRef} />
            <DialogClose asChild>
              <Button
                variant="muted"
                onClick={() => reset()}
              >
                Annuler
              </Button>
            </DialogClose>
            <Button
              type="submit"
              form={formId}
              disabled={formState.isSubmitting}
            >
              {formState.isSubmitting ? <EllipsisLoader /> : "Ajouter"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </FormProvider>
    </Dialog>
  );
}
