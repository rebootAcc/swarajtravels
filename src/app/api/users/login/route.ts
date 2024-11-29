import { connectToDataBase } from "@/db/connection";
import User from "@/models/User";
import { generateToken } from "@/utils/jsonToken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    await connectToDataBase();
    // Parse the request body
    const {
      emailOrPhone,
      password,
    }: { emailOrPhone: string; password: string } = await request.json();

    // Validate input
    if (!emailOrPhone || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Find the user by email or phone
    const user = await User.findOne({
      $or: [{ email: emailOrPhone }, { phone: emailOrPhone }],
    });

    // Check if user exists and password matches
    if (!user || !(await user.matchPassword(password))) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 400 }
      );
    }

    // Generate JWT token
    const token = generateToken({ ...user });

    const cookieStore = await cookies();
    cookieStore.set("token", token ?? "");
    // Send success response
    return NextResponse.json(
      {
        userId: user.userId,
        email: user.email,
        name: user.name,
        phone: user.phone,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    // Handle errors
    console.error("Error during login:", error);
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    } else {
      return NextResponse.json(
        { message: "An unexpected error occurred" },
        { status: 500 }
      );
    }
  }
}
