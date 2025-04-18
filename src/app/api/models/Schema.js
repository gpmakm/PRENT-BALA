import mongoose from "mongoose";

const TemplateSchema = new mongoose.Schema(
  {
    display_pic: { type: String, required: true },
    template: { type: String, required: true },
    price: { type: Number, required: true },
    cardType: {type:String,required:true},
    description: { type: String, required: true },
    salesCount: { type: Number, default: 0 }, // ✅ New field to track sales
  },
  { timestamps: true }
);

export default mongoose.models.Template || mongoose.model("Template", TemplateSchema);
