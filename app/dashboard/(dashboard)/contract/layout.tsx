import ActiveNotificationsDialogs from "@/components/alert/modals/active-notifications-dialogs";
import IntlProvider from "@/providers/intl-provider";
import LocaleSelect from "@/components/intl/inputs/locale-select";
import { Portal } from "@/components/ui/portal";
const ALERT_MODULE_NAME = "contract";
const INTL_MODULE_NAME = "contract";
export default function ContractLayout({ children }) {
  return (
    <IntlProvider moduleName={INTL_MODULE_NAME}>
      {children}
      <Portal containerId="local-select-container">
        <LocaleSelect />
      </Portal>
      <ActiveNotificationsDialogs module={ALERT_MODULE_NAME} />
    </IntlProvider>
  );
}
