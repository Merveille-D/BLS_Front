"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Bell, Info, ShieldAlert, TriangleAlert } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAllAlerts } from "@/services/api-sdk/models/alert/alert";
import { Fragment, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import NotificationDetailsDialog from "@/components/alert/modals/notification-details-dialog";
const getAlertIcon = (type) => {
  switch (type) {
    case "urgent":
      return (
        <TriangleAlert
          size={30}
          className="float-left fill-destructive text-destructive-foreground"
        />
      );
    case "warning":
      return (
        <ShieldAlert
          size={30}
          className="float-left fill-yellow-500 text-primary-foreground"
        />
      );
    case "info":
      return (
        <Info
          size={30}
          className="float-left fill-blue-500 text-primary-foreground"
        />
      );
    default:
      return (
        <Info
          size={30}
          className="float-left fill-blue-500 text-primary-foreground"
        />
      );
  }
};
export default function NotificationsDropdown() {
  const { data, isLoading, isError } = useAllAlerts({ isRead: false });
  const unreadAlertsCount = useMemo(
    () => data?.filter((alert) => !alert.isRead).length ?? 0,
    [data],
  );
  return (
    <DropdownMenu>
      <Tooltip>
        <DropdownMenuTrigger
          asChild
          className="cursor-pointer"
        >
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              className="relative"
            >
              <Bell size={30} />
              {unreadAlertsCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute right-0 top-0 aspect-square -translate-x-1/4 -translate-y-1/2"
                >
                  {unreadAlertsCount}
                </Badge>
              )}
            </Button>
          </TooltipTrigger>
        </DropdownMenuTrigger>
        <TooltipContent className="space-x-2">
          {unreadAlertsCount === 0
            ? "Aucune nouvelle notification"
            : `${unreadAlertsCount} notification${unreadAlertsCount > 1 ? "s" : ""} non lue${unreadAlertsCount > 1 ? "s" : ""}`}
        </TooltipContent>
      </Tooltip>
      <DropdownMenuContent className="w-60 overflow-auto md:w-72">
        <DropdownMenuLabel className="space-x-2">
          <span>Notifications</span>
          {unreadAlertsCount > 0 && (
            <Badge variant="destructive">{unreadAlertsCount}</Badge>
          )}
        </DropdownMenuLabel>
        {isLoading && (
          <DropdownMenuItem
            disabled
            className="text-center italic text-muted-foreground"
          >
            Chargement...
          </DropdownMenuItem>
        )}

        {isError && (
          <DropdownMenuItem
            disabled
            className="text-center italic text-destructive"
          >
            <TriangleAlert
              size={30}
              className="float-left fill-destructive text-destructive-foreground"
            />
            Erreur lors du chargement
          </DropdownMenuItem>
        )}

        {!isLoading && !isError && data?.length === 0 && (
          <DropdownMenuItem
            disabled
            className="text-center italic text-muted-foreground"
          >
            Aucune notification
          </DropdownMenuItem>
        )}

        {!isLoading && !isError && data && data.length > 0 && (
          <>
            {data.map((alert, index) => (
              <Fragment key={alert.id}>
                <Tooltip>
                  <NotificationDetailsDialog
                    asChild
                    alertId={alert.id}
                    priority={alert.priority}
                    module={alert.module}
                    moduleId={alert.moduleId}
                    title={alert.title}
                    message={alert.message}
                    dueDate={alert.dueDate}
                  >
                    <TooltipTrigger asChild>
                      <DropdownMenuItem
                        key={alert.id}
                        className={cn("cursor-pointer", {
                          "text-muted-foreground": alert.isRead,
                        })}
                        onSelect={(e) => e.preventDefault()}
                      >
                        <span className="line-clamp-2">
                          {getAlertIcon(alert.priority)}
                          {alert.title}
                          {alert.isRead || (
                            <span className="absolute bottom-1/2 right-0 h-3 w-3 translate-y-1/2 rounded-full bg-primary" />
                          )}
                        </span>
                      </DropdownMenuItem>
                    </TooltipTrigger>
                  </NotificationDetailsDialog>
                  <TooltipContent>{alert.message}</TooltipContent>
                </Tooltip>
                {index < data.length - 1 && <DropdownMenuSeparator />}
              </Fragment>
            ))}
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
