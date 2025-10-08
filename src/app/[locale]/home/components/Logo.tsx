"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Logo = () => {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme === "dark" ? resolvedTheme : theme;

  const logoSrc =
    currentTheme === "dark"
      ? "/logos/Maleseguros_dark.png"
      : "/logos/Maleseguros_light.png";

  if (!mounted) return null;

  // Detecta locale atual a partir da URL
  const supportedLocales = ["en", "pt", "ts"];
  const currentLocale =
    supportedLocales.find((loc) => pathname.startsWith(`/${loc}`)) || "pt";

  return (
    <Link href={`/${currentLocale}`} className="flex items-center">
      <div className="relative h-16 w-40">
        <Image
          src={logoSrc}
          alt="Logotipo - MALESeguros, Corretores de Seguros, Lda."
          fill
          className="object-contain transition duration-300 ease-in-out"
          priority
        />
      </div>
    </Link>
  );
};

export default Logo;
