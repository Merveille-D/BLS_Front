"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tag } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePersonalSafetyForm } from "@/lib/safety/personal-safety/hooks";
import ContractSelect from "@/components/safety/personal-safety/inputs/contract-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { personalSafetyTypes } from "@/services/api-sdk/types/safety/personal-safety/personal-safety";
import GuaranteeSelect from "@/components/safety/personal-safety/inputs/guarantee-select";
export default function PersonalSafetyForm({ formId, className, onSubmit }) {
  const form = usePersonalSafetyForm();
  return (
    <Form {...form}>
      <form
        id={formId}
        className={cn("space-y-10", className)}
        onSubmit={form.handleSubmit(onSubmit ?? (() => {}))}
      >
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {personalSafetyTypes.map((type) => (
                      <SelectItem
                        key={type.value}
                        value={type.value}
                      >
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Intitulé</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    disabled={form.formState.isSubmitting}
                    placeholder="Intitulé"
                    className="h-12 pl-10"
                  />
                  <Tag className="absolute bottom-1/2 left-3 translate-y-1/2 text-foreground/50" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.watch("type") === "autonomous_counter" ? (
          <FormField
            control={form.control}
            name="guaranteeId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Garantie autonome</FormLabel>
                <FormControl>
                  <div className="relative">
                    <GuaranteeSelect
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={form.formState.isSubmitting}
                      className="h-12 pl-10"
                    />
                    <Tag className="absolute bottom-1/2 left-3 translate-y-1/2 text-foreground/50" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : (
          <FormField
            control={form.control}
            name="contractId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contrat</FormLabel>
                <FormControl>
                  <div className="relative">
                    <ContractSelect
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={form.formState.isSubmitting}
                      className="h-12 pl-10"
                    />
                    <Tag className="absolute bottom-1/2 left-3 translate-y-1/2 text-foreground/50" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
      </form>
    </Form>
  );
}