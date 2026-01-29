"use client";

import { useState } from "react";
import Link from "next/link";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-block mb-8 text-blue-600 hover:underline dark:text-blue-400">
          ← Înapoi la Homepage
        </Link>

        <h1 className="text-4xl font-bold text-black dark:text-zinc-50 mb-8">
          Contact
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Detalii firme */}
          <div>
            <h2 className="text-2xl font-semibold text-black dark:text-zinc-50 mb-4">
              Date de contact
            </h2>
            <div className="space-y-4 text-zinc-700 dark:text-zinc-300">
              <div>
                <p className="font-semibold text-black dark:text-zinc-50">Telefon:</p>
                <a href="tel:0767193920" className="hover:underline">0767 193 920</a>
              </div>
              <div>
                <p className="font-semibold text-black dark:text-zinc-50">Email:</p>
                <a href="mailto:contact@candlestory.ro" className="hover:underline">
                  contact@candlestory.ro
                </a>
              </div>
              <div>
                <p className="font-semibold text-black dark:text-zinc-50">Adresă:</p>
                <p>București, România</p>
              </div>
            </div>
          </div>

          {/* Formular */}
          <div>
            <h2 className="text-2xl font-semibold text-black dark:text-zinc-50 mb-4">
              Trimite un mesaj
            </h2>
            {submitted ? (
              <div className="p-4 bg-green-100 text-green-800 rounded-lg">
                Mulțumim! Mesajul tău a fost trimis.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-black dark:text-zinc-50">
                    Nume *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-zinc-50"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-black dark:text-zinc-50">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-zinc-50"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-black dark:text-zinc-50">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-zinc-50"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-black dark:text-zinc-50">
                    Mesaj *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-zinc-50"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Trimite mesaj
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}