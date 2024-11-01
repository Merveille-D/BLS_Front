"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { useUpdateEvaluationForm } from "@/lib/evaluation/hooks";
import { NumberInput } from "@/components/ui/number-input";
export default function UpdateEvaluationForm({
  formId,
  className,
  defaultScores,
  onSubmit,
}) {
  const { form, scoresArray } = useUpdateEvaluationForm({
    scores: defaultScores.map((score) => ({
      criteriaId: score.criteria.id,
      score: score.score,
    })),
  });
  return (
    <Form {...form}>
      <form
        id={formId}
        className={cn("flex flex-col gap-10", className)}
        onSubmit={form.handleSubmit(onSubmit ?? (() => {}))}
      >
        {scoresArray.fields.map((item, index) => (
          <div
            key={item.id}
            className="flex items-center gap-5"
          >
            <span className="line-clamp-2 flex-1 text-lg italic text-muted-foreground">
              {defaultScores[index].criteria.title}
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
                    <span>/{defaultScores[index].criteria.maxScore}</span>
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
