import Footer from "@/app/[locale]/components/Footer";
import NavBar from "@/app/[locale]/components/Navbar";
import { Hero } from "@/app/[locale]/components/PagesHeroimg";
import TopContactBar from "@/app/[locale]/components/TopContactBar";
import RetornoForm from "./components/RetornoForm";
import RetornoHeader from "./components/RetornoHeader";

const page = () => {
  return (
    <>
      <TopContactBar />
      <NavBar />
      <Hero
        title="Solicitar Retorno"
        imageUrl="/images/servicos-cliente/retorn.jpg"
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
