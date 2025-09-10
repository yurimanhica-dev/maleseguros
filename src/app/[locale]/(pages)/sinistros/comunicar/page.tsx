import Footer from "@/app/[locale]/components/Footer";
import NavBar from "@/app/[locale]/components/Navbar";
import { Hero } from "@/app/[locale]/components/PagesHeroimg";
import TopContactBar from "@/app/[locale]/components/TopContactBar";
import SinistroForm from "./components/SinistroForm";
import SinistroHeader from "./components/SinistroHeader";

const page = () => {
  return (
    <>
      <TopContactBar />
      <NavBar />
      <Hero
        title="Comunicar Sinistro"
        imageUrl="/images/sinistros/tell.jpg"
        breadcrumb={[
          { name: "Comunicar Sinistro", path: "/sinistros/comunicar" },
        ]}
      />

      <SinistroHeader />
      <SinistroForm />

      <Footer />
    </>
  );
};

export default page;
