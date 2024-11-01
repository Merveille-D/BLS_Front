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
import { useAllPersonalSafetySteps } from "@/services/api-sdk/models/personal-safety";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrentUser } from "@/services/api-sdk/models/user/user";
import DeletePersonalSafetyStepButton from "@/components/safety/personal-safety/buttons/delete-personal-safety-step-button";
import CompletePersonalSafetyStepDialog from "@/components/safety/personal-safety/modals/complete-personal-safety-step-dialog";
import ForwardPersonalSafetyStepDialog from "@/components/safety/personal-safety/modals/forward-personal-safety-step-dialog";
import PersonalSafetyStepForwardsDialog from "@/components/safety/personal-safety/modals/personal-safety-step-forwards-dialog";
import { UpdatePersonalSafetyStepDialog } from "@/components/safety/personal-safety/modals/update-personal-safety-step-dialog";
const canForward = ({ forwards, createdBy }, currentUser) => {
  if (forwards && forwards.length > 0) {
    return forwards[0].receiver.id === currentUser?.id;
  }
  return createdBy === currentUser?.id;
};
export default function PersonalSafetyStepsTimeline({
  personalSafetyId,
  nextStepId,
}) {
  const { data: currentUser } = useCurrentUser();
  const { data, isLoading, isError } =
    useAllPersonalSafetySteps(personalSafetyId);
  if (isError) {
    throw new Error("Failed to fetch personal safety steps");
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!data || data.length === 0) {
    return <div>No steps found</div>;
  }
  return (
    <Timeline>
      <TimelineSeparator />
      {data.map(
        (
          {
            id,
            title,
            type,
            completed,
            form,
            minDueDate,
            maxDueDate,
            createdBy,
            forwards,
          },
          index,
        ) => (
          <TimelineItem
            key={id}
            className={cn("group", {
              "rounded-md border-4 border-destructive text-destructive":
                nextStepId === id,
              "text-foreground/50": completed,
            })}
          >
            {!completed && (
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
                  <CompletePersonalSafetyStepDialog
                    asChild
                    stepId={id}
                    stepForm={form}
                  >
                    <DropdownMenuItem
                      disabled={nextStepId !== id}
                      className="cursor-pointer gap-2"
                      onSelect={(e) => e.preventDefault()}
                    >
                      <SquareCheck />
                      Valider
                    </DropdownMenuItem>
                  </CompletePersonalSafetyStepDialog>

                  {canForward({ forwards, createdBy }, currentUser) && (
                    <ForwardPersonalSafetyStepDialog
                      asChild
                      eventId={id}
                    >
                      <DropdownMenuItem
                        disabled={nextStepId !== id}
                        className="cursor-pointer gap-2"
                        onSelect={(e) => e.preventDefault()}
                      >
                        <Forward />
                        Transférer
                      </DropdownMenuItem>
                    </ForwardPersonalSafetyStepDialog>
                  )}

                  {forwards && forwards.length > 0 && (
                    <PersonalSafetyStepForwardsDialog
                      asChild
                      forwards={forwards}
                    >
                      <DropdownMenuItem
                        disabled={!(nextStepId === id && form)}
                        className="cursor-pointer gap-2"
                        onSelect={(e) => e.preventDefault()}
                      >
                        <SquareStack />
                        Historique des transferts
                      </DropdownMenuItem>
                    </PersonalSafetyStepForwardsDialog>
                  )}

                  {type === "task" && (
                    <>
                      <UpdatePersonalSafetyStepDialog
                        asChild
                        stepId={id}
                      >
                        <DropdownMenuItem
                          className="cursor-pointer gap-2"
                          onSelect={(e) => e.preventDefault()}
                        >
                          <Pencil />
                          Modifier
                        </DropdownMenuItem>
                      </UpdatePersonalSafetyStepDialog>

                      <DropdownMenuSeparator />

                      <DeletePersonalSafetyStepButton
                        asChild
                        stepId={id}
                      >
                        <DropdownMenuItem
                          className="cursor-pointer gap-2 text-destructive"
                          onSelect={(e) => e.preventDefault()}
                        >
                          <Trash />
                          Supprimer
                        </DropdownMenuItem>
                      </DeletePersonalSafetyStepButton>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            <TimelineItemDot
              className={cn({
                "border border-secondary bg-background": !completed,
              })}
            />

            <TimelineItemContent position={index % 2 === 0 ? "left" : "right"}>
              {title}
              {completed && (
                <p className="text-right text-xs italic">(Complété)</p>
              )}
            </TimelineItemContent>

            {minDueDate && maxDueDate && (
              <TimelineItemContent
                variant="title"
                position={index % 2 === 0 ? "right" : "left"}
              >
                {formatDate(minDueDate)} - {formatDate(maxDueDate)}
              </TimelineItemContent>
            )}

            {!minDueDate && maxDueDate && (
              <TimelineItemContent
                variant="title"
                position={index % 2 === 0 ? "right" : "left"}
              >
                {formatDate(maxDueDate)}
              </TimelineItemContent>
            )}
          </TimelineItem>
        ),
      )}
      <TimelineHead
        className={cn({
          "bg-secondary text-secondary-foreground": data.every(
            (step) => step.completed,
          ),
        })}
      >
        Terminé !!!
      </TimelineHead>
    </Timeline>
  );
}
