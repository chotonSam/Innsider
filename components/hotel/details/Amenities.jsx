import { getAmenitiesByIds } from "@/database/queries";

const amenityIcons = {
  WiFi: "📶",
  "Swimming Pool": "🏊",
  Gym: "🏋️",
  "Golf Club": "⛳",
  Parking: "🚗",
  Restaurant: "🍽️",
  Spa: "💆",
  "Air Conditioning": "❄️",
};

export default async function Amenities({ amenities }) {
  const amenitiesName = await getAmenitiesByIds(amenities);

  return (
    <section className="container pt-8">
      <h2 className="font-bold text-xl my-4">Amenities</h2>

      {amenitiesName.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {amenitiesName.map((amenity) => (
            <div
              key={amenity.name}
              className="flex items-center gap-3 p-4 bg-gray-100 rounded-lg shadow-md"
            >
              <span className="text-2xl">
                {amenityIcons[amenity.name] || "❔"}
              </span>
              <p className="text-gray-700 font-medium">{amenity.name}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-6 ">
          <span className="text-5xl">🚫</span>
          <p className="text-gray-600 mt-2">
            No amenities available for this hotel.
          </p>
        </div>
      )}
    </section>
  );
}
