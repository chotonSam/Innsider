export default function HotelRating({ ratings }) {
  const getRatingDescription = (avgRating) => {
    if (avgRating === 0) return "No Ratings Yet";
    if (avgRating <= 2) return "Poor";
    if (avgRating <= 3) return "Average";
    if (avgRating <= 4) return "Good";
    return "Very Good";
  };

  let avgRating = 0;

  if (Array.isArray(ratings) && ratings.length > 0) {
    avgRating =
      ratings.reduce((acc, { rating }) => acc + rating, 0) / ratings.length;

    // Ensure consistent rounding even for a single rating
    avgRating = Math.round(avgRating * 100) / 100;
  }

  return (
    <>
      <div className="bg-primary w-[35px] h-[35px] rounded-sm text-white grid place-items-center font-bold">
        {avgRating}
      </div>
      <span className="font-medium">{getRatingDescription(avgRating)}</span>
    </>
  );
}
