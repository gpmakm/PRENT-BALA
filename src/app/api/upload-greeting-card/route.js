import fs from "fs"
import { NextResponse } from "next/server";

export async function POST(request) {
    const data=await request.formData();
    const file=data.get('file');

    if (!file) {
        return NextResponse.json({message:"No file uploaded",status:400});
    }

    const fileBuffer=await file.arrayBuffer();
    const fileBufferString=Buffer.from(fileBuffer);
    const path=`./GreetingCards/${file.name}`;

    await new Promise((resolve, reject) => {
        fs.writeFile(path,fileBufferString,(err)=>{
            if (err) {
                reject(NextResponse.json({message:"File not uploaded",status:500}));
            } else {
                resolve(NextResponse.json({message:"File uploaded",status:200}))
            }
        });
    })
    return NextResponse.json({message:"File uploaded",status:200});
}