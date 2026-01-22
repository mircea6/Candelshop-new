export type TrainingItem = {
    id: string;
    nume: string;
    pret: number;
    esteDisponibil: boolean;
    tip: "tip1" | "tip2" | "tip3";
    createdAt: string;
  };