import { connectToDataBase } from "@/db/connection";
import Package from "@/models/Package";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_request: NextRequest): Promise<NextResponse> {
  try {
    await connectToDataBase();
    const distinctCities = await Package.aggregate([
      {
        $group: {
          _id: "$packageCity", // Group by the 'packageCity' field
        },
      },
    ]);
    return NextResponse.json(distinctCities.map((city) => city._id));
  } catch (error: unknown) {
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
