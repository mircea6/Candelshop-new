"use client";

import React, { useState } from "react";
import { useProducts } from "@/context/ProductsContext";
import type { Product } from "@/types/Product";
import Link from "next/link";

export default function AdminProduse() {
  const { addProduct } = useProducts();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nume, setNume] = useState("");
  const [formData, setFormData] = useState<Omit<Product, "id" | "createdAt">>({
    name: "",
    price: 0,
    currency: "RON",
    scent: "",
    wax: "soia",
    burnTimeHours: 0,
    sizeGrams: 0,
    inStock: true,
    image: "",
    description: "",
  });

  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [debugPrice, setDebugPrice] = useState(0);
  const [debugInStock, setDebugInStock] = useState(true);
  const [debugType, setDebugType] = useState<"soia" | "rapita" | "cocos">("soia");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    console.log(e);
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "number") {
      setFormData((prev) => ({ ...prev, [name]: Number(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Preview local
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload la Cloudinary
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      setFormData((prev) => ({ ...prev, image: data.url }));
      alert('Imagine încărcată cu succes!');
    } catch (error) {
      console.error('Upload error:', error);
      alert('Eroare la încărcarea imaginii');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Trimite doar datele (fără id și createdAt) - addProduct așteaptă Omit<Product, "id" | "createdAt">
      await addProduct(formData);

      // Reset form
      setFormData({
        name: "",
        price: 0,
        currency: "RON",
        scent: "",
        wax: "soia",
        burnTimeHours: 0,
        sizeGrams: 0,
        inStock: true,
        image: "",
        description: "",
      });
      setImagePreview("");

      // Închide modalul după succes
      setIsModalOpen(false);

      alert("Produs adăugat cu succes!");
    } catch (error) {
      console.error('Error:', error);
      alert("Eroare la adăugarea produsului");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-black dark:text-zinc-50 mb-4">
            Pagină de Încărcare Produse
          </h1>
          <Link
            href="/"
            className="text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-zinc-50"
          >
            ← Înapoi la Homepage
          </Link>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="mb-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          + Adaugă Produs Nou
        </button>


        <input type="text" id="nume" name="nume" value={nume} onChange={(e) => setNume(e.target.value)} />
        {nume}
        <input type="number" value={debugPrice} onChange={(e) => setDebugPrice(Number(e.target.value))} />
        <input type="checkbox" checked={debugInStock} onChange={(e) => setDebugInStock(e.target.checked)} />
        <select value={debugType} onChange={(e) => setDebugType(e.target.value as "soia" | "rapita" | "cocos")}>
          <option value="soia">Soia</option>
          <option value="rapita">Rapiță</option>
          <option value="cocos">Cocos</option>
        </select>


        {/* MODAL - Overlay și conținut */}
        {isModalOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <div
              className="bg-white dark:bg-zinc-900 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Buton închidere X */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                ✕
              </button>

              <h2 className="text-2xl font-bold text-black dark:text-zinc-50 mb-6">
                Adaugă Produs Nou
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nume produs */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-black dark:text-zinc-50 mb-2">
                    Nume Produs *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-zinc-50"
                  />
                </div>

                {/* Descriere */}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-black dark:text-zinc-50 mb-2">
                    Descriere *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-zinc-50"
                  />
                </div>

                {/* Preț și Monedă */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="price" className="block text-sm font-medium text-black dark:text-zinc-50 mb-2">
                      Preț (RON) *
                    </label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      required
                      min="0"
                      step="0.01"
                      className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-zinc-50"
                    />
                  </div>
                  <div>
                    <label htmlFor="currency" className="block text-sm font-medium text-black dark:text-zinc-50 mb-2">
                      Monedă
                    </label>
                    <input
                      type="text"
                      id="currency"
                      name="currency"
                      value={formData.currency}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-zinc-50"
                      readOnly
                    />
                  </div>
                </div>

                {/* Aroma și Tip ceară */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="scent" className="block text-sm font-medium text-black dark:text-zinc-50 mb-2">
                      Aroma *
                    </label>
                    <input
                      type="text"
                      id="scent"
                      name="scent"
                      value={formData.scent}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-zinc-50"
                    />
                  </div>
                  <div>
                    <label htmlFor="wax" className="block text-sm font-medium text-black dark:text-zinc-50 mb-2">
                      Tip Ceară *
                    </label>
                    <select
                      id="wax"
                      name="wax"
                      value={formData.wax}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-zinc-50"
                    >
                      <option value="soia">Soia</option>
                      <option value="rapita">Rapiță</option>
                      <option value="cocos">Cocos</option>
                    </select>
                  </div>
                </div>

                {/* Timp de ardere și Greutate */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="burnTimeHours" className="block text-sm font-medium text-black dark:text-zinc-50 mb-2">
                      Timp de Ardere (ore) *
                    </label>
                    <input
                      type="number"
                      id="burnTimeHours"
                      name="burnTimeHours"
                      value={formData.burnTimeHours}
                      onChange={handleChange}
                      required
                      min="0"
                      className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-zinc-50"
                    />
                  </div>
                  <div>
                    <label htmlFor="sizeGrams" className="block text-sm font-medium text-black dark:text-zinc-50 mb-2">
                      Greutate (g) *
                    </label>
                    <input
                      type="number"
                      id="sizeGrams"
                      name="sizeGrams"
                      value={formData.sizeGrams}
                      onChange={handleChange}
                      required
                      min="0"
                      className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-zinc-50"
                    />
                  </div>
                </div>

                {/* Imagine */}
                <div>
                  <label htmlFor="image" className="block text-sm font-medium text-black dark:text-zinc-50 mb-2">
                    Imagine Produs
                  </label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploading}
                    className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-zinc-50 disabled:opacity-50"
                  />
                  {uploading && (
                    <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                      Se încarcă imaginea...
                    </p>
                  )}
                  {imagePreview && (
                    <div className="mt-4">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded-lg border border-zinc-300 dark:border-zinc-700"
                      />
                    </div>
                  )}
                  {formData.image && (
                    <p className="mt-2 text-sm text-green-600 dark:text-green-400">
                      ✓ Imagine încărcată cu succes
                    </p>
                  )}
                </div>

                {/* În stoc */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="inStock"
                    name="inStock"
                    checked={formData.inStock}
                    onChange={handleChange}
                    className="w-4 h-4 text-black border-zinc-300 rounded focus:ring-black dark:focus:ring-zinc-50"
                  />
                  <label htmlFor="inStock" className="ml-2 text-sm font-medium text-black dark:text-zinc-50">
                    Produs în stoc
                  </label>
                </div>

                {/* Butoane Submit și Anulează */}
                <div className="flex gap-4 justify-end pt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-3 border border-zinc-300 dark:border-zinc-700 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                  >
                    Anulează
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Adaugă Produs
                  </button>
                </div>
              </form>

            </div>
          </div>
        )}
        <br /><br /><br /><br />
        nume:  {nume}  <br />
        pret:  {debugPrice}  <br />
        in stock: {debugInStock ? "Da" : "Nu"}  <br />
        tip ceara: {debugType}  <br />
      </main>
    </div>
  );
}
