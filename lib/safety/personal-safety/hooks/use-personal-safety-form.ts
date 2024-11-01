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
    type: z.enum(["bonding", "autonomous", "autonomous_counter"], {
      required_error: "Le type est requis",
    }),
    contractId: z.string().optional(),
    guaranteeId: z.string().optional(),
  })
  .refine(({ type, guaranteeId, contractId }) => {
    if (type === "autonomous_counter") {
      return !!guaranteeId;
    }
    return !!contractId;
  });
export const usePersonalSafetyForm = () => {
  const formContext = useFormContext();
  const newForm = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      title: "",
      type: "bonding",
      contractId: undefined,
      guaranteeId: undefined,
    },
  });
  return formContext ?? newForm;
};
