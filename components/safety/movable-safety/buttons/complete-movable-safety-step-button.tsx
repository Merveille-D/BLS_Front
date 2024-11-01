"use client";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useForm } from "react-hook-form";
import { useCallback, useRef } from "react";
import EllipsisLoader from "@/components/ui/ellipsis-loader";
import { toast } from "@/components/ui/use-toast";
import { useCompleteMovableSafetyStep } from "@/services/api-sdk/models/movable-safety";
export default function CompleteMovableSafetyStepButton({ stepId, ...props }) {
  const form = useForm();
  const { mutateAsync } = useCompleteMovableSafetyStep(stepId);
  const ref = useRef(null);
  const handleComplete = useCallback(async () => {
    await mutateAsync(undefined, {
      onSuccess: () => {
        toast({
          description: "Etape complétée avec succès !",
          className: "bg-primary text-primary-foreground",
        });
        ref.current?.click();
      },
      onError: () => {
        toast({
          description:
            "Une erreur est survenue lors de la complétion de l'étape.",
          className: "bg-destructive text-destructive-foreground",
        });
      },
    });
  }, [mutateAsync]);
  return (
    <AlertDialog>
      <AlertDialogTrigger {...props} />
      <AlertDialogContent>
        <form onSubmit={form.handleSubmit(handleComplete)}>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Êtes-vous sûr de vouloir compléter cette étape ?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              ref={ref}
              className="sr-only"
            />
            <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? <EllipsisLoader /> : "Terminer"}
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
