import Footer from "@/app/components/Footer";
import { ContactCTA } from "@/app/home/sections/ContactCTA";
import HowItWorks from "../../components/HowItWorks";
import EnterpriseServicesHero from "./sections/EnterpriseServicesHero";
import EnterpriseServicesInfo from "./sections/EnterpriseServicesInfo";

const EnterpriceServices = () => {
  return (
    <section className="animate-fadeIn">
      <EnterpriseServicesHero />
      <EnterpriseServicesInfo />
      <HowItWorks />
      <ContactCTA />
      <Footer />
    </section>
  );
};

export default EnterpriceServices;
