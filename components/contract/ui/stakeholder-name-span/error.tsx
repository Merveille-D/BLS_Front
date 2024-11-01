"use client";
import { ErrorBoundary } from "react-error-boundary";
import { useCallback } from "react";
import { cn } from "@/lib/utils";
export function StakeholderNameSpanErrorBoundary({ children, className }) {
  const ErrorComponent = useCallback(
    () => (
      <span className={cn("text-sm italic text-destructive", className)}>
        Erreur
      </span>
    ),
    [className],
  );
  return (
    <ErrorBoundary fallbackRender={ErrorComponent}>{children}</ErrorBoundary>
  );
}
