import { useForm, useFormContext } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
const validationSchema = z.object({
  profileId: z.string(),
});
export const useProfileForm = (defaultValue) => {
  const formContext = useFormContext();
  const newForm = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      profileId: defaultValue,
    },
  });
  return formContext ?? newForm;
};
