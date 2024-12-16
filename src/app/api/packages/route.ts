import { connectToDataBase } from "@/db/connection";
import Package from "@/models/Package";
import { uploadFile, UploadFileResult } from "@/utils/cloudinary";
import { generateCustomId } from "@/utils/generateCustomId";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    await connectToDataBase();

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
    const propulerPackage = body.get("propulerPackage") === "true";

    // Validate required fields
    if (
      !packageName ||
      !packagePrice ||
      !packageDuration ||
      !packageDescriptions ||
      !packageCity ||
      !packageCover.length
    ) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Generate packageId using generateCustomId()
    const packageId = await generateCustomId(Package, "packageId", "packageId");

    // Upload the cover images and collect the result
    const uploadedCovers = [];
    for (const cover of packageCover) {
      if (cover instanceof File) {
        const fileBuffer = await cover.arrayBuffer();

        const mimeType = cover.type;
        const encoding = "base64";
        const base64Data = Buffer.from(fileBuffer).toString("base64");

        // this will be used to upload the file
        const fileUri = "data:" + mimeType + ";" + encoding + "," + base64Data;

        const result: UploadFileResult | any = await uploadFile(fileUri); // Pass the file and its MIME type to uploadFile
        if (result.public_id) {
          uploadedCovers.push({
            path: result.secure_url,
            publicId: result.public_id,
          });
        }
      }
    }

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

    // Create a new package document
    const newPackage = new Package({
      packageId,
      packageName,
      packagePrice,
      packageDuration,
      packageIternary,
      packageSeatDetails: uploadedPackageSeatDetails,
      packageCity,
      packageActiveStatus: true,
      propulerPackage,
      packageDescriptions,
      packageCover: uploadedCovers,
    });

    // Save the package to the database
    const savedPackage = await newPackage.save();

    // Return the created package as the response
    return NextResponse.json(savedPackage, { status: 201 });
  } catch (error: unknown) {
    // Error handling
    console.error("Error creating package:", error);
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: "An error occurred while creating the package",
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

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    await connectToDataBase();

    const url = new URL(request.url);
    const packagePrice = url.searchParams.get("packagePrice");
    const packageActiveStatus = url.searchParams.get("packageActiveStatus");
    const packageCity = url.searchParams.get("packageCity");
    const propulerPackage = url.searchParams.get("propulerPackage");
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const limit = parseInt(url.searchParams.get("limit") || "10", 10);

    // Initialize filters object
    const filters: any = {};

    // Add filters based on the query parameters
    if (packagePrice) {
      filters.packagePrice = packagePrice;
    }

    if (packageActiveStatus) {
      // Ensure packageActiveStatus is a boolean value
      filters.packageActiveStatus = packageActiveStatus === "true";
    }

    if (packageCity) {
      filters.packageCity = { $regex: packageCity, $options: "i" }; // Case-insensitive search
    }

    if (propulerPackage !== null) {
      filters.propulerPackage = propulerPackage === "true";
    }

    // Set up pagination
    const skip = (page - 1) * limit;

    // Query the database with the filters and pagination
    const packages = await Package.find(filters).skip(skip).limit(limit).exec();

    // Get the total count of packages for pagination metadata
    const totalPackages = await Package.countDocuments(filters);

    // Calculate the total number of pages
    const totalPages = Math.ceil(totalPackages / limit);

    // Return the paginated result
    return NextResponse.json(
      {
        packages,
        pagination: {
          currentPage: page,
          totalPages,
          totalPackages,
          pageSize: limit,
        },
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Error creating package:", error);
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: "An error occurred while getting packages",
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
