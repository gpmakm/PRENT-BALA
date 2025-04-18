import fs from 'fs';
import { NextResponse } from 'next/server';

export async function POST(request) {
  let data = await request.formData();
  const file = data.get('file');
  if (!file) {
    return NextResponse.json({ status: 'No file uploaded', status: 400 });
  }
  const fileBuffer = await file.arrayBuffer();
  const fileBufferString = Buffer.from(fileBuffer);
  const path = `./Templates/${file.name}`;

  // Using a callback for writeFile
  await new Promise((resolve, reject) => {
    fs.writeFile(path, fileBufferString, (err) => {
      if (err) {
        reject(NextResponse.json({ message: 'Error uploading file', status: 500 }));
      } else {
        resolve(NextResponse.json({ message: 'File uploaded', status: 200 }));
      }
    });
  });

  // Return success response if no error
  return NextResponse.json({ message: 'File uploaded', status: 200 });
}
