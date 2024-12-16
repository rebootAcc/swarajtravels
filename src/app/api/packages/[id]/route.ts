import { NextRequest, NextResponse } from "next/server";
import Package from "@/models/Package"; // Update the import path as needed
import { connectToDataBase } from "@/db/connection"; // Your DB connection helper function
import { deleteFile, uploadFile, UploadFileResult } from "@/utils/cloudinary";
import mongoose from "mongoose";

// The update function
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    await connectToDataBase();

    const { id } = await params; // Get the package ID from the URL params
    const body = await request.formData(); // Parse FormData

    // Extract non-file fields
    const packageName = body.get("packageName")?.toString();
    const packagePrice = body.get("packagePrice")?.toString();
    const packageDuration = body.get("packageDuration")?.toString();
    const packageIternary = body.get("packageIternary")?.toString();
    const packageSeatDetails = body.get("packageSeatDetails");
    const packageCity = body.get("packageCity")?.toString();
    const packageDescriptions = JSON.parse(
      body.getAll("packageDescriptions")?.toString() || "[]"
    );
    const packageCover = body.getAll("packageCover");
    const propulerPackage = body.get("propulerPackage")?.toString();

    // Validate required fields
    if (
      !packageName ||
      !packagePrice ||
      !packageDuration ||
      !packageDescriptions ||
      !packageCity
    ) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Fetch the existing package by packageId (not _id)
    const existingPackage = await Package.findOne({ packageId: id });
    if (!existingPackage) {
      return NextResponse.json(
        { message: "Package not found" },
        { status: 404 }
      );
    }

    // Prepare the updated package data
    const updatedPackageData: any = {};

    // Update the non-file fields if provided
    if (packageName) updatedPackageData.packageName = packageName;
    if (packagePrice) updatedPackageData.packagePrice = packagePrice;
    if (packageDuration) updatedPackageData.packageDuration = packageDuration;
    if (packageIternary) updatedPackageData.packageIternary = packageIternary;
    if (packageCity) updatedPackageData.packageCity = packageCity;
    if (packageDescriptions)
      updatedPackageData.packageDescriptions = packageDescriptions;

    if (propulerPackage !== undefined) {
      const currentPopularPackageValue = existingPackage.propulerPackage;
      updatedPackageData.propulerPackage = currentPopularPackageValue
        ? false
        : true;
    }

    // Handle packageCover updates (file upload)
    const uploadedCovers = [];
    for (const cover of packageCover) {
      if (cover instanceof File) {
        const fileBuffer = await cover.arrayBuffer();
        const mimeType = cover.type;
        const encoding = "base64";
        const base64Data = Buffer.from(fileBuffer).toString("base64");

        const fileUri = "data:" + mimeType + ";" + encoding + "," + base64Data;
        const result: UploadFileResult | any = await uploadFile(fileUri);

        if (result.public_id) {
          uploadedCovers.push({
            path: result.secure_url,
            publicId: result.public_id,
          });
        }
      }
    }
    if (uploadedCovers.length > 0) {
      updatedPackageData.packageCover = uploadedCovers;
    }

    // Handle packageSeatDetails update (file upload)
    let uploadedPackageSeatDetails = null;
    if (packageSeatDetails instanceof File) {
      const fileBuffer = await packageSeatDetails.arrayBuffer();
      const mimeType = packageSeatDetails.type;
      const encoding = "base64";
      const base64Data = Buffer.from(fileBuffer).toString("base64");

      const fileUri = "data:" + mimeType + ";" + encoding + "," + base64Data;
      const result: UploadFileResult | any = await uploadFile(fileUri);

      if (result.public_id) {
        uploadedPackageSeatDetails = {
          path: result.secure_url,
          publicId: result.public_id,
        };
      }
    }
    if (uploadedPackageSeatDetails) {
      updatedPackageData.packageSeatDetails = uploadedPackageSeatDetails;
    }

    // Update the existing package with the new data
    const updatedPackage = await Package.findOneAndUpdate(
      { packageId: id }, // Update by packageId, not _id
      { $set: updatedPackageData },
      { new: true } // Return the updated document
    );

    // Return the updated package
    return NextResponse.json(updatedPackage, { status: 200 });
  } catch (error: unknown) {
    console.error("Error updating package:", error);
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: "An error occurred while updating the package",
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
