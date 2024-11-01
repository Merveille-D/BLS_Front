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
import { UserPlus } from "lucide-react";
import UpdateLitigationDialog from "@/components/litigation/modals/update-litigation-dialog";
import PartiesGroupView from "@/components/litigation/ui/parties-group-view";
export default function PartiesModal({
  litigationId,
  litigationTitle,
  partiesGroup,
  ...props
}) {
  return (
    <Sheet>
      <SheetTrigger {...props} />
      <SheetContent
        side="right"
        closeClassName="md:hidden"
        className="flex w-full flex-col gap-5 sm:w-3/4 sm:max-w-xl"
      >
        <SheetHeader>
          <div className="sm:flex sm:items-center sm:justify-between">
            <SheetTitle>Parties</SheetTitle>
            <UpdateLitigationDialog
              asChild
              litigationId={litigationId}
            >
              <Button className="hidden gap-2 sm:inline-flex">
                <UserPlus />
                Modifier les parties
              </Button>
            </UpdateLitigationDialog>
          </div>
          <SheetDescription className="line-clamp-1">
            {litigationTitle}
          </SheetDescription>
          <UpdateLitigationDialog
            asChild
            litigationId={litigationId}
          >
            <Button className="sm gap-2 sm:hidden">
              <UserPlus />
              Modifier les parties
            </Button>
          </UpdateLitigationDialog>
        </SheetHeader>
        <div className="flex-1 space-y-10 overflow-auto py-2">
          <PartiesGroupView
            label="Partie"
            partiesGroup={partiesGroup}
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
