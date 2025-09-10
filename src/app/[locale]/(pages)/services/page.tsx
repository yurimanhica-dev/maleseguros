"use client";

import { useState } from "react";
import Footer from "../../components/Footer";
import NavBar from "../../components/Navbar";
import TopContactBar from "../../components/TopContactBar";
import { ContactCTA } from "../../home/sections/ContactCTA";
import HowItWorks from "./components/HowItWorks";
import NavSelect from "./components/NavSelect";
import EnterpriseServices from "./sections/empresarial/EnterpriseServices";
import ParticularServices from "./sections/particular/ParticularServices";

const ServicesPage = () => {
  const [currentTab, setCurrentTab] = useState<"particular" | "empresarial">(
    "particular"
  );

  return (
    <>
      <TopContactBar />
      <NavBar />
      <NavSelect onChange={(tab) => setCurrentTab(tab)} />
      {currentTab === "particular" ? (
        <ParticularServices />
      ) : (
        <EnterpriseServices />
      )}
      <HowItWorks />
      <ContactCTA />
      <Footer />
    </>
  );
};

export default ServicesPage;
