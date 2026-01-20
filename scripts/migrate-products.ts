// IMPORTANT: Încarcă dotenv PRIMA DATĂ, înainte de orice alt import
import dotenv from 'dotenv';
import { resolve } from 'path';

// Încarcă variabilele de mediu din .env.local
const envPath = resolve(process.cwd(), '.env.local');
dotenv.config({ path: envPath });

// Acum putem importa modulele care folosesc process.env
import connectDB from '../src/lib/mongodb';
import ProductModel from '../src/models/Product';
import productsData from '../src/data/products.json';

async function migrateProducts() {
  try {
    await connectDB();
    console.log('Connected to MongoDB');

    // Șterge produsele existente pentru a evita duplicate
    await ProductModel.deleteMany({});
    console.log('Cleared existing products');

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