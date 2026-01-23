import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import OrderModel from "@/models/Order";

// POST = când trimiti o comandă nouă
export async function POST(request: Request) {
  try {
    // 1. Conectează-te la MongoDB
    await connectDB();

    // 2. Citește datele din request
    const body = await request.json();
    const {
      customerName,
      customerEmail,
      customerPhone,
      customerAddress,
      paymentMethod,
      items,
      totalPrice,
    } = body;

    // 3. Validează că toate câmpurile sunt prezente
    if (
      !customerName ||
      !customerEmail ||
      !customerPhone ||
      !customerAddress ||
      !paymentMethod ||
      !items ||
      items.length === 0 ||
      totalPrice === undefined
    ) {
      return NextResponse.json(
        { error: "Toate câmpurile sunt obligatorii" },
        { status: 400 }
      );
    }

    // 4. Creează comanda în MongoDB
    const newOrder = await OrderModel.create({
      customerName,
      customerEmail,
      customerPhone,
      customerAddress,
      paymentMethod,
      items,
      totalPrice: Number(totalPrice),
      status: "pending",  // Comanda nouă este "pending"
      createdAt: new Date().toISOString(),
    });

    // 5. Formatează răspunsul (convertește _id în id)
    const formattedOrder = {
      id: newOrder._id.toString(),
      customerName: newOrder.customerName,
      customerEmail: newOrder.customerEmail,
      customerPhone: newOrder.customerPhone,
      customerAddress: newOrder.customerAddress,
      paymentMethod: newOrder.paymentMethod,
      items: newOrder.items,
      totalPrice: newOrder.totalPrice,
      status: newOrder.status,
      createdAt: newOrder.createdAt,
    };

    // 6. Returnează răspunsul cu succes
    return NextResponse.json(formattedOrder, { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}

// GET = când vrei să citești toate comenzile (pentru admin)
export async function GET() {
  try {
    await connectDB();
    const orders = await OrderModel.find({})
      .sort({ createdAt: -1 });  // Cele mai recente primele

    // Formatează răspunsul
    const formattedOrders = orders.map((order) => ({
      id: order._id.toString(),
      customerName: order.customerName,
      customerEmail: order.customerEmail,
      customerPhone: order.customerPhone,
      customerAddress: order.customerAddress,
      paymentMethod: order.paymentMethod,
      items: order.items,
      totalPrice: order.totalPrice,
      status: order.status,
      createdAt: order.createdAt,
    }));

    return NextResponse.json(formattedOrders, { status: 200 });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}