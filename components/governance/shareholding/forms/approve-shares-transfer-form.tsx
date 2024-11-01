"use client";
import { useCallback, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import {
  corporateTypes,
  shareholderTypes,
} from "@/services/api-sdk/types/shareholding";
import { useApproveSharesTransferForm } from "@/lib/governance/shareholding/hooks";
import { useApproveSharesTransfer } from "@/services/api-sdk/models/shareholding";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tag, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import CountrySelect from "@/components/ui/country-select";
export default function ApproveSharesTransferForm({
  formId,
  transferId,
  buyer,
  className,
  onSuccess,
  onError,
}) {
  const form = useApproveSharesTransferForm();
  const { mutateAsync } = useApproveSharesTransfer(transferId);
  const handleSubmit = useCallback(
    async (data) => {
      await mutateAsync(data, {
        onSuccess: () => {
          toast({
            description: "Actionnaire ajouté avec succès !",
            className: "bg-primary text-primary-foreground",
          });
          onSuccess?.();
        },
        onError: () => {
          toast({
            description:
              "Une erreur est survenue lors de l'ajout de l'actionnaire.",
            className: "bg-destructive text-destructive-foreground",
          });
          onError?.();
        },
      });
    },
    [mutateAsync, onError, onSuccess],
  );
  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      form.reset();
    }
  }, [form]);
  return (
    <Form {...form}>
      <form
        id={formId}
        className={cn("grid grid-cols-2 gap-x-5 gap-y-10", className)}
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Type</FormLabel>
              <FormControl>
                <div className="relative">
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="h-12 pl-10">
                      <SelectValue placeholder="Sélectionner un type" />
                    </SelectTrigger>
                    <SelectContent>
                      {shareholderTypes.map((type) => (
                        <SelectItem
                          value={type.value}
                          key={type.value}
                        >
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Tag className="absolute bottom-1/2 left-3 translate-y-1/2 text-foreground/50" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.watch("type") === "corporate" && (
          <FormField
            control={form.control}
            name="corporateType"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Catégorie de personne morale</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="h-12 pl-10">
                        <SelectValue placeholder="Sélectionner une catégorie de personne morale" />
                      </SelectTrigger>
                      <SelectContent>
                        {corporateTypes.map((type) => (
                          <SelectItem
                            value={type.value}
                            key={type.value}
                          >
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Tag className="absolute bottom-1/2 left-3 translate-y-1/2 text-foreground/50" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <div className="col-span-2 space-y-2">
          <span className="cursor-not-allowed text-sm font-medium leading-none opacity-70">
            Nom
          </span>
          <div className="relative">
            <Input
              disabled
              value={buyer.name}
              placeholder="Nom & Prénom (s)"
              className="h-12 pl-10"
            />
            <User className="absolute bottom-1/2 left-3 translate-y-1/2 text-foreground/50" />
          </div>
        </div>

        <FormField
          control={form.control}
          name="nationality"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Nationalité</FormLabel>
              <FormControl>
                <CountrySelect
                  value={field.value}
                  onValueChange={field.onChange}
                  placeholder="Nationalité"
                  className="h-12"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Adresse</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    placeholder="Adresse"
                    className="h-12 pl-10"
                  />
                  <User className="absolute bottom-1/2 left-3 translate-y-1/2 text-foreground/50" />
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
