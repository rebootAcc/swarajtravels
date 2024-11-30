import { connectToDataBase } from "@/db/connection";
import Rental from "@/models/Rental";
import { uploadFile, UploadFileResult } from "@/utils/cloudinary";
import { generateCustomId } from "@/utils/generateCustomId";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    await connectToDataBase();
    const body = await request.formData(); // Parse FormData

    // Extract non-file fields
    const rentalName = body.get("rentalName")?.toString();
    const rentalSeasonPrice = body.get("rentalSeasonPrice")?.toString();
    const rentalOffSeasonPrice = body.get("rentalOffSeasonPrice")?.toString();
    const rentalType = body.get("rentalType")?.toString();
    const rentalCover = body.getAll("rentalCover"); // Get all files for rentalCover

    // Validate required fields
    if (
      !rentalName ||
      !rentalSeasonPrice ||
      !rentalType ||
      !rentalOffSeasonPrice ||
      !rentalCover.length
    ) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Generate packageId using generateCustomId()
    const rentalId = await generateCustomId(Rental, "rentalId", "rentalId");

    // Upload the cover images and collect the result
    const uploadedCovers = [];
    for (const cover of rentalCover) {
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

    // Create a new package document
    const newRental = new Rental({
      rentalId,
      rentalName,
      rentalSeasonPrice,
      rentalOffSeasonPrice,
      rentalType,
      rentalActiveStatus: true,
      rentalCover: uploadedCovers, // Save the uploaded cover details
    });

    // Save the package to the database
    const savedRental = await newRental.save();

    // Return the created package as the response
    return NextResponse.json(savedRental, { status: 201 });
  } catch (error: unknown) {
    // Error handling
    console.error("Error creating package:", error);
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: "An error occurred while creating the Rental Service",
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
    const rentalActiveStatus = url.searchParams.get("rentalActiveStatus");
    const rentalType = url.searchParams.get("rentalType");
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const limit = parseInt(url.searchParams.get("limit") || "10", 10);

    // Initialize filters object
    const filters: any = {};

    if (rentalActiveStatus) {
      // Ensure packageActiveStatus is a boolean value
      filters.rentalActiveStatus = rentalActiveStatus === "true";
    }

    if (rentalType) {
      filters.rentalType = rentalType;
    }

    // Set up pagination
    const skip = (page - 1) * limit;

    // Query the database with the filters and pagination
    const rentals = await Rental.find(filters).skip(skip).limit(limit).exec();

    // Get the total count of packages for pagination metadata
    const totalRentals = await Rental.countDocuments(filters);

    // Calculate the total number of pages
    const totalPages = Math.ceil(totalRentals / limit);

    // Return the paginated result
    return NextResponse.json(
      {
        rentals,
        pagination: {
          currentPage: page,
          totalPages,
          totalRentals,
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
          message: "An error occurred while getting rentals",
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
