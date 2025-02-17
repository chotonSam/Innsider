import Filter from "@/components/filter/Filter";
import HotelList from "@/components/hotel/HotelList";
import Search from "@/components/search/Search";
import { allCityName } from "@/database/queries";

const refineCategory = (category) => {
  const decodedCategory = decodeURI(category);
  if (decodedCategory === "undefined") {
    return "";
  }
  return decodedCategory;
};

const refinePrice = (price) => {
  const decodedPrice = decodeURI(price);
  if (decodedPrice === "undefined") {
    return "";
  }
  return decodedPrice;
};

const refineAmenities = (amenities) => {
  const decodedAmenities = decodeURI(amenities);
  if (decodedAmenities === "undefined") {
    return "";
  }
  return decodedAmenities;
};

const refineSortBy = (sortBy) => {
  const decodedSortBy = decodeURI(sortBy);
  if (decodedSortBy === "undefined") {
    return "";
  }
  return decodedSortBy;
};

const HotelListPage = async ({
  searchParams: {
    destination,
    checkin,
    checkout,
    category,
    price,
    amenities,
    sortBy,
  },
}) => {
  const allCities = await allCityName();
  return (
    <>
      <section className="bg-[#F6F3E9] bg-cover bg-no-repeat bg-center pt-[100px] pb-[60px]">
        <div className="container items-center py-12 ">
          <Search
            fromList={true}
            destination={destination}
            checkin={checkin}
            checkout={checkout}
            allCities={allCities}
          />
        </div>
      </section>
      <section className="py-12">
        <div className="container grid grid-cols-12">
          <Filter />
          <HotelList
            destination={destination}
            checkin={checkin}
            checkout={checkout}
            category={refineCategory(category)}
            price={refinePrice(price)}
            amenities={refineAmenities(amenities)}
            sortBy={refineSortBy(sortBy)}
          />
        </div>
      </section>
    </>
  );
};

export default HotelListPage;
