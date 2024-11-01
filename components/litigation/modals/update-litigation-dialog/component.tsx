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
import { useOneLitigation } from "@/services/api-sdk/models/litigation/litigation";
import { useLitigationForm } from "@/lib/litigation/hooks";
import UpdateLitigationForm from "@/components/litigation/forms/update-litigation-form";
import { UpdateLitigationDialogSuspense } from "./suspense";
export function UpdateLitigationDialogComponent({ litigationId, ...props }) {
  const formId = useId();
  const { data, isLoading, isError } = useOneLitigation(litigationId);
  const { form } = useLitigationForm();
  const closeRef = useRef(null);
  if (isError) {
    throw new Error("Failed to fetch litigation");
  }
  const handleSuccess = useCallback(() => {
    closeRef.current?.click();
  }, []);
  useEffect(() => {
    if (data && !form.formState.isDirty) {
      form.reset({
        title: data.title,
        caseNumber: data.caseNumber,
        natureId: data.nature.id,
        jurisdictionId: data.jurisdiction.id,
        jurisdictionLocation: data.jurisdictionLocation,
        hasProvisions: data.hasProvisions,
        parties: data.parties.map((party) => ({
          partyId: party.id,
          category: party.category,
          type: party.type,
        })),
      });
    }
  }, [data, form, isLoading]);
  return (
    <Dialog>
      <DialogTrigger {...props} />
      <FormProvider {...form}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Modifier contentieux</DialogTitle>
            <DialogDescription>
              Modifier les détails du contentieux
            </DialogDescription>
          </DialogHeader>
          {isLoading ? (
            <UpdateLitigationDialogSuspense />
          ) : (
            <>
              <UpdateLitigationForm
                formId={formId}
                litigationId={litigationId}
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
