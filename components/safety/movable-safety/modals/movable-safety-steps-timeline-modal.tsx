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
import { ListTodo } from "lucide-react";
import AddMovableSafetyStepDialog from "@/components/safety/movable-safety/modals/add-movable-safety-step-dialog";
import MovableSafetyStepsTimeline from "@/components/safety/movable-safety/ui/movable-safety-steps-timeline";
export default function MovableSafetyStepsTimelineModal({
  movableSafetyId,
  movableSafetyTitle,
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
            <SheetTitle>Planification de la sûreté mobilière</SheetTitle>
            <AddMovableSafetyStepDialog
              asChild
              movableSafetyId={movableSafetyId}
            >
              <Button className="hidden gap-2 sm:inline-flex">
                <ListTodo />
                Ajouter une tâche
              </Button>
            </AddMovableSafetyStepDialog>
          </div>
          <SheetDescription className="line-clamp-1">
            {movableSafetyTitle}
          </SheetDescription>
          <AddMovableSafetyStepDialog
            asChild
            movableSafetyId={movableSafetyId}
          >
            <Button className="sm gap-2 sm:hidden">
              <ListTodo />
              Ajouter une tâche
            </Button>
          </AddMovableSafetyStepDialog>
        </SheetHeader>
        <div className="flex-1 overflow-auto">
          <MovableSafetyStepsTimeline
            movableSafetyId={movableSafetyId}
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
