import Footer from "@/app/components/Footer";
import { Hero } from "@/app/components/PagesHeroimg";
import Navbar from "@/app/home/sections/Navbar";
import { SeguroAutoMocambique } from "./sections/SeguroAutoMocambique";

const SimulatorPage = () => {
  return (
    <>
      <Navbar />
      <Hero
        title="Simulação de Seguros"
        imageUrl="/bg/simulator.jpg"
        breadcrumb={[{ name: "Simulação de Seguros", path: "/simulacao" }]}
      />
      <div className="min-h-screen flex items-center justify-center">
        <SeguroAutoMocambique />
      </div>
      <Footer />
    </>
  );
};

export default SimulatorPage;
