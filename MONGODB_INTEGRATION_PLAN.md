# Plan de Integrare MongoDB Atlas - Magazin Lumânări

## Context Proiect

### Tehnologii Actuale
- **Framework**: Next.js 16.1.3 (App Router)
- **React**: 19.2.3
- **TypeScript**: 5.x
- **Styling**: Tailwind CSS 4.x
- **State Management**: React Context API

### Structura Actuală

#### Tipuri de Date
```typescript
// src/types/Product.tsx
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
```

#### Context Actual
```typescript
// src/context/ProductsContext.tsx
"use client";

import React, { createContext, useContext, useMemo, useState } from "react";
import type { Product } from "@/types/Product.tsx";
import mockProducts from "@/data/products.json";

type ProductsContextValue = {
  products: Product[];
  addProduct: (product: Product) => void;
};

const ProductsContext = createContext<ProductsContextValue | null>(null);

export function ProductsProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(mockProducts as Product[]);

  function addProduct(product: Product) {
    setProducts((prev) => [product, ...prev]);
  }

  const value = useMemo(() => ({ products, addProduct }), [products]);

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
}

export function useProducts() {
  const ctx = useContext(ProductsContext);

  if (!ctx) {
    throw new Error("useProducts trebuie folosit în interiorul <ProductsProvider>.");
  }

  return ctx;
}
```


## Obiectiv Integrare MongoDB

### Scop
Integrare MongoDB Atlas pentru stocare persistentă a produselor, păstrând contextul React existent pentru UI. Datele vor fi sincronizate între MongoDB și context prin API routes Next.js.

### Abordare: Hybrid
- **Context React** rămâne pentru UI state management
- **MongoDB Atlas** pentru stocare persistentă
- **API Routes** pentru sincronizare între context și baza de date
- Datele se încarcă din MongoDB la mount
- Operațiile de scriere (create/update/delete) se fac prin API

## Plan de Implementare

### 1. Setup MongoDB Atlas

#### Pași:
1. Creare cont MongoDB Atlas (https://www.mongodb.com/cloud/atlas)
2. Creare cluster M0 Free (tier gratuit)
3. Configurare Database Access (creare user cu parolă)
4. Configurare Network Access (whitelist IP: `0.0.0.0/0` pentru development)
5. Obținere connection string din "Connect" → "Connect your application"


Cluster name : Candle-shop
Username : alexemircea6
Password : Fcsbesteaua12345(
mongodb+srv://alexemircea6:Fcsbesteaua12345(@candle-shop.ghoedgn.mongodb.net/?appName=Candle-shop


#### Connection String Format:
```
mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

### 2. Instalare Dependențe

```bash
npm install mongoose
npm install --save-dev @types/mongoose
```

### 3. Configurare Variabile de Mediu

Creare `.env.local`:
```
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/candlestoreshop?retryWrites=true&w=majority
```

**IMPORTANT**: Adăugare `.env.local` în `.gitignore`

### 4. Creare Conexiune MongoDB

**Fișier**: `src/lib/mongodb.ts`

```typescript
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;
```

### 5. Creare Model Product

**Fișier**: `src/models/Product.ts`

```typescript
import mongoose, { Schema, Document, Model } from 'mongoose';
import type { Product } from '@/types/Product';

export interface IProduct extends Omit<Product, 'id'>, Document {
  _id: string;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, 'Numele produsului este obligatoriu'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Prețul este obligatoriu'],
      min: [0, 'Prețul nu poate fi negativ'],
    },
    currency: {
      type: String,
      default: 'RON',
      enum: ['RON'],
    },
    scent: {
      type: String,
      required: [true, 'Aroma este obligatorie'],
      trim: true,
    },
    wax: {
      type: String,
      required: [true, 'Tipul de ceară este obligatoriu'],
      enum: ['soia', 'rapita', 'cocos'],
    },
    burnTimeHours: {
      type: Number,
      required: [true, 'Timpul de ardere este obligatoriu'],
      min: [0, 'Timpul de ardere nu poate fi negativ'],
    },
    sizeGrams: {
      type: Number,
      required: [true, 'Greutatea este obligatorie'],
      min: [0, 'Greutatea nu poate fi negativă'],
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    image: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Descrierea este obligatorie'],
      trim: true,
    },
    createdAt: {
      type: String,
      default: () => new Date().toISOString(),
    },
  },
  {
    timestamps: false, // Folosim createdAt manual
  }
);

const ProductModel: Model<IProduct> = 
  mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

export default ProductModel;
```

### 6. API Routes pentru CRUD

#### 6.1 GET /api/products - Obține toate produsele

**Fișier**: `src/app/api/products/route.ts`

```typescript
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import ProductModel from '@/models/Product';

export async function GET() {
  try {
    await connectDB();
    const products = await ProductModel.find({}).sort({ createdAt: -1 });
    
    // Convertim _id în id pentru compatibilitate cu tipul Product
    const formattedProducts = products.map((product) => ({
      id: product._id.toString(),
      name: product.name,
      price: product.price,
      currency: product.currency,
      scent: product.scent,
      wax: product.wax,
      burnTimeHours: product.burnTimeHours,
      sizeGrams: product.sizeGrams,
      inStock: product.inStock,
      image: product.image,
      description: product.description,
      createdAt: product.createdAt,
    }));

    return NextResponse.json(formattedProducts, { status: 200 });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
```

#### 6.2 POST /api/products - Adaugă produs nou

**Fișier**: `src/app/api/products/route.ts` (adăugare funcție POST)

```typescript
export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    
    const { name, price, currency, scent, wax, burnTimeHours, sizeGrams, inStock, image, description } = body;

    const newProduct = await ProductModel.create({
      name,
      price,
      currency: currency || 'RON',
      scent,
      wax,
      burnTimeHours,
      sizeGrams,
      inStock: inStock !== undefined ? inStock : true,
      image: image || '',
      description,
      createdAt: new Date().toISOString(),
    });

    const formattedProduct = {
      id: newProduct._id.toString(),
      name: newProduct.name,
      price: newProduct.price,
      currency: newProduct.currency,
      scent: newProduct.scent,
      wax: newProduct.wax,
      burnTimeHours: newProduct.burnTimeHours,
      sizeGrams: newProduct.sizeGrams,
      inStock: newProduct.inStock,
      image: newProduct.image,
      description: newProduct.description,
      createdAt: newProduct.createdAt,
    };

    return NextResponse.json(formattedProduct, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
```

#### 6.3 GET /api/products/[id] - Obține produs specific

**Fișier**: `src/app/api/products/[id]/route.ts`

```typescript
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import ProductModel from '@/models/Product';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const product = await ProductModel.findById(params.id);

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    const formattedProduct = {
      id: product._id.toString(),
      name: product.name,
      price: product.price,
      currency: product.currency,
      scent: product.scent,
      wax: product.wax,
      burnTimeHours: product.burnTimeHours,
      sizeGrams: product.sizeGrams,
      inStock: product.inStock,
      image: product.image,
      description: product.description,
      createdAt: product.createdAt,
    };

    return NextResponse.json(formattedProduct, { status: 200 });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}
```

#### 6.4 PUT /api/products/[id] - Actualizează produs

**Fișier**: `src/app/api/products/[id]/route.ts` (adăugare funcție PUT)

```typescript
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const body = await request.json();
    
    const product = await ProductModel.findByIdAndUpdate(
      params.id,
      body,
      { new: true, runValidators: true }
    );

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    const formattedProduct = {
      id: product._id.toString(),
      name: product.name,
      price: product.price,
      currency: product.currency,
      scent: product.scent,
      wax: product.wax,
      burnTimeHours: product.burnTimeHours,
      sizeGrams: product.sizeGrams,
      inStock: product.inStock,
      image: product.image,
      description: product.description,
      createdAt: product.createdAt,
    };

    return NextResponse.json(formattedProduct, { status: 200 });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}
```

#### 6.5 DELETE /api/products/[id] - Șterge produs

**Fișier**: `src/app/api/products/[id]/route.ts` (adăugare funcție DELETE)

```typescript
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const product = await ProductModel.findByIdAndDelete(params.id);

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Product deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}
```

### 7. Actualizare ProductsContext

**Fișier**: `src/context/ProductsContext.tsx`

```typescript
"use client";

import React, { createContext, useContext, useMemo, useState, useEffect } from "react";
import type { Product } from "@/types/Product";

type ProductsContextValue = {
  products: Product[];
  loading: boolean;
  error: string | null;
  addProduct: (product: Omit<Product, "id" | "createdAt">) => Promise<void>;
  refreshProducts: () => Promise<void>;
};

const ProductsContext = createContext<ProductsContextValue | null>(null);

export function ProductsProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/products');
      
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async (productData: Omit<Product, "id" | "createdAt">) => {
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error('Failed to add product');
      }

      const newProduct = await response.json();
      setProducts((prev) => [newProduct, ...prev]);
    } catch (err) {
      console.error('Error adding product:', err);
      throw err;
    }
  };

  const refreshProducts = async () => {
    await fetchProducts();
  };

  const value = useMemo(
    () => ({ products, loading, error, addProduct, refreshProducts }),
    [products, loading, error]
  );

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
}

export function useProducts() {
  const ctx = useContext(ProductsContext);

  if (!ctx) {
    throw new Error("useProducts trebuie folosit în interiorul <ProductsProvider>.");
  }

  return ctx;
}
```

### 8. Script Migrare Date Existente

**Fișier**: `scripts/migrate-products.ts`

```typescript
import connectDB from '../src/lib/mongodb';
import ProductModel from '../src/models/Product';
import productsData from '../src/data/products.json';

async function migrateProducts() {
  try {
    await connectDB();
    console.log('Connected to MongoDB');

    // Șterge produsele existente (opțional)
    // await ProductModel.deleteMany({});

    // Inserează produsele din JSON
    const products = productsData.map((product) => ({
      ...product,
      _id: undefined, // Lasă MongoDB să genereze _id
    }));

    const result = await ProductModel.insertMany(products);
    console.log(`Migrated ${result.length} products successfully`);
    
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrateProducts();
```

**Adăugare script în package.json**:
```json
{
  "scripts": {
    "migrate": "tsx scripts/migrate-products.ts"
  },
  "devDependencies": {
    "tsx": "^4.0.0"
  }
}
```

### 9. Actualizare Pagini Existente

#### 9.1 Homepage (`src/app/page.tsx`)
- Deja folosește `useProducts()` - va funcționa automat
- Poate adăuga handling pentru `loading` și `error` states

#### 9.2 Pagina Admin (`src/app/admin/produse/page.tsx`)
- Deja folosește `addProduct()` - va funcționa automat
- Trebuie actualizat pentru a trimite doar datele necesare (fără `id` și `createdAt`)

## Structura Finală Fișiere

```
src/
├── lib/
│   └── mongodb.ts              # Conexiune MongoDB
├── models/
│   └── Product.ts              # Schema Mongoose
├── context/
│   └── ProductsContext.tsx     # Context actualizat
├── app/
│   ├── api/
│   │   └── products/
│   │       ├── route.ts        # GET, POST
│   │       └── [id]/
│   │           └── route.ts    # GET, PUT, DELETE
│   └── ...
└── ...

scripts/
└── migrate-products.ts         # Script migrare

.env.local                      # Variabile de mediu
```

## Checklist Implementare

- [ ] Creare cont MongoDB Atlas
- [ ] Configurare cluster și obținere connection string
- [ ] Instalare dependențe (mongoose, @types/mongoose)
- [ ] Creare `.env.local` cu `MONGODB_URI`
- [ ] Creare `src/lib/mongodb.ts`
- [ ] Creare `src/models/Product.ts`
- [ ] Creare API route `GET /api/products`
- [ ] Creare API route `POST /api/products`
- [ ] Creare API route `GET /api/products/[id]`
- [ ] Creare API route `PUT /api/products/[id]`
- [ ] Creare API route `DELETE /api/products/[id]`
- [ ] Actualizare `ProductsContext` cu fetch și API calls
- [ ] Creare script migrare date
- [ ] Rulare migrare date
- [ ] Testare funcționalitate completă
- [ ] Actualizare pagină admin pentru noua structură

## Note Importante

1. **MongoDB Atlas** este cloud - nu necesită instalare locală
2. **Connection string** trebuie păstrat secret în `.env.local`
3. **Context React** rămâne pentru UI state management
4. **API Routes** sunt Server Components - rulează pe server
5. **Datele** se sincronizează la mount și după operații de scriere
6. **ID-ul** se generează automat de MongoDB ca `_id`, convertit în `id` pentru compatibilitate
7. **Migrarea** datelor existente se face o singură dată la început

## Beneficii

- ✅ Persistență datelor (nu se pierd la refresh)
- ✅ Scalabilitate (MongoDB Atlas cloud)
- ✅ Validare date (schema Mongoose)
- ✅ API RESTful pentru operații CRUD
- ✅ Păstrează arhitectura React Context existentă
- ✅ Ușor de extins cu funcționalități noi (căutare, filtrare, etc.)
