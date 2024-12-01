import mongoose, { Schema, Document, Model } from "mongoose";

// Define the structure of the individual descriptions and cover items
interface PackageDescription {
  title: string;
  detail: string;
}

interface PackageCover {
  path: string;
  publicId: string;
}

interface PackageSeatDetails {
  path: string;
  publicId: string;
}

// Define the interface for the Package document
interface PackageDocument extends Document {
  packageId: string;
  packageName: string;
  packagePrice: string;
  packageDuration: number;
  packageIternary?: string;
  packageActiveStatus: boolean;
  packageSeatDetails?: PackageSeatDetails;
  packageCity?: string;
  packageDescriptions: PackageDescription[];
  packageCover: PackageCover[];
}

// Create the schema based on the PackageDocument interface
const packageSchema = new Schema<PackageDocument>(
  {
    packageId: {
      type: String,
      required: true,
      unique: true,
    },
    packageName: {
      type: String,
      required: true,
    },
    packagePrice: {
      type: String,
      required: true,
    },
    packageDuration: {
      type: Number,
      required: true,
    },
    packageIternary: {
      type: String,
    },
    packageActiveStatus: {
      type: Boolean,
      default: true,
      required: true,
    },
    packageSeatDetails: {
      type: {
        path: { type: String, required: true },
        publicId: { type: String, required: true },
      },

      required: true,
    },
    packageCity: {
      type: String,
      required: true,
    },
    packageDescriptions: {
      type: [
        {
          title: { type: String, required: true },
          detail: { type: String, required: true },
        },
      ],
      required: true,
    },
    packageCover: {
      type: [
        {
          path: { type: String, required: true },
          publicId: { type: String, required: true },
        },
      ],
      required: true,
    },
  },
  { timestamps: true }
);

// Create the model based on the PackageDocument interface
const Package: Model<PackageDocument> =
  mongoose.models.Package ||
  mongoose.model<PackageDocument>("Package", packageSchema);

export default Package;
