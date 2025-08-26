"use client";

import LanguageSwitcher from "@/app/components/LanguageSwitcher";
import { ThemeToggle } from "@/app/components/ThemeToggle";
import { motion } from "framer-motion";
import { FiFacebook, FiLinkedin, FiTwitter } from "react-icons/fi";
import ContactInfo from "../home/components/ContactInfo";

const socials = [
  {
    name: "Facebook",
    url: "https://www.facebook.com/",
    icon: <FiFacebook size={16} />,
  },
  {
    name: "Twitter",
    url: "https://www.twitter.com/",
    icon: <FiTwitter size={16} />,
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/",
    icon: <FiLinkedin size={16} />,
  },
];

const TopContactBar = () => {
  return (
    <section className="hidden md:block z-50 w-full h-full bg-background overflow-hidden border-b border-border/10 shadow-sm">
      <div className="container mx-auto c-space">
        <div className="flex items-center justify-between py-2">
          <ContactInfo />
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <div className="flex items-center gap-2">
              {socials.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopContactBar;
