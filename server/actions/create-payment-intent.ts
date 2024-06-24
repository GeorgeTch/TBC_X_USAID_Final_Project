"use server";
import { paymentIntentSchema } from "@/types/payment-intetnt-schema";
import { createSafeActionClient } from "next-safe-action";
import { Stripe } from "stripe";
import { auth } from "../auth";

const stripe = new Stripe(process.env.STRIPE_SECRET!);
const action = createSafeActionClient();

export const createPaymentIntent = action(
  paymentIntentSchema,
  async ({ amount, cart, currency }) => {
    const user = await auth();
    if (!user) return { error: "Please login to continue" };
    if (!amount) return { error: "No items to checkout" };

    // Simplify the cart data to reduce metadata size
    const simplifiedCart = cart.map((item) => ({
      id: item.productID,
      qty: item.quantity,
      variant: item.variantID,
    }));

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency,
        automatic_payment_methods: { enabled: true },
        metadata: {
          cart: JSON.stringify(simplifiedCart).slice(0, 500), // Ensure it doesn't exceed 500 characters
        },
      });

      return {
        success: {
          paymentIntentID: paymentIntent.id,
          clientSecretID: paymentIntent.client_secret,
          user: user.user.email,
        },
      };
    } catch (error) {
      console.error("Error creating payment intent:", error);
      return { error: "Failed to create payment intent" };
    }
  }
);
