import { connectToDataBase } from "@/db/connection";
import Lead from "@/models/Leads";
import { generateCustomId } from "@/utils/generateCustomId";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    await connectToDataBase();
    const {
      leadName,
      leadEmail,
      leadPhoneNumber,
      leadType,
      leadQuery,
      leadMessage,
      leadPackage,
      startDate,
      endDate,
      startPoint,
      endPoint,
    } = await request.json();
    // Check if all fields are provided
    if (
      !leadName ||
      !leadEmail ||
      !leadPhoneNumber ||
      !leadQuery ||
      !leadMessage ||
      !leadType
    ) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Generate custom lead ID (you may already have a method for this)
    const leadId = await generateCustomId(Lead, "leadId", "leadId");

    // Create a new lead
    const data = new Lead({
      leadId,
      leadName,
      leadEmail,
      leadPhoneNumber,
      leadType,
      leadQuery,
      leadPackage,
      startDate,
      endDate,
      startPoint,
      endPoint,
    });

    // Save the new user to the database
    const newLead = await data.save();

    // Respond with the newly created user and token
    return NextResponse.json({ ...newLead.toObject() }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "An Error Occured" }, { status: 500 });
  }
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    await connectToDataBase();
    const url = new URL(request.url);
    const leadType = url.searchParams.get("leadType");
    const leadStatus = url.searchParams.get("leadStatus");
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const limit = parseInt(url.searchParams.get("limit") || "10", 10);
    const query: { leadType?: string; leadStatus?: string } = {};

    if (leadType) {
      query.leadType = leadType;
    }

    if (leadStatus) {
      query.leadStatus = leadStatus;
    }

    const skip = (page - 1) * limit;

    const leads = await Lead.find(query).skip(skip).limit(limit).exec();

    const totalLeads = await Lead.countDocuments(query);

    // Calculate the total number of pages
    const totalPages = Math.ceil(totalLeads / limit);

    // Return the paginated result
    return NextResponse.json(
      {
        leads,
        pagination: {
          currentPage: page,
          totalPages,
          totalLeads,
          pageSize: limit,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "An Error Occured" }, { status: 500 });
  }
}
