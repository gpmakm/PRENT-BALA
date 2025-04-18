// src/app/api/download-design/route.js
import fs from 'fs';
import path from 'path';
import archiver from 'archiver';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const transactionId=request.body;
  if (transactionId.length===0 || transactionId.length<4) {
    return NextResponse.json({message:"Error in transaction id"})
  }
  else{
   
  try {
    const folderPath = path.join(process.cwd(),'VisitingCards');

    if (!fs.existsSync(folderPath)) {
      return new Response(JSON.stringify({ error: 'Folder not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const archive = archiver('zip', {
      zlib: { level: 9 }
    });

    const stream = new ReadableStream({
      start(controller) {
        archive.on('data', (data) => controller.enqueue(data));
        archive.on('end', () => controller.close());
        archive.on('error', (err) => controller.error(err));
        
        archive.directory(folderPath, false).finalize();
      }
    });

    return new Response(stream, {
      headers: {
        'Content-Disposition': 'attachment; filename=Templates.zip',
        'Content-Type': 'application/zip'
      }
    });
  } catch (err) {
    console.error('Error:', err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
}
