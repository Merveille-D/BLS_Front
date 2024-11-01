import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import React from "react";
import RecoveryStepsTimeline from "@/components/recovery/ui/recovery-steps-timeline";
import { ListTodo } from "lucide-react";
import AddRecoveryStepDialog from "@/components/recovery/modals/add-recovery-step-dialog";
export default function RecoveryStepsTimelineModal({
  recoveryId,
  recoveryTitle,
  nextStepId,
  ...props
}) {
  return (
    <Sheet>
      <SheetTrigger {...props} />
      <SheetContent
        side="left"
        closeClassName="md:hidden"
        className="flex w-full flex-col gap-5 sm:w-3/4 sm:max-w-xl"
      >
        <SheetHeader>
          <div className="sm:flex sm:items-center sm:justify-between">
            <SheetTitle>Planification du recouvrement</SheetTitle>
            <AddRecoveryStepDialog
              asChild
              recoveryId={recoveryId}
            >
              <Button className="hidden gap-2 sm:inline-flex">
                <ListTodo />
                Ajouter une tâche
              </Button>
            </AddRecoveryStepDialog>
          </div>
          <SheetDescription className="line-clamp-1">
            {recoveryTitle}
          </SheetDescription>
          <AddRecoveryStepDialog
            asChild
            recoveryId={recoveryId}
          >
            <Button className="sm gap-2 sm:hidden">
              <ListTodo />
              Ajouter une tâche
            </Button>
          </AddRecoveryStepDialog>
        </SheetHeader>
        <div className="flex-1 overflow-auto">
          <RecoveryStepsTimeline
            recoveryId={recoveryId}
            nextStepId={nextStepId}
          />
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="destructive">Fermer</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
