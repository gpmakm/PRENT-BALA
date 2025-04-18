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

export async function POST(req) {
  try {
    // ✅ Ensure we get JSON input properly
    const { templateId, transactionId } = await req.json();

    // ✅ Validate Inputs
    if (!templateId) {
      return NextResponse.json({ error: "Template ID is required" }, { status: 400 });
    }

    if (!transactionId || transactionId.length < 12 || transactionId.length > 20) {
      return NextResponse.json({ message: "Invalid Transaction ID" }, { status: 400 });
    }

    // ✅ Find the template and update sales count
    const template = await Template.findByIdAndUpdate(
      templateId,
      { $inc: { salesCount: 1 } },
      { new: true }
    );

    if (!template) {
      return NextResponse.json({ error: "Template not found" }, { status: 404 });
    }

    return NextResponse.json({ downloadUrl: template.template }, { status: 200 });

  } catch (error) {
    console.error("❌ Server error:", error);
    return NextResponse.json({ error: "Server error", details: error.message }, { status: 500 });
  }
}
