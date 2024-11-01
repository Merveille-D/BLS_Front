import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft, LogOut } from "lucide-react";
import { AuthRoutes, ModulesRoutes } from "@/config/routes";
import IntlProvider from "@/providers/intl-provider";
import NotificationsDropdown from "@/components/alert/ui/notifications-dropdown";
const INTL_MODULE_NAME = "modules";
export default function AdministrationModulesLayout({ children }) {
  return (
    <IntlProvider moduleName={INTL_MODULE_NAME}>
      <main className="container flex flex-col gap-10 py-5">
        {/* Top header start */}
        <header className="flex items-center justify-between gap-2">
          {/* Logo start */}
          <Link href={ModulesRoutes.modules}>
            <Image
              src="/global/images/full-logo-color.webp"
              alt="BLS's logo"
              width={200}
              height={200}
              className="hidden md:block"
            />
            <Image
              src="/global/images/full-logo-color.webp"
              alt="BLS's logo"
              width={100}
              height={100}
              className="md:hidden"
            />
          </Link>
          {/* Logo end */}

          <div className="flex items-center">
            {/* <LocaleSelect /> */}

            <NotificationsDropdown />

            {/* Logout button start */}
            <Button
              asChild
              variant="ghost"
              className="gap-2 text-destructive"
            >
              <Link href={AuthRoutes.logout}>
                <LogOut />{" "}
                <span className="sr-only md:not-sr-only">Deconnexion</span>
              </Link>
            </Button>
            {/* Logout button end */}
          </div>
        </header>
        {/* Top header end */}

        <Button
          asChild
          variant="ghost"
          className="fixed bottom-1/2 left-5 hidden h-16 w-16 translate-y-1/2 rounded-full border bg-card shadow-sm sm:inline-flex"
        >
          <Link href={ModulesRoutes.modules}>
            <ChevronLeft size={40} />
          </Link>
        </Button>

        {children}
      </main>
    </IntlProvider>
  );
}
