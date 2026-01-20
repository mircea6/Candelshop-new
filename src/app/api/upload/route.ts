import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Configurează Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Convertește File în buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Convertește buffer în base64
    const base64 = buffer.toString('base64');
    const dataURI = `data:${file.type};base64,${base64}`;

    // Upload la Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        dataURI,
        {
          folder: 'candlestore', // Folder în Cloudinary
          resource_type: 'auto',
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
    });

    return NextResponse.json(
      { 
        url: (result as any).secure_url,
        publicId: (result as any).public_id 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    );
  }
}
