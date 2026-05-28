import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/_components/common/SiteHeader";
import { SiteFooter } from "@/_components/common/SiteFooter";
import { HeroSlider } from "@/_components/ecommerce/HeroSlider";
import { ProductCarousel } from "@/_components/ecommerce/ProductCarousel";
import { FirstVisitModal } from "@/_components/ecommerce/FirstVisitModal";
import { BlogSection } from "@/_components/ecommerce/BlogSection";
import { Newsletter } from "@/_components/ecommerce/Newsletter";
import { framesProducts, sunglassesProducts, prescriptionProducts, contactsProducts } from "@/lib/dunamis-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DUNAMIS — Eyewear & Cuidado Ocular Premium" },
      { name: "description", content: "Armações, óculos de sol, óculos de grau e lentes de contato premium. Frete grátis acima de R$ 299." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <SiteHeader />
      <HeroSlider />
      <ProductCarousel title="Armações mais vendidas" subtitle="Curadoria do mês — design atemporal" products={framesProducts} />
      <ProductCarousel title="Óculos de sol em destaque" subtitle="UV400 e lentes polarizadas" products={sunglassesProducts} />
      <ProductCarousel title="Óculos de grau favoritos" subtitle="Lentes antirreflexo e blue light disponíveis" products={prescriptionProducts} />
      <ProductCarousel title="Lentes de contato" subtitle="Conforto e hidratação para o dia inteiro" products={contactsProducts} />
      <BlogSection />
      <Newsletter />
      <SiteFooter />
      <FirstVisitModal />
    </>
  );
}
