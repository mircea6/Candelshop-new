import { NextResponse } from "next/server";
import Stripe from "stripe";
import connectDB from "@/lib/mongodb";
import OrderModel from "@/models/Order";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: Request) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature");
  if (!sig || !webhookSecret) {
    return NextResponse.json({ error: "Missing signature or webhook secret" }, { status: 400 });
  }
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unknown";
    return NextResponse.json({ error: `Webhook signature failed: ${msg}` }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.orderId;
    if (!orderId) return NextResponse.json({ error: "Missing orderId in metadata" }, { status: 400 });
    await connectDB();
    await OrderModel.findByIdAndUpdate(orderId, { status: "confirmed" });
  }

  return NextResponse.json({ received: true });
}