import Link from "next/link";
import { ModulesRoutes } from "@/config/routes";
import Image from "next/image";
import ProfileDropdown from "@/components/dashboard/layout/profile-dropdown";
import NotificationsDropdown from "@/components/alert/ui/notifications-dropdown";
export default function DashboardLayout({ children }) {
  return (
    <main className="flex h-full flex-col">
      <header className="bg-card shadow-sm">
        <div className="container flex items-center justify-between gap-2 py-3">
          {/* Logo start */}
          <Link href={ModulesRoutes.modules}>
            <Image
              src="/global/images/full-logo-color.webp"
              alt="BLS's logo"
              width={150}
              height={50}
              className="hidden md:block"
            />
            <Image
              src="/global/images/full-logo-color.webp"
              alt="BLS's logo"
              width={100}
              height={50}
              className="md:hidden"
            />
          </Link>
          {/* Logo end */}

          <div className="flex items-center">
            <div id="search-input-container" />
            {/* <OnlineUsersDropdown /> */}
            <div id="local-select-container" />
            <NotificationsDropdown />
            <ProfileDropdown />
          </div>
        </div>
      </header>
      {children}
    </main>
  );
}
