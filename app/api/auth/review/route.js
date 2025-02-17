import mongoose from "mongoose";

import { reviewModel } from "@/models/review-model";
import { dbConnect } from "@/service/mongo"; // Assuming you have a MongoDB connection helper
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { hotelId, userId, rating, review } = await req.json();

    // Validate the required fields
    if (!hotelId || !userId || !rating || !review) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    // Connect to the database
    await dbConnect();

    // Create a new review
    const newReview = new reviewModel({
      hotelId: new mongoose.Types.ObjectId(hotelId),
      userId: new mongoose.Types.ObjectId(userId),
      rating,
      review,
    });

    // Save the review to the database
    await newReview.save();

    return NextResponse.json(
      { message: "Review submitted successfully", review: newReview },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error submitting review:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
