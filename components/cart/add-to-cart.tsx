"use client";

import { useCartStore } from "@/lib/client-store";
import { Button } from "../ui/button";
import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { redirect, useSearchParams } from "next/navigation";
import { toast } from "sonner";

export default function AddToCart() {
  const { addToCart } = useCartStore();
  const [quantity, setQuantity] = useState(1);

  const params = useSearchParams();
  const id = Number(params.get("id"));
  const productID = Number(params.get("productID"));
  const title = params.get("title");
  const type = params.get("type");
  const price = Number(params.get("price"));
  const image = params.get("image");

  if (!id || !productID || !title || !type || !price || !image) {
    toast.error("Product not found");
    redirect("/");
  }
  return (
    <>
      <div className="flex items-center gap-4 justify-stretch my-4">
        <Button
          variant={"secondary"}
          className="text-primary"
          onClick={() => {
            if (quantity > 1) {
              setQuantity(quantity - 1);
            }
          }}
        >
          <Minus size={18} strokeWidth={3} />
        </Button>

        <Button className="flex-1">Quantity: {quantity}</Button>

        <Button variant={"secondary"} className="text-primary">
          <Plus
            size={18}
            strokeWidth={3}
            onClick={() => {
              setQuantity(quantity + 1);
            }}
          />
        </Button>
      </div>
      <Button
        onClick={() => {
          toast.success(`Added ${title + " " + type} to your cart`);
          addToCart({
            id: productID,
            name: title + " " + type,
            variant: { variantID: id, quantity },
            price,
            image,
          });
        }}
      >
        Add To Cart
      </Button>
    </>
  );
}
