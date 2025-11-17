import { NextRequest, NextResponse } from 'next/server';

// In-memory image storage (persists for the session on Vercel)
const imageStore = new Map<string, Buffer>();

export async function POST(request: NextRequest) {
  try {
    const { imageData, filename } = await request.json();
    
    if (!imageData || !filename) {
      return NextResponse.json({ success: false, error: 'Missing imageData or filename' }, { status: 400 });
    }
    
    // Remove the data URL prefix
    const base64Data = imageData.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');
    
    // Store in memory
    imageStore.set(filename, buffer);
    
    console.log(`📸 [save-image] Stored ${filename} in memory (${buffer.length} bytes)`);
    
    return NextResponse.json({ success: true, filename, size: buffer.length });
  } catch (error) {
    console.error('💥 [save-image] Error storing image:', error);
    return NextResponse.json({ success: false, error: 'Failed to save image' }, { status: 500 });
  }
}
