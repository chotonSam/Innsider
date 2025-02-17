"use client";

export default function Location({ hotelInfo }) {
  const {
    latitude,
    longitude,
    address1,
    city,
    stateProvinceCode,
    countryCode,
    postalCode,
  } = hotelInfo || {};

  // Prepare the location name to pass in the Google Maps URL
  const locationName = `${address1}, ${city}, ${stateProvinceCode}, ${countryCode}, ${postalCode}`;

  // Encode the location name for use in the URL
  const googleMapsLink = `https://www.google.com/maps/search/${encodeURIComponent(
    locationName
  )}`;

  return (
    <section className="container py-8">
      <h2 className="font-bold text-xl my-4">Location</h2>

      <p className="text-gray-700 mb-2">
        📍 {address1}, {city}, {stateProvinceCode}, {countryCode} - {postalCode}
      </p>

      <div className="h-64 w-full rounded-lg overflow-hidden shadow-lg bg-gray-200">
        {/* Link to Google Maps with location name */}
        <a
          href={googleMapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full h-full block bg-gray-300 flex items-center justify-center"
        >
          <span className="text-lg text-blue-600">View on Google Maps</span>
        </a>
      </div>
    </section>
  );
}
