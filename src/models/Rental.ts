import mongoose, { Schema, Document, Model } from "mongoose";

// Define the structure of the cover items

interface RentalCover {
  path: string;
  publicId: string;
}

// Define the interface for the Rental document
interface RentalDocument extends Document {
  rentalId: string;
  rentalName: string;
  rentalSeasonPrice: string;
  rentalOffSeasonPrice: string;
  rentalType: string;
  rentalActiveStatus: boolean;
  rentalCover: RentalCover[];
}

// Create the schema based on the RentalDocument interface
const rentalSchema = new Schema<RentalDocument>(
  {
    rentalId: {
      type: String,
      required: true,
      unique: true,
    },
    rentalName: {
      type: String,
      required: true,
    },
    rentalSeasonPrice: {
      type: String,
      required: true,
    },
    rentalOffSeasonPrice: {
      type: String,
      required: true,
    },
    rentalActiveStatus: {
      type: Boolean,
      default: true,
      required: true,
    },
    rentalType: {
      type: String,
      required: true,
    },
    rentalCover: {
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

// Create the model based on the RentalDocument interface
const Rental: Model<RentalDocument> =
  mongoose.models.Rental ||
  mongoose.model<RentalDocument>("Rental", rentalSchema);

export default Rental;
