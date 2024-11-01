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
import AddLitigationTaskDialog from "@/components/litigation/modals/add-litigation-task-dialog";
import LitigationTasksTimeline from "@/components/litigation/ui/litigation-tasks-timeline";
export default function LitigationTasksTimelineModal({
  litigationId,
  litigationTitle,
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
            <SheetTitle>Planification du contentieux</SheetTitle>
            <AddLitigationTaskDialog
              asChild
              litigationId={litigationId}
            >
              <Button className="hidden gap-2 sm:inline-flex">
                <ListTodo />
                Ajouter une tâche
              </Button>
            </AddLitigationTaskDialog>
          </div>
          <SheetDescription className="line-clamp-1">
            {litigationTitle}
          </SheetDescription>
          <AddLitigationTaskDialog
            asChild
            litigationId={litigationId}
          >
            <Button className="sm gap-2 sm:hidden">
              <ListTodo />
              Ajouter une tâche
            </Button>
          </AddLitigationTaskDialog>
        </SheetHeader>
        <div className="flex-1 overflow-auto">
          <LitigationTasksTimeline
            litigationId={litigationId}
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
