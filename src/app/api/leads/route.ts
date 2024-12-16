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
    if (!leadName || !leadPhoneNumber || !leadQuery || !leadType) {
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
      leadMessage,
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
    const startDate = url.searchParams.get("startDate");
    const endDate = url.searchParams.get("endDate");
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const limit = parseInt(url.searchParams.get("limit") || "10", 10);
    const query: { leadType?: string; leadStatus?: string; createdAt?: any } =
      {};

    // Add filters for leadType and leadStatus
    if (leadType) {
      query.leadType = leadType;
    }

    if (leadStatus) {
      query.leadStatus = leadStatus;
    }

    // Add date range filter for createdAt
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) {
        query.createdAt.$gte = new Date(startDate);
      }
      if (endDate) {
        query.createdAt.$lte = new Date(endDate);
      }
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
    console.error("Error fetching leads:", error);
    return NextResponse.json({ message: "An Error Occurred" }, { status: 500 });
  }
}
