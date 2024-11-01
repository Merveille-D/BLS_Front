import { useFieldArray, useForm, useFormContext } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
const validationSchema = z.object({
  title: z
    .string({
      required_error: "Le titre est requis",
    })
    .min(1, "Le titre est requis"),
  caseNumber: z
    .string({
      required_error: "Le numéro de dossier est requise",
    })
    .min(1, "La référence est requise"),
  natureId: z
    .string({
      required_error: "La nature est requise",
    })
    .min(1, "La nature est requise"),
  jurisdictionId: z
    .string({
      required_error: "La jurisdiction est requise",
    })
    .min(1, "La jurisdiction est requise"),
  jurisdictionLocation: z
    .string({
      required_error: "Le lieu de la juridiction est requis",
    })
    .min(1, "Le lieu de la juridiction est requis"),
  hasProvisions: z.boolean(),
  parties: z.array(
    z.object({
      partyId: z.string({
        required_error: "La partie est requise",
      }),
      category: z.string({
        required_error: "La catégorie est requise",
      }),
      type: z.string({
        required_error: "Le type est requis",
      }),
    }),
  ),
  files: z.array(
    z.object({
      file: z.instanceof(File, {
        message: "Le fichier est requis",
      }),
      filename: z.string({
        required_error: "Le nom du fichier est requis",
      }),
    }),
  ),
});
export const useLitigationForm = () => {
  const formContext = useFormContext();
  const newForm = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      title: "",
      caseNumber: "",
      natureId: "",
      jurisdictionId: "",
      jurisdictionLocation: "",
      hasProvisions: true,
      parties: [{}],
      files: [{}],
    },
  });
  const form = formContext ?? newForm;
  const partiesArray = useFieldArray({
    control: form.control,
    name: "parties",
  });
  const filesArray = useFieldArray({
    control: form.control,
    name: "files",
  });
  return { form, filesArray, partiesArray };
};
