"use client";
import { useCallback } from "react";
import { toast } from "@/components/ui/use-toast";
import { useUpdateBankInfos } from "@/services/api-sdk/models/shareholding";
import { useBankInfosForm } from "@/lib/governance/shareholding/hooks";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Tag, X } from "lucide-react";
import { FileInput } from "@/components/ui/file-input";
import { Button } from "@/components/ui/button";
export default function UpdateBankInfosForm({
  formId,
  className,
  onSuccess,
  onError,
}) {
  const form = useBankInfosForm();
  const { mutateAsync } = useUpdateBankInfos();
  const handleSubmit = useCallback(
    async (data) => {
      await mutateAsync(data, {
        onSuccess: (createdData) => {
          toast({
            description: "Les informations de la banque ont été mise à jour !",
            className: "bg-primary text-primary-foreground",
          });
          onSuccess?.(createdData);
        },
        onError: () => {
          toast({
            description:
              "Une erreur est survenue lors de la mise à jour des informations de la banque",
            className: "bg-destructive text-destructive-foreground",
          });
          onError?.();
        },
      });
    },
    [mutateAsync, onError, onSuccess],
  );
  return (
    <Form {...form}>
      <form
        id={formId}
        className={cn("grid grid-cols-2 gap-5", className)}
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormField
          control={form.control}
          name="logo"
          render={({ field }) => (
            <FormItem className="relative col-span-2 w-fit justify-self-center">
              {field.value && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 rounded-full text-destructive"
                  onClick={() => field.onChange(null)}
                >
                  <X />
                </Button>
              )}
              <FormControl>
                <FileInput
                  {...field}
                  hideFileName
                  disabled={form.formState.isSubmitting}
                  accept="image/*"
                  placeholder="Ajouter un logo"
                  className="h-16 w-48 justify-center"
                  style={
                    field.value && {
                      backgroundImage: `url(${URL.createObjectURL(field.value)})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }
                  }
                />
              </FormControl>
              <FormMessage className="text-center" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Dénomination</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    disabled={form.formState.isSubmitting}
                    placeholder="Dénomination"
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
          name="headOffice"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Siège social</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    disabled={form.formState.isSubmitting}
                    placeholder="Siège social"
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
