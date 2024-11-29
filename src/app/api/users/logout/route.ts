import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_request: NextRequest): Promise<NextResponse> {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("token");
    return NextResponse.json({
      message: "Logged out successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error during login:", error);
    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message, success: false },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        { message: "An unexpected error occurred", success: false },
        { status: 500 }
      );
    }
  }
}
