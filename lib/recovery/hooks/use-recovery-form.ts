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
    type: z.enum(
      [
        "friendly_without_guarantee",
        "friendly_with_guarantee",
        "forced_without_guarantee",
        "forced_with_guarantee",
      ],
      {
        invalid_type_error: "Le type est invalide",
        required_error: "Le type est requis",
      },
    ),
    guaranteeId: z.string().optional(),
    contractId: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.type.includes("with_guarantee")) {
        return data.guaranteeId !== undefined;
      }
      return true;
    },
    {
      message: "La garantie est requise",
      path: ["guaranteeId"],
    },
  )
  .refine(
    (data) => {
      if (data.type.includes("without_guarantee")) {
        return data.contractId !== undefined;
      }
      return true;
    },
    {
      message: "Le contrat est requis",
      path: ["contractId"],
    },
  );
export const useRecoveryForm = () => {
  const formContext = useFormContext();
  const newForm = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      title: "",
      type: "friendly_without_guarantee",
      guaranteeId: undefined,
      contractId: undefined,
    },
  });
  return formContext ?? newForm;
};
