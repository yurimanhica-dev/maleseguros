"use client";

import HamburgerIcon from "@/app/components/HamburgerIcon";
import LanguageSwitcher from "@/app/components/LanguageSwitcher";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FiFacebook, FiLinkedin, FiTwitter } from "react-icons/fi";
import ContactInfo from "../components/ContactInfo";
import Logo from "../components/Logo";
import MobileMenu from "../components/MobileMenu";
import Navlinks from "../components/Navlinks";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const socials = [
    {
      name: "Facebook",
      url: "https://www.facebook.com/",
      icon: <FiFacebook size={16} />,
    },
    {
      name: "Twitter",
      url: "https://www.facebook.com/",
      icon: <FiTwitter size={16} />,
    },
    {
      name: "LinkedIn",
      url: "https://www.facebook.com/",
      icon: <FiLinkedin size={16} />,
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-border/10 shadow-sm">
      {/* Top Contact Bar - Desktop Only */}
      <div className="hidden lg:block border-b border-border/10">
        <div className="container mx-auto c-space">
          <div className="flex items-center justify-between py-2">
            <ContactInfo />
            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              <div className="flex items-center gap-2">
                {socials.map((social) => (
                  <motion.button
                    key={social.name}
                    className="text-muted-foreground hover:text-primary transition-colors"
                    whileHover={{ y: -2 }}
                    aria-label={social.name}
                  >
                    {social.icon}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="relative z-50 bg-background">
        <div className="container mx-auto c-space flex items-center justify-between h-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Logo />
          </motion.div>

          <div className="hidden lg:block flex-1">
            <Navlinks />
          </div>

          <button
            className="lg:hidden p-2 text-primary focus:outline-none"
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
            socials={socials}
          />
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
