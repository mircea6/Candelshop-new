// IMPORTANT: Încarcă dotenv PRIMA DATĂ
import dotenv from 'dotenv';
import { resolve } from 'path';

const envPath = resolve(process.cwd(), '.env.local');
dotenv.config({ path: envPath });

import connectDB from '../src/lib/mongodb';
import ProductModel from '../src/models/Product';

async function attachImages() {
  try {
    await connectDB();
    console.log('Connected to MongoDB');

    // Obține toate produsele
    const products = await ProductModel.find({}).sort({ createdAt: -1 });
    console.log(`Found ${products.length} products`);

    // MAPEAZĂ AICI URL-URILE POZELOR LA PRODUSE
    // Format: { productName: 'url_imagine' }
    const imageMapping: Record<string, string> = {
      // Exemplu:
      'Lumanare Vanilie Cozy ': 'https://res.cloudinary.com/da2rqkhbv/image/upload/v1768911586/Sasha_kpgizc.jpg',
      'Lumanare Lemn de Santal': 'https://res.cloudinary.com/da2rqkhbv/image/upload/v1768911585/Miruna_hosysg.jpg',
      'Lumanare Citrus Fresh': 'https://res.cloudinary.com/da2rqkhbv/image/upload/v1768911585/Milan_k7tcg5.jpg',
      'Lumanare Lavanda Calm': 'https://res.cloudinary.com/da2rqkhbv/image/upload/v1768911586/Picioruse-roz_sarwmj.jpg',
      'Lumanare Scortisoara & Mar': 'https://res.cloudinary.com/da2rqkhbv/image/upload/v1768911585/Picioruse-albastre_d70bzv.jpg',
      // Adaugă aici URL-urile tale din Cloudinary
    };

    if (Object.keys(imageMapping).length === 0) {
      console.log('\n⚠️  Nu ai adăugat URL-uri în imageMapping!');
      console.log('\nPași pentru a obține URL-urile din Cloudinary:');
      console.log('1. Mergi la https://cloudinary.com/console');
      console.log('2. Click pe "Media Library"');
      console.log('3. Click pe fiecare imagine');
      console.log('4. Copiază "Secure URL" (URL-ul complet)');
      console.log('5. Adaugă-l în imageMapping de mai sus\n');
      process.exit(0);
    }

    // Actualizează produsele cu URL-urile
    let updated = 0;
    for (const product of products) {
      const imageUrl = imageMapping[product.name];
      
      if (imageUrl) {
        await ProductModel.findByIdAndUpdate(product._id, {
          image: imageUrl
        });
        console.log(`✓ Updated: ${product.name}`);
        updated++;
      } else {
        console.log(`⚠ Skipped: ${product.name} (no image mapping found)`);
      }
    }

    console.log(`\n✅ Updated ${updated} products with images!`);
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

attachImages();
