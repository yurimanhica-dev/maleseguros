import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import { Hero } from "@/app/components/PagesHeroimg";
import TopContactBar from "@/app/components/TopContactBar";
import SinistroForm from "./components/SinistroForm";
import SinistroHeader from "./components/SinistroHeader";

const page = () => {
  return (
    <>
      <TopContactBar />
      <Navbar />
      <Hero
        title="Comunicar Sinistro"
        imageUrl="/images/sinistros/bg.png"
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
