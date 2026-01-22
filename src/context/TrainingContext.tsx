"use client";

import React, { createContext, useContext, useState } from "react";
import type { TrainingItem } from "@/types/TrainingItem";

// 1. Tipul contextului (ce oferă)
type TrainingContextValue = {
  items: TrainingItem[];
  addItem: (item: Omit<TrainingItem, "id" | "createdAt">) => void;
};

// 2. Crearea contextului (containerul gol)
const TrainingContext = createContext<TrainingContextValue | null>(null);

// 3. Provider-ul (furnizorul de date)
export function TrainingProvider({ children }: { children: React.ReactNode }) {
  // State pentru lista de item-uri
  const [items, setItems] = useState<TrainingItem[]>([]);

  // Funcția care adaugă un item nou
  const addItem = (itemData: Omit<TrainingItem, "id" | "createdAt">) => {
    const newItem: TrainingItem = {
      ...itemData,
      id: `item-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setItems((prev) => [...prev, newItem]);
  };

  // Returnează contextul cu datele
  return (
    <TrainingContext.Provider value={{ items, addItem }}>
      {children}
    </TrainingContext.Provider>
  );
}

// 4. Hook-ul personalizat (cum accesezi datele)
export function useTraining() {
  const ctx = useContext(TrainingContext);
  
  if (!ctx) {
    throw new Error("useTraining trebuie folosit în interiorul <TrainingProvider>");
  }
  
  return ctx;
}