"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function FilterByPriceRange() {
  const [priceRange, setPriceRange] = useState([]);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const params = new URLSearchParams(searchParams);

  console.log(priceRange);

  const handlePriceChange = (event) => {
    event.preventDefault();
    const value = event.target.value;
    const checked = event.target.checked;

    setPriceRange((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  useEffect(() => {
    const price = params.get("price");
    if (price) {
      const queryInPrice = decodeURI(price).split("|");
      setPriceRange(queryInPrice);
    }
  }, []);

  useEffect(() => {
    if (priceRange.length > 0) {
      params.set("price", encodeURI(priceRange.join("|")));
    } else {
      params.delete("price");
    }

    replace(`${pathname}?${params.toString()}`, {
      scroll: false,
      shallow: true,
    });
  }, [priceRange]);

  return (
    <div>
      <h3 className="font-bold text-lg">Price Range</h3>
      <form className="flex flex-col gap-2 mt-2">
        <label htmlFor="range1">
          <input
            type="checkbox"
            name="range1"
            value="500-1250"
            checked={priceRange.includes("500-1250")}
            id="range1"
            onChange={handlePriceChange}
          />
          $500 - $1,250
        </label>

        <label htmlFor="range2">
          <input
            type="checkbox"
            name="range2"
            value="1250-2500"
            checked={priceRange.includes("1250-2500")}
            id="range2"
            onChange={handlePriceChange}
          />
          $1,250 - $2,500
        </label>

        <label htmlFor="range3">
          <input
            type="checkbox"
            name="range3"
            value="2500-3750"
            checked={priceRange.includes("2500-3750")}
            id="range3"
            onChange={handlePriceChange}
          />
          $2,500 - $3,750
        </label>

        <label htmlFor="range4">
          <input
            type="checkbox"
            name="range4"
            value="3750-5000"
            checked={priceRange.includes("3750-5000")}
            id="range4"
            onChange={handlePriceChange}
          />
          $3,750 - $5,000
        </label>

        <label htmlFor="range5">
          <input
            type="checkbox"
            name="range5"
            value="5000-10000"
            checked={priceRange.includes("5000-10000")}
            id="range5"
            onChange={handlePriceChange}
          />
          $5,000 - $10,000
        </label>
      </form>
    </div>
  );
}
