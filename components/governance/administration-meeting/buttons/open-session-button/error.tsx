"use client";
import { ErrorBoundary } from "react-error-boundary";
import { Button } from "@/components/ui/button";
import { CircleAlert } from "lucide-react";
function ErrorComponent({ resetErrorBoundary }) {
  return (
    <Button
      variant="destructive"
      className="gap-2"
      onClick={resetErrorBoundary}
    >
      <CircleAlert />
      Erreur
    </Button>
  );
}
export function OpenSessionButtonErrorBoundary({ children }) {
  return (
    <ErrorBoundary fallbackRender={ErrorComponent}>{children}</ErrorBoundary>
  );
}
