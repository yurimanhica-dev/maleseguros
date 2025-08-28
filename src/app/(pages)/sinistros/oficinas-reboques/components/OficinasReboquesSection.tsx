"use client";

import { oficinas, reboques } from "@/app/utils/types";
import { motion, useInView } from "framer-motion";
import { Clock, MapPin, Phone, Star, Wrench } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

const OficinasReboquesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="oficinas-reboques" className="py-24 bg-background" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-6">
            <Wrench className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Oficinas e <span className="text-primary">Reboques</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Rede de oficinas parceiras e serviços de reboque disponíveis 24
            horas para sua segurança
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 ">
          {/* Seção de Oficinas */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="flex items-center justify-center  mb-8 space-x-4">
              <Image
                src="/icons/mechanic.png"
                alt="oficinas"
                width={40}
                height={40}
              />
              <h3 className="text-2xl font-bold uppercase text-foreground">
                Oficinas Parceiras
              </h3>
            </div>

            <div className="space-y-6">
              {oficinas.map((oficina, index) => (
                <motion.div
                  key={oficina.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="bg-card rounded-2xl shadow-lg overflow-hidden border border-border hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3">
                      <div className="h-full w-full bg-muted min-h-[140px] flex items-center justify-center">
                        <Image
                          src={oficina.img}
                          alt={oficina.nome}
                          width={400}
                          height={300}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="md:w-2/3 p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="text-xl font-semibold text-foreground">
                          {oficina.nome}
                        </h4>
                        <div className="flex items-center bg-primary/10 px-2 py-1 rounded-full">
                          <Star className="w-4 h-4 text-primary fill-current mr-1" />
                          <span className="text-sm font-medium text-foreground">
                            {oficina.rating}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center text-muted-foreground mb-2">
                        <Wrench className="w-4 h-4 mr-2" />
                        <span className="text-sm">{oficina.especialidade}</span>
                      </div>

                      <div className="flex items-center text-muted-foreground mb-2">
                        <Clock className="w-4 h-4 mr-2" />
                        <span className="text-sm">{oficina.horario}</span>
                      </div>

                      <div className="flex items-center text-muted-foreground mb-4">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span className="text-sm">{oficina.endereco}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <a
                          href={`tel:${oficina.telefone.replace(/\s/g, "")}`}
                          className="flex items-center text-primary font-medium hover:text-primary/80 transition-colors"
                        >
                          <Phone className="w-4 h-4 mr-1" />
                          {oficina.telefone}
                        </a>
                        <button className="text-sm bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                          Contactar
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Seção de Reboques */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <div className="flex items-center justify-center mb-8 space-x-4">
              <Image
                src="/icons/car-trailer.png"
                alt="reboque"
                width={50}
                height={50}
              />
              <h3 className="text-2xl font-bold uppercase text-foreground">
                Serviços de Reboque
              </h3>
            </div>

            <div className="bg-card shadow-lg p-6 border border-border mb-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Image
                    src="/icons/support_red.png"
                    alt="support"
                    width={50}
                    height={50}
                  />
                </div>
                <h4 className="text-xl font-semibold text-foreground mb-2">
                  Assistência 24 Horas
                </h4>
                <p className="text-muted-foreground">
                  Serviços de reboque disponíveis a qualquer hora, todos os dias
                  da semana
                </p>
              </div>

              <div className="space-y-4">
                {reboques.map((reboque, index) => (
                  <motion.div
                    key={reboque.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-accent transition-colors"
                  >
                    <div>
                      <h5 className="font-medium text-foreground">
                        {reboque.nome}
                      </h5>
                      <p className="text-sm text-muted-foreground">
                        {reboque.disponibilidade}
                      </p>
                    </div>
                    <a
                      href={`tel:${reboque.telefone.replace(/\s/g, "")}`}
                      className="flex items-center text-primary font-medium hover:text-primary/80 transition-colors"
                    >
                      <Phone className="w-4 h-4 mr-1" />
                      {reboque.telefone}
                    </a>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Informações Adicionais */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="p-6 border border-border"
            >
              <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                <span className="flex items-center justify-center mr-3">
                  <Image
                    src="/icons/car-trailer.png"
                    alt="support"
                    width={35}
                    height={35}
                  />
                </span>
                Procedimento para Reboque
              </h4>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-3 flex-shrink-0"></div>
                  <span>Ligue para um dos números de emergência</span>
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-3 flex-shrink-0"></div>
                  <span>Informe sua localização exata</span>
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-3 flex-shrink-0"></div>
                  <span>Aguarde no local seguro até a chegada do reboque</span>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OficinasReboquesSection;
