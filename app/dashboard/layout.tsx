import IntlProvider from "@/providers/intl-provider";
import { FormattedMessage } from "@/components/intl/formatters";
const INTL_MODULE_NAME = "dashboard";
export default function DashboardLayout({ children }) {
  return (
    <IntlProvider moduleName={INTL_MODULE_NAME}>
      {children}
      <div className="fixed inset-x-0 bottom-0 bg-background text-center text-xs italic text-muted-foreground">
        &copy; {new Date().getFullYear()}{" "}
        <FormattedMessage id="dashboard.copyright" />
      </div>
    </IntlProvider>
  );
}
