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
import { useOneEvaluationCriteria } from "@/services/api-sdk/models/evaluation/criteria";
import { useEvaluationCriteriaForm } from "@/lib/evaluation/hooks";
import UpdateEvaluationCriteriaForm from "@/components/evaluation/forms/update-evaluation-criteria-form";
import { UpdateEvaluationCriteriaDialogSuspense } from "./suspense";
export function UpdateEvaluationCriteriaDialog({ criteriaId, ...props }) {
  const formId = useId();
  const { data, isLoading, isError } = useOneEvaluationCriteria(criteriaId);
  const form = useEvaluationCriteriaForm();
  const closeRef = useRef(null);
  if (isError) {
    throw new Error("Failed to fetch evaluation criteria");
  }
  const handleSuccess = useCallback(() => {
    closeRef.current?.click();
  }, []);
  useEffect(() => {
    if (data && !form.formState.isDirty) {
      form.reset({
        title: data.title,
        type: data.type,
        maxScore: data.maxScore,
        description: data.description,
      });
    }
  }, [data, form, isLoading]);
  return (
    <Dialog>
      <DialogTrigger {...props} />
      <FormProvider {...form}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Modifier critère</DialogTitle>
            <DialogDescription>
              Modifier les détails du critère d&apos;évaluation
            </DialogDescription>
          </DialogHeader>
          {isLoading ? (
            <UpdateEvaluationCriteriaDialogSuspense />
          ) : (
            <>
              <UpdateEvaluationCriteriaForm
                formId={formId}
                criteriaId={criteriaId}
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
