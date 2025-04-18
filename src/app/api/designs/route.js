import mongoose from "mongoose";
import { NextResponse } from "next/server";

// Define Schema
const templateSchema = new mongoose.Schema({
  display_pic: String,
  template: String,
  price: Number,
  salesCount: {
    type: Number,
    default: 0, // default to 0 sales
  },
  description: String,
}, { timestamps: true });

const Templates = mongoose.models.Templates || mongoose.model("Templates", templateSchema);

export async function GET(req) {
  try {
    await mongoose.connect("mongodb://localhost:27017/Card_Templates");

    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page")) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const templates = await Templates.find().skip(skip).limit(limit);

    return NextResponse.json({ templates });
  } catch (error) {
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
