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
import MortgageStepsTimeline from "@/components/safety/mortgage/ui/mortgage-steps-timeline";
import { ListTodo } from "lucide-react";
import AddMortgageStepDialog from "@/components/safety/mortgage/modals/add-mortgage-step-dialog";
export default function MortgageStepsTimelineModal({
  mortgageId,
  mortgageTitle,
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
            <SheetTitle>Planification de l&apos;hypothèque</SheetTitle>
            <AddMortgageStepDialog
              asChild
              mortgageId={mortgageId}
            >
              <Button className="hidden gap-2 sm:inline-flex">
                <ListTodo />
                Ajouter une tâche
              </Button>
            </AddMortgageStepDialog>
          </div>
          <SheetDescription className="line-clamp-1">
            {mortgageTitle}
          </SheetDescription>
          <AddMortgageStepDialog
            asChild
            mortgageId={mortgageId}
          >
            <Button className="sm gap-2 sm:hidden">
              <ListTodo />
              Ajouter une tâche
            </Button>
          </AddMortgageStepDialog>
        </SheetHeader>
        <div className="flex-1 overflow-auto">
          <MortgageStepsTimeline
            mortgageId={mortgageId}
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
