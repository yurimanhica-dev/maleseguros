import Footer from "@/app/components/Footer";

import { Hero } from "../../components/PagesHeroimg";
import AboutUs from "./sections/AboutUs";
import Diferentials from "./sections/Diferentials";
import TeamSection from "./sections/TeamSection";
import QuemSomos from "./sections/WhoWeAre";
import TopContactBar from "@/app/components/TopContactBar";
import NavBar from "@/app/components/Navbar";


const page = () => {
  return (
    <>
      <TopContactBar />
      <NavBar />
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
