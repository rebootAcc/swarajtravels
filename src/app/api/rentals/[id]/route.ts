import { connectToDataBase } from "@/db/connection";
import Rental from "@/models/Rental";
import { deleteFile } from "@/utils/cloudinary";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const id = (await params).id; // Get the package ID from the route params
    const { updatedData } = await req.json(); // Get the request body (parsed as JSON)

    // Connect to the database
    await connectToDataBase();

    // Find the package by ID and update the specified fields
    const updatedRental = await Rental.findOneAndUpdate(
      {
        $or: [
          { rentalId: id },
          { _id: mongoose.Types.ObjectId.isValid(id) ? id : undefined },
        ],
      },
      {
        $set: {
          ...updatedData,
        },
      },
      { new: true } // Return the updated document
    );

    if (!updatedRental) {
      return NextResponse.json(
        { message: "Rental not found" },
        { status: 404 }
      );
    }

    // Return the updated rental details
    return NextResponse.json(updatedRental, { status: 200 });
  } catch (error: unknown) {
    console.error("Error Updating Rental:", error);
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: "An error occurred while updating the rental",
          error: error.message,
        },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        { message: "An unexpected error occurred" },
        { status: 500 }
      );
    }
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const id = (await params).id; // Get the package ID from the route params

    // Connect to the database
    await connectToDataBase();

    // Find the package to delete
    const rentalToDelete = await Rental.findOne({
      $or: [
        { rentalId: id },
        { _id: mongoose.Types.ObjectId.isValid(id) ? id : undefined },
      ],
    });

    if (!rentalToDelete) {
      return NextResponse.json(
        { message: "Package not found" },
        { status: 404 }
      );
    }

    // If the package has associated packageCover files, delete them from Cloudinary
    if (rentalToDelete.rentalCover && rentalToDelete.rentalCover.length > 0) {
      // Loop through each file in the packageCover array and delete them from Cloudinary
      for (const file of rentalToDelete.rentalCover) {
        const { publicId }: { publicId: string } = file;
        const result: any = await deleteFile(publicId); // Call deleteFile utility
        if (result.error) {
          console.error(
            "Error deleting file from Cloudinary:",
            result.error.message
          );
          return NextResponse.json(
            { message: "Failed delete from Cloudinary" },
            { status: 500 }
          );
        }
      }
    }
    await Rental.deleteOne({ id: rentalToDelete._id });
    // Return success message
    return NextResponse.json(
      { message: "Rental and associated files deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting package:", error);
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: "An error occurred while deleting the rental",
          error: error.message,
        },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        { message: "An unexpected error occurred" },
        { status: 500 }
      );
    }
  }
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const id = (await params).id; // Get the rentalToDelete ID from the route params
    await connectToDataBase();
    const requestedRental = await Rental.findOne({
      $or: [
        { rentalId: id },
        { _id: mongoose.Types.ObjectId.isValid(id) ? id : undefined },
      ],
    });

    if (!requestedRental) {
      return NextResponse.json(
        { message: "Rental not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ ...requestedRental }, { status: 200 });
  } catch (error) {
    console.error("Error Get Rental:", error);
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: "An error occurred while get the Rental",
          error: error.message,
        },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        { message: "An unexpected error occurred" },
        { status: 500 }
      );
    }
  }
}
