"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Logo = () => {
  const { theme, resolvedTheme } = useTheme(); // `resolvedTheme` pega o tema real quando `theme = "system"`
  const [mounted, setMounted] = useState(false);

  // Evita renderização inconsistente no SSR
  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme === "system" ? resolvedTheme : theme;

  const logoSrc =
    currentTheme === "dark"
      ? "/logos/Maleseguros_dark.png"
      : "/logos/Maleseguros_light.png";

  if (!mounted) return null; // Impede flash incorreto durante SSR

  return (
    <Link href="/" className="flex items-center">
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
