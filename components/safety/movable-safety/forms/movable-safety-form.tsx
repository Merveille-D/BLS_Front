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
import { useMovableSafetyForm } from "@/lib/safety/movable-safety/hooks";
import ContractSelect from "@/components/safety/movable-safety/inputs/contract-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  movableSafetyFormalizationTypes,
  movableSafetySecurities,
  movableSafetyTypes,
} from "@/services/api-sdk/types/safety/movable-safety/movable-safety";
export default function MovableSafetyForm({ formId, className, onSubmit }) {
  const form = useMovableSafetyForm();
  return (
    <Form {...form}>
      <form
        id={formId}
        className={cn("grid grid-cols-2 gap-x-5 gap-y-10", className)}
        onSubmit={form.handleSubmit(onSubmit ?? (() => {}))}
      >
        <FormField
          control={form.control}
          name="security"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type de sûreté</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Type de sûreté" />
                  </SelectTrigger>
                  <SelectContent>
                    {movableSafetySecurities.map((type) => (
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
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type de Gage / Nantissement</FormLabel>
              <FormControl>
                <Select
                  disabled={!form.watch("security")}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Type de Gage / Nantissement" />
                  </SelectTrigger>
                  <SelectContent>
                    {form.watch("security") &&
                      movableSafetyTypes[form.watch("security")].map((type) => (
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

        {form.watch("type") !== "vehicle" && (
          <FormField
            control={form.control}
            name="formalizationType"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Type de formalisation</FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Type de formalisation" />
                    </SelectTrigger>
                    <SelectContent>
                      {movableSafetyFormalizationTypes.map((type) => (
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
        )}

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="col-span-2">
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

        <FormField
          control={form.control}
          name="contractId"
          render={({ field }) => (
            <FormItem className="col-span-2">
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
      </form>
    </Form>
  );
}
