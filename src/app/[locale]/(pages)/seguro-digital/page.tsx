import Footer from "../../components/Footer";
import NavBar from "../../components/Navbar";
import { Hero } from "../../components/PagesHeroimg";
import TopContactBar from "../../components/TopContactBar";
import InsuranceLogin from "./components/InsuranceLogin";

const page = () => {
  return (
    <>
      <TopContactBar />
      <NavBar />
      <Hero
        title="Seguro Digital"
        imageUrl="/images/seguro-digital/digital.jpg"
        breadcrumb={[{ name: "Seguro Digital", path: "/seguro-digital" }]}
      />
      <InsuranceLogin /> 
      <Footer />
    </>
  );
};

export default page;
