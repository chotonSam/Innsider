"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function FilterByStarCategory() {
  const [query, setQuery] = useState([]);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const params = new URLSearchParams(searchParams);

  const handleChange = (event) => {
    event.preventDefault();
    const name = event.target.name;
    const checked = event.target.checked;

    setQuery((prev) =>
      checked ? [...prev, name] : prev.filter((item) => item !== name)
    );
  };

  useEffect(() => {
    const category = params.get("category");
    if (category) {
      const queryInCategory = decodeURI(category).split("|");
      setQuery(queryInCategory);
    }
  }, []);

  useEffect(() => {
    if (query.length > 0) {
      params.set("category", encodeURI(query.join("|")));
    } else {
      params.delete("category");
    }

    replace(`${pathname}?${params.toString()}`, {
      scroll: false,
      shallow: true,
    });
  }, [query]);

  return (
    <div>
      <h3 className="font-bold text-lg">Star Category</h3>
      <form className="flex flex-col gap-2 mt-2">
        {["5", "4", "3", "2", "1"].map((star) => (
          <label key={star} htmlFor={`${star}Star`}>
            <input
              type="checkbox"
              name={star}
              checked={query.includes(star)}
              id={`${star}Star`}
              onChange={handleChange}
            />
            {star} Star
          </label>
        ))}
      </form>
    </div>
  );
}
