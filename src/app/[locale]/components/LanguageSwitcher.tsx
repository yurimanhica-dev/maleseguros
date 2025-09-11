"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/selectIdioma";
import "flag-icons/css/flag-icons.min.css";
import { Globe2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  const supportedLocales = ["en", "pt", "ts"];

  const onSelectChange = (locale: string) => {
    const segments = pathname.split("/").filter((segment) => segment);
    const hasExistingLocale =
      segments.length > 0 && supportedLocales.includes(segments[0]);

    let newPath;
    if (hasExistingLocale) {
      segments[0] = locale;
      newPath = `/${segments.join("/")}`;
    } else {
      newPath = `/${locale}${pathname}`;
    }

    router.replace(newPath);
  };

  const getLocaleFromPath = () => {
    for (const locale of supportedLocales) {
      if (pathname.startsWith(`/${locale}`)) return locale;
    }
    return "pt"; // Default to Portuguese
  };

  const currentLocale = getLocaleFromPath();

  return (
    <div className="flex gap-2 items-center">
      <Globe2 className="w-6 h-6" />
      <span>:</span>
      <Select value={currentLocale} onValueChange={onSelectChange}>
        <SelectTrigger>
          <SelectValue placeholder="Idioma" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="en">
            EN <span className="fi fi-us"></span>
          </SelectItem>
          <SelectItem value="pt">
            PT <span className="fi fi-pt"></span>
          </SelectItem>
          <SelectItem value="ts">
            TS <span className="fi fi-mz"></span>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default LanguageSwitcher;
