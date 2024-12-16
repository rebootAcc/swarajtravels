import mongoose, { Schema, Document, Model } from "mongoose";

interface LeadsDocument extends Document {
  leadId: string;
  leadName: string;
  leadPhoneNumber: string;
  leadEmail?: string;
  leadQuery: string;
  leadType: string;
  leadPackage?: string;
  leadMessage?: string;
  depertureDate?: Date;
  startPoint?: string;
  endPoint?: string;
  leadStatus: string; // "Pending", "Processing", "Completed", "Cancelled"
}

const leadSchema = new Schema<LeadsDocument>(
  {
    leadId: { type: String, required: true, unique: true },
    leadName: { type: String, required: true },
    leadPhoneNumber: { type: String, required: true },
    leadEmail: { type: String },
    leadType: { type: String, required: true },
    leadQuery: { type: String, required: true },
    leadPackage: { type: String },
    leadMessage: { type: String },
    depertureDate: { type: Date },
    startPoint: { type: String },
    endPoint: { type: String },
    leadStatus: { type: String, default: "Pending", required: true },
  },
  { timestamps: true }
);

const Lead: Model<LeadsDocument> =
  mongoose.models.Lead || mongoose.model<LeadsDocument>("Lead", leadSchema);

export default Lead;
