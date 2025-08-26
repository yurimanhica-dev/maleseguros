"use client";

import Footer from "@/app/components/Footer";
import { ContactCTA } from "@/app/home/sections/ContactCTA";

import NavBar from "@/app/components/Navbar";
import TopContactBar from "@/app/components/TopContactBar";
import { useState } from "react";
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
