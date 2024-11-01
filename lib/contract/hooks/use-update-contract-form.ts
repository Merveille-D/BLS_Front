import { useFieldArray, useForm, useFormContext } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
  categoryType: z.string().optional(),
  categorySubType: z.string().optional(),
  firstStakeholdersGroup: z
    .array(
      z.object({
        stakeholderId: z
          .string({
            required_error: "Le partenaire est requis",
          })
          .min(1, "Le partenaire est requis"),
        description: z
          .string({
            required_error: "La description est requise",
          })
          .min(1, "La description est requise"),
      }),
    )
    .min(1, "Le groupe de partenaires est requis"),
  secondStakeholdersGroup: z
    .array(
      z.object({
        stakeholderId: z
          .string({
            required_error: "Le partenaire est requis",
          })
          .min(1, "Le partenaire est requis"),
        description: z
          .string({
            required_error: "La description est requise",
          })
          .min(1, "La description est requise"),
      }),
    )
    .min(1, "Le groupe de partenaires est requis"),
});
export const useUpdateContractForm = () => {
  const formContext = useFormContext();
  const newForm = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      title: "",
      category: "",
      categoryType: "",
      categorySubType: "",
      firstStakeholdersGroup: [{}],
      secondStakeholdersGroup: [{}],
    },
  });
  const form = formContext ?? newForm;
  const firstStakeholdersGroup = useFieldArray({
    rules: {
      minLength: { value: 1, message: "Le groupe de partenaires est requis" },
    },
    control: form.control,
    name: "firstStakeholdersGroup",
  });
  const secondStakeholdersGroup = useFieldArray({
    rules: {
      minLength: { value: 1, message: "Le groupe de partenaires est requis" },
    },
    control: form.control,
    name: "secondStakeholdersGroup",
  });
  return { form, firstStakeholdersGroup, secondStakeholdersGroup };
};
