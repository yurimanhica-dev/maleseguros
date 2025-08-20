"use client";

import { navItems } from "@/app/utils/types";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FiChevronDown, FiPhoneCall } from "react-icons/fi";

const NavLinks = () => {
  const currentPath = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  const toggleDropdown = (item: string) => {
    setOpenDropdown(openDropdown === item ? null : item);
  };

  // Fecha o dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Verifica se o clique foi fora do dropdown E fora do botão que o abriu
      const clickedOutsideDropdown =
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node);

      const clickedOutsideButton =
        openDropdown &&
        buttonRefs.current[openDropdown] &&
        !buttonRefs.current[openDropdown]?.contains(event.target as Node);

      if (clickedOutsideDropdown && clickedOutsideButton) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdown]);

  const isSelected = (item: string, path?: string) => {
    const normalizedPath = currentPath.toLowerCase().replace(/\/$/, "");

    if (path) return normalizedPath === path.toLowerCase();

    const itemPath = item
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    return (
      normalizedPath.includes(itemPath) ||
      (item === "Seguros" && normalizedPath.includes("seguro"))
    );
  };

  const linkBaseClasses =
    "flex items-center h-full px-6 font-medium transition-colors border-b-2";

  return (
    <div className="container mx-auto">
      <div className="flex h-20 items-center justify-between">
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center h-full" role="menubar">
          <ul className="flex items-center h-full">
            {navItems.map((item) => (
              <li key={item.title} className="relative min-w-3 h-full group">
                {item.path ? (
                  <Link
                    href={item.path}
                    role="menuitem"
                    className={`${linkBaseClasses} ${
                      isSelected(item.title, item.path)
                        ? "text-primary border-primary"
                        : "text-foreground/90 hover:text-primary border-transparent hover:border-primary"
                    }`}
                  >
                    {item.title}
                  </Link>
                ) : (
                  <>
                    <button
                      onClick={() => toggleDropdown(item.title)}
                      className={`${linkBaseClasses} ${
                        openDropdown === item.title
                          ? "text-primary border-primary"
                          : "text-foreground/90 hover:text-primary border-transparent hover:border-primary"
                      }`}
                      aria-expanded={openDropdown === item.title}
                      aria-haspopup="true"
                      aria-controls={`dropdown-${item.title}`}
                    >
                      {item.title}
                      <FiChevronDown
                        className={`ml-1 transition-transform ${
                          openDropdown === item.title ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Mega Dropdown */}
                    {item.subItems && (
                      <AnimatePresence>
                        {openDropdown === item.title && (
                          <motion.div
                            ref={dropdownRef}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 5 }}
                            exit={{ opacity: 0, y: 15 }}
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 25,
                            }}
                            className="absolute left-0 top-20 mt-0 w-screen bg-background shadow-xl border-t border-border/10 z-50"
                            id={`dropdown-${item.title}`}
                            style={{
                              boxShadow:
                                "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                            }}
                          >
                            <div className="container mx-auto py-8 grid grid-cols-4 gap-8">
                              {item.subItems.map((group, groupIndex) => (
                                <div key={groupIndex}>
                                  {group.title && (
                                    <h4 className="text-lg font-bold text-primary mb-4">
                                      {group.title}
                                    </h4>
                                  )}
                                  <ul className="space-y-3">
                                    {group.items.map((subItem) => (
                                      <li
                                        key={subItem.name}
                                        className="relative group w-fit"
                                      >
                                        <Link
                                          href={subItem.path}
                                          role="menuitem"
                                          className={`inline-block transition-colors ${
                                            isSelected(
                                              subItem.name,
                                              subItem.path
                                            )
                                              ? "text-primary font-medium"
                                              : "text-foreground/90 hover:text-primary"
                                          }`}
                                          onClick={() => setOpenDropdown(null)} // Fecha ao clicar em um item
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
                  </>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* CTA Section */}
        <div className="hidden lg:flex items-center gap-4">
          <motion.div
            className="relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Pulse Effect */}
            <motion.div
              className="absolute inset-0 rounded-full bg-primary/20"
              animate={{ scale: [1, 1.3, 1], opacity: [0.8, 0, 0.8] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.a
              href="https://wa.me/258847777777"
              className="relative flex px-6 py-2 gap-3 text-nowrap rounded-full bg-primary text-primary-foreground font-medium shadow-xl hover:shadow-2xl transition-all duration-300 z-10"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <FiPhoneCall className="w-6 h-6" />
              </motion.div>
              Solicitar Retorno
            </motion.a>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default NavLinks;
