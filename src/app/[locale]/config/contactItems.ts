import { FiClock, FiMapPin, FiPhoneCall } from "react-icons/fi";

export interface ContactItem {
  icon: React.ElementType;
  text: string;
  subtext: string;
  href: string;
  aria: string;
}

export const contactItems: ContactItem[] = [
  {
    icon: FiPhoneCall,
    text: "Contact.Phone",
    subtext: "Contact.PhoneSubtitle",
    href: "tel:+25821418439",
    aria: "Contact.PhoneAria",
  },
  {
    icon: FiMapPin,
    text: "Contact.Address",
    subtext: "Contact.AddressSubtitle",
    href: "https://maps.app.goo.gl/K9ZgTB1qbCjpz13Y6",
    aria: "Contact.AddressAria",
  },
  {
    icon: FiClock,
    text: "Contact.Hours",
    subtext: "Contact.HoursSubtitle",
    href: "#",
    aria: "Contact.HoursAria",
  },
];
