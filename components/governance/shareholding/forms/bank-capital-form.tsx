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
import { cn } from "@/lib/utils";
import { useBankCapitalForm } from "@/lib/governance/shareholding/hooks";
import { DateInput } from "@/components/ui/date-input";
import { NumberInput } from "@/components/ui/number-input";
export default function BankCapitalForm({ formId, className, onSubmit }) {
  const form = useBankCapitalForm();
  return (
    <Form {...form}>
      <form
        id={formId}
        className={cn("grid grid-cols-2 gap-x-5 gap-y-10", className)}
        onSubmit={form.handleSubmit(onSubmit ?? (() => {}))}
      >
        <FormField
          control={form.control}
          name="capital"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Capital social</FormLabel>
              <FormControl>
                <div className="relative">
                  <NumberInput
                    {...field}
                    placeholder="Capital social"
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
          name="nominalValue"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Valeur nominale de l&apos;action</FormLabel>
              <FormControl>
                <div className="relative">
                  <NumberInput
                    {...field}
                    placeholder="Valeur nominale de l'action"
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
          name="date"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Date</FormLabel>
              <FormControl>
                <DateInput
                  value={field.value}
                  className="h-12"
                  onChange={field.onChange}
                  disabled={form.formState.isSubmitting}
                  maxDate={new Date()}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
