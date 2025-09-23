"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/selectIdioma";
import "flag-icons/css/flag-icons.min.css";
import { useTheme } from "next-themes";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const { theme, resolvedTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // evita flicker até carregar o tema
  }

  const currentTheme = theme === "dark" ? resolvedTheme : theme;

  const logoSrc =
    currentTheme === "dark"
      ? "/icons/world_light.png"
      : "/icons/world_dark.png";

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
      <Image src={logoSrc} alt="globe" width={22} height={22} />
      <span>:</span>
      <Select value={currentLocale} onValueChange={onSelectChange}>
        <SelectTrigger>
          <SelectValue placeholder="Idioma" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="en">
            <span className="fi fi-us"></span>
          </SelectItem>
          <SelectItem value="pt">
            <span className="fi fi-pt"></span>
          </SelectItem>
          <SelectItem value="ts">
            <span className="fi fi-mz"></span>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default LanguageSwitcher;
