"use client";

import { useCartStore } from "@/lib/client-store";
import {
  AddressElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { createPaymentIntent } from "@/server/actions/create-payment-intent";
import { useAction } from "next-safe-action/hooks";
import { createOrder } from "@/server/actions/create-order";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

export default function PaymentForm({ totalPrice }: { totalPrice: number }) {
  const stripe = useStripe();
  const elements = useElements();
  const { cart, setCheckoutProgress, clearCart, setCartDrawerOpen } =
    useCartStore();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const session = useSession();
  useEffect(() => {
    if (session.status === "unauthenticated") {
      setCheckoutProgress("cart-page");
    }
  }, []);

  const { execute } = useAction(createOrder, {
    onSuccess: (data) => {
      if (data.error) {
        toast.error(data.error);
      }
      if (data.success) {
        setIsLoading(false);
        toast.success(data.success);
        setCheckoutProgress("confirmation-page");
        clearCart();
      }
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!stripe || !elements) {
      setIsLoading(false);
      return;
    }

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message!);
      setIsLoading(false);
      return;
    }

    const amountInCents = Math.round(totalPrice * 100);

    const { data } = await createPaymentIntent({
      amount: amountInCents,
      currency: "usd",
      cart: cart.map((item) => ({
        quantity: item.variant.quantity,
        productID: item.id,
        variantID: item.variant.variantID,
        title: item.name,
        price: item.price,
        image: item.image,
      })),
    });

    if (data?.error) {
      setErrorMessage(data.error);
      setIsLoading(false);
      return;
    }

    if (data?.success) {
      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret: data.success.clientSecretID!,
        redirect: "if_required",
        confirmParams: {
          return_url: "http://localhost:3000/success",
          receipt_email: data.success.user as string,
        },
      });

      if (error) {
        setErrorMessage(error.message!);
        setIsLoading(false);
        return;
      } else {
        setIsLoading(false);
        execute({
          status: "pending",
          paymentIntentID: data.success.paymentIntentID,
          total: totalPrice,
          products: cart.map((item) => ({
            productID: item.id,
            quantity: item.variant.quantity,
            variantID: item.variant.variantID,
          })),
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <AddressElement options={{ mode: "shipping" }} />
      <Button
        className="my-4 w-full"
        disabled={!stripe || !elements || isLoading}
      >
        {isLoading ? "Processing..." : "Pay now"}
      </Button>
    </form>
  );
}
