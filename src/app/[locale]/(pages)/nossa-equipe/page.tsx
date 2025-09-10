import Footer from "../../components/Footer";
import NavBar from "../../components/Navbar";
import { Hero } from "../../components/PagesHeroimg";
import TopContactBar from "../../components/TopContactBar";
import NossosCorretores from "./components/NossosCorretores";

const page = () => {
  return (
    <>
      <TopContactBar />
      <NavBar />
      <Hero
        title="Nossa Equipe"
        imageUrl="/images/our-team.jpg"
        breadcrumb={[
          {
            name: "Nossa Equipe",
            path: "/consultores",
          },
        ]}
      />
      <NossosCorretores />
      <Footer />
    </>
  );
};

export default page;
