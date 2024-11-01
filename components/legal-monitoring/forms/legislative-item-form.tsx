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
import { useLegislativeItemForm } from "@/lib/legal-monitoring/hooks";
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
import LegislationNatureSelect from "@/components/legal-monitoring/inputs/legislation-nature-select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MultipleInput } from "@/components/ui/multiple-input";
export default function LegislativeItemForm({ formId, className, onSubmit }) {
  const form = useLegislativeItemForm();
  return (
    <Form {...form}>
      <form
        id={formId}
        className={cn("grid grid-cols-2 gap-5", className)}
        onSubmit={form.handleSubmit(onSubmit ?? (() => {}))}
      >
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="col-span-2 space-y-3">
              <FormControl>
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="flex items-center justify-center gap-5"
                >
                  <FormItem className="flex items-center gap-1 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="legislation" />
                    </FormControl>
                    <FormLabel className="font-normal">Nouvelle loi</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center gap-1 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="regulation" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Nouveau règlement
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>
                Intitulé{" "}
                {form.watch("type") === "legislation"
                  ? "de la loi"
                  : "du règlement"}
              </FormLabel>
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
          name="caseNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Référence</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    disabled={form.formState.isSubmitting}
                    placeholder="Référence"
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
          name="natureId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Matière</FormLabel>
              <FormControl>
                <div className="relative">
                  <LegislationNatureSelect
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
          name="summary"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Résumé</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  disabled={form.formState.isSubmitting}
                  placeholder="Résumé"
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
          name="effectiveDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date de prise d&apos;effet</FormLabel>
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
