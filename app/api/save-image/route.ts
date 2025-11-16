import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const { imageData, filename } = await request.json();
    
    // Remove the data URL prefix
    const base64Data = imageData.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');
    
    // Create the input directory if it doesn't exist
    const inputDir = path.join(process.cwd(), 'public', 'input');
    try {
      await mkdir(inputDir, { recursive: true });
    } catch (err) {
      // Directory might already exist
    }
    
    // Save the file
    const filePath = path.join(inputDir, filename);
    await writeFile(filePath, buffer);
    
    return NextResponse.json({ success: true, filename });
  } catch (error) {
    console.error('Error saving image:', error);
    return NextResponse.json({ success: false, error: 'Failed to save image' }, { status: 500 });
  }
}
