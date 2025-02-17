"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SortHotel() {
  const [sortOrder, setSortOrder] = useState("lowToHigh");

  const searchParams = useSearchParams();

  const pathName = usePathname();

  const { replace } = useRouter();

  const params = new URLSearchParams(searchParams);

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortOrder(value);
  };

  useEffect(() => {
    const sortBy = params.get("sortBy");
    if (sortBy) {
      const queryInSortBy = decodeURI(sortBy);

      setSortOrder(queryInSortBy);
    }
  }, []);

  useEffect(() => {
    if (sortOrder) {
      const sortBy = params.set("sortBy", encodeURI(sortOrder));
    } else {
      params.delete("sortBy");
    }

    replace(`${pathName}?${params.toString()}`, {
      scroll: false,
      shallow: true,
    });
  }, [sortOrder]);

  console.log(sortOrder);
  return (
    <div>
      <h3 className="font-bold text-lg">Sort By</h3>
      <form className="mt-2 w-40">
        <select
          className="border-none outline-none cursor-pointer p-0"
          name="SortByPrice"
          id="sortByPrice"
          value={sortOrder}
          onChange={handleSortChange}
        >
          <option value="highToLow">Price High to Low</option>
          <option value="lowToHigh">Price Low to High</option>
        </select>
      </form>
    </div>
  );
}
