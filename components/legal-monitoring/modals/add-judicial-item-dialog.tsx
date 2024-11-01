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
import { useJudicialItemForm } from "@/lib/legal-monitoring/hooks";
import AddJudicialItemForm from "@/components/legal-monitoring/forms/add-judicial-item-form";
import { useRouter } from "next13-progressbar";
import { LegalMonitoringRoutes } from "@/config/routes";
export default function AddJudicialItemDialog(props) {
  const formId = useId();
  const form = useJudicialItemForm();
  const closeRef = useRef(null);
  const router = useRouter();
  const handleSuccess = useCallback(
    ({ id }) => {
      closeRef.current?.click();
      router.push(LegalMonitoringRoutes.judicialItemPage(id).index);
    },
    [router],
  );
  return (
    <Dialog>
      <DialogTrigger {...props} />
      <FormProvider {...form}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Nouvelle affaire judiciaire</DialogTitle>
            <DialogDescription>
              Ajouter une nouvelle affaire judiciaire
            </DialogDescription>
          </DialogHeader>
          <AddJudicialItemForm
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
              {form.formState.isSubmitting ? <EllipsisLoader /> : "Ajouter"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </FormProvider>
    </Dialog>
  );
}
