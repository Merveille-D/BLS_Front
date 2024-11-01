import ActiveNotificationsDialogs from "@/components/alert/modals/active-notifications-dialogs";
import LocaleSelect from "@/components/intl/inputs/locale-select";
import { Portal } from "@/components/ui/portal";
import IntlProvider from "@/providers/intl-provider";
const ALERT_MODULE_NAME = "general_meeting";
const INTL_MODULE_NAME = "generalMeeting";
export default function GeneralMeetingLayout({ children }) {
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
