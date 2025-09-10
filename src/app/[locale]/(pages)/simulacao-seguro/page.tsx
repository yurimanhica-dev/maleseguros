"use client";

import { useState } from "react";
import Footer from "../../components/Footer";
import NavBar from "../../components/Navbar";
import { Hero } from "../../components/PagesHeroimg";
import TopContactBar from "../../components/TopContactBar";
import NavSelect from "./sections/NavSelect";
import OutrosSegurosForm from "./sections/OutrosSegurosForm";
import { SeguroAutoForm } from "./sections/SeguroAutoForm";

const SimulatorPage = () => {
  const [currentTab, setCurrentTab] = useState<"automovel" | "cotacao">(
    "automovel"
  );

  return (
    <>
      <TopContactBar />
      <NavBar />
      <Hero
        title="Simulação de Seguros"
        imageUrl="/images/simular-seguro.jpg"
        breadcrumb={[{ name: "Simulação de Seguros", path: "/simulacao" }]}
      />
      <NavSelect onChange={(tab) => setCurrentTab(tab)} />
      {currentTab === "automovel" ? <SeguroAutoForm /> : <OutrosSegurosForm />}
      <Footer />
    </>
  );
};

export default SimulatorPage;
