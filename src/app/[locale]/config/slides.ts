export interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  cta: string;
  image: string;
}

export const slides: Slide[] = [
  {
    id: 1,
    title: "Hero.slides.1.title",
    subtitle: "Hero.slides.1.subtitle",
    description: "Hero.slides.1.description",
    cta: "Hero.slides.1.cta",
    image: "/bg/umbre.jpg",
  },
  {
    id: 2,
    title: "Hero.slides.2.title",
    subtitle: "Hero.slides.2.subtitle",
    description: "Hero.slides.2.description",
    cta: "Hero.slides.2.cta",
    image: "/bg/bg_keys.jpg",
  },
  {
    id: 3,
    title: "Hero.slides.3.title",
    subtitle: "Hero.slides.3.subtitle",
    description: "Hero.slides.3.description",
    cta: "Hero.slides.3.cta",
    image: "/bg/bg-umbrela.webp",
  },
];
