import frame1 from "@/assets/frame-1.jpg";
import frame2 from "@/assets/frame-2.jpg";
import frame3 from "@/assets/frame-3.jpg";
import frame4 from "@/assets/frame-4.jpg";
import sun1 from "@/assets/sun-1.jpg";
import sun2 from "@/assets/sun-2.jpg";
import sun3 from "@/assets/sun-3.jpg";
import sun4 from "@/assets/sun-4.jpg";
import lens1 from "@/assets/lens-1.jpg";
import lens2 from "@/assets/lens-2.jpg";
import lens3 from "@/assets/lens-3.jpg";
import lens4 from "@/assets/lens-4.jpg";
import blog1 from "@/assets/blog-1.jpg";
import blog2 from "@/assets/blog-2.jpg";
import blog3 from "@/assets/blog-3.jpg";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import hero4 from "@/assets/hero-4.jpg";

export type Product = {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: "frames" | "sunglasses" | "prescription" | "contacts";
  colors?: string[];
  badge?: string;
  rating?: number;
  reviews?: number;
};

const cycle = <T,>(arr: T[], n: number): T[] =>
  Array.from({ length: n }, (_, i) => arr[i % arr.length]);

const frameBase = [frame1, frame2, frame3, frame4];
const sunBase = [sun1, sun2, sun3, sun4];
const lensBase = [lens1, lens2, lens3, lens4];

const frameNames = ["Aurora", "Halcyon", "Meridian", "Vesper", "Lumen", "Onyx", "Soren", "Calix", "Vela", "Atlas", "Riven", "Nova", "Kairos", "Ember", "Solace", "Zenith"];
const sunNames = ["Solaris", "Eclipse", "Mirage", "Helios", "Astra", "Vortex", "Tropic", "Equinox", "Comet", "Riviera", "Apex", "Bay", "Dusk", "Drift", "Orbit", "Coast"];
const colorChips = ["#0a0a0a", "#7a4a2a", "#c9a86a", "#b8b8b8", "#1a3a6e"];

export const framesProducts: Product[] = cycle(frameBase, 16).map((img, i) => ({
  id: `frame-${i + 1}`,
  name: `${frameNames[i]} Square`,
  brand: "Dunamis Atelier",
  price: 489 + (i % 5) * 30,
  originalPrice: i % 3 === 0 ? 589 + (i % 5) * 30 : undefined,
  image: img,
  category: "frames",
  colors: colorChips.slice(0, 3 + (i % 3)),
  badge: i === 0 ? "Bestseller" : i === 4 ? "Novo" : undefined,
  rating: 4.6 + ((i % 4) * 0.1),
  reviews: 120 + i * 13,
}));

export const sunglassesProducts: Product[] = cycle(sunBase, 16).map((img, i) => ({
  id: `sun-${i + 1}`,
  name: `${sunNames[i]} ${i % 2 === 0 ? "Aviator" : "Cat-Eye"}`,
  brand: "Dunamis Sun",
  price: 559 + (i % 4) * 40,
  originalPrice: i % 2 === 0 ? 699 + (i % 4) * 40 : undefined,
  image: img,
  category: "sunglasses",
  colors: colorChips.slice(0, 3 + (i % 3)),
  badge: i === 1 ? "-20%" : undefined,
  rating: 4.5 + ((i % 5) * 0.1),
  reviews: 80 + i * 9,
}));

export const prescriptionProducts: Product[] = cycle(frameBase, 16).map((img, i) => ({
  id: `rx-${i + 1}`,
  name: `${frameNames[(i + 3) % frameNames.length]} RX`,
  brand: "Dunamis Optical",
  price: 649 + (i % 5) * 25,
  originalPrice: i % 4 === 0 ? 799 + (i % 5) * 25 : undefined,
  image: img,
  category: "prescription",
  colors: colorChips.slice(0, 3 + (i % 3)),
  badge: i === 2 ? "Antirreflexo grátis" : undefined,
  rating: 4.7,
  reviews: 200 + i * 8,
}));

export const contactsProducts: Product[] = cycle(lensBase, 16).map((img, i) => ({
  id: `lens-${i + 1}`,
  name: `${["Pure", "Daily", "Hydra", "Vision"][i % 4]} ${i % 2 === 0 ? "30 pack" : "Box of 6"}`,
  brand: "Dunamis Care",
  price: 89 + (i % 6) * 12,
  originalPrice: i % 3 === 0 ? 109 + (i % 6) * 12 : undefined,
  image: img,
  category: "contacts",
  badge: i === 0 ? "Em estoque" : i === 3 ? "Combo 3+1" : undefined,
  rating: 4.8,
  reviews: 340 + i * 11,
}));

export const heroSlides = [
  {
    eyebrow: "Coleção SS26",
    title: "Veja o mundo com intenção.",
    subtitle: "Armações premium, leves e feitas para acompanhar você todos os dias.",
    cta: "Explorar armações",
    image: hero1,
  },
  {
    eyebrow: "Verão",
    title: "Sol em alta definição.",
    subtitle: "Óculos solares com proteção UV400 e lentes polarizadas.",
    cta: "Ver óculos de sol",
    image: hero2,
  },
  {
    eyebrow: "Grau",
    title: "Sua receita, nosso ateliê.",
    subtitle: "Lentes antirreflexo, blue light e progressivas em até 7 dias.",
    cta: "Montar meu óculos",
    image: hero3,
  },
  {
    eyebrow: "Lentes de contato",
    title: "Conforto que dura o dia inteiro.",
    subtitle: "Hidratação avançada com entrega rápida e renovação programada.",
    cta: "Comprar lentes",
    image: hero4,
  },
];

export const categories = [
  { label: "Armações", href: "/c/armacoes" },
  { label: "Óculos de Sol", href: "/c/sol" },
  { label: "Óculos de Grau", href: "/c/grau" },
  { label: "Lentes de Contato", href: "/c/lentes" },
  { label: "Acessórios", href: "/c/acessorios" },
  { label: "Marcas", href: "/marcas" },
  { label: "Outlet", href: "/outlet" },
];

export const blogPosts = [
  { id: 1, title: "Como escolher a armação ideal para o formato do seu rosto", category: "Guia", readTime: "6 min", image: blog1, excerpt: "Um guia prático com as proporções que valorizam cada tipo de rosto." },
  { id: 2, title: "5 cuidados essenciais com lentes de contato no dia a dia", category: "Saúde", readTime: "4 min", image: blog2, excerpt: "Higiene, hidratação e tempo de uso: o que toda pessoa usuária precisa saber." },
  { id: 3, title: "Lentes blue light: marketing ou benefício real?", category: "Tecnologia", readTime: "7 min", image: blog3, excerpt: "Estudos recentes, indicações e quando vale a pena investir nessa proteção." },
];

export const allProducts = [...framesProducts, ...sunglassesProducts, ...prescriptionProducts, ...contactsProducts];

export const formatBRL = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
