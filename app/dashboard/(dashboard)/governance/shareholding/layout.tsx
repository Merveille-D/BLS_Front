import LocaleSelect from "@/components/intl/inputs/locale-select";
import { Portal } from "@/components/ui/portal";
import IntlProvider from "@/providers/intl-provider";
const INTL_MODULE_NAME = "shareholding";
export default function ShareholdingLayout({ children }) {
  return (
    <IntlProvider moduleName={INTL_MODULE_NAME}>
      {children}
      <Portal containerId="local-select-container">
        <LocaleSelect />
      </Portal>
    </IntlProvider>
  );
}
