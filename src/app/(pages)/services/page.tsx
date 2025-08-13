"use client";

import Navbar from "@/app/home/sections/Navbar";
import { useState } from "react";
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
    </>
  );
};

export default ServicesPage;
