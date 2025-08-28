import Footer from "@/app/components/Footer";
import NavBar from "@/app/components/Navbar";
import { Hero } from "@/app/components/PagesHeroimg";
import TopContactBar from "@/app/components/TopContactBar";
import { Shield } from "lucide-react";
import EmergencyCTA, {
  EmergencyContacts,
} from "../../servicos-cliente/informacoes/components/EmergencyCTA";
import OficinasReboquesSection from "./components/OficinasReboquesSection";

const emergencyContacts: EmergencyContacts = {
  title: "Precisa de ajuda imediata?",
  description:
    "Nossa central de emergência está disponível 24 horas por dia para acionar reboque e assistência",
  btn1Link: "tel:+258841234567",
  btn1Text: "Ligue para Emergência",
  btn2Link: "/sinistro/comunicar",
  btn2Text: "Solicitar Reboque",
  icon: <Shield className="w-6 h-6 text-white" />,
};

const page = () => {
  return (
    <>
      <TopContactBar />
      <NavBar />
      <Hero
        title="Oficinas e Reboques"
        imageUrl="/images/sinistros/bg-oficina.jpg"
        breadcrumb={[
          { name: "Oficinas e Reboques", path: "/sinistros/oficinas-reboques" },
        ]}
      />
      <OficinasReboquesSection />
      <EmergencyCTA emergencyContacts={emergencyContacts} />
      <Footer />
    </>
  );
};

export default page;
