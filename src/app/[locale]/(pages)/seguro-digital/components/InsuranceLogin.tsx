"use client";

import { useTheme } from "next-themes";
import Image from "next/image";

const InsuranceLogin = () => {
  const theme = useTheme();

  return (
    <section className="min-h-screen relative flex items-center justify-center  overflow-hidden">
      <div className=" rotate-325">
        <h1 className="text-9xl font-semibold">Em Desenvolvimento</h1>
      </div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Image
          src={
            theme.resolvedTheme === "dark"
              ? "/logos/Maleseguros_light.png"
              : "/logos/Maleseguros_dark.png"
          }
          alt="Logo"
          width={600}
          height={800}
          className="w-full h-full"
        />
      </div>
    </section>
  );
};

export default InsuranceLogin;
