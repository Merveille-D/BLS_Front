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
import React from "react";
import { FormProvider } from "react-hook-form";
import ProfileForm from "@/components/evaluation/forms/profile-form";
import { useProfileForm } from "@/lib/evaluation/hooks";
import EvaluationCriteriaView from "@/components/evaluation/ui/evaluation-criteria-view";
import CollaboratorsView from "@/components/evaluation/ui/collaborators-view";
export function ManageProfileDialogComponent({ defaultProfile, ...props }) {
  const form = useProfileForm(defaultProfile);
  return (
    <Dialog>
      <DialogTrigger {...props} />
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Configurer un profil</DialogTitle>
          <DialogDescription>
            Configurer un profil pour évaluer un collaborateur
          </DialogDescription>
        </DialogHeader>
        <div className="-mx-6 max-h-[70vh] space-y-10 overflow-auto px-6">
          <FormProvider {...form}>
            <ProfileForm />
          </FormProvider>
          <EvaluationCriteriaView
            label="Critères"
            profileId={form.watch("profileId")}
          />
          <CollaboratorsView
            label="Collaborateurs"
            profileId={form.watch("profileId")}
          />
        </div>
        <DialogFooter className="gap-2">
          <DialogClose asChild>
            <Button variant="destructive">Fermer</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
