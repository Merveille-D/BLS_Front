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
import { useOneCollaboratorProfile } from "@/services/api-sdk/models/evaluation/profile";
import { useCollaboratorProfileForm } from "@/lib/evaluation/hooks";
import UpdateCollaboratorProfileForm from "@/components/evaluation/forms/update-collaborator-profile-form";
import { UpdateCollaboratorProfileDialogSuspense } from "./suspense";
export function UpdateCollaboratorProfileDialog({ profileId, ...props }) {
  const formId = useId();
  const { data, isLoading, isError } = useOneCollaboratorProfile(profileId);
  const form = useCollaboratorProfileForm();
  const closeRef = useRef(null);
  if (isError) {
    throw new Error("Failed to fetch collaborator profile");
  }
  const handleSuccess = useCallback(() => {
    closeRef.current?.click();
  }, []);
  useEffect(() => {
    if (data && !form.formState.isDirty) {
      form.reset({
        title: data.title,
      });
    }
  }, [data, form, isLoading]);
  return (
    <Dialog>
      <DialogTrigger {...props} />
      <FormProvider {...form}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Modifier un profil</DialogTitle>
            <DialogDescription>
              Modifier les détails du profil de collaborateurs.
            </DialogDescription>
          </DialogHeader>
          {isLoading ? (
            <UpdateCollaboratorProfileDialogSuspense />
          ) : (
            <>
              <UpdateCollaboratorProfileForm
                formId={formId}
                profileId={profileId}
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
