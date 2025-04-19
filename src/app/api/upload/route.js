import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import mongoose from "mongoose";
import Template from "../models/Schema"; // ✅ This should export the MODEL, not just the schema

// MongoDB connection
if (!mongoose.connection.readyState) {
  mongoose.connect("mongodb://localhost:27017/Card_Templates", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error(`MongoDB Connection Error: ${err}`));
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    const displayPic = formData.get("file");
    const template = formData.get("template");
    const price = formData.get("price");
    const description = formData.get("description");
    const cardType = formData.get("cardtype");

    if (!displayPic || !template || !price || !description || !cardType) {
      return NextResponse.json({ message: "All fields are required!", status: 400 });
    }

    const uploadDir = path.join(process.cwd(), "public/uploads");
    await fs.mkdir(uploadDir, { recursive: true });

    const saveFile = async (file) => {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const ext = path.extname(file.name);
      const filename = `${Date.now()}-${Math.random().toString(36).substring(7)}${ext}`;
      const filePath = path.join(uploadDir, filename);
      await fs.writeFile(filePath, buffer);
      return `/uploads/${filename}`;
    };

    const displayPicPath = await saveFile(displayPic);
    const templatePath = await saveFile(template);

    const newTemplate = new Template({  // ✅ use the correct imported model
      display_pic: displayPicPath,
      template: templatePath,
      price: parseFloat(price),
      cardType,
      description,
    });

    await newTemplate.save();

    return NextResponse.json({ success: true, message: "Template uploaded successfully!" });
  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json({ message: "Upload failed", status: 500, error: error.message });
  }
}
