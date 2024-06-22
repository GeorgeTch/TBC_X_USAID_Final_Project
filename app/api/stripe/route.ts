import { db } from "@/server";
import { orders } from "@/server/schema";
import { eq } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  console.log("Webhook received");

  const stripe = new Stripe(process.env.STRIPE_SECRET || "", {
    apiVersion: "2024-04-10",
  });
  const sig = req.headers.get("stripe-signature") || "";
  const signingSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

  const reqText = await req.text();
  const reqBuffer = Buffer.from(reqText);

  let event;

  try {
    event = stripe.webhooks.constructEvent(reqBuffer, sig, signingSecret);
    console.log("Webhook event constructed successfully:", event.type);
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, {
      status: 400,
    });
  }

  switch (event.type) {
    case "payment_intent.succeeded":
      console.log("Processing payment_intent.succeeded");
      try {
        const retrieveOrder = await stripe.paymentIntents.retrieve(
          event.data.object.id,
          { expand: ["latest_charge"] }
        );
        console.log("Retrieved payment intent:", JSON.stringify(retrieveOrder));

        const charge = retrieveOrder.latest_charge as Stripe.Charge;
        console.log("Charge details:", JSON.stringify(charge));

        console.log("Updating order in database...");
        const updatedOrder = await db
          .update(orders)
          .set({
            status: "succeeded",
            receiptURL: charge.receipt_url,
          })
          .where(eq(orders.paymentIntentID, event.data.object.id))
          .returning();

        console.log("Updated order:", JSON.stringify(updatedOrder));

        if (updatedOrder.length === 0) {
          console.log(
            "No order found with paymentIntentID:",
            event.data.object.id
          );
        }
      } catch (error) {
        console.error("Error processing payment_intent.succeeded:", error);
      }
      break;

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  console.log("Webhook processing completed");
  return new NextResponse("ok", { status: 200 });
}
