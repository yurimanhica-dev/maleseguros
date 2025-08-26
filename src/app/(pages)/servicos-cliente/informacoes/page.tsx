import Footer from "@/app/components/Footer";
import NavBar from "@/app/components/Navbar";
import { Hero } from "@/app/components/PagesHeroimg";
import TopContactBar from "@/app/components/TopContactBar";

import EmergencyCTA from "./components/EmergencyCTA";
import FAQSection from "./components/FAQItem";
import AccidentSection from "./components/FirstAccidentSection";
import PreventionSection from "./components/PreventionSection";
import SinistroTimeline from "./components/SinistroTimeline";

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
      <SinistroTimeline />
      <PreventionSection />
      <AccidentSection />
      <EmergencyCTA />
      <FAQSection />
      <Footer />
    </>
  );
};

export default page;
