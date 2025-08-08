// components/MobileMenu.tsx
"use client";

import { ThemeToggle } from "@/app/components/ThemeToggle";
import { navItems } from "@/app/utils/types";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  socials?: {
    name: string;
    url: string;
    icon: React.ReactNode;
  }[];
}

const MobileMenu = ({ isOpen, onClose, socials }: MobileMenuProps) => {
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
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-40 mt-20 h-fit min-h-screen bg-background backdrop-blur-lg lg:hidden pb-8"
        >
          {/* Mobile Navigation */}
          <nav className="container mx-auto  px-6 pt-6">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.title}>
                  {item.path ? (
                    <Link
                      href={item.path}
                      onClick={onClose}
                      className={`group relative block py-3 px-4 text-lg font-medium rounded-lg transition-colors ${
                        isSelected(item.title)
                          ? "text-primary"
                          : "text-foreground"
                      }`}
                    >
                      {item.title}
                      <span className="absolute left-4 -bottom-1 h-[2px] w-full bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                    </Link>
                  ) : (
                    <div className="space-y-2">
                      <button
                        onClick={() => toggleDropdown(item.title)}
                        className={`w-full flex justify-between items-center py-3 px-4 text-lg font-medium rounded-lg transition-colors ${
                          openDropdown === item.title
                            ? "bg-primary/10 text-primary"
                            : "text-foreground hover:bg-accent"
                        }`}
                        aria-expanded={openDropdown === item.title}
                      >
                        {item.title}
                        <FiChevronDown
                          className={`transition-transform ${
                            openDropdown === item.title ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {/* Mobile Dropdown */}
                      {item.subItems && (
                        <AnimatePresence>
                          {openDropdown === item.title && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden pl-4"
                            >
                              <div className="space-y-2 border-l-2 border-border/20 py-2">
                                {item.subItems.map((group, groupIndex) => (
                                  <div key={groupIndex} className="space-y-2">
                                    {group.title && (
                                      <h4 className="px-4 text-base font-semibold text-primary">
                                        {group.title}
                                      </h4>
                                    )}
                                    <ul className="space-y-1">
                                      {group.items.map((subItem) => (
                                        <li key={subItem.name}>
                                          <Link
                                            href={subItem.path}
                                            onClick={onClose}
                                            className={`block py-2 px-4 rounded-lg transition-colors ${
                                              currentPath === subItem.path
                                                ? "text-primary font-medium"
                                                : "text-foreground/90 hover:text-primary hover:bg-accent"
                                            }`}
                                          >
                                            {subItem.name}
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

            {/* Mobile CTA Section */}
            <div className="mt-8 space-y-4">
              <motion.button
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 px-6 rounded-full bg-primary text-primary-foreground font-medium shadow-lg hover:shadow-primary/30 transition-all"
                onClick={onClose}
              >
                Abrir Sinistro
              </motion.button>

              <div className="flex justify-center">
                <ThemeToggle />
              </div>
            </div>
          </nav>
          <div className="flex items-center justify-center mt-6 gap-2">
            {socials?.map((item) => (
              <motion.button
                key={item.name}
                className="text-muted-foreground hover:text-primary transition-colors"
                whileHover={{ y: -2 }}
                aria-label={item.name}
              >
                {item.icon}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
