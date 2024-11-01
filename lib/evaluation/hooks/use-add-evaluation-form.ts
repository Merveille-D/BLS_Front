import { useFieldArray, useForm, useFormContext } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
const validationSchema = z.object({
  collaboratorProfileId: z
    .string({
      required_error: "Le profil du collaborateur est requis",
    })
    .min(1, "Le profil du collaborateur est requis"),
  collaboratorId: z
    .string({
      required_error: "Le collaborateur est requis",
    })
    .min(1, "Le collaborateur est requis"),
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
  isArchived: z.boolean().default(false),
});
export const useAddEvaluationForm = () => {
  const formContext = useFormContext();
  const newForm = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      scores: [],
      isArchived: false,
    },
  });
  const form = formContext ?? newForm;
  const scoresArray = useFieldArray({
    control: form.control,
    name: "scores",
  });
  return { form, scoresArray };
};
