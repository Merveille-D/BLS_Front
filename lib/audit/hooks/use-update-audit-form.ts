import { useFieldArray, useForm, useFormContext } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
const validationSchema = z.object({
  scores: z.array(
    z.object({
      criteriaId: z
        .string({
          required_error: "Le critère est requis",
        })
        .min(1, "Le critère est requis"),
      score: z
        .number({
          required_error: "La note est requise",
          invalid_type_error: "La note doit être un nombre",
          coerce: true,
        })
        .min(1, "La note doit être supérieure à 0"),
    }),
  ),
});
export const useUpdateAuditForm = (defaultValues) => {
  const formContext = useFormContext();
  const newForm = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues,
  });
  const form = formContext ?? newForm;
  const scoresArray = useFieldArray({
    control: form.control,
    name: "scores",
  });
  return { form, scoresArray };
};
