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
import UpdateContractDialog from "@/components/contract/modals/update-contract-dialog";
import StakeholdersGroupView from "@/components/contract/ui/stakeholders-group-view";
export default function StakeholdersModal({
  contractId,
  contractTitle,
  firstStakeholdersGroup,
  secondStakeholdersGroup,
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
            <SheetTitle>Parties prenantes</SheetTitle>
            <UpdateContractDialog
              asChild
              contractId={contractId}
            >
              <Button className="hidden gap-2 sm:inline-flex">
                <UserPlus />
                Modifier les parties prenantes
              </Button>
            </UpdateContractDialog>
          </div>
          <SheetDescription className="line-clamp-1">
            {contractTitle}
          </SheetDescription>
          <UpdateContractDialog
            asChild
            contractId={contractId}
          >
            <Button className="sm gap-2 sm:hidden">
              <UserPlus />
              Modifier les parties prenantes
            </Button>
          </UpdateContractDialog>
        </SheetHeader>
        <div className="flex-1 space-y-10 overflow-auto py-2">
          <StakeholdersGroupView
            label="Partie 1"
            stakeholdersGroup={firstStakeholdersGroup}
          />

          <StakeholdersGroupView
            label="Partie 2"
            stakeholdersGroup={secondStakeholdersGroup}
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
