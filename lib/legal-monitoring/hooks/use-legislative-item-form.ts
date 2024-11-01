import { useForm, useFormContext } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
const validationSchema = z
  .object({
    title: z
      .string({
        required_error: "Le titre est requis",
      })
      .min(1, "Le titre est requis"),
    caseNumber: z
      .string({
        required_error: "Le numéro de dossier est requis",
      })
      .min(1, "Le numéro de dossier est requis"),
    summary: z
      .string({
        required_error: "Le résumé est requis",
      })
      .min(1, "Le résumé est requis"),
    innovation: z
      .string({
        required_error: "L'innovation est requise",
      })
      .min(1, "L'innovation est requise"),
    effectiveDate: z.date({
      required_error: "La date de prise d'effet est requise",
    }),
    type: z.union([z.literal("regulation"), z.literal("legislation")], {
      required_error: "Le type est requis",
    }),
    natureId: z
      .string({
        required_error: "La nature est requise",
      })
      .min(1, "La nature est requise"),
    actionType: z.union([z.literal("archive"), z.literal("transfer_mail")], {
      required_error: "L'action est requise",
    }),
    mail: z
      .object({
        recipient: z.union([z.literal("admin"), z.literal("personnel")], {
          required_error: "Le destinataire du mail est requis",
        }),
        subject: z.string({
          required_error: "Le sujet du mail est requis",
        }),
        content: z.string({
          required_error: "Le contenu du mail est requis",
        }),
        addresses: z.array(
          z
            .string({
              required_error: "L'adresse mail est requise",
            })
            .email("L'adresse mail est invalide"),
        ),
      })
      .optional(),
  })
  .refine((data) => !(data.actionType !== "archive" && !data.mail), {
    message: "Le mail est requis pour un événement non archivé",
    path: ["mail"],
  });
export const useLegislativeItemForm = () => {
  const formContext = useFormContext();
  const form = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      title: "",
      caseNumber: "",
      summary: "",
      innovation: "",
      type: "legislation",
      effectiveDate: new Date(),
      natureId: "",
      actionType: "archive",
      mail: {
        recipient: "admin",
        subject: "",
        content: "",
        addresses: [],
      },
    },
  });
  return formContext ?? form;
};
