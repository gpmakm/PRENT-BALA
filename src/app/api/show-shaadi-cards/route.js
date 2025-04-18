import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Templates from '../models/Schema'

// Ensure MongoDB connection
if (!mongoose.connection.readyState) {
  mongoose.connect("mongodb://localhost:27017/Card_Templates", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error(`MongoDB Connection Error: ${err}`));
}

export async function GET(req) {
  const searchParams = new URL(req.url).searchParams;
  const page = parseInt(searchParams.get("page") || "1");
  const limit = 10; // Pagination limit

  try {
    // Fetch only templates with cardType: "Shaadi-card"
    const templates = await Templates.find({ cardType: "Shaadi-card" })
      .skip((page - 1) * limit)
      .limit(limit);

    return NextResponse.json({ templates });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching Shaadi-card templates", error }, { status: 500 });
  }
}
