import Footer from "@/app/components/Footer";
import NavBar from "@/app/components/Navbar";
import { Hero } from "@/app/components/PagesHeroimg";
import TopContactBar from "@/app/components/TopContactBar";

import { FileText } from "lucide-react";
import EmergencyCTA, { EmergencyContacts } from "./components/EmergencyCTA";
import FAQSection from "./components/FAQItem";
import AccidentSection from "./components/FirstAccidentSection";
import PreventionSection from "./components/PreventionSection";
import SinistroTimeline from "./components/SinistroTimeline";

const emergencyContacts: EmergencyContacts = {
  title: "Precisa de ajuda imediata?",
  description:
    "Nossa equipe de emergência está disponível 24 horas por dia, 7 dias por semana para auxiliá-lo.",
  btn1Link: "tel:+258841234567",
  btn1Text: "Ligue para Emergência",
  btn2Link: "/sinistro/comunicar",
  btn2Text: "Participar um seguro",
  icon: <FileText className="w-6 h-6 text-white" />,
};

const page = () => {
  return (
    <>
      <TopContactBar />
      <NavBar />
      <Hero
        title="Informações Úteis"
        imageUrl="/images/servicos-cliente/Informacoes-uteis.jpg"
        breadcrumb={[
          {
            name: "Informações Úteis",
            path: "/servicos-cliente/informacoes",
          },
        ]}
      />
      <PreventionSection />
      <SinistroTimeline />
      <AccidentSection />
      <EmergencyCTA emergencyContacts={emergencyContacts} />
      <FAQSection />
      <Footer />
    </>
  );
};

export default page;
