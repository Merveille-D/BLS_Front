"use client";
import { getAdministrationModules } from "@/config/modules";
import Link from "next/link";
import { useIntl } from "@/lib/intl/hooks";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
export default function AdministrationModulesList() {
  const intl = useIntl();
  return (
    <div className="grid auto-rows-fr gap-10 sm:grid-cols-2 md:grid-cols-3">
      {getAdministrationModules(intl).map(
        ({ name, href, slug: submoduleSlug, Icon }) => (
          <Link
            href={href}
            key={submoduleSlug}
          >
            <Card className="h-full bg-primary text-primary-foreground">
              <CardHeader className="h-full flex-row items-center justify-center gap-2">
                <Icon size={50} />
                <CardTitle className="text-center tracking-normal">
                  {name}
                </CardTitle>
              </CardHeader>
            </Card>
          </Link>
        ),
      )}
    </div>
  );
}
