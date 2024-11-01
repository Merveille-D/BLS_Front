import { useIntl as useReactIntl } from "react-intl";
import { useContext } from "react";
import { IntlContext } from "@/providers/intl-provider";
export const useIntl = () => {
  const intl = useReactIntl();
  const intlContext = useContext(IntlContext);
  return {
    ...intl,
    ...intlContext,
  };
};
