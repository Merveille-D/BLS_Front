import Link from "next/link";
import { ModulesRoutes } from "@/config/routes";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import SubmodulesList from "@/components/modules/ui/submodules-list";
import { FormattedMessage } from "@/components/intl/formatters";
export default function SubModulesPage({ params: { slug } }) {
  return (
    <div className="flex h-full flex-col gap-10">
      <h1 className="relative text-center text-2xl font-bold sm:text-3xl md:text-4xl">
        <Button
          asChild
          variant="ghost"
          className="absolute bottom-1/2 left-0 h-16 w-16 -translate-x-1/2 translate-y-1/2 rounded-full sm:hidden"
        >
          <Link href={ModulesRoutes.modules}>
            <ChevronLeft size={30} />
          </Link>
        </Button>
        <FormattedMessage id="modules.subModules" />
      </h1>
      <SubmodulesList module={slug} />
    </div>
  );
}
