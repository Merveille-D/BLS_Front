import { useForm, useFormContext } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
const validationSchema = z.object({
  title: z
    .string({
      required_error: "Le titre est requis",
    })
    .min(1, "Le titre est requis"),
  meetingType: z.enum(
    ["first_quarter", "second_quarter", "third_quarter", "fourth_quarter"],
    {
      required_error: "Le type de session est requis",
    },
  ),
  meetingDate: z.date({
    required_error: "La date de la session est requise",
  }),
});
export const useAdministrationMeetingForm = () => {
  const formContext = useFormContext();
  const form = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      title: "",
      meetingType: "first_quarter",
      meetingDate: new Date(),
    },
  });
  return formContext ?? form;
};
