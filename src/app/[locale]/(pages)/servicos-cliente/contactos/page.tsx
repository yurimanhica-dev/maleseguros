import Footer from "@/app/[locale]/components/Footer";
import NavBar from "@/app/[locale]/components/Navbar";
import { Hero } from "@/app/[locale]/components/PagesHeroimg";
import TopContactBar from "@/app/[locale]/components/TopContactBar";
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
