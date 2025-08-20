import Footer from "@/app/components/Footer";
import Navbar from "@/app/home/sections/Navbar";
import { Hero } from "../../components/PagesHeroimg";
import AboutUs from "./sections/AboutUs";
import Diferentials from "./sections/Diferentials";
import TeamSection from "./sections/TeamSection";
import QuemSomos from "./sections/WhoWeAre";
import TopContactBar from "@/app/home/components/TopContactBar";

const page = () => {
  return (
    <>
      <TopContactBar />
      <Navbar />
      <Hero
        title="Sobre Nós"
        imageUrl="/bg/mee.jpg"
        breadcrumb={[{ name: "Sobre Nós", path: "/about" }]}
      />
      <AboutUs />
      <Diferentials />
      <QuemSomos />
      <TeamSection />
      {/* <WhyChooseUs /> */}
      {/* <Differentiators /> */}
      <Footer />
    </>
  );
};

export default page;
