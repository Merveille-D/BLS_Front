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
import { useForwardPersonalSafetyStepForm } from "@/lib/safety/personal-safety/hooks";
import ForwardPersonalSafetyStepForm from "@/components/safety/personal-safety/forms/forward-personal-safety-step-form";
export default function ForwardPersonalSafetyStepDialog({ eventId, ...props }) {
  const formId = useId();
  const form = useForwardPersonalSafetyStepForm();
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
            <DialogTitle>Transfert de tâche</DialogTitle>
            <DialogDescription>
              Transférer la tâche à un collaborateur
            </DialogDescription>
          </DialogHeader>
          <ForwardPersonalSafetyStepForm
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
              {form.formState.isSubmitting ? <EllipsisLoader /> : "Transférer"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </FormProvider>
    </Dialog>
  );
}
