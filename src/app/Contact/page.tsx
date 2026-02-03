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
    <div className="min-h-screen bg-[#F6F4F1] py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="btn-back mb-8">
          ← Înapoi la Homepage
        </Link>

        <h1 className="text-4xl font-bold text-zinc-900 mb-8">
          Contact
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Detalii firme */}
          <div>
            <h2 className="text-2xl font-semibold text-zinc-900 mb-4">
              Date de contact
            </h2>
            <div className="space-y-4 text-zinc-700">
              <div>
                <p className="font-semibold text-zinc-900">Telefon:</p>
                <a href="tel:0767193920" className="hover:underline">0767 193 920</a>
              </div>
              <div>
                <p className="font-semibold text-zinc-900">Email:</p>
                <a href="mailto:contact@candlestory.ro" className="hover:underline">
                  contact@candlestory.ro
                </a>
              </div>
              <div>
                <p className="font-semibold text-zinc-900">Adresă:</p>
                <p>București, România</p>
              </div>
            </div>
          </div>

          {/* Formular */}
          <div>
            <h2 className="text-2xl font-semibold text-zinc-900 mb-4">
              Trimite un mesaj
            </h2>
            {submitted ? (
              <div className="p-4 bg-green-100 text-green-800 rounded-lg">
                Mulțumim! Mesajul tău a fost trimis.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-zinc-900">
                    Nume *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-zinc-300 rounded-lg bg-white text-zinc-900"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-zinc-900">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-zinc-300 rounded-lg bg-white text-zinc-900"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-zinc-900">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-zinc-300 rounded-lg bg-white text-zinc-900"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-zinc-900">
                    Mesaj *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 border border-zinc-300 rounded-lg bg-white text-zinc-900"
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