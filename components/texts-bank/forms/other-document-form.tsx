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
import { Newspaper, Tag } from "lucide-react";
import { useOtherDocumentForm } from "@/lib/texts-bank/hooks";
import { FileInput } from "@/components/ui/file-input";
export default function OtherDocumentForm({ formId, onSubmit }) {
  const form = useOtherDocumentForm();
  return (
    <Form {...form}>
      <form
        id={formId}
        className="space-y-5"
        onSubmit={form.handleSubmit(onSubmit ?? (() => {}))}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom du document</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    disabled={form.formState.isSubmitting}
                    placeholder="Nom du document"
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
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fichier</FormLabel>
              <FormControl>
                <div className="relative">
                  <FileInput
                    {...field}
                    disabled={form.formState.isSubmitting}
                    placeholder="Ajouter un fichier"
                    className="h-12 pl-10"
                  />
                  <Newspaper className="absolute bottom-1/2 left-3 translate-y-1/2 text-foreground/50" />
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
