import { connectToDataBase } from "@/db/connection";
import Lead from "@/models/Leads";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_request: NextRequest): Promise<NextResponse> {
  try {
    await connectToDataBase();
    const distinctTypes = await Lead.aggregate([
      {
        $group: {
          _id: "$leadType", // Group by the 'packageCity' field
        },
      },
    ]);
    return NextResponse.json(distinctTypes.map((type) => type._id));
  } catch (error: unknown) {
    console.error("Error getting types of leads:", error);
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: "An error occurred while getting types of leads",
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
