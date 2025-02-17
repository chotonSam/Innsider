import { auth } from "@/auth";
import {
  getReviewsForAHotel,
  getUserByEmail,
  getUserById,
} from "@/database/queries";
import { redirect } from "next/navigation";
import HotelReviewModal from "./details/HotelReviewModal";
import HotelRating from "./HotelRating";

export default async function HotelReviewNumber({ id }) {
  const reviews = await getReviewsForAHotel(id);

  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const loggedInUser = await getUserByEmail(session?.user?.email);

  // Fetch user details for each review
  const reviewsWithUser = await Promise.all(
    reviews.map(async (review) => {
      const reviewByUser = await getUserById(review.userId);
      return { ...review, reviewByUser }; // Attach user info to each review
    })
  );

  const userHasReviewed = reviewsWithUser.some(
    (review) => String(review.userId) === String(loggedInUser.id)
  );

  return (
    <>
      <HotelRating ratings={reviewsWithUser} />

      <HotelReviewModal
        reviews={reviewsWithUser}
        hotelId={id}
        userId={loggedInUser.id}
        hasReviewed={userHasReviewed}
      />
    </>
  );
}
