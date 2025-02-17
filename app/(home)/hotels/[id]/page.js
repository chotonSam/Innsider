import Amenities from "@/components/hotel/details/Amenities";
import Gallery from "@/components/hotel/details/Gallery";
import Location from "@/components/hotel/details/Location";
import Overview from "@/components/hotel/details/Overview";
import Summary from "@/components/hotel/details/Summary";
import { getHotelById } from "@/database/queries";

export default async function HotelDetailsPage({
  params: { id },
  searchParams: { checkin, checkout },
}) {
  const hotelInfo = await getHotelById(id, checkin, checkout);

  return (
    <>
      <Summary hotelInfo={hotelInfo} checkin={checkin} checkout={checkout} />
      <Gallery gallery={hotelInfo?.gallery} />
      <Overview overview={hotelInfo?.shortDescription} />

      <Amenities amenities={hotelInfo?.amenities} />

      <Location hotelInfo={hotelInfo} />
    </>
  );
}
