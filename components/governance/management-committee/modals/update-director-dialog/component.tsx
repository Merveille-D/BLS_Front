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
import { useUpdateDirectorForm } from "@/lib/governance/management-committee/hooks";
import EllipsisLoader from "@/components/ui/ellipsis-loader";
import { useOneDirector } from "@/services/api-sdk/models/management-committee/director";
import UpdateDirectorForm from "@/components/governance/management-committee/forms/update-director-form";
import { UpdateDirectorDialogSuspense } from "./suspense";
export function UpdateDirectorDialog({ directorId, ...props }) {
  const formId = useId();
  const { data, isLoading, isError } = useOneDirector(directorId);
  const form = useUpdateDirectorForm();
  const closeRef = useRef(null);
  if (isError) {
    throw new Error("Failed to fetch data");
  }
  const handleSuccess = useCallback(() => {
    closeRef.current?.click();
  }, []);
  useEffect(() => {
    if (data && !form.formState.isDirty) {
      form.reset({
        name: data.name,
        birthPlace: data.birthPlace,
        birthDate: data.birthDate,
        nationality: data.nationality,
        address: data.address,
      });
    }
  }, [data, form, isLoading]);
  return (
    <Dialog>
      <DialogTrigger {...props} />
      <FormProvider {...form}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Modifier un directeur</DialogTitle>
            <DialogDescription>
              Modifier les informations d&apos;un directeur.
            </DialogDescription>
          </DialogHeader>
          {isLoading ? (
            <UpdateDirectorDialogSuspense />
          ) : (
            <>
              <UpdateDirectorForm
                formId={formId}
                directorId={directorId}
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
