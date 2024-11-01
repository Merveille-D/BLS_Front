import ModulesList from "@/components/modules/ui/modules-list";
import { FormattedMessage } from "@/components/intl/formatters";
export default function ModulesPage() {
  return (
    <div className="flex flex-col gap-10">
      <h1 className="relative text-center text-2xl font-bold sm:text-3xl md:text-4xl">
        <FormattedMessage id="modules.modules" />
      </h1>
      <ModulesList />
    </div>
  );
}
