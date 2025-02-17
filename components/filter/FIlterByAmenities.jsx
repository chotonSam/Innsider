"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function FIlterByAmenities() {
  const [query, setQuery] = useState([]);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const params = new URLSearchParams(searchParams);

  console.log(query);

  const handleChange = (event) => {
    event.preventDefault();

    const name = event.target.name;
    const checked = event.target.checked;

    setQuery((prev) =>
      checked ? [...prev, name] : prev.filter((item) => item !== name)
    );
  };

  useEffect(() => {
    const amenities = params.get("amenities");

    if (amenities) {
      const queryInAmenities = decodeURI(amenities).split("|");

      setQuery(queryInAmenities);
    }
  }, []);

  useEffect(() => {
    if (query.length > 0) {
      params.set("amenities", encodeURI(query.join("|")));
    } else {
      params.delete("amenities");
    }

    replace(`${pathname}?${params.toString()}`, {
      scroll: false,
      shallow: true,
    });
  }, [query]);

  return (
    <div>
      <h3 className="font-bold text-lg">Amenities</h3>
      <form action="" className="flex flex-col gap-2 mt-2">
        <label htmlFor="wifi">
          <input
            onChange={handleChange}
            checked={query.includes("WiFi")}
            type="checkbox"
            name="WiFi"
            id="wifi"
          />
          Wi-fi
        </label>

        <label htmlFor="swimmingPool">
          <input
            onChange={handleChange}
            checked={query.includes("Swimming Pool")}
            type="checkbox"
            name="Swimming Pool"
            id="swimmingPool"
          />
          Swimming Pool
        </label>

        <label htmlFor="gym">
          <input
            onChange={handleChange}
            checked={query.includes("Gym")}
            type="checkbox"
            name="Gym"
            id="gym"
          />
          Gym
        </label>

        <label htmlFor="golfclub">
          <input
            onChange={handleChange}
            checked={query.includes("Golf Club")}
            type="checkbox"
            name="Golf Club"
            id="golfclub"
          />
          Golf Club
        </label>
      </form>
    </div>
  );
}
