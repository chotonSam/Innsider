import { amenitiesModel } from "@/models/amenities-model";
import { bookingModel } from "@/models/booking-model";
import { hotelModel } from "@/models/hotel-model";
import { reviewModel } from "@/models/review-model";
import { userModel } from "@/models/user-model";

import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/utils/data-util";

import { isDateInbetween } from "@/utils/data-util";

export async function allCityName() {
  const allCities = await hotelModel.distinct("city");
  return allCities;
}

export async function getAllHotels(
  destination,
  checkin,
  checkout,
  category,
  price,
  amenities,
  sortBy
) {
  const regex = new RegExp(destination, "i");

  // Fetch hotels matching the destination
  const hotelsByDestination = await hotelModel
    .find({ city: { $regex: regex } })
    .select([
      "thumbNailUrl",
      "name",
      "highRate",
      "lowRate",
      "city",
      "propertyCategory",
      "amenities",
    ])
    .lean();

  let allHotels = hotelsByDestination;

  if (sortBy) {
    if (sortBy === "lowToHigh") {
      allHotels = allHotels.sort((hotelA, hotelB) => {
        const avaragePriceA = (hotelA.highRate + hotelA.lowRate) / 2;
        const avaragePriceB = (hotelB.highRate + hotelB.lowRate) / 2;
        return avaragePriceA - avaragePriceB;
      });
    } else {
      allHotels = allHotels.sort((hotelA, hotelB) => {
        const avaragePriceA = (hotelA.highRate + hotelA.lowRate) / 2;
        const avaragePriceB = (hotelB.highRate + hotelB.lowRate) / 2;
        return avaragePriceB - avaragePriceA;
      });
    }
  }

  // Convert amenity names to IDs if amenities are provided
  if (amenities && amenities.length > 0) {
    const amenitiesArray = amenities.split("|"); // Names: ["WiFi", "Swimming Pool", "Gym", "Golf Club"]

    // Fetch matching amenities to get their IDs
    const matchingAmenities = await getAmenities(amenitiesArray);

    const amenityIds = matchingAmenities.map((amenity) => amenity.id);

    // Ensure hotel amenities are converted to string before comparison
    allHotels = allHotels.filter((hotel) =>
      amenityIds.every((id) =>
        hotel.amenities.map((aid) => aid.toString()).includes(id)
      )
    );
  }

  // Filter by price range if price is provided
  if (price) {
    const priceRanges = price.split("|");

    allHotels = allHotels.filter((hotel) => {
      const averagePrice = (hotel.highRate + hotel.lowRate) / 2;
      return priceRanges.some((range) => {
        const [min, max] = range.split("-").map(Number);
        return max
          ? averagePrice >= min && averagePrice <= max
          : averagePrice >= min;
      });
    });
  }

  // Filter by category if category is provided
  if (category) {
    const categoriesToMatch = category.split("|");
    allHotels = allHotels.filter((hotel) =>
      categoriesToMatch.includes(hotel.propertyCategory.toString())
    );
  }

  // Check if the hotel is booked during the specified dates
  if (checkin && checkout) {
    allHotels = await Promise.all(
      allHotels.map(async (hotel) => {
        const found = await findBooking(hotel._id, checkin, checkout);
        hotel["isBooked"] = !!found;
        return hotel;
      })
    );
  }

  return replaceMongoIdInArray(allHotels);
}

async function findBooking(hotelId, checkin, checkout) {
  const matches = await bookingModel
    .find({ hotelId: hotelId.toString() })
    .lean();

  const found = matches.find((match) => {
    return (
      isDateInbetween(checkin, match.checkin, match.checkout) ||
      isDateInbetween(checkout, match.checkin, match.checkout)
    );
  });
  console.log(found);

  return found;
}

export async function getHotelById(hotelId, checkin, checkout) {
  const hotel = await hotelModel.findById(hotelId).lean();

  if (checkin && checkout) {
    const found = await findBooking(hotel._id, checkin, checkout);
    if (found) {
      hotel["isBooked"] = true;
    } else {
      hotel["isBooked"] = false;
    }
  }
  return replaceMongoIdInObject(hotel);
}

export async function getReviewsForAHotel(hotelId) {
  const reviews = await reviewModel.find({ hotelId: hotelId }).lean();
  return replaceMongoIdInArray(reviews);
}

export async function getUserByEmail(email) {
  const users = await userModel.find({ email: email }).lean();
  return replaceMongoIdInObject(users[0]);
}

export async function getBookingsByUser(userId) {
  const bookings = await bookingModel.find({ userId: userId }).lean();
  return replaceMongoIdInArray(bookings);
}

export async function getAmenities(array) {
  const amenities = await amenitiesModel.find({ name: { $in: array } }).lean();

  return replaceMongoIdInArray(amenities);
}

export async function getAmenitiesByIds(array) {
  if (!array || array.length === 0) return []; // Prevent empty queries

  const amenitiesName = await amenitiesModel
    .find({ _id: { $in: array } })
    .select("name")
    .lean();

  return amenitiesName;
}

export async function getUserById(userId) {
  const users = await userModel.findById(userId).lean();
  return replaceMongoIdInObject(users);
}
