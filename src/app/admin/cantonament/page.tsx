
"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function Cantonamen() {
  // useState pentru fiecare câmp din formular
  const [numeJucator, setNumeJucator] = useState("");
  const [echipa, setEchipa] = useState("");
  const [accidentat, setAccidentat] = useState(false);
  const [varsta, setVarsta] = useState<number | "">("");
  
  // State pentru loading și mesaje
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Funcția care se execută când dai submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Oprește refresh-ul paginii

    // Validare simplă
    if (!numeJucator || !echipa || varsta === "") {
      setMessage("Toate câmpurile sunt obligatorii!");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      // Trimite datele către API
      const response = await fetch("/api/jucatori", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          numeJucator,
          echipa,
          accidentat,
          varsta: Number(varsta),
        }),
      });

      // Verifică dacă a reușit
      if (!response.ok) {
        throw new Error("Eroare la salvare");
      }

      // Citește răspunsul
      const data = await response.json();
      console.log("Jucător salvat:", data);

      // Reset formular
      setNumeJucator("");
      setEchipa("");
      setAccidentat(false);
      setVarsta("");

      setMessage("Jucător salvat cu succes! ✅");
    } catch (error) {
      console.error("Error:", error);
      setMessage("Eroare la salvare. Încearcă din nou.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-black dark:text-zinc-50 mb-4">
            Adaugă Jucător - Cantonament
          </h1>
          <Link href="/" className="btn-back">
            ← Înapoi la Homepage
          </Link>
        </div>

        {/* Formular */}
        <form 
          onSubmit={handleSubmit} 
          className="bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-lg space-y-6"
        >
          {/* Nume Jucător */}
          <div>
            <label 
              htmlFor="numeJucator" 
              className="block mb-2 text-sm font-medium text-black dark:text-zinc-50"
            >
              Nume Jucător *
            </label>
            <input
              type="text"
              id="numeJucator"
              value={numeJucator}
              onChange={(e) => setNumeJucator(e.target.value)}
              className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ex: Ion Popescu"
              required
            />
          </div>

          {/* Echipa */}
          <div>
            <label 
              htmlFor="echipa" 
              className="block mb-2 text-sm font-medium text-black dark:text-zinc-50"
            >
              Echipa *
            </label>
            <input
              type="text"
              id="echipa"
              value={echipa}
              onChange={(e) => setEchipa(e.target.value)}
              className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ex: Steaua București"
              required
            />
          </div>

          {/* Accidentat */}
          <div>
            <label className="flex items-center gap-2 text-black dark:text-zinc-50">
              <input
                type="checkbox"
                checked={accidentat}
                onChange={(e) => setAccidentat(e.target.checked)}
                className="w-4 h-4 text-blue-600 border-zinc-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm font-medium">Accidentat</span>
            </label>
          </div>

          {/* Vârstă */}
          <div>
            <label 
              htmlFor="varsta" 
              className="block mb-2 text-sm font-medium text-black dark:text-zinc-50"
            >
              Vârstă *
            </label>
            <input
              type="number"
              id="varsta"
              value={varsta}
              onChange={(e) => setVarsta(e.target.value === "" ? "" : Number(e.target.value))}
              className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ex: 25"
              min="0"
              max="150"
              required
            />
          </div>

          {/* Mesaj de feedback */}
          {message && (
            <div 
              className={`p-3 rounded-lg ${
                message.includes("succes") 
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" 
                  : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
              }`}
            >
              {message}
            </div>
          )}

          {/* Buton Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-zinc-400 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {loading ? "Se salvează..." : "Salvează Jucător"}
          </button>
        </form>
      </div>
    </div>
  );
}