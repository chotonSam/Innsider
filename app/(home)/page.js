import Search from "@/components/search/Search";
import { allCityName } from "@/database/queries";

export default async function Home() {
  const allCities = await allCityName();

  console.log(allCities);
  return (
    <section className="bg-[#F6F3E9] h-screen max-h-screen relative grid place-items-center  bg-cover bg-no-repeat bg-center">
      <div className="container items-center pb-12 ">
        <div className="col-span-7">
          <h1 className="font-bold text-3xl lg:text-5xl my-4 text-center lg:w-8/12 mx-auto">
            Hotel for memorable moments rich in emotions
          </h1>
          <p className="my-2 text-[#5f5e5e] text-center">
            We have 459 rooms spread throuout Indonesia with room standards
            equivalent to 5 star hotels.
          </p>
          <Search allCities={allCities} />
        </div>
      </div>
    </section>
  );
}
