"use client";
import {
  Timeline,
  TimelineHead,
  TimelineItem,
  TimelineItemContent,
  TimelineItemDot,
  TimelineSeparator,
} from "@/components/ui/timeline";
import { cn, formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  EllipsisVertical,
  Forward,
  Pencil,
  SquareCheck,
  SquareStack,
  Trash,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAllContractEvents } from "@/services/api-sdk/models/contract/contract-event";
import CompleteContractEventButton from "@/components/contract/buttons/complete-contract-event-button";
import DeleteContractEventButton from "@/components/contract/buttons/delete-contract-event-button";
import { UpdateContractEventDialog } from "@/components/contract/modals/update-contract-event-dialog";
import { useMemo } from "react";
import ContractDatesDialog from "@/components/contract/modals/contract-dates-dialog";
import ForwardContractEventDialog from "@/components/contract/modals/forward-contract-event-dialog";
import { useCurrentUser } from "@/services/api-sdk/models/user/user";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ContractEventForwardsDialog from "@/components/contract/modals/contract-event-forwards-dialog";
const canForward = ({ forwards, createdBy }, currentUser) => {
  if (forwards && forwards.length > 0) {
    return forwards[0].receiver.id === currentUser?.id;
  }
  return createdBy === currentUser?.id;
};
export default function ContractEventsTimeline({
  contractId,
  signatureDate,
  effectiveDate,
  expirationDate,
  renewalDate,
}) {
  const { data: currentUser } = useCurrentUser();
  const { data, isLoading, isError } = useAllContractEvents(contractId);
  if (isError) {
    throw new Error("Failed to fetch contract events");
  }
  const allEvents = useMemo(() => {
    const events = [
      {
        id: "signatureDate",
        title: "Signature du contrat",
        dueDate: signatureDate,
        completed: !!signatureDate && signatureDate < new Date(),
      },
      {
        id: "effectiveDate",
        title: "Prise d'effet du contrat",
        dueDate: effectiveDate,
        completed: !!effectiveDate && effectiveDate < new Date(),
      },
      {
        id: "expirationDate",
        title: "Expiration du contrat",
        dueDate: expirationDate,
        completed: !!expirationDate && expirationDate < new Date(),
      },
      {
        id: "renewalDate",
        title: "Renouvellement du contrat",
        dueDate: renewalDate,
        completed: !!renewalDate && renewalDate < new Date(),
      },
    ].map((event) => ({
      ...event,
      createdBy: "",
      forwards: [],
    }));
    return [...(data ?? []), ...events].sort((a, b) => {
      if (a.dueDate && b.dueDate) {
        return a.dueDate.getTime() - b.dueDate.getTime();
      }
      if (a.completed && !b.completed) {
        return -1;
      }
      if (!a.completed && b.completed) {
        return 1;
      }
      return 0;
    });
  }, [data, signatureDate, effectiveDate, expirationDate, renewalDate]);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <Timeline>
      <TimelineSeparator />
      {allEvents.map(
        ({ id, dueDate, title, completed, createdBy, forwards }, index) =>
          [
            "signatureDate",
            "effectiveDate",
            "expirationDate",
            "renewalDate",
          ].includes(id) ? (
            <TimelineItem
              key={id}
              className={cn("group", {
                "text-foreground/50": completed,
              })}
            >
              {completed || (
                <div className="absolute right-0 top-0 z-10 flex items-center opacity-0 transition duration-500 group-hover:opacity-100">
                  <Tooltip>
                    <ContractDatesDialog
                      asChild
                      contractId={contractId}
                      defaultDate={dueDate}
                      dateType={id}
                    >
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-full bg-accent"
                        >
                          <Pencil />
                        </Button>
                      </TooltipTrigger>
                    </ContractDatesDialog>
                    <TooltipContent>Modifier</TooltipContent>
                  </Tooltip>
                </div>
              )}

              <TimelineItemDot
                className={cn({
                  "border border-secondary bg-background": !completed,
                })}
              />

              <TimelineItemContent
                position={index % 2 === 0 ? "left" : "right"}
              >
                {title}
                {completed && (
                  <p className="text-right text-xs italic">(Complété)</p>
                )}
              </TimelineItemContent>
              {dueDate ? (
                <TimelineItemContent
                  variant="title"
                  position={index % 2 === 0 ? "right" : "left"}
                >
                  {formatDate(dueDate)}
                </TimelineItemContent>
              ) : (
                <ContractDatesDialog
                  asChild
                  contractId={contractId}
                  defaultDate={dueDate}
                  dateType={id}
                >
                  <Button
                    variant="link"
                    className="text-secondary"
                  >
                    Cliquer pour planifier
                  </Button>
                </ContractDatesDialog>
              )}
            </TimelineItem>
          ) : (
            <TimelineItem
              key={id}
              className={cn("group", {
                "text-foreground/50": completed,
              })}
            >
              {completed || (
                <DropdownMenu>
                  <Tooltip>
                    <DropdownMenuTrigger asChild>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 z-10 rounded-full bg-accent opacity-0 transition duration-500 group-hover:opacity-100"
                        >
                          <EllipsisVertical />
                        </Button>
                      </TooltipTrigger>
                    </DropdownMenuTrigger>
                    <TooltipContent>Menu</TooltipContent>
                  </Tooltip>
                  <DropdownMenuContent>
                    <CompleteContractEventButton
                      asChild
                      eventId={id}
                    >
                      <DropdownMenuItem
                        className="cursor-pointer gap-2"
                        onSelect={(e) => e.preventDefault()}
                      >
                        <SquareCheck />
                        Valider
                      </DropdownMenuItem>
                    </CompleteContractEventButton>

                    {canForward({ forwards, createdBy }, currentUser) && (
                      <ForwardContractEventDialog
                        asChild
                        eventId={id}
                      >
                        <DropdownMenuItem
                          className="cursor-pointer gap-2"
                          onSelect={(e) => e.preventDefault()}
                        >
                          <Forward />
                          Transférer
                        </DropdownMenuItem>
                      </ForwardContractEventDialog>
                    )}

                    {forwards && forwards.length > 0 && (
                      <ContractEventForwardsDialog
                        asChild
                        forwards={forwards}
                      >
                        <DropdownMenuItem
                          className="cursor-pointer gap-2"
                          onSelect={(e) => e.preventDefault()}
                        >
                          <SquareStack />
                          Historique des transferts
                        </DropdownMenuItem>
                      </ContractEventForwardsDialog>
                    )}

                    <UpdateContractEventDialog
                      asChild
                      eventId={id}
                    >
                      <DropdownMenuItem
                        className="cursor-pointer gap-2"
                        onSelect={(e) => e.preventDefault()}
                      >
                        <Pencil />
                        Modifier
                      </DropdownMenuItem>
                    </UpdateContractEventDialog>

                    <DropdownMenuSeparator />

                    <DeleteContractEventButton
                      asChild
                      eventId={id}
                    >
                      <DropdownMenuItem
                        className="cursor-pointer gap-2 text-destructive"
                        onSelect={(e) => e.preventDefault()}
                      >
                        <Trash />
                        Supprimer
                      </DropdownMenuItem>
                    </DeleteContractEventButton>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}

              <TimelineItemDot
                className={cn({
                  "border border-secondary bg-background": !completed,
                })}
              />

              <TimelineItemContent
                position={index % 2 === 0 ? "left" : "right"}
              >
                {title}
                {completed && (
                  <p className="text-right text-xs italic">(Complété)</p>
                )}
              </TimelineItemContent>
              {dueDate && (
                <TimelineItemContent
                  variant="title"
                  position={index % 2 === 0 ? "right" : "left"}
                >
                  {formatDate(dueDate)}
                </TimelineItemContent>
              )}
            </TimelineItem>
          ),
      )}
      <TimelineHead
        className={cn({
          "bg-secondary text-secondary-foreground": allEvents.every(
            (event) => event.completed,
          ),
        })}
      >
        Terminé !!!
      </TimelineHead>
    </Timeline>
  );
}
