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
import { isEqual } from "date-fns";
import { UpdateMeetingTaskDialog } from "@/components/governance/management-committee/modals/update-meeting-task-dialog";
import DeleteMeetingTaskButton from "@/components/governance/management-committee/buttons/delete-meeting-task-button";
import CompleteMeetingTaskButton from "@/components/governance/management-committee/buttons/complete-meeting-task-button";
import { useAllMeetingTasks } from "@/services/api-sdk/models/management-committee";
import { useCurrentUser } from "@/services/api-sdk/models/user/user";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ForwardMeetingTaskDialog from "@/components/governance/management-committee/modals/forward-meeting-task-dialog";
import MeetingTaskForwardsDialog from "@/components/governance/management-committee/modals/meeting-task-forwards-dialog";
const canForward = ({ forwards, createdBy }, currentUser) => {
  if (forwards && forwards.length > 0) {
    return forwards[0].receiver.id === currentUser?.id;
  }
  return createdBy === currentUser?.id;
};
export default function ManagementCommitteeTimeline({
  meetingId,
  meetingDate,
}) {
  const { data: currentUser } = useCurrentUser();
  const { data, isLoading, isError } = useAllMeetingTasks(meetingId);
  if (isError) {
    throw new Error("Failed to fetch meeting tasks");
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!data || data.length === 0) {
    return <div>No tasks found</div>;
  }
  return (
    <Timeline>
      <TimelineSeparator />
      {data.map(
        ({ id, dueDate, title, completed, forwards, createdBy }, index) => (
          <TimelineItem
            key={id}
            className={cn("group", {
              "rounded-md border-4 border-destructive text-destructive":
                isEqual(dueDate, meetingDate),
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
                  <CompleteMeetingTaskButton
                    asChild
                    taskId={id}
                  >
                    <DropdownMenuItem
                      className="cursor-pointer gap-2"
                      onSelect={(e) => e.preventDefault()}
                    >
                      <SquareCheck />
                      Valider
                    </DropdownMenuItem>
                  </CompleteMeetingTaskButton>

                  {canForward({ forwards, createdBy }, currentUser) && (
                    <ForwardMeetingTaskDialog
                      asChild
                      taskId={id}
                    >
                      <DropdownMenuItem
                        className="cursor-pointer gap-2"
                        onSelect={(e) => e.preventDefault()}
                      >
                        <Forward />
                        Transférer
                      </DropdownMenuItem>
                    </ForwardMeetingTaskDialog>
                  )}

                  {forwards && forwards.length > 0 && (
                    <MeetingTaskForwardsDialog
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
                    </MeetingTaskForwardsDialog>
                  )}

                  <UpdateMeetingTaskDialog
                    asChild
                    taskId={id}
                  >
                    <DropdownMenuItem
                      className="cursor-pointer gap-2"
                      onSelect={(e) => e.preventDefault()}
                    >
                      <Pencil />
                      Modifier
                    </DropdownMenuItem>
                  </UpdateMeetingTaskDialog>

                  <DropdownMenuSeparator />

                  <DeleteMeetingTaskButton
                    asChild
                    taskId={id}
                  >
                    <DropdownMenuItem
                      className="cursor-pointer gap-2 text-destructive"
                      onSelect={(e) => e.preventDefault()}
                    >
                      <Trash />
                      Supprimer
                    </DropdownMenuItem>
                  </DeleteMeetingTaskButton>
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
            <TimelineItemContent
              variant="title"
              position={index % 2 === 0 ? "right" : "left"}
            >
              {formatDate(dueDate)}
            </TimelineItemContent>
          </TimelineItem>
        ),
      )}
      <TimelineHead
        className={cn({
          "bg-secondary text-secondary-foreground": data.every(
            ({ completed }) => completed,
          ),
        })}
      >
        Terminé !!!
      </TimelineHead>
    </Timeline>
  );
}
