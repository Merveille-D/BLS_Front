import { useForm, useFormContext } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDays } from "date-fns";
const validationSchema = z.object({
  title: z
    .string({
      required_error: "Le titre est requis",
    })
    .min(1, "Le titre est requis"),
  category: z
    .string({
      required_error: "La catégorie est requise",
    })
    .min(1, "La catégorie est requise"),
  dateReceived: z
    .date({
      required_error: "La date de réception est requise",
    })
    .max(addDays(new Date(), 1), "La date de réception est invalide"),
  isClient: z.boolean(),
  author: z
    .string({
      required_error: "L'auteur est requis",
    })
    .min(1, "L'auteur est requis"),
});
export const useAccountIncidentForm = () => {
  const formContext = useFormContext();
  const newForm = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      title: "",
      category: "",
      dateReceived: new Date(),
      isClient: true,
      author: "",
    },
  });
  return formContext ?? newForm;
};
