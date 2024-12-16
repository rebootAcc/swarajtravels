import { NextRequest, NextResponse } from "next/server";
import { format } from "date-fns";
import { Parser } from "json2csv";
import { connectToDataBase } from "@/db/connection";
import Lead from "@/models/Leads";

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

    const fields = [
      { label: "Lead ID", value: "leadId" },
      { label: "Name", value: "leadName" },
      { label: "Phone Number", value: "leadPhoneNumber" },
      { label: "Email", value: "leadEmail" },
      { label: "Type", value: "leadType" },
      { label: "Query", value: "leadQuery" },
      { label: "Package", value: "leadPackage" },
      { label: "Message", value: (row: any) => row.leadMessage || "N/A" },
      {
        label: "Deperture Data",
        value: (row: any) =>
          row.depertureDate
            ? format(new Date(row.depertureDate), "dd/MM/yyyy")
            : "N/A",
      },
      { label: "Start Point", value: (row: any) => row.startPoint || "N/A" },
      { label: "End Point", value: (row: any) => row.endPoint || "N/A" },
      {
        label: "Created At",
        value: (row: any) =>
          format(new Date(row.createdAt), "dd/MM/yyyy HH:mm"),
      },
    ];

    // Convert JSON to CSV
    const parser = new Parser({ fields });
    const csv = parser.parse(leads);

    const fileName = `leads-${format(new Date(), "dd-MM-yyyy")}.csv`;

    // Prepare response headers
    const headers = new Headers({
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="${fileName}"`,
    });

    return new NextResponse(csv, { headers });
  } catch (error) {
    console.error("Error generating CSV:", error);
    return NextResponse.json(
      { error: "Error generating CSV file." },
      { status: 500 }
    );
  }
}
