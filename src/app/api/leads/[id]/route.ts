import { connectToDataBase } from "@/db/connection";
import Lead from "@/models/Leads";
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
    const updatedLead = await Lead.findOneAndUpdate(
      {
        $or: [
          { leadId: id },
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

    if (!updatedLead) {
      return NextResponse.json(
        { message: "Package not found" },
        { status: 404 }
      );
    }

    // Return the updated package details
    return NextResponse.json(updatedLead, { status: 200 });
  } catch (error: unknown) {
    console.error("Error updating lead:", error);
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: "An error occurred while updating the lead",
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
    const leadToDelete = await Lead.findOne({
      $or: [
        { leadId: id },
        { _id: mongoose.Types.ObjectId.isValid(id) ? id : undefined },
      ],
    });

    if (!leadToDelete) {
      return NextResponse.json(
        { message: "Package not found" },
        { status: 404 }
      );
    }

    await Lead.deleteOne({ id: leadToDelete._id });
    // Return success message
    return NextResponse.json(
      { message: "Lead and associated files deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting lead:", error);
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: "An error occurred while deleting the lead",
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
    const requestedLead = await Lead.findOne({
      $or: [
        { leadId: id },
        { _id: mongoose.Types.ObjectId.isValid(id) ? id : undefined },
      ],
    });

    if (!requestedLead) {
      return NextResponse.json({ message: "Lead not found" }, { status: 404 });
    }
    return NextResponse.json({ ...requestedLead }, { status: 200 });
  } catch (error) {
    console.error("Error Get lead:", error);
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: "An error occurred while get the lead",
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

