"use client";
import { ErrorBoundary } from "react-error-boundary";
import { ActiveNotificationsDialogsComponent } from "./component";
export default function ActiveNotificationsDialogs({ module }) {
  return (
    <ErrorBoundary fallbackRender={() => null}>
      <ActiveNotificationsDialogsComponent module={module} />
    </ErrorBoundary>
  );
}
