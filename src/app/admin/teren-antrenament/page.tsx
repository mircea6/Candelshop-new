"use client";

import React, { useState } from "react";
import { useTraining } from "@/context/TrainingContext";
import type { TrainingItem } from "@/types/TrainingItem";
import Link from "next/link";

export default function TerenAntrenament() {
    // 1. Accesăm datele din context
    const { items, addItem } = useTraining();

    // 2. useState-uri pentru formular
    const [nume, setNume] = useState("");
    const [pret, setPret] = useState(0);
    const [esteDisponibil, setEsteDisponibil] = useState(true);
    const [tip, setTip] = useState<"tip1" | "tip2" | "tip3">("tip1");

    // 3. Funcția de submit
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        addItem({
            nume: nume,
            pret: pret,
            esteDisponibil: esteDisponibil,
            tip: tip,
        });

        // Reset formular
        setNume("");
        setPret(0);
        setEsteDisponibil(true);
        setTip("tip1");

        alert("Item adăugat cu succes!");
    };

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-black dark:text-zinc-50 mb-4">
                        Teren de Antrenament - useState & useContext
                    </h1>
                    <Link href="/" className="btn-back">
                        ← Înapoi la Homepage
                    </Link>
                </div>

                {/* Formular */}
                <form onSubmit={handleSubmit} className="bg-white dark:bg-zinc-900 p-6 rounded-lg mb-8">
                    <h2 className="text-2xl font-bold mb-4">Adaugă Item Nou</h2>

                    {/* Input Nume */}
                    <div className="mb-4">
                        <label className="block mb-2 text-black dark:text-zinc-50">Nume:</label>
                        <input
                            type="text"
                            value={nume}
                            onChange={(e) => setNume(e.target.value)}
                            className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-zinc-50"
                        />
                    </div>

                    {/* Input Preț */}
                    <div className="mb-4">
                        <label className="block mb-2 text-black dark:text-zinc-50">Preț:</label>
                        <input
                            type="number"
                            value={pret}
                            onChange={(e) => setPret(Number(e.target.value))}
                            className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-zinc-50"
                        />
                    </div>

                    {/* Checkbox Disponibil */}
                    <div className="mb-4">
                        <label className="flex items-center gap-2 text-black dark:text-zinc-50">
                            <input
                                type="checkbox"
                                checked={esteDisponibil}
                                onChange={(e) => setEsteDisponibil(e.target.checked)}
                                className="w-4 h-4"
                            />
                            Este disponibil?
                        </label>
                    </div>

                    {/* Select Tip */}
                    <div className="mb-4">
                        <label className="block mb-2 text-black dark:text-zinc-50">Tip:</label>
                        <select
                            value={tip}
                            onChange={(e) => setTip(e.target.value as "tip1" | "tip2" | "tip3")}
                            className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-zinc-50"
                        >
                            <option value="tip1">Tip 1</option>
                            <option value="tip2">Tip 2</option>
                            <option value="tip3">Tip 3</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Adaugă Item
                    </button>
                </form>

                {/* Lista de Item-uri */}
                <div>
                    <h2 className="text-2xl font-bold mb-4 text-black dark:text-zinc-50">
                        Lista Item-uri ({items.length})
                    </h2>
                    <div className="space-y-4">
                        {items.length === 0 ? (
                            <p className="text-zinc-600 dark:text-zinc-400">Nu există item-uri încă.</p>
                        ) : (
                            items.map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-white dark:bg-zinc-900 p-4 rounded-lg border border-zinc-200 dark:border-zinc-800"
                                >
                                    <h3 className="font-bold text-lg text-black dark:text-zinc-50">{item.nume}</h3>
                                    <p className="text-zinc-600 dark:text-zinc-400">Preț: {item.pret} RON</p>
                                    <p className="text-zinc-600 dark:text-zinc-400">
                                        Disponibil: {item.esteDisponibil ? "Da" : "Nu"}
                                    </p>
                                    <p className="text-zinc-600 dark:text-zinc-400">Tip: {item.tip}</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}