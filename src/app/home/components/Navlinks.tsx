/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ThemeToggle } from "@/app/components/ThemeToggle";
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

  const isSelected = (item: string, path?: string, subItems?: any[]) => {
    const normalizedPath = currentPath.toLowerCase().replace(/\/$/, "");

    // Verifica correspondência direta com path
    if (path && normalizedPath === path.toLowerCase()) return true;

    // Normaliza o título para comparação
    const itemPath = item
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    // Se o item tiver subItems, verifica se algum deles bate com o currentPath
    if (subItems) {
      return subItems.some((group) =>
        group.items.some(
          (subItem: { path: string }) =>
            subItem.path &&
            normalizedPath === subItem.path.toLowerCase().replace(/\/$/, "")
        )
      );
    }

    // Caso genérico
    return (
      normalizedPath.includes(itemPath) ||
      (item === "Explorar" && normalizedPath.includes("explorar"))
    );
  };

  const linkBaseClasses =
    "flex items-center h-full font-medium transition-colors border-b-2";

  return (
    <div className="container mx-auto">
      <div className="flex justify-between h-20 items-center gap-8">
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center h-full" role="menubar">
          <ul className="flex items-center gap-4 h-full">
            {navItems.map((item) => (
              <li key={item.title} className="relative min-w-3  pb-1  h-full">
                {item.path ? (
                  <Link
                    href={item.path}
                    role="menuitem"
                    className={`${linkBaseClasses} uppercase text-sm ${
                      isSelected(item.title, item.path, item.subItems)
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
                      className={`${linkBaseClasses} uppercase text-sm ${
                        isSelected(item.title, item.path, item.subItems)
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
                            className="absolute left-0 top-18 right-0 mt-0 min-w-4xl c-space w-full overflow-hidden mx-auto bg-background shadow-xl border-t border-border/10 z-50"
                            id={`dropdown-${item.title}`}
                            style={{
                              boxShadow:
                                "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                            }}
                          >
                            <div className="container overflow-hidden w-fit gap-10 py-12 grid md:grid-cols-2 lg:grid-cols-3">
                              {item.subItems.map((group, groupIndex) => (
                                <div key={groupIndex}>
                                  {group.title && (
                                    <h4 className=" text-md uppercase font-bold text-primary mb-4">
                                      {group.title}
                                    </h4>
                                  )}
                                  <ul className="space-y-3">
                                    {group.items.map((subItem) => {
                                      const selected = isSelected(
                                        subItem.name,
                                        subItem.path
                                      );
                                      return (
                                        <li
                                          key={subItem.name}
                                          className="relative group w-fit"
                                        >
                                          <Link
                                            href={subItem.path}
                                            role="menuitem"
                                            className={`inline-block transition-colors ${
                                              selected
                                                ? " font-medium"
                                                : "text-foreground/90 hover:text-primary"
                                            }`}
                                            onClick={() =>
                                              setOpenDropdown(null)
                                            }
                                          >
                                            {subItem.name}
                                          </Link>
                                          <span
                                            className={`absolute left-0 -bottom-1 h-[2px] w-full bg-primary transition-transform duration-300 origin-left ${
                                              selected
                                                ? "scale-x-100"
                                                : "scale-x-0 group-hover:scale-x-100"
                                            }`}
                                          />
                                        </li>
                                      );
                                    })}
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
        <div className="hidden lg:flex items-center gap-4 cursor-pointer">
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
              href="/servicos-cliente/solicitar-retorno"
              // href="https://wa.me/258847777777"
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
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default NavLinks;
