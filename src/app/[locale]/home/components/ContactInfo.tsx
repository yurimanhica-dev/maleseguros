"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { contactItems } from "../../config/contactItems";

const ContactInfo = () => {
  const t = useTranslations("HomePage");

  return (
    <div className="flex mt-2 items-center divide-x divide-border/20">
      {contactItems.map((item, index) => {
        const Icon = item.icon; // instanciando o ícone
        return (
          <motion.a
            key={index}
            href={item.href}
            target={item.href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            aria-label={t(item.aria)}
            className="flex items-center px-4 first:pl-0 hover:bg-muted/30 rounded-md transition-colors"
            whileHover={{ scale: 1.03 }}
          >
            <div className="mr-2 text-primary">
              <Icon size={16} />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground truncate">
                {t(item.text)}
              </p>
              <p className="text-xs text-muted-foreground">{t(item.subtext)}</p>
            </div>
          </motion.a>
        );
      })}
    </div>
  );
};

export default ContactInfo;
