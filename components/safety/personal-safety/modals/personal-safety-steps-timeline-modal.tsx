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
import AddPersonalSafetyStepDialog from "@/components/safety/personal-safety/modals/add-personal-safety-step-dialog";
import PersonalSafetyStepsTimeline from "@/components/safety/personal-safety/ui/personal-safety-steps-timeline";
export default function PersonalSafetyStepsTimelineModal({
  personalSafetyId,
  personalSafetyTitle,
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
            <SheetTitle>Planification de la sûreté personnelle</SheetTitle>
            <AddPersonalSafetyStepDialog
              asChild
              personalSafetyId={personalSafetyId}
            >
              <Button className="hidden gap-2 sm:inline-flex">
                <ListTodo />
                Ajouter une tâche
              </Button>
            </AddPersonalSafetyStepDialog>
          </div>
          <SheetDescription className="line-clamp-1">
            {personalSafetyTitle}
          </SheetDescription>
          <AddPersonalSafetyStepDialog
            asChild
            personalSafetyId={personalSafetyId}
          >
            <Button className="sm gap-2 sm:hidden">
              <ListTodo />
              Ajouter une tâche
            </Button>
          </AddPersonalSafetyStepDialog>
        </SheetHeader>
        <div className="flex-1 overflow-auto">
          <PersonalSafetyStepsTimeline
            personalSafetyId={personalSafetyId}
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
