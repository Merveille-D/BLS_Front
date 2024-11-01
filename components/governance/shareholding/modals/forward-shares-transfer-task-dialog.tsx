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
import { useForwardSharesTransferTaskForm } from "@/lib/governance/shareholding/hooks";
import ForwardSharesTransferTaskForm from "@/components/governance/shareholding/forms/forward-shares-transfer-task-form";
export default function ForwardSharesTransferTaskDialog({ taskId, ...props }) {
  const formId = useId();
  const form = useForwardSharesTransferTaskForm();
  const closeRef = useRef(null);
  const handleSuccess = useCallback(() => {
    closeRef.current?.click();
  }, []);
  return (
    <Dialog>
      <DialogTrigger {...props} />
      <FormProvider {...form}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Transfert d&apos;événement</DialogTitle>
            <DialogDescription>
              Transférer l&apos;événement à un collaborateur
            </DialogDescription>
          </DialogHeader>
          <ForwardSharesTransferTaskForm
            formId={formId}
            taskId={taskId}
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
              {form.formState.isSubmitting ? <EllipsisLoader /> : "Transférer"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </FormProvider>
    </Dialog>
  );
}
