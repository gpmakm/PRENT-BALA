import mongoose from "mongoose";
import { NextResponse } from "next/server";

// MongoDB Model for Payments
// const PaymentSchema = new mongoose.Schema({
//   email: String,
//   transactionId: String,
//   templateId: String,
//   createdAt: { type: Date, default: Date.now },
// });
// const Payment = mongoose.models.Payment || mongoose.model("Payment", PaymentSchema);

// Connect to MongoDB
// const connectDB = async () => {
//   if (mongoose.connection.readyState === 0) {
//     await mongoose.connect("mongodb://localhost:27017/Card_Templates", {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//   }
// };

// API to handle payments
export async function POST(req) {
  try {
    //await connectDB();
    const { transactionId } = await req.json();

    // Save payment details to MongoDB
    // const newPayment = new Payment({ email, transactionId, templateId });
    // await newPayment.save();

    return NextResponse.json({ success: true, message: "Payment submitted successfully!" });
  } catch (error) {
    console.error("Payment API Error:", error);
    return NextResponse.json({ success: false, error: "Payment submission failed" }, { status: 500 });
  }
}
