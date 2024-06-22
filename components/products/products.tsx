"use client";

import formatPrice from "@/lib/format-price";
import { VariantsWithProduct } from "@/lib/infer-type";
import { Badge } from "../ui/badge";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

type ProductsType = {
  variants: VariantsWithProduct[];
};

export default function Products({ variants }: ProductsType) {
  const searchParams = useSearchParams();
  const searchTag = searchParams.get("tag");

  const filtered = useMemo(() => {
    if (searchTag && variants) {
      return variants.filter((variant) =>
        variant.variantTags.some((variantTag) => variantTag.tag === searchTag)
      );
    }
    return variants;
  }, [searchTag]);

  return (
    <main className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
      {filtered.map((variant) => (
        <Link
          className="w-full h-full bg-secondary rounded-md p-2 hover:opacity-90 hover:scale-105 transition-all duration-500 ease-in-out"
          key={variant.id}
          href={`/products/${variant.id}?id=${variant.id}&productID=${variant.productID}&price=${variant.product.price}&title=${variant.product.title}&type=${variant.productType}&image=${variant.variantImages[0].url}`}
        >
          <div className="flex flex-col w-full h-full">
            <div className="flex-1">
              <Image
                className="rounded-md"
                src={variant.variantImages[0].url}
                width={720}
                height={480}
                alt={variant.product.title}
                loading="lazy"
              />
            </div>
            <div className="flex justify-between pt-2">
              <div className="font-medium">
                <h2>{variant.product.title}</h2>
                <p className="text-sm text-muted-foreground">
                  {variant.productType}
                </p>
              </div>
              <div>
                <Badge className="text-sm" variant={"secondary"}>
                  {formatPrice(variant.product.price)}
                </Badge>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </main>
  );
}
