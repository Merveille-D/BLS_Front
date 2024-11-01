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
import { useMarkMeetingTaskAsCompleted } from "@/services/api-sdk/models/general-meeting";
export default function CompleteMeetingTaskButton({ taskId, ...props }) {
  const form = useForm();
  const { mutateAsync } = useMarkMeetingTaskAsCompleted(taskId);
  const ref = useRef(null);
  const handleComplete = useCallback(async () => {
    await mutateAsync({
      onSuccess: () => {
        ref.current?.click();
        toast({
          description: "Tâche complétée avec succès !",
          className: "bg-primary text-primary-foreground",
        });
      },
      onError: () => {
        toast({
          description:
            "Une erreur est survenue lors de la complétion de la tâche.",
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
              Êtes-vous sûr de vouloir compléter cette tâche ?
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
