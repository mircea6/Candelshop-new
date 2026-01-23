import mongoose, { Schema, Document, Model } from "mongoose";
import type { Order } from "@/types/Order";

// Interfața pentru documentul MongoDB
export interface IOrder extends Omit<Order, "id">, Document {
  // _id este deja definit în Document ca ObjectId
}

// Schema = structura tabelului/colecției
const OrderSchema = new Schema<IOrder>(
  {
    customerName: {
      type: String,
      required: [true, "Numele clientului este obligatoriu"],
      trim: true,
    },
    customerEmail: {
      type: String,
      required: [true, "Email-ul clientului este obligatoriu"],
      trim: true,
      lowercase: true,  // Convertește email-ul la lowercase
    },
    customerPhone: {
      type: String,
      required: [true, "Telefonul clientului este obligatoriu"],
      trim: true,
    },
    customerAddress: {
      type: String,
      required: [true, "Adresa este obligatorie"],
      trim: true,
    },
    paymentMethod: {
      type: String,
      required: [true, "Metoda de plată este obligatorie"],
      enum: ["ramburs", "card"],  // Doar aceste 2 opțiuni
    },
    items: {
      type: [
        {
          product: {
            id: String,
            name: String,
            price: Number,
            currency: String,
            scent: String,
            wax: String,
            burnTimeHours: Number,
            sizeGrams: Number,
            inStock: Boolean,
            image: String,
            description: String,
            createdAt: String,
          },
          quantity: Number,
        },
      ],
      required: [true, "Produsele sunt obligatorii"],
    },
    totalPrice: {
      type: Number,
      required: [true, "Totalul este obligatoriu"],
      min: [0, "Totalul nu poate fi negativ"],
    },
    status: {
      type: String,
      default: "pending",  // Implicit, comanda este "pending"
      enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
    },
    createdAt: {
      type: String,
      default: () => new Date().toISOString(),
    },
  },
  {
    timestamps: false,  // Folosim createdAt manual
  }
);

// Modelul = cum accesezi colecția "orders" în MongoDB
const OrderModel: Model<IOrder> =
  mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);

export default OrderModel;