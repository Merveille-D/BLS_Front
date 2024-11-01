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
import { useUpdateEvaluationForm } from "@/lib/evaluation/hooks";
import UpdateEvaluationForm from "@/components/evaluation/forms/update-evaluation-form";
import { toast } from "@/components/ui/use-toast";
import { useUpdateEvaluation } from "@/services/api-sdk/models/evaluation/evaluation";
export default function UpdateEvaluationDialog({
  evaluation: { id, collaborator, scores },
  ...props
}) {
  const formId = useId();
  const { form } = useUpdateEvaluationForm({
    scores: scores.map((score) => ({
      criteriaId: score.criteria.id,
      score: score.score,
    })),
  });
  const closeRef = useRef(null);
  const { mutateAsync } = useUpdateEvaluation(id);
  const handleSubmit = useCallback(
    async (data) => {
      await mutateAsync(data, {
        onSuccess: () => {
          toast({
            description: "Evaluation modifiée avec succès !",
            className: "bg-primary text-primary-foreground",
          });
          closeRef.current?.click();
        },
        onError: () => {
          toast({
            description: "Une erreur est survenue lors de la modification.",
            className: "bg-destructive text-destructive-foreground",
          });
        },
      });
    },
    [mutateAsync],
  );
  return (
    <Dialog>
      <DialogTrigger {...props} />
      <FormProvider {...form}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Modifier une évaluation</DialogTitle>
            <DialogDescription>
              Mettre à jour l&apos;évaluation de {collaborator.firstname}{" "}
              {collaborator.lastname}
            </DialogDescription>
          </DialogHeader>
          <UpdateEvaluationForm
            formId={formId}
            defaultScores={scores.map((score) => ({
              criteria: {
                id: score.criteria.id,
                title: score.criteria.title,
                maxScore: score.criteria.maxScore,
              },
              score: score.score,
            }))}
            className="-mx-6 -my-3 max-h-[70vh] overflow-y-auto px-6 py-3"
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
              {form.formState.isSubmitting ? <EllipsisLoader /> : "Modifier"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </FormProvider>
    </Dialog>
  );
}
