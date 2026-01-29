"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function Checkout() {
  const router = useRouter();
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const totalPrice = getTotalPrice();

  // State pentru formular
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    customerAddress: "",
    paymentMethod: "ramburs" as "ramburs" | "card",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Funcția care gestionează schimbările din formular
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Funcția care trimite comanda
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validare
    if (!formData.customerName || !formData.customerEmail || !formData.customerPhone || !formData.customerAddress) {
      setError("Toate câmpurile sunt obligatorii!");
      return;
    }

    if (cartItems.length === 0) {
      setError("Coșul este gol!");
      return;
    }

    setLoading(true);
    setError("");
  
    try {
      if (formData.paymentMethod === "card") {
        const res = await fetch("/api/stripe/checkout-session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            customerName: formData.customerName,
            customerEmail: formData.customerEmail,
            customerPhone: formData.customerPhone,
            customerAddress: formData.customerAddress,
            items: cartItems,
            totalPrice,
          }),
        });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || "Eroare la sesiunea de plată");
        }
        const { url } = await res.json();
        if (url) {
          window.location.href = url;
          return;
        }
        throw new Error("Nu s-a primit URL de plată");
      }

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          items: cartItems,
          totalPrice: totalPrice,
        }),
      });

      if (!response.ok) {
        throw new Error("Eroare la salvarea comenzii");
      }

      const order = await response.json();
      console.log("Comandă salvată:", order);
      clearCart();
      router.push("/?success=true");
    } catch (err) {
      console.error("Error:", err);
      setError("Eroare la finalizarea comenzii. Încearcă din nou.");
    } finally {
      setLoading(false);
    }
  };

  // Dacă coșul este gol, redirecționează
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-black p-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Coșul este gol</h1>
          <Link href="/" className="text-blue-600 hover:underline">
            Continuă cumpărăturile
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-black dark:text-zinc-50 mb-4">
            Finalizează Comanda
          </h1>
          <Link
            href="/cart"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            ← Înapoi la Coș
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formular */}
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200 dark:border-zinc-800">
            <h2 className="text-2xl font-bold mb-6 text-black dark:text-zinc-50">
              Date de Livrare
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Nume */}
              <div>
                <label className="block mb-2 text-sm font-medium text-black dark:text-zinc-50">
                  Nume complet *
                </label>
                <input
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block mb-2 text-sm font-medium text-black dark:text-zinc-50">
                  Email *
                </label>
                <input
                  type="email"
                  name="customerEmail"
                  value={formData.customerEmail}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Telefon */}
              <div>
                <label className="block mb-2 text-sm font-medium text-black dark:text-zinc-50">
                  Telefon *
                </label>
                <input
                  type="tel"
                  name="customerPhone"
                  value={formData.customerPhone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Adresă */}
              <div>
                <label className="block mb-2 text-sm font-medium text-black dark:text-zinc-50">
                  Adresă de livrare *
                </label>
                <textarea
                  name="customerAddress"
                  value={formData.customerAddress}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Metodă de plată */}
              <div>
                <label className="block mb-2 text-sm font-medium text-black dark:text-zinc-50">
                  Metodă de plată *
                </label>
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="ramburs">Ramburs (la livrare)</option>
                  <option value="card">Card bancar</option>
                </select>
              </div>

              {/* Mesaj de eroare */}
              {error && (
                <div className="p-3 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 rounded-lg">
                  {error}
                </div>
              )}

              {/* Buton submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-zinc-400 disabled:cursor-not-allowed transition-colors font-medium"
              >
                {loading ? "Se procesează..." : "Plătește Comanda"}
              </button>
            </form>
          </div>

          {/* Rezumat comandă */}
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200 dark:border-zinc-800">
            <h2 className="text-2xl font-bold mb-6 text-black dark:text-zinc-50">
              Rezumat Comandă
            </h2>

            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div
                  key={item.product.id}
                  className="flex justify-between items-center border-b border-zinc-200 dark:border-zinc-800 pb-4"
                >
                  <div>
                    <p className="font-semibold text-black dark:text-zinc-50">
                      {item.product.name}
                    </p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      Cantitate: {item.quantity}
                    </p>
                  </div>
                  <p className="font-bold text-black dark:text-zinc-50">
                    {(item.product.price * item.quantity).toFixed(2)} RON
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-zinc-200 dark:border-zinc-800 pt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-lg font-semibold text-black dark:text-zinc-50">
                  Total:
                </span>
                <span className="text-2xl font-bold text-black dark:text-zinc-50">
                  {totalPrice.toFixed(2)} RON
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
