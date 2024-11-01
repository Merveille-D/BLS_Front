import Link from "next/link";
import { ModulesRoutes } from "@/config/routes";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import AdministrationModulesList from "@/components/modules/ui/administration-modules-list";
export default function AdministrationPage() {
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
        Administration
      </h1>
      <AdministrationModulesList />
    </div>
  );
}
