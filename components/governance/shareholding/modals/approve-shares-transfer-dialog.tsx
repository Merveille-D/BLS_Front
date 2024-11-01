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
import { useApproveSharesTransferForm } from "@/lib/governance/shareholding/hooks";
import ApproveSharesTransferForm from "@/components/governance/shareholding/forms/approve-shares-transfer-form";
export default function ApproveSharesTransferDialog({
  transferId,
  buyer,
  ...props
}) {
  const formId = useId();
  const form = useApproveSharesTransferForm();
  const closeRef = useRef(null);
  const handleSuccess = useCallback(() => {
    closeRef.current?.click();
  }, []);
  return (
    <Dialog>
      <DialogTrigger {...props} />
      <FormProvider {...form}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              Approuver le transfert d&apos;actions vers {buyer.name}
            </DialogTitle>
            <DialogDescription>
              Veuillez remplir les informations nécessaires pour approuver le
              transfert d&apos;actions.
            </DialogDescription>
          </DialogHeader>
          <ApproveSharesTransferForm
            formId={formId}
            transferId={transferId}
            buyer={buyer}
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
              {form.formState.isSubmitting ? <EllipsisLoader /> : "Approuver"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </FormProvider>
    </Dialog>
  );
}
