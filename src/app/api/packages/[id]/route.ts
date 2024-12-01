import { NextRequest, NextResponse } from "next/server";
import Package from "@/models/Package"; // Update the import path as needed
import { connectToDataBase } from "@/db/connection"; // Your DB connection helper function
import { deleteFile } from "@/utils/cloudinary";
import mongoose from "mongoose";

// The update function
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
    const updatedPackage = await Package.findOneAndUpdate(
      {
        $or: [
          { packageId: id },
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

    if (!updatedPackage) {
      return NextResponse.json(
        { message: "Package not found" },
        { status: 404 }
      );
    }

    // Return the updated package details
    return NextResponse.json(updatedPackage, { status: 200 });
  } catch (error: unknown) {
    console.error("Error deleting user:", error);
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: "An error occurred while deleting the user",
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
    const packageToDelete = await Package.findOne({
      $or: [
        { packageId: id },
        { _id: mongoose.Types.ObjectId.isValid(id) ? id : undefined },
      ],
    });

    if (!packageToDelete) {
      return NextResponse.json(
        { message: "Package not found" },
        { status: 404 }
      );
    }

    // If the package has associated packageCover files, delete them from Cloudinary
    if (
      packageToDelete.packageCover &&
      packageToDelete.packageCover.length > 0
    ) {
      // Loop through each file in the packageCover array and delete them from Cloudinary
      for (const file of packageToDelete.packageCover) {
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

    if (packageToDelete.packageSeatDetails) {
      // Loop through each file in the packageCover array and delete them from Cloudinary
      const { publicId }: { publicId: string } =
        packageToDelete.packageSeatDetails;
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
    await Package.deleteOne({ id: packageToDelete._id });
    // Return success message
    return NextResponse.json(
      { message: "Package and associated files deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting package:", error);
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: "An error occurred while deleting the package",
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
    const id = (await params).id; // Get the package ID from the route params
    await connectToDataBase();
    const requestedPackage = await Package.findOne({
      $or: [
        { packageId: id },
        { _id: mongoose.Types.ObjectId.isValid(id) ? id : undefined },
      ],
    });

    if (!requestedPackage) {
      return NextResponse.json(
        { message: "Package not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ ...requestedPackage }, { status: 200 });
  } catch (error) {
    console.error("Error Get package:", error);
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: "An error occurred while get the package",
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
