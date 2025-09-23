// components/MobileMenu.tsx
"use client";

import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";
import HamburgerIcon from "../../components/HamburgerIcon";
import LanguageSwitcher from "../../components/LanguageSwitcher";
import { ThemeToggle } from "../../components/ThemeToggle";
import { navItems } from "../../config/navItems";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  socials?: {
    name: string;
    url: string;
    icon: React.ReactNode;
  }[];
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const t = useTranslations("HomePage");
  const currentPath = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (item: string) => {
    setOpenDropdown(openDropdown === item ? null : item);
  };

  const isSelected = (item: string) => {
    const itemPath = item
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    return (
      currentPath.includes(itemPath) ||
      (item === "Seguros" && currentPath.includes("seguro"))
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 z-50 h-full w-[80%] bg-background shadow-2xl overflow-y-auto [&::-webkit-scrollbar]:hidden"
          >
            {/* Header com HamburgerIcon como botão de fechar */}
            <div className="flex items-center justify-between p-6 border-b border-border ">
              <h2 className="text-xl font-bold uppercase tracking-wider text-foreground">
                Menu
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:scale-x-105 transition-transform duration-200 ease-in-out"
                aria-label="Fechar menu"
              >
                {/* Usamos o HamburgerIcon como botão de fechar */}
                <HamburgerIcon isOpen={true} />{" "}
                {/* Sempre aberto pois é o estado de "fechar" */}
              </button>
            </div>

            {/* Navigation */}
            <nav className="p-4">
              <ul className="space-y-1">
                {navItems.map((item) => (
                  <li key={item.title}>
                    {item.path ? (
                      <Link
                        href={item.path}
                        onClick={onClose}
                        className={`group flex items-center justify-between py-4 px-4 text-sm font-bold uppercase tracking-wide rounded-lg transition-all ${
                          isSelected(item.title)
                            ? "text-foreground"
                            : "hover:text-primary"
                        }`}
                      >
                        {t(item.title)}
                      </Link>
                    ) : (
                      <div className="space-y-1">
                        <button
                          onClick={() => toggleDropdown(item.title)}
                          className={`w-full flex items-center justify-between py-4 px-4 text-sm font-bold uppercase tracking-wide rounded-lg transition-all cursor-pointer ${
                            openDropdown === item.title
                              ? "text-primary"
                              : "text-foreground"
                          }`}
                          aria-expanded={openDropdown === item.title}
                        >
                          {t(item.title)}
                          <div className="p-1">
                            {openDropdown === item.title ? (
                              <FiMinus className="w-4 h-4" />
                            ) : (
                              <FiPlus className="w-4 h-4" />
                            )}
                          </div>
                        </button>
                        {/* Dropdown Items */}
                        {item.subItems && (
                          <AnimatePresence>
                            {openDropdown === item.title && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <div className="ml-4 space-y-1 border-l-2 border-border/30 py-2">
                                  {item.subItems.map((group, groupIndex) => (
                                    <div key={groupIndex} className="space-y-1">
                                      {group.title && (
                                        <h4 className="px-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                          {t(group.title)}
                                        </h4>
                                      )}
                                      <ul className="space-y-1">
                                        {group.items.map((subItem) => (
                                          <li key={subItem.name}>
                                            <Link
                                              href={subItem.path}
                                              onClick={onClose}
                                              className={`block py-3 px-4 text-sm font-medium rounded-lg transition-all ${
                                                currentPath === subItem.path
                                                  ? "text-primary bg-primary/10"
                                                  : "nav-link hover:text-primary "
                                              }`}
                                            >
                                              {t(subItem.name)}
                                            </Link>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        )}
                      </div>
                    )}
                  </li>
                ))}
              </ul>

              {/* CTA Buttons */}
              <div className="mt-8 border-t space-y-4 border-border/50 py-6">
                <div className="flex py-2 gap-2 justify-between">
                  <ThemeToggle />
                  <LanguageSwitcher />
                </div>
                <Button
                  asChild
                  onClick={onClose}
                  className="w-full py-3 px-6 rounded-lg bg-primary text-primary-foreground font-bold uppercase tracking-wide text-sm shadow-lg hover:shadow-primary/25 transition-all cursor-pointer"
                >
                  <Link href="/sinistros/comunicar">Abrir Sinistro</Link>
                </Button>
              </div>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
