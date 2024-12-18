import { connectToDataBase } from "@/db/connection";
import User from "@/models/User";
import { generateCustomId } from "@/utils/generateCustomId";
import { generateToken } from "@/utils/jsonToken";
import { NextRequest, NextResponse } from "next/server"; // Adjust the path

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    await connectToDataBase();
    // Parse the URL parameters (query params)
    const url = new URL(request.url);
    const userId = url.searchParams.get("userId");

    // Build the query object based on the received query params
    const query: { userId?: string } = {};
    if (userId) query.userId = userId;

    // Find users matching the query
    const users = await User.find(query);

    // Return the users as a JSON response
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    // Handle errors
    console.log(error);
    return NextResponse.json({ message: "An Error Occured" }, { status: 500 });
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    await connectToDataBase();
    const { name, email, phone, password } = await request.json();
    // Check if all fields are provided
    if (!name || !email || !phone || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if email or phone already exists in the database
    const existingUser = await User.findOne({
      $or: [{ email: email }, { phone: phone }],
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email or Phone already in use" },
        { status: 400 }
      );
    }

    // Generate custom user ID (you may already have a method for this)
    const userId = await generateCustomId(User, "userId", "userId");

    // Create a new user
    const data = new User({
      userId,
      name,
      email,
      phone,
      password,
    });

    // Save the new user to the database
    const newUser = await data.save();

    // Generate a JWT token (if applicable, adjust according to your authentication setup)
    const token = generateToken({ ...newUser });

    // Respond with the newly created user and token
    return NextResponse.json({ ...newUser.toObject(), token }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "An Error Occured" }, { status: 500 });
  }
}
