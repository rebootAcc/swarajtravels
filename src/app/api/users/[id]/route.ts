import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import { connectToDataBase } from "@/db/connection";
import mongoose from "mongoose";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    await connectToDataBase();

    // Extract the 'id' from the URL (dynamic segment)
    const id = (await params).id; // Extract the id from the URL path

    if (!id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    // Find and delete the user by userId or _id
    const deletedUser = await User.findOneAndDelete({
      $or: [{ userId: id }, { _id: mongoose.Types.ObjectId.isValid(id) ? id : undefined }],
    });

    if (!deletedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Successfully deleted user
    return NextResponse.json(
      { message: "User deleted successfully", user: deletedUser },
      { status: 200 }
    );
  } catch (error: unknown) {
    // Error handling
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
