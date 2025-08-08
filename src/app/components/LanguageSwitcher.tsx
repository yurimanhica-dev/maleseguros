"use client";

import "flag-icons/css/flag-icons.min.css";
import { usePathname, useRouter } from "next/navigation";

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  const onSelectChange = (locale: string) => {
    const newPath = `/${locale}${pathname.replace(/^\/(en|pt)/, "")}`;
    router.replace(newPath);
  };

  return (
    <div className="flex gap-2 text-white items-center ">
      <button
        onClick={() => onSelectChange("en")}
        className="bt-animation hover:text-primary flex items-center gap-1 cursor-pointer"
      >
        <span className="fi fi-us"></span>
      </button>
      <span className="text-foreground">|</span>
      <button
        onClick={() => onSelectChange("pt")}
        className="bt-animation hover:text-primary flex items-center gap-1 cursor-pointer"
      >
        <span className="fi fi-pt"></span>
      </button>
    </div>
  );
}

export default LanguageSwitcher;
