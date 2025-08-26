"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion, useInView } from "framer-motion";
import { MapPin, MessageCircle, Phone } from "lucide-react";
import { useRef, useState } from "react";

const ContactSection = () => {
  // const [phone, setPhone] = useState("");
  const [tipoSinistro, setTipoSinistro] = useState<string>("");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    subject: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyNumbers = e.target.value.replace(/\D/g, "");
    setFormData({ ...formData, phone: onlyNumbers });
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setFormData({ name: "", email: "", phone: "", message: "", subject: "" });
    setIsSubmitting(false);
  };

  const contactOptions = [
    {
      icon: <MessageCircle className="w-5 h-5" />,
      title: "Chat Online",
      description: "Converse com um especialista",
      action: "Iniciar conversa",
    },
    {
      icon: <Phone className="w-5 h-5" />,
      title: "Ligação Rápida",
      description: "Seg á Sex, das 9h às 18h",
      action: "Ligar agora",
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      title: "Agendamento",
      description: " Visite-nos em Maputo, Moçambique",
      action: "Agendar visita",
    },
  ];

  return (
    <section
      className="pt-24 bg-background relative overflow-hidden"
      id="contactos"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
            Entre em <span className="text-primary">Contacto</span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Estamos aqui para ajudar. Entre em contacto através dos nossos
            canais ou preencha o formulário abaixo.
          </p>
        </motion.div>

        {/* Cards de contato */}
        <div className="flex items-start justify-center flex-col md:flex-row  gap-8 mb-14">
          {contactOptions.map((option, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-transparent p-8 transition-all"
            >
              <div className="text-primary mb-4">{option.icon}</div>
              <h3 className="text-xl text-foreground font-medium mb-2">
                {option.title}
              </h3>
              <p className="text-foreground/70 mb-6">{option.description}</p>
              <motion.button className="flex items-center gap-2 text-primary hover:underline font-medium">
                {option.action}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Formulário de contacto */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl text-center uppercase font-bold text-foreground "
        >
          OU Envia-nos uma sugestão
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-foreground/70 max-w-2xl text-lg mx-auto mb-12 text-center"
        >
          e nos ajudaremos a melhorar a tua experiencia em nossos serviços.
        </motion.p>
        <div className="max-w-4xl mx-auto md:p-10 p-4">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nome completo"
                  className="w-full px-4 py-3 border-b border-border focus:border-primary outline-none bg-transparent"
                  required
                />
                <span className="text-primary">*</span>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full px-4 py-3 border-b border-border focus:border-primary outline-none bg-transparent"
                  required
                />
                <span className="text-primary">*</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handlePhoneChange}
                placeholder="Telefone"
                className="w-full px-4 py-3 border-b border-border focus:border-primary outline-none bg-transparent"
              />
              <span className="text-primary">*</span>
            </div>
            <Select value={tipoSinistro} onValueChange={setTipoSinistro}>
              <SelectTrigger className="w-full px-4 py-3 border-b border-gray-200 focus:border-primary outline-none bg-transparent text-foreground">
                <SelectValue placeholder="Assunto" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="seguro">Seguros</SelectItem>
                <SelectItem value="investir">Investimentos</SelectItem>
                <SelectItem value="reclamar">Reclamação</SelectItem>
                <SelectItem value="outros">Outro</SelectItem>
              </SelectContent>
            </Select>
            <div>
              <textarea
                name="message"
                value={formData.message}
                placeholder="Mensagem"
                rows={4}
                onChange={handleChange}
                className="w-full px-4 py-3 border-b border-border focus:border-primary outline-none bg-transparent"
                required
              ></textarea>
              <p className="text-sm text-neutral-500">
                {" "}
                <span className="text-primary">*</span> Campos Obrigatórios
              </p>
            </div>
            <Button
              type="submit"
              className="w-full bg-primary text-white py-4 rounded-lg hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enviando..." : "Solicitar Retorno"}
            </Button>
          </form>
        </div>
      </div>
      {/* Mapa */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mt-12 w-full h-96 md:h-[500px] overflow-hidden shadow"
      >
        <iframe
          title="Mapa da Localização"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4138.544491790632!2d32.5859502!3d-25.956186400000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1ee69babee23d951%3A0x127b787279af37a6!2sMALE%20Seguros!5e1!3m2!1spt-PT!2smz!4v1756208201269!5m2!1spt-PT!2smz"
          width="100%"
          height="100%"
          className="border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </motion.div>
    </section>
  );
};

export default ContactSection;
