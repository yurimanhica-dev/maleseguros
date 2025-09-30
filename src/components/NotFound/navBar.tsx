"use client";

import HamburgerIcon from "@/app/[locale]/components/HamburgerIcon";
import Logo from "@/app/[locale]/home/components/Logo";
import MobileMenu from "@/app/[locale]/home/components/MobileMenu";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import NavLinks from "./NavLinks";

const NavBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // sticky top-0
  return (
    <header className="sticky top-0 z-50 w-full h-full bg-background">
      {/* Main Navigation Bar */}
      <div className="sticky top-0 left-0 w-full z-50 bg-background">
        <div className="container gap-8  mx-auto c-space flex items-center justify-between h-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Logo />
          </motion.div>

          <div className="hidden md:block">
            <NavLinks />
          </div>

          <button
            className="md:hidden p-2 text-primary focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            <HamburgerIcon isOpen={mobileMenuOpen} />
          </button>
        </div>
      </div>
      {/* Mobile Menu - positioned below navbar */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileMenu
            isOpen={mobileMenuOpen}
            onClose={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </header>
  );
};

export default NavBar;
