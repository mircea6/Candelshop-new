import { NextResponse } from "next/server";
import Stripe from "stripe";
import connectDB from "@/lib/mongodb";
import OrderModel from "@/models/Order";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customerName, customerEmail, customerPhone, customerAddress, items, totalPrice } = body;

    if (!customerName || !customerEmail || !customerPhone || !customerAddress || !items?.length || totalPrice == null) {
      return NextResponse.json({ error: "Toate câmpurile sunt obligatorii" }, { status: 400 });
    }

    await connectDB();
    const newOrder = await OrderModel.create({
      customerName,
      customerEmail,
      customerPhone,
      customerAddress,
      paymentMethod: "card",
      items,
      totalPrice: Number(totalPrice),
      status: "pending",
      createdAt: new Date().toISOString(),
    });
    const orderId = newOrder._id.toString();

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map(
      (it: { product: { name: string; price: number; image?: string }; quantity: number }) => ({
        price_data: {
          currency: "ron",
          product_data: {
            name: it.product.name,
            images: it.product.image ? [it.product.image] : undefined,
          },
          unit_amount: Math.round(Number(it.product.price) * 100),
        },
        quantity: it.quantity,
      })
    );

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/checkout`,
      customer_email: customerEmail,
      metadata: { orderId },
    });

    return NextResponse.json({ url: session.url });
  } catch (e) {
    console.error("Stripe checkout-session error:", e);
    return NextResponse.json({ error: "Eroare la crearea sesiunii de plată" }, { status: 500 });
  }
}