import Footer from "@/app/components/Footer";
import NavBar from "@/app/components/Navbar";
import { Hero } from "@/app/components/PagesHeroimg";
import TopContactBar from "@/app/components/TopContactBar";
import RetornoForm from "./components/RetornoForm";
import RetornoHeader from "./components/RetornoHeader";

const page = () => {
  return (
    <>
      <TopContactBar />
      <NavBar />
      <Hero
        title="Solicitar Retorno"
        imageUrl="/images/servicos-cliente/solicitar-retorno.webp"
        breadcrumb={[
          {
            name: "Solicitar Retorno",
            path: "/servicos-cliente/solicitar-retorno",
          },
        ]}
      />
      <RetornoHeader />
      <RetornoForm />
      <Footer />
    </>
  );
};

export default page;
