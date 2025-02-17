"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const Search = ({ fromList, destination, checkin, checkout, allCities }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [searchTerm, setSearchTerm] = useState({
    destination: destination || "Puglia",
    checkin: checkin,
    checkout: checkout,
  });

  const [allowSearch, setAllowSearch] = useState(true);

  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    const state = { ...searchTerm, [name]: value };

    if (
      new Date(state.checkin).getTime() > new Date(state.checkout).getTime()
    ) {
      setAllowSearch(false);
    } else {
      setAllowSearch(true);
    }
    setSearchTerm(state);
  };

  function doSearch(event) {
    const params = new URLSearchParams(searchParams);

    params.set("destination", searchTerm?.destination || "all");
    if (searchTerm?.checkin && searchTerm.checkout) {
      params.set("checkin", searchTerm?.checkin);
      params.set("checkout", searchTerm?.checkout);
    }

    if (pathname.includes("hotels")) {
      replace(`${pathname}?${params.toString()}`);
    } else {
      replace(`${pathname}hotels?${params.toString()}`);
    }
  }

  return (
    <>
      <div className="lg:max-h-[250px] mt-6">
        <div id="searchParams" className={fromList && "!shadow-none"}>
          <div>
            <span>Destination</span>
            <h4 className="mt-2">
              <select
                defaultValue={searchTerm.destination}
                onChange={handleInputs}
                name="destination"
                id="destination"
              >
                {allCities.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </h4>
          </div>

          <div>
            <span>Check in</span>
            <h4 className="mt-2">
              <input
                value={searchTerm.checkin}
                onChange={handleInputs}
                type="date"
                name="checkin"
                id="checkin"
              />
            </h4>
          </div>

          <div>
            <span>Checkout</span>
            <h4 className="mt-2">
              <input
                value={searchTerm.checkout}
                onChange={handleInputs}
                type="date"
                name="checkout"
                id="checkout"
              />
            </h4>
          </div>
        </div>
      </div>

      <button onClick={doSearch} disabled={!allowSearch} className="search-btn">
        🔍️ {fromList ? "Modify Search" : "Search"}
      </button>
    </>
  );
};

export default Search;
