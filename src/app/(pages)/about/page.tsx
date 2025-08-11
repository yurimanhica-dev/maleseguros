import Navbar from "@/app/home/sections/Navbar";
import { Hero } from "./components/AboutHero";

const page = () => {
  return (
    <>
      <Navbar />
      <Hero
        title="Sobre Nós"
        imageUrl="/bg/mee.jpg"
        breadcrumb={[{ name: "Sobre Nós", path: "/about" }]}
      />
    </>
  );
};

export default page;
