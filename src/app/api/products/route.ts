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
    const detail = error instanceof Error ? error.message : 'Eroare necunoscută';
    return NextResponse.json(
      {
        error: 'Failed to fetch products',
        ...(process.env.NODE_ENV === 'development' && { detail }),
      },
      { status: 500 }
    );
  }
}
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