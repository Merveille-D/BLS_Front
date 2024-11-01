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
  share: z
    .number({ required_error: "Le nombre de parts est requis", coerce: true })
    .int({ message: "Le nombre de parts doit être un entier" }),
  sharePercentage: z.number({
    required_error: "Le pourcentage de parts est requis",
    coerce: true,
  }),
  type: z.enum(["individual", "corporate"], {
    required_error: "Le type est requis",
    invalid_type_error: "Le type est invalide",
  }),
  quality: z.enum(["shareholder", "non_shareholder"], {
    required_error: "La qualité est requise",
    invalid_type_error: "La qualité est invalide",
  }),
  mandateStartDate: z.date({
    required_error: "La date de début du mandat est requise",
  }),
  role: z.enum(
    [
      "ca_president",
      "ca_executive_admin",
      "ca_non_executive_admin",
      "ca_independent_admin",
    ],
    {
      required_error: "La fonction est requise",
      invalid_type_error: "La fonction est invalide",
    },
  ),
  denomination: z.string().optional(),
  companyHeadOffice: z.string().optional(),
  companyNationality: z.string().optional(),
});
export const useAddAdministratorForm = () => {
  const formContext = useFormContext();
  const form = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      name: "",
      birthDate: undefined,
      birthPlace: "",
      nationality: "",
      address: "",
      share: 0,
      sharePercentage: 0,
      type: "individual",
      quality: undefined,
      role: undefined,
      denomination: "",
      companyHeadOffice: "",
      companyNationality: "",
      mandateStartDate: new Date(),
    },
  });
  return formContext ?? form;
};
