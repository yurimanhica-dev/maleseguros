"use client";

import { motion } from "framer-motion";
import { FiClock, FiMapPin, FiPhoneCall } from "react-icons/fi";

const ContactInfo = () => {
  const contactItems = [
    {
      icon: <FiPhoneCall size={16} />,
      text: "(+258) 214 184 39",
      subtext: "Linha Direta 24/7",
      href: "tel:+258 214 184 39",
      aria: "Ligar para +258 214 184 39",
    },
    {
      icon: <FiMapPin size={16} />,
      text: "Av. Vladimir Lenine, 2815",
      subtext: "Maputo, Moçambique",
      href: "https://maps.app.goo.gl/K9ZgTB1qbCjpz13Y6",
      aria: "Ver localização no Google Maps",
    },
    {
      icon: <FiClock size={16} />,
      text: "Seg-Sex: 8h-18h",
      subtext: "Horário",
      href: "#",
      aria: "Horário de funcionamento",
    },
  ];

  return (
    <div className="flex mt-2 items-center divide-x divide-border/20">
      {contactItems.map((item, index) => (
        <motion.a
          key={index}
          href={item.href}
          target={item.href.startsWith("http") ? "_blank" : undefined}
          rel="noopener noreferrer"
          aria-label={item.aria}
          className="flex items-center px-4 first:pl-0 hover:bg-muted/30 rounded-md transition-colors"
          whileHover={{ scale: 1.03 }}
        >
          <div className="mr-2 text-primary">{item.icon}</div>
          <div>
            <p className="text-sm font-medium text-foreground truncate">
              {item.text}
            </p>
            <p className="text-xs text-muted-foreground">{item.subtext}</p>
          </div>
        </motion.a>
      ))}
    </div>
  );
};

export default ContactInfo;
