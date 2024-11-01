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
import { useCompleteEvaluationForm } from "@/lib/evaluation/hooks";
import { toast } from "@/components/ui/use-toast";
import { useCompleteEvaluation } from "@/services/api-sdk/models/evaluation/evaluation";
import CompleteEvaluationForm from "@/components/evaluation/forms/complete-evaluation-form";
export default function CompleteEvaluationDialog({
  transferId,
  evaluation: { id, collaborator, scores },
  ...props
}) {
  const formId = useId();
  const { form } = useCompleteEvaluationForm({
    scores: scores.map((score) => ({
      criteriaId: score.criteria.id,
      score: score.score,
    })),
  });
  const closeRef = useRef(null);
  const { mutateAsync } = useCompleteEvaluation(id);
  const handleSubmit = useCallback(
    async (data) => {
      await mutateAsync(
        {
          ...data,
          transferId,
        },
        {
          onSuccess: () => {
            toast({
              description: "Evaluation complétée avec succès !",
              className: "bg-primary text-primary-foreground",
            });
            closeRef.current?.click();
          },
          onError: () => {
            toast({
              description: "Une erreur est survenue lors de la complétion",
              className: "bg-destructive text-destructive-foreground",
            });
          },
        },
      );
    },
    [mutateAsync, transferId],
  );
  return (
    <Dialog>
      <DialogTrigger {...props} />
      <FormProvider {...form}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Modifier une évaluation</DialogTitle>
            <DialogDescription>
              Mettre à jour l&apos;évaluation de {collaborator.firstname}{" "}
              {collaborator.lastname}
            </DialogDescription>
          </DialogHeader>
          <CompleteEvaluationForm
            formId={formId}
            defaultScores={scores.map((score) => ({
              criteria: {
                id: score.criteria.id,
                title: score.criteria.title,
                maxScore: score.criteria.maxScore,
              },
              score: score.score,
            }))}
            onSubmit={handleSubmit}
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
              {form.formState.isSubmitting ? <EllipsisLoader /> : "Terminer"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </FormProvider>
    </Dialog>
  );
}
