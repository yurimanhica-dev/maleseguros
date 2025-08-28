import Footer from "@/app/components/Footer";

import NavBar from "@/app/components/Navbar";
import TeamSection from "@/app/components/TeamSection";
import TopContactBar from "@/app/components/TopContactBar";
import { ArrowRight } from "lucide-react";
import { Hero } from "../../components/PagesHeroimg";
import EmergencyCTA, {
  EmergencyContacts,
} from "../servicos-cliente/informacoes/components/EmergencyCTA";
import AboutUs from "./sections/AboutUs";
import Diferentials from "./sections/Diferentials";
import QuemSomos from "./sections/WhoWeAre";

const emergencyContacts: EmergencyContacts = {
  title: "Não Encontrou o Corrector Ideal?",
  description:
    "Nossa equipe de atendimento pode conectá-lo com o especialista perfeito para suas necessidades específicas.",
  btn1Link: "tel:+258841234567",
  btn1Text: "Falar com Atendimento",
  btn2Link: "/sinistro/comunicar",
  btn2Text: "Ver Todos os Contactos",
  icon: <ArrowRight className="w-6 h-6 text-white" />,
};
const page = () => {
  return (
    <>
      <TopContactBar />
      <NavBar />
      <Hero
        title="Sobre Nós"
        imageUrl="/bg/mee.jpg"
        breadcrumb={[{ name: "Sobre Nós", path: "/about" }]}
      />
      <AboutUs />
      <Diferentials />
      <QuemSomos />
      <TeamSection />
      <EmergencyCTA emergencyContacts={emergencyContacts} />
      <Footer />
    </>
  );
};

export default page;
