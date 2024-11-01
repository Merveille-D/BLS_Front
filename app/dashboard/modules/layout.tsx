"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft, LogOut, UserCog } from "lucide-react";
import { AuthRoutes, ModulesRoutes } from "@/config/routes";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import IntlProvider from "@/providers/intl-provider";
import NotificationsDropdown from "@/components/alert/ui/notifications-dropdown";
import { AdministrationRoutes } from "@/config/routes/administration";
import LocaleSelect from "@/components/intl/inputs/locale-select";
import { FormattedMessage } from "@/components/intl/formatters";
const INTL_MODULE_NAME = "modules";
export default function ModulesLayout({ children }) {
  const pathname = usePathname();
  const isShowingSubmodule = pathname.includes("/submodules");
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
              height={100}
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
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  asChild
                  variant="ghost"
                >
                  <Link href={AdministrationRoutes.index}>
                    <UserCog />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <FormattedMessage id="modules.administration" />
              </TooltipContent>
            </Tooltip>

            <LocaleSelect />

            <NotificationsDropdown />

            {/* Logout button start */}
            <Button
              asChild
              variant="ghost"
              className="gap-2 text-destructive"
            >
              <Link href={AuthRoutes.logout}>
                <LogOut />{" "}
                <span className="sr-only md:not-sr-only">
                  <FormattedMessage id="modules.logout" />
                </span>
              </Link>
            </Button>
            {/* Logout button end */}
          </div>
        </header>
        {/* Top header end */}

        {isShowingSubmodule && (
          <Button
            asChild
            variant="ghost"
            className="fixed bottom-1/2 left-5 hidden h-16 w-16 translate-y-1/2 rounded-full border bg-card shadow-sm sm:inline-flex"
          >
            <Link href={ModulesRoutes.modules}>
              <ChevronLeft size={40} />
            </Link>
          </Button>
        )}

        <AnimatePresence
          mode="popLayout"
          initial={false}
          onExitComplete={() => window.scrollTo(0, 0)}
        >
          <motion.div
            key={pathname}
            initial={{ x: isShowingSubmodule ? 300 : -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: isShowingSubmodule ? 300 : -300, opacity: 0 }}
            transition={{
              type: "spring",
              duration: 0.7,
            }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
    </IntlProvider>
  );
}
