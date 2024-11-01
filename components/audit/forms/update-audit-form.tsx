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
import { useUpdateAuditForm } from "@/lib/audit/hooks";
import { NumberInput } from "@/components/ui/number-input";
export default function UpdateAuditForm({
  formId,
  className,
  defaultScores,
  onSubmit,
}) {
  const { form, scoresArray } = useUpdateAuditForm({
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
                <FormItem className="w-20">
                  <FormLabel>Note</FormLabel>
                  <FormControl>
                    <NumberInput
                      {...field}
                      disabled={form.formState.isSubmitting}
                    />
                  </FormControl>
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
