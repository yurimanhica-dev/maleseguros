import { ArrowRight } from "lucide-react";
import Footer from "../../components/Footer";
import NavBar from "../../components/Navbar";
import { Hero } from "../../components/PagesHeroimg";
import TeamSection from "../../components/TeamSection";
import TopContactBar from "../../components/TopContactBar";
import EmergencyCTA, {
  EmergencyContacts,
} from "../servicos-cliente/informacoes/components/EmergencyCTA";
import AboutUs from "./sections/AboutUs";
import DifferentialSection2 from "./sections/DifferentialSection2";
import QuemSomos from "./sections/WhoWeAre";
import TimelineSection from "./sections/timelineData";

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
      <DifferentialSection2 />
      <QuemSomos />
      <TeamSection />
      <TimelineSection />
      <EmergencyCTA emergencyContacts={emergencyContacts} />
      <Footer />
    </>
  );
};

export default page;
