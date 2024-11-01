"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { useAddEvaluationForm } from "@/lib/evaluation/hooks";
import { Tag } from "lucide-react";
import CollaboratorSelect from "@/components/evaluation/inputs/collaborator-select";
import { useAllEvaluationCriteria } from "@/services/api-sdk/models/evaluation/criteria";
import { useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { NumberInput } from "@/components/ui/number-input";
import CollaboratorProfileSelect from "@/components/evaluation/inputs/collaborator-profile-select";
export default function AddEvaluationForm({ formId, className, onSubmit }) {
  const {
    form: { setValue, ...form },
    scoresArray,
  } = useAddEvaluationForm();
  const { data, isLoading } = useAllEvaluationCriteria({
    profileId: form.watch("collaboratorProfileId"),
  });
  useEffect(() => {
    if (data) {
      setValue(
        "scores",
        data.map((criteria) => ({ criteriaId: criteria.id, score: 0 })),
      );
    }
  }, [data, setValue]);
  return (
    <Form
      {...form}
      setValue={setValue}
    >
      <form
        id={formId}
        className={cn("flex flex-col gap-5", className)}
        onSubmit={form.handleSubmit(onSubmit ?? (() => {}))}
      >
        <FormField
          control={form.control}
          name="isArchived"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2 space-y-0">
              <FormLabel className="text-md">Archiver ?</FormLabel>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="collaboratorProfileId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profil du collaborateur</FormLabel>
              <FormControl>
                <div className="relative">
                  <CollaboratorProfileSelect
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
          name="collaboratorId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Collaborateur</FormLabel>
              <FormControl>
                <div className="relative">
                  <CollaboratorSelect
                    profileId={form.watch("collaboratorProfileId")}
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={
                      !form.watch("collaboratorProfileId") ||
                      form.formState.isSubmitting
                    }
                    className="h-12 pl-10"
                  />
                  <Tag className="absolute bottom-1/2 left-3 translate-y-1/2 text-foreground/50" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {isLoading && (
          <p className="text-center text-muted-foreground">
            Chargement des critères d&apos;évaluation...
          </p>
        )}

        {!isLoading && scoresArray.fields.length === 0 && (
          <p className="text-center text-muted-foreground">
            Aucun critère d&apos;évaluation n&apos;est disponible pour ce
            collaborateur.
          </p>
        )}

        {!isLoading && scoresArray.fields.length > 0 && (
          <div className="flex items-center gap-5">
            <span className="line-clamp-2 flex-1 text-lg italic text-muted-foreground">
              Critères d&apos;évaluation
            </span>
            <span className="w-20 text-lg italic text-muted-foreground">
              Notes
            </span>
          </div>
        )}

        {!isLoading &&
          scoresArray.fields.map((item, index) => (
            <div
              key={item.id}
              className="flex items-center gap-5"
            >
              <span className="line-clamp-2 flex-1">
                {data?.find((c) => c.id === item.criteriaId)?.title}
              </span>

              <FormField
                control={form.control}
                name={`scores.${index}.score`}
                render={({ field }) => (
                  <FormItem className="w-32">
                    <div className="inline-flex items-center gap-1">
                      <FormControl>
                        <NumberInput
                          {...field}
                          disabled={form.formState.isSubmitting}
                        />
                      </FormControl>
                      <span>
                        /{data?.find((c) => c.id === item.criteriaId)?.maxScore}
                      </span>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}
      </form>
    </Form>
  );
}
