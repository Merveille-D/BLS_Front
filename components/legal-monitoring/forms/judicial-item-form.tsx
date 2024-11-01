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
import { useJudicialItemForm } from "@/lib/legal-monitoring/hooks";
import { Textarea } from "@/components/ui/textarea";
import { DateInput } from "@/components/ui/date-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { MultipleInput } from "@/components/ui/multiple-input";
import JurisdictionSelect from "@/components/legal-monitoring/inputs/jurisdiction-select";
export default function JudicialItemForm({ formId, className, onSubmit }) {
  const form = useJudicialItemForm();
  return (
    <Form {...form}>
      <form
        id={formId}
        className={cn("grid grid-cols-2 gap-5", className)}
        onSubmit={form.handleSubmit(onSubmit ?? (() => {}))}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Intitulé de l&apos;affaire</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    disabled={form.formState.isSubmitting}
                    placeholder="Intitulé de l'affaire"
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
          name="jurisdictionId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Juridiction</FormLabel>
              <FormControl>
                <div className="relative">
                  <JurisdictionSelect
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

        <FormField
          control={form.control}
          name="jurisdictionLocation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lieu de la juridiction</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    placeholder="Lieu de la juridiction"
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
          name="summary"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Résumé de l&apos;affaire</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  disabled={form.formState.isSubmitting}
                  placeholder="Résumé de l'affaire"
                  className="resize-none"
                  rows={5}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="innovation"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Innovations</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  disabled={form.formState.isSubmitting}
                  placeholder="Innovations"
                  className="resize-none"
                  rows={5}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="actionType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Action</FormLabel>
              <FormControl>
                <div className="relative">
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="h-12 pl-10">
                      <SelectValue placeholder="Sélectionner une action" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="archive">Archiver</SelectItem>
                      <SelectItem value="transfer_mail">
                        Transférer par mail
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <Tag className="absolute bottom-1/2 left-3 translate-y-1/2 text-foreground/50" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="eventDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date de la décision</FormLabel>
              <FormControl>
                <DateInput
                  value={field.value}
                  className="h-12"
                  onChange={field.onChange}
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.watch("actionType") === "transfer_mail" && (
          <>
            <Separator className="col-span-2 my-5" />

            <FormField
              control={form.control}
              name="mail.recipient"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Destinataire</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="h-12 pl-10">
                          <SelectValue placeholder="Sélectionner une action" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="personnel">
                            Pour le personnel
                          </SelectItem>
                          <SelectItem value="admin">
                            Pour les administrateurs
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <Tag className="absolute bottom-1/2 left-3 translate-y-1/2 text-foreground/50" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="mail.addresses"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Adresses</FormLabel>
                  <FormControl>
                    <MultipleInput
                      {...field}
                      disabled={form.formState.isSubmitting}
                      placeholder="Entrer une adresse mail"
                      containerClassName="min-h-12"
                    />
                  </FormControl>
                  <p className="text-sm font-medium text-destructive">
                    {form.formState.errors.mail?.addresses?.length &&
                      form.formState.errors.mail.addresses.length > 0 &&
                      "Une adresse mail est invalide"}
                  </p>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="mail.subject"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Objet</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        disabled={form.formState.isSubmitting}
                        placeholder="Objet"
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
              name="mail.content"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      disabled={form.formState.isSubmitting}
                      placeholder="Message"
                      className="resize-none"
                      rows={5}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
      </form>
    </Form>
  );
}
