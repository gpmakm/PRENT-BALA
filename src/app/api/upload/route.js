import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import mongoose from "mongoose";
import { TypedEventEmitter } from "mongodb";

// Ensure MongoDB connection
if (!mongoose.connection.readyState) {
  mongoose.connect("mongodb://localhost:27017/Card_Templates", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error(`MongoDB Connection Error: ${err}`));
}

// Define schema and model
const templateSchema = new mongoose.Schema({
  display_pic: String,
  template: String,
  price: Number,
  cardType:String,
  description: String,
}, { timestamps: true });

const Templates = mongoose.models.Templates || mongoose.model("Templates", templateSchema);

// Handle File Upload API
export async function POST(req) {
  try {
    // Parse form data
    const formData = await req.formData();
    const displayPic = formData.get("file");
    const template = formData.get("template");
    const price = formData.get("price");
    const description = formData.get("description");
    const cardType = formData.get("cardType");


    if (!displayPic || !template || !price || !description) {
      return NextResponse.json({ message: "All fields are required!", status: 400 });
    }
//console.log({type:type});

    // Create upload directory if not exists
    const uploadDir = path.join(process.cwd(), "public/uploads");
    await fs.mkdir(uploadDir, { recursive: true });

    // Function to save file
    const saveFile = async (file) => {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const ext = path.extname(file.name);
      const filename = `${Date.now()}-${Math.random().toString(36).substring(7)}${ext}`;
      const filePath = path.join(uploadDir, filename);
      await fs.writeFile(filePath, buffer);

      return `/uploads/${filename}`;
    };

    // Save display picture & template file
    const displayPicPath = await saveFile(displayPic);
    const templatePath = await saveFile(template);

    // Store in MongoDB
    const newTemplate = new Templates({
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
