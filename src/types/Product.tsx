export type Product = {
    id: string;
    name: string;
    price: number;
    currency: "RON";
    scent: string;
    wax: "soia" | "rapita" | "cocos" | string;
    burnTimeHours: number;
    sizeGrams: number;
    inStock: boolean;
    image: string;
    description: string;
    createdAt: string;
  };
  