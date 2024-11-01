import { useForm, useFormContext } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
const validationSchema = z.object({
  name: z
    .string({ required_error: "Le nom est requis" })
    .min(1, "Le nom est requis"),
  birthDate: z.date({
    required_error: "La date de naissance est requise",
  }),
  birthPlace: z
    .string({ required_error: "Le lieu de naissance est requis" })
    .min(1, "Le lieu de naissance est requis"),
  nationality: z
    .string({ required_error: "La nationalité est requise" })
    .min(1, "La nationalité est requise"),
  address: z
    .string({ required_error: "L'adresse est requise" })
    .min(1, "L'adresse est requise"),
  mandateStartDate: z.date({
    required_error: "La date de début du mandat est requise",
  }),
});
export const useAddDirectorForm = () => {
  const formContext = useFormContext();
  const form = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      name: "",
      birthDate: undefined,
      birthPlace: "",
      nationality: "",
      address: "",
      mandateStartDate: new Date(),
    },
  });
  return formContext ?? form;
};
