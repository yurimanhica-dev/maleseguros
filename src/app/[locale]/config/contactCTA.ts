import { MapPin, MessageCircle, Phone } from "lucide-react";

export interface ContactItem {
  icon: React.ElementType;
  title: string;
  description: string;
  action: string;
  href: string;
}

export const contactOptions: ContactItem[] = [
  {
    icon: Phone,
    title: "ContactCTA.ContactOptions.0.Title",
    description: "ContactCTA.ContactOptions.0.Description",
    action: "ContactCTA.ContactOptions.0.Action",
    href: "tel:+258841234567",
  },
  {
    icon: MessageCircle,
    title: "ContactCTA.ContactOptions.1.Title",
    description: "ContactCTA.ContactOptions.1.Description",
    action: "ContactCTA.ContactOptions.1.Action",
    href: "mailto:maleseguros@info.co.mz",
  },
  {
    icon: MapPin,
    title: "ContactCTA.ContactOptions.2.Title",
    description: "ContactCTA.ContactOptions.2.Description",
    action: "ContactCTA.ContactOptions.2.Action",
    href: "https://maps.app.goo.gl/K9ZgTB1qbCjpz13Y6",
  },
];
