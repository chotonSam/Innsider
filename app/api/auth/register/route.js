import { userModel } from "@/models/user-model";
import { dbConnect } from "@/service/mongo";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const { fname, lname, email, password } = await request.json();

  await dbConnect();

  // Check if user already exists
  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return new NextResponse(
        JSON.stringify({ message: "User already exists." }),
        { status: 409, headers: { "Content-Type": "application/json" } }
      );
    }

    // Hash the password with stronger salt rounds (10)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = {
      name: `${fname} ${lname}`,
      email,
      password: hashedPassword,
    };

    // Avoid logging sensitive data (like password)
    console.log(`New user: ${fname} ${lname}, Email: ${email}`);

    await userModel.create(newUser);

    return new NextResponse(
      JSON.stringify({ message: "User created successfully." }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error creating user:", error); // Log the error, not sensitive data
    return new NextResponse(
      JSON.stringify({ message: "An error occurred while creating the user." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
