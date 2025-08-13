import Footer from "@/app/components/Footer";
import { ContactCTA } from "@/app/home/sections/ContactCTA";
import HowItWorks from "../../components/HowItWorks";
import ParticularServicesHero from "./sections/ParticularServicesHero";
import ParticularServicesInfo from "./sections/ParticularServicesInfo";

const ParticularServices = () => {
  return (
    <section className="animate-fadeIn ">
      <ParticularServicesHero />
      <ParticularServicesInfo />
      <HowItWorks />
      <ContactCTA />
      <Footer />
    </section>
  );
};

export default ParticularServices;
