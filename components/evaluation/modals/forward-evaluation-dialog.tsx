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
import { useForwardEvaluationForm } from "@/lib/evaluation/hooks";
import ForwardEvaluationForm from "@/components/evaluation/forms/forward-evaluation-form";
export default function ForwardEvaluationDialog({ evaluationId, ...props }) {
  const formId = useId();
  const form = useForwardEvaluationForm();
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
            <DialogTitle>Transfert d&apos;évaluation</DialogTitle>
            <DialogDescription>
              Transférer l&apos;évaluation à un autre collaborateur.
            </DialogDescription>
          </DialogHeader>
          <ForwardEvaluationForm
            formId={formId}
            evaluationId={evaluationId}
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
