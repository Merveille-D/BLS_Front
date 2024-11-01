import React from "react";
import { Tooltip, TooltipContent } from "@/components/ui/tooltip";
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
import { Button } from "@/components/ui/button";
import EllipsisLoader from "@/components/ui/ellipsis-loader";
export default function ConfirmAccountIncidentCreationModal({
  formId,
  isSubmitting,
  cancelButtonRef,
  ...props
}) {
  return (
    <AlertDialog>
      <Tooltip>
        <AlertDialogTrigger {...props} />
        <TooltipContent>Complèter</TooltipContent>
      </Tooltip>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Êtes-vous sûr des informations saisies ?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Vous ne pourrez pas modifier les informations après validation.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            ref={cancelButtonRef}
            className="sr-only"
          />
          <AlertDialogCancel type="button">
            Vérifier les informations
          </AlertDialogCancel>
          <Button
            type="submit"
            form={formId}
            disabled={isSubmitting}
          >
            {isSubmitting ? <EllipsisLoader /> : "Imputer l'incident"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
