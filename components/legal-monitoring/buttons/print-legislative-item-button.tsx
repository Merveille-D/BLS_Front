"use client";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useCallback } from "react";
import { toast } from "@/components/ui/use-toast";
import { saveAs } from "file-saver";
import { cn } from "@/lib/utils";
import { usePrintLegislativeItem } from "@/services/api-sdk/models/legal-monitoring/legislative-item";
export default function PrintLegislativeItemButton({
  itemId,
  className,
  ...props
}) {
  const form = useForm();
  const { mutateAsync } = usePrintLegislativeItem(itemId);
  const handlePrint = useCallback(async () => {
    await mutateAsync({
      onSuccess: ({ buffer, filename }) => {
        saveAs(new Blob([new Uint8Array(buffer)]), filename);
      },
      onError: () => {
        toast({
          description:
            "Une erreur s'est produite lors de l'impression du dossier.",
          className: "bg-destructive text-destructive-foreground",
        });
      },
    });
  }, [mutateAsync]);
  return (
    <form
      className="contents"
      onSubmit={form.handleSubmit(handlePrint)}
    >
      <Button
        {...props}
        type="submit"
        disabled={form.formState.isSubmitting}
        className={cn(
          {
            "animate-bounce": form.formState.isSubmitting,
          },
          className,
        )}
      />
    </form>
  );
}
