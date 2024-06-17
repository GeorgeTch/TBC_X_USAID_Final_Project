import ProductType from "@/components/products/product-type";
import { db } from "@/server";
import { productVariants, variantImages, variantTags } from "@/server/schema";
import { eq } from "drizzle-orm";
import { Separator } from "@/components/ui/separator";
import formatPrice from "@/lib/format-price";
import ProductVariantPicker from "@/components/products/product-variant-picker";
import ProductShowcase from "@/components/products/product-showcase";
import Reviews from "@/components/reviews/reviews";
import { getReviewAverage } from "@/lib/review-average";
import Stars from "@/components/reviews/stars";

export async function generateStaticParams() {
  const data = await db.query.productVariants.findMany({
    with: {
      variantImages: true,
      variantTags: true,
      product: true,
    },
    orderBy: (productVariants, { desc }) => [desc(productVariants.id)],
  });
  if (data) {
    return data.map((variant) => ({ slug: variant.id.toString() }));
  }
  return [];
}

export default async function page({ params }: { params: { slug: string } }) {
  const variant = await db.query.productVariants.findFirst({
    where: eq(productVariants.id, Number(params.slug)),
    with: {
      product: {
        with: {
          reviews: true,
          productVariants: { with: { variantImages: true, variantTags: true } },
        },
      },
    },
  });

  if (variant) {
    const reviewAvg = getReviewAverage(
      variant?.product.reviews.map((r) => r.rating)
    );

    return (
      <main>
        <section className="flex flex-col gap-4 lg:flex-row lg:gap-12">
          <div className="flex-1">
            <ProductShowcase variants={variant.product.productVariants} />
          </div>
          <div className="flex flex-col flex-1">
            <h2 className="text-2xl font-bold">{variant?.product.title}</h2>
            <div>
              <ProductType variants={variant.product.productVariants} />
              <Stars
                rating={reviewAvg}
                totalReviews={variant.product.reviews.length}
              />
            </div>
            <Separator className="my-2" />
            <p className="text-2xl font-bold py-2">
              {formatPrice(variant.product.price)}
            </p>
            <div
              dangerouslySetInnerHTML={{ __html: variant.product.description }}
            ></div>
            <p className="text-secondary-foreground font-medium my-2">
              Available Colors
            </p>
            <div className="flex gap-4">
              {variant.product.productVariants.map((productVariant) => (
                <ProductVariantPicker
                  key={productVariant.id}
                  id={productVariant.id}
                  productID={productVariant.productID}
                  productType={productVariant.productType}
                  color={productVariant.color}
                  image={productVariant.variantImages[0].url}
                  price={variant.product.price}
                  title={variant.product.title}
                />
              ))}
            </div>
          </div>
        </section>
        <Reviews productID={variant.productID} />
      </main>
    );
  }
}
