import Footer from "@/app/components/Footer";
import NavBar from "@/app/components/Navbar";
import { Hero } from "@/app/components/PagesHeroimg";
import TopContactBar from "@/app/components/TopContactBar";
import ContactSection from "./components/ContactSection";

const page = () => {
  return (
    <>
      <TopContactBar />
      <NavBar />
      <Hero
        title="Contactos"
        imageUrl="/images/servicos-cliente/contact.jpg"
        breadcrumb={[
          { name: "Contactos", path: "/servicos-cliente/contactos" },
        ]}
      />
      <ContactSection />
      <Footer />
    </>
  );
};

export default page;
