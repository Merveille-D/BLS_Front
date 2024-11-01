import { useForm, useFormContext } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
const validationSchema = z.object({
  title: z
    .string({
      required_error: "Le titre est requis",
    })
    .min(1, "Le titre est requis"),
  maxScore: z
    .number({
      required_error: "Le score maximum est requis",
      invalid_type_error: "Le score maximum doit être un nombre",
      coerce: true,
    })
    .min(1, "Le score maximum doit être supérieur à 0"),
  type: z.enum(["quantitative", "qualitative"], {
    required_error: "Le type est requis",
  }),
  description: z
    .string({
      required_error: "La description est requise",
    })
    .min(1, "La description est requise"),
});
export const useAuditCriteriaForm = () => {
  const formContext = useFormContext();
  const form = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      title: "",
      maxScore: 0,
      type: "quantitative",
      description: "",
    },
  });
  return formContext ?? form;
};
