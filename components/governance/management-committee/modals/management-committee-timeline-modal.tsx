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
import AddTaskDialog from "@/components/governance/management-committee/modals/add-task-dialog";
import ManagementCommitteeTimeline from "@/components/governance/management-committee/ui/management-committee-timeline";
export default function ManagementCommitteeTimelineModal({
  meetingId,
  meetingDate,
  meetingTitle,
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
            <SheetTitle>Planification du CODIR</SheetTitle>
            <AddTaskDialog
              asChild
              meetingId={meetingId}
            >
              <Button className="hidden gap-2 sm:inline-flex">
                <ListTodo />
                Ajouter une tâche
              </Button>
            </AddTaskDialog>
          </div>
          <SheetDescription>{meetingTitle}</SheetDescription>
          <AddTaskDialog
            asChild
            meetingId={meetingId}
          >
            <Button className="sm gap-2 sm:hidden">
              <ListTodo />
              Ajouter une tâche
            </Button>
          </AddTaskDialog>
        </SheetHeader>
        <div className="flex-1 overflow-auto">
          <ManagementCommitteeTimeline
            meetingId={meetingId}
            meetingDate={meetingDate}
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
