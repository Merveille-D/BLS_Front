"use client";
import { Languages } from "lucide-react";
import { Select, SelectContent, SelectItem } from "@/components/ui/select";
import { useIntl } from "@/lib/intl/hooks";
import { availableLocales } from "@/config/locales/utils";
import { Trigger } from "@radix-ui/react-select";
import { Button } from "@/components/ui/button";
export default function LocaleSelect() {
  const intl = useIntl();
  return (
    <Select
      value={intl.locale}
      onValueChange={intl.setLocale}
    >
      <Trigger asChild>
        <Button variant="ghost">
          <Languages />
          {intl.locale.toUpperCase()}
        </Button>
      </Trigger>
      <SelectContent>
        {Object.entries(availableLocales).map(([locale, label]) => (
          <SelectItem
            value={locale}
            key={locale}
          >
            {locale.toUpperCase()} - {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
