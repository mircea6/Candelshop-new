import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import ProductModel from '@/models/Product';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const product = await ProductModel.findById(id);

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

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();
    
    const product = await ProductModel.findByIdAndUpdate(
      id,
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const product = await ProductModel.findByIdAndDelete(id);

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
