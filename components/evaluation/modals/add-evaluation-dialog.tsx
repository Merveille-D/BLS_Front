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
import { useAddEvaluationForm } from "@/lib/evaluation/hooks";
import AddEvaluationForm from "@/components/evaluation/forms/add-evaluation-form";
import { toast } from "@/components/ui/use-toast";
import { useCreateEvaluation } from "@/services/api-sdk/models/evaluation/evaluation";
import { useRouter } from "next13-progressbar";
import { EvaluationRoutes } from "@/config/routes/evaluation";
export default function AddEvaluationDialog(props) {
  const formId = useId();
  const { form } = useAddEvaluationForm();
  const closeRef = useRef(null);
  const { mutateAsync } = useCreateEvaluation();
  const router = useRouter();
  const handleSubmit = useCallback(
    async (data) => {
      await mutateAsync(data, {
        onSuccess: ({ id }) => {
          toast({
            description: "Evaluation insérée avec succès !",
            className: "bg-primary text-primary-foreground",
          });
          router.push(EvaluationRoutes.evaluationPage(id).index);
          closeRef.current?.click();
        },
        onError: () => {
          toast({
            description: "Une erreur est survenue lors de l'insertion.",
            className: "bg-destructive text-destructive-foreground",
          });
        },
      });
    },
    [mutateAsync, router],
  );
  return (
    <Dialog>
      <DialogTrigger {...props} />
      <FormProvider {...form}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Insérer une évaluation</DialogTitle>
            <DialogDescription>
              Remplir le formulaire ci-dessous pour insérer une évaluation.
            </DialogDescription>
          </DialogHeader>
          <AddEvaluationForm
            formId={formId}
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
              {form.formState.isSubmitting ? <EllipsisLoader /> : "Evaluer"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </FormProvider>
    </Dialog>
  );
}
