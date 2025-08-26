import Footer from "@/app/components/Footer";
import NavBar from "@/app/components/Navbar";
import { Hero } from "@/app/components/PagesHeroimg";
import TopContactBar from "@/app/components/TopContactBar";
import { DicasUteisSection } from "./components/DicasUteisSection";

const page = () => {
  return (
    <>
      <TopContactBar />
      <NavBar />
      <Hero
        title="Dicas Úteis"
        imageUrl="/bg/mee.jpg"
        breadcrumb={[{ name: "Dicas Úteis", path: "/sinistros/dicas-uteis" }]}
      />
      <DicasUteisSection />
      <Footer />
    </>
  );
};

export default page;
