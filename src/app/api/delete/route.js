import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Template from "../models/Schema";

// ✅ Singleton MongoDB Connection
if (!mongoose.connection.readyState) {
  mongoose.connect("mongodb://localhost:27017/Card_Templates", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.error("❌ MongoDB Connection Error:", err));
}


//import { NextResponse } from "next/server";
//import mongoose from "mongoose";
//import Template from "@/models/Template"; // ✅ Adjust this if needed

// ⛓️ Connect to DB
if (!mongoose.connection.readyState) {
  await mongoose.connect("mongodb://localhost:27017/Card_Templates");
}

// ✅ DELETE method
export async function DELETE(req) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ message: "Template ID is required." }, { status: 400 });
    }

    const deleted = await Template.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ message: "Template not found." }, { status: 404 });
    }

    return NextResponse.json({ message: "Template deleted successfully." });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
