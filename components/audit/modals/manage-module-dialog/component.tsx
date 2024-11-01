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
import ModuleForm from "@/components/audit/forms/module-form";
import { useModuleForm } from "@/lib/audit/hooks";
import EvaluationCriteriaView from "@/components/audit/ui/audit-criteria-view";
export function ManageModuleDialogComponent({ defaultModule, ...props }) {
  const form = useModuleForm(defaultModule);
  return (
    <Dialog>
      <DialogTrigger {...props} />
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Configurer un module</DialogTitle>
          <DialogDescription>
            Configurer un module pour auditer
          </DialogDescription>
        </DialogHeader>
        <div className="-mx-6 max-h-[70vh] space-y-10 overflow-auto px-6">
          <FormProvider {...form}>
            <ModuleForm />
          </FormProvider>
          <EvaluationCriteriaView
            label="Critères"
            module={form.watch("module")}
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
