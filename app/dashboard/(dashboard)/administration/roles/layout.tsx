import LocaleSelect from "@/components/intl/inputs/locale-select";
import IntlProvider from "@/providers/intl-provider";
import { Portal } from "@/components/ui/portal";
const INTL_MODULE_NAME = "roles";
export default function RolesLayout({ children }) {
  return (
    <IntlProvider moduleName={INTL_MODULE_NAME}>
      {children}
      <Portal containerId="local-select-container">
        <LocaleSelect />
      </Portal>
    </IntlProvider>
  );
}
