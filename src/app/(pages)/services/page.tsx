"use client";

import Footer from "@/app/components/Footer";
import { ContactCTA } from "@/app/home/sections/ContactCTA";
import Navbar from "@/app/home/sections/Navbar";
import { useState } from "react";
import HowItWorks from "./components/HowItWorks";
import NavSelect from "./components/NavSelect";
import EnterpriceServices from "./sections/empresarial/EnterpriseServices";
import ParticularServices from "./sections/particular/ParticularServices";

const ServicesPage = () => {
  const [currentTab, setCurrentTab] = useState<"particular" | "empresarial">(
    "particular"
  );

  return (
    <>
      <Navbar />
      <NavSelect onChange={(tab) => setCurrentTab(tab)} />
      {currentTab === "particular" ? (
        <ParticularServices />
      ) : (
        <EnterpriceServices />
      )}
      <HowItWorks />
      <ContactCTA />
      <Footer />
    </>
  );
};

export default ServicesPage;
