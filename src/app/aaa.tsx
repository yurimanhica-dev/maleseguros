"use client";

import Footer from "./[locale]/components/Footer";
import NavBar from "./[locale]/components/Navbar";
import { Hero } from "./[locale]/components/PagesHeroimg";
import TopContactBar from "./[locale]/components/TopContactBar";

export default function GlobalNotFound() {
  return (
    <>
      <TopContactBar />
      <NavBar />
      <Hero
        title="404"
        imageUrl="/bg/error.jpg"
        breadcrumb={[{ name: "Error 404", path: "/" }]}
      />
      <div className=" flex flex-col gap-8 h-[50vh] items-center c-space justify-center mb-8">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground ">
          Página não encontrada
        </h2>
        <div className="relative text-center max-w-lg mx-auto text-[var(--muted-foreground)]">
          <p>
            Ops! A página que você procura não foi encontrada. Talvez ela tenha
            sido movida, renomeada ou nunca existiu. Use o nosso o link de
            navegação ou a busca abaixo para encontrar o que precisa.
          </p>
          <div className="w-full absolute top-0 md:pt-24 pt-38 px-4 z-50">
            {/* <SearchBox /> */}
          </div>
        </div>
      </div>
      {/* <ContactCTA /> */}
      <Footer />
    </>
  );
}
