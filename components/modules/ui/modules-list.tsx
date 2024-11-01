"use client";
import { getModulesData } from "@/config/modules";
import Link from "next/link";
import { useIntl } from "@/lib/intl/hooks";
export default function ModulesList() {
  const intl = useIntl();
  return (
    <div className="flex flex-wrap justify-center gap-x-10 gap-y-5 md:px-10 lg:px-20 xl:px-32">
      {getModulesData(intl).map(({ slug, href, name, Icon }) => (
        <Link
          href={href}
          key={slug}
          className="flex w-40 flex-col items-center gap-2"
        >
          <div className="group flex h-32 w-32 items-center justify-center rounded-full bg-primary p-5 shadow-lg">
            <Icon className="transition duration-500 group-hover:rotate-12 group-hover:scale-110" />
          </div>
          <span className="text-center font-semibold uppercase">{name}</span>
        </Link>
      ))}
    </div>
  );
}
