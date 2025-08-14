import Navbar from "@/app/home/sections/Navbar";
import { Hero } from "./components/AboutHero";
import { AboutUsSection } from "./components/AboutUs";

const page = () => {
  return (
    <>
      <Navbar />
      <Hero
        title="Sobre Nós"
        imageUrl="/bg/mee.jpg"
        breadcrumb={[{ name: "Sobre Nós", path: "/about" }]}
      />
      <AboutUsSection />
    </>
  );
};

export default page;
