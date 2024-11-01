import { useForm, useFormContext } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { movableSafetyTypes } from "@/services/api-sdk/types/safety/movable-safety/movable-safety";
const validationSchema = z
  .object({
    title: z
      .string({
        required_error: "Le titre est requis",
      })
      .min(1, "Le titre est requis"),
    security: z.enum(["pledge", "collateral"], {
      required_error: "Le type est requis",
    }),
    type: z.enum(
      ["stock", "vehicle", "shareholder_rights", "trade_fund", "bank_account"],
      {
        required_error: "Le type de garantie est requis",
      },
    ),
    formalizationType: z.enum(["legal", "conventional"]).optional(),
    contractId: z
      .string({
        required_error: "Le contrat est requis",
      })
      .min(1, "Le contrat est requis"),
  })
  .refine(
    ({ type, security }) =>
      movableSafetyTypes[security].map((t) => t.value).includes(type),
    {
      message: "Le type de garantie n'est pas valide",
      path: ["type"],
    },
  )
  .refine(
    ({ type, formalizationType }) => type === "vehicle" || formalizationType,
    {
      message: "Le type de formalisation est requis",
      path: ["formalizationType"],
    },
  );
export const useMovableSafetyForm = () => {
  const formContext = useFormContext();
  const newForm = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      title: "",
      security: undefined,
      type: undefined,
      formalizationType: undefined,
      contractId: undefined,
    },
  });
  return formContext ?? newForm;
};
