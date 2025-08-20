"use client";

import Footer from "./components/Footer";
import { Hero } from "./components/PagesHeroimg";
import SearchBox from "./components/SearchBox";
import TopContactBar from "./home/components/TopContactBar";
import Navbar from "./home/sections/Navbar";

export default function NotFound() {
  return (
    <>
      <TopContactBar />
      <Navbar />
      <Hero
        title="404"
        imageUrl="/bg/error.jpg"
        breadcrumb={[{ name: "Error 404", path: "/" }]}
      />
      <div className="flex flex-col gap-8 h-[50vh] items-center c-space justify-center mb-8">
        <h2 className="text-5xl font-bold text-foreground ">
          Página não encontrada
        </h2>
        <div className="text-center max-w-lg mx-auto text-[var(--muted-foreground)]">
          <p>
            Ops! A página que você procura não foi encontrada. Talvez ela tenha
            sido movida, renomeada ou nunca existiu. Use o nosso o link de
            navegação ou a busca abaixo para encontrar o que precisa.
          </p>
        </div>
        <SearchBox />
      </div>
      {/* <ContactCTA /> */}
      <Footer />
    </>
  );
}
