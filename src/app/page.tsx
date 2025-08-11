import Footer from "./components/Footer";
import { AboutUs } from "./home/sections/About";
import BackgroundFill from "./home/sections/Background";
import { ContactCTA } from "./home/sections/ContactCTA";
import Hero from "./home/sections/Hero";
import Navbar from "./home/sections/Navbar";
import { Solutions } from "./home/sections/Soluctions";
import { Testimonials } from "./home/sections/Testimonials";
import WhyChooseUs from "./home/sections/WhyUs";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Solutions />
      <AboutUs />
      <WhyChooseUs />
      <BackgroundFill />
      <Testimonials />
      <ContactCTA />
      <Footer />
    </>
  );
}
