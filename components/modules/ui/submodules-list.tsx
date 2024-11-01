"use client";
import { getSubmodules } from "@/config/modules";
import Link from "next/link";
import { useIntl } from "@/lib/intl/hooks";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useMemo } from "react";
export default function SubmodulesList({ module }) {
  const intl = useIntl();
  const submodules = useMemo(() => getSubmodules(intl, module), [intl, module]);
  return (
    <div className="grid auto-rows-fr gap-10 sm:grid-cols-2 md:grid-cols-3">
      {submodules.map(({ name, href, slug: submoduleSlug }, index) => (
        <Link
          href={href}
          key={submoduleSlug}
          className={cn({
            "md:col-span-3 md:mx-auto md:w-[calc((100%-5rem)/3)]":
              index === submodules.length - 1 && submodules.length % 3 === 1,
          })}
        >
          <Card className="h-full bg-primary text-primary-foreground">
            <CardHeader className="h-full items-center justify-center">
              <CardTitle className="text-center tracking-normal">
                {name}
              </CardTitle>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  );
}
