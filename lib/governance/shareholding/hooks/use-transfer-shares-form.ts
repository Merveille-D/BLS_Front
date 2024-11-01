import { useForm, useFormContext } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
const validationSchema = z
  .object({
    type: z.enum(["new_tier", "old_tier", "shareholder"], {
      required_error: "Le type est requis",
    }),
    sellerId: z.string({
      required_error: "L'identifiant du vendeur est requis",
    }),
    shareholderId: z.string().optional(),
    thirdPartyId: z.string().optional(),
    thirdParty: z
      .object({
        name: z.string({
          required_error: "Le nom du tiers est requis",
        }),
      })
      .optional(),
    shares: z
      .number({
        required_error: "Le nombre de parts est requis",
        coerce: true,
      })
      .min(1, { message: "Le nombre de parts doit être supérieur à 0" })
      .int({ message: "Le nombre de parts doit être un entier" }),
    maxShares: z.number(),
    transferDate: z.date({
      required_error: "La date de transfert est requise",
      message: "La date de transfert est invalide",
    }),
  })
  .refine(
    ({ type, sellerId, shareholderId }) =>
      type !== "shareholder" || sellerId !== shareholderId,
    {
      message: "Le vendeur et l'acheteur ne peuvent pas être les mêmes",
      path: ["shareholderId"],
    },
  )
  .refine(({ shares, maxShares }) => shares <= maxShares, {
    message: "Le nombre de parts doit être inférieur ou égal au maximum",
    path: ["shares"],
  })
  .refine(
    ({ type, thirdParty, thirdPartyId, shareholderId }) => {
      if (type === "new_tier") {
        return !!thirdParty;
      }
      if (type === "old_tier") {
        return !!thirdPartyId;
      }
      if (type === "shareholder") {
        return !!shareholderId;
      }
      return false;
    },
    {
      message: "Le bénéficiaire est requis",
      path: ["shareholderId", "thirdPartyId", "thirdParty"],
    },
  );
export const useTransferSharesForm = () => {
  const formContext = useFormContext();
  const form = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      type: "shareholder",
      sellerId: undefined,
      shareholderId: undefined,
      thirdPartyId: undefined,
      thirdParty: {
        name: "",
      },
      shares: 0,
      transferDate: new Date(),
    },
  });
  return formContext ?? form;
};
