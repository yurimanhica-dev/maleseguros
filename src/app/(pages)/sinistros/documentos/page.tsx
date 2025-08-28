import Footer from "@/app/components/Footer";
import NavBar from "@/app/components/Navbar";
import { Hero } from "@/app/components/PagesHeroimg";
import TopContactBar from "@/app/components/TopContactBar";
import { ArrowRight } from "lucide-react";
import EmergencyCTA, {
    EmergencyContacts,
} from "../../servicos-cliente/informacoes/components/EmergencyCTA";
import DocumentosPage from "./components/DocumentosPage";

const emergencyContacts: EmergencyContacts = {
  title: " Precisa de ajuda com documentos?",
  description:
    " Nossa equipe está disponível para auxiliar na localização e compreensão de qualquer documento",
  btn1Link: "tel:+258841234567",
  btn1Text: "Ligar para Suporte",
  btn2Link: "/sinistro/comunicar",
  btn2Text: "Falar com Corretor",
  icon: <ArrowRight className="w-6 h-6 text-white" />,
};

const page = () => {
  return (
    <>
      <TopContactBar />
      <NavBar />
      <Hero
        title="Central de Documentos"
        imageUrl="/images/docs/docs.jpg"
        breadcrumb={[
          { name: "Central de Documentos", path: "/sinistros/documentos" },
        ]}
      />
      <DocumentosPage />
      <EmergencyCTA emergencyContacts={emergencyContacts} />
      <Footer />
    </>
  );
};

export default page;
