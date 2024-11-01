"use client";
import NotificationDetailsDialog from "@/components/alert/modals/notification-details-dialog";
import { useAllAlerts } from "@/services/api-sdk/models/alert/alert";
export function ActiveNotificationsDialogsComponent({ module }) {
  const { data } = useAllAlerts({ module });
  return data
    ?.filter((alert) => ["warning", "urgent"].includes(alert.priority))
    .map(({ id, priority, title, message, dueDate, moduleId }) => (
      <NotificationDetailsDialog
        key={id}
        defaultOpen
        alertId={id}
        priority={priority}
        title={title}
        message={message}
        dueDate={dueDate}
        module={module}
        moduleId={moduleId}
      />
    ));
}
