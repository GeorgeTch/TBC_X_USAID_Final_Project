import Products from "@/components/products/products";
import { db } from "@/server";
import Algolia from "./dashboard/products/algolia";
import ProductTags from "./dashboard/products/product-tags";
import Footer from "@/components/footer/Footer";

export const revalidate = 60 * 60;

export default async function Home() {
  const data = await db.query.productVariants.findMany({
    with: {
      variantImages: true,
      variantTags: true,
      product: true,
    },
    orderBy: (productVariants, { desc }) => [desc(productVariants.id)],
  });

  return (
    <main className="pb-10">
      <Algolia />
      <ProductTags />
      <Products variants={data} />
      <Footer />
    </main>
  );
}
