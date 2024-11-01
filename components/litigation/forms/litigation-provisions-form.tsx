"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Tag } from "lucide-react";
import { useLitigationProvisionsForm } from "@/lib/litigation/hooks/use-litigation-provisions-form";
import { cn, formatAmount } from "@/lib/utils";
import { NumberInput } from "@/components/ui/number-input";
export default function LitigationProvisionsForm({
  formId,
  addedAmountTotal,
  className,
  onSubmit,
}) {
  const form = useLitigationProvisionsForm();
  return (
    <Form {...form}>
      <form
        id={formId}
        className={cn("grid grid-cols-2 gap-x-5 gap-y-10", className)}
        onSubmit={form.handleSubmit(onSubmit ?? (() => {}))}
      >
        <FormField
          control={form.control}
          name="estimatedAmount"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Provisions constituées</FormLabel>
              <FormControl>
                <div className="relative">
                  <NumberInput
                    {...field}
                    placeholder="Provisions constituées"
                    className="h-12 pl-10"
                  />
                  <Tag className="absolute bottom-1/2 left-3 translate-y-1/2 text-foreground/50" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="addedAmount"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>
                Provisions à constituer (total actuel:{" "}
                {formatAmount(addedAmountTotal ?? 0)})
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <NumberInput
                    {...field}
                    placeholder="Provisions à constituer"
                    className="h-12 pl-10"
                  />
                  <Tag className="absolute bottom-1/2 left-3 translate-y-1/2 text-foreground/50" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="remainingAmount"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Provisions reprises</FormLabel>
              <FormControl>
                <div className="relative">
                  <NumberInput
                    {...field}
                    placeholder="Provisions reprises"
                    className="h-12 pl-10"
                  />
                  <Tag className="absolute bottom-1/2 left-3 translate-y-1/2 text-foreground/50" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
