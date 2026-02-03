"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import type { Order } from "@/types/Order";

export default function AdminComenzi() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Funcția care încarcă comenzile
  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await fetch("/api/orders");

      if (!response.ok) {
        throw new Error("Eroare la încărcarea comenzilor");
      }

      const data = await response.json();
      setOrders(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Eroare necunoscută");
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  // Încarcă comenzile când se încarcă componenta
  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-black dark:text-zinc-50 mb-4">
            Comenzi
          </h1>
          <Link href="/" className="btn-back">
            ← Înapoi la Homepage
          </Link>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-12">
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Se încarcă comenzile...
            </p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 p-4 rounded-lg mb-4">
            {error}
          </div>
        )}

        {/* Lista de comenzi */}
        {!loading && !error && (
          <div className="space-y-4">
            {orders.length === 0 ? (
              <div className="bg-white dark:bg-zinc-900 p-8 rounded-lg text-center">
                <p className="text-lg text-zinc-600 dark:text-zinc-400">
                  Nu există comenzi încă
                </p>
              </div>
            ) : (
              orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200 dark:border-zinc-800"
                >
                  {/* Header comenzii */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-black dark:text-zinc-50 mb-2">
                        Comandă #{order.id.slice(-8)}
                      </h3>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        Data: {new Date(order.createdAt).toLocaleDateString("ro-RO")}
                      </p>
                    </div>
                    <div className="text-right">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          order.status === "pending"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                            : order.status === "confirmed"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                            : order.status === "shipped"
                            ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                            : order.status === "delivered"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>

                  {/* Date client */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">Nume:</p>
                      <p className="font-semibold text-black dark:text-zinc-50">
                        {order.customerName}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">Email:</p>
                      <p className="font-semibold text-black dark:text-zinc-50">
                        {order.customerEmail}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">Telefon:</p>
                      <p className="font-semibold text-black dark:text-zinc-50">
                        {order.customerPhone}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">Plată:</p>
                      <p className="font-semibold text-black dark:text-zinc-50">
                        {order.paymentMethod === "ramburs" ? "Ramburs" : "Card"}
                      </p>
                    </div>
                  </div>

                  {/* Adresă */}
                  <div className="mb-4">
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">Adresă:</p>
                    <p className="font-semibold text-black dark:text-zinc-50">
                      {order.customerAddress}
                    </p>
                  </div>

                  {/* Produse */}
                  <div className="mb-4">
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Produse:</p>
                    <div className="space-y-2">
                      {order.items.map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center bg-zinc-50 dark:bg-zinc-800 p-2 rounded"
                        >
                          <span className="text-black dark:text-zinc-50">
                            {item.product.name} x {item.quantity}
                          </span>
                          <span className="font-semibold text-black dark:text-zinc-50">
                            {(item.product.price * item.quantity).toFixed(2)} RON
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Total */}
                  <div className="border-t border-zinc-200 dark:border-zinc-800 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-black dark:text-zinc-50">
                        Total:
                      </span>
                      <span className="text-2xl font-bold text-black dark:text-zinc-50">
                        {order.totalPrice.toFixed(2)} RON
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}