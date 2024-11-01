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
import ContractEventsTimeline from "@/components/contract/ui/contract-events-timeline";
import AddContractEventDialog from "@/components/contract/modals/add-contract-event-dialog";
export default function ContractEventsTimelineModal({
  contractId,
  contractTitle,
  contractSignatureDate,
  contractEffectiveDate,
  contractExpirationDate,
  contractRenewalDate,
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
            <SheetTitle>Evénements du contrat</SheetTitle>
            <AddContractEventDialog
              asChild
              contractId={contractId}
            >
              <Button className="hidden gap-2 sm:inline-flex">
                <ListTodo />
                Ajouter un événement
              </Button>
            </AddContractEventDialog>
          </div>
          <SheetDescription className="line-clamp-1">
            {contractTitle}
          </SheetDescription>
          <AddContractEventDialog
            asChild
            contractId={contractId}
          >
            <Button className="sm gap-2 sm:hidden">
              <ListTodo />
              Ajouter un événement
            </Button>
          </AddContractEventDialog>
        </SheetHeader>
        <div className="flex-1 overflow-auto">
          <ContractEventsTimeline
            contractId={contractId}
            signatureDate={contractSignatureDate}
            effectiveDate={contractEffectiveDate}
            expirationDate={contractExpirationDate}
            renewalDate={contractRenewalDate}
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
