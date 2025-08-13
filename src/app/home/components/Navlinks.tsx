import { ThemeToggle } from "@/app/components/ThemeToggle";
import { navItems } from "@/app/utils/types";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

const Navlinks = () => {
  const currentPath = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (item: string) => {
    setOpenDropdown(openDropdown === item ? null : item);
  };

  const isSelected = (item: string, path?: string) => {
    const normalizedPath = currentPath.toLowerCase().replace(/\/$/, ""); // remove barra final

    if (path) {
      return normalizedPath === path.toLowerCase();
    }

    const itemPath = item
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    // marca ativo se for rota exata ou se incluir subcaminhos
    return (
      normalizedPath.includes(itemPath) ||
      (item === "Seguros" && normalizedPath.includes("seguro"))
    );
  };

  return (
    <div className="container mx-auto px-6">
      <div className="flex h-20 items-center justify-between">
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center h-full">
          <ul className="flex items-center h-full">
            {navItems.map((item) => (
              <li key={item.title} className="relative h-full group">
                {item.path ? (
                  <Link
                    href={item.path}
                    className={`flex items-center h-full px-6 font-medium transition-colors border-b-2 ${
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
                      className={`flex items-center h-full px-6 font-medium transition-colors border-b-2 ${
                        openDropdown === item.title
                          ? "text-primary border-primary"
                          : "text-foreground/90 hover:text-primary border-transparent hover:border-primary"
                      }`}
                      aria-expanded={openDropdown === item.title}
                      aria-haspopup="true"
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
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 5 }}
                            exit={{ opacity: 0, y: 15 }}
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 25,
                            }}
                            className="absolute left-0 top-19 w-screen bg-background shadow-xl border-t border-border/10"
                            id={`dropdown-${item.title}`}
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
                                    {group.items.map((subItem) => {
                                      const isActive =
                                        currentPath === subItem.path;

                                      return (
                                        <li
                                          key={subItem.name}
                                          className="relative group w-fit"
                                        >
                                          <Link
                                            href={subItem.path}
                                            className={`inline-block transition-colors ${
                                              isSelected(
                                                subItem.name,
                                                subItem.path
                                              )
                                                ? "text-primary font-medium"
                                                : "text-foreground/90 hover:text-primary"
                                            }`}
                                          >
                                            {subItem.name}
                                          </Link>
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
        <div className="hidden md:flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="relative px-6 py-2 rounded-full bg-primary text-primary-foreground font-medium shadow-lg hover:shadow-primary/30 transition-all"
          >
            Solicitar Retorno
            <motion.span
              className="absolute inset-0 rounded-full border border-primary"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1,
              }}
            />
          </motion.button>

          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default Navlinks;
