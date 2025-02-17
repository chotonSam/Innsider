"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Logout from "./Logout";

export default function UserDropdown({ user }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  console.log(user?.image); // Debug: Check if the image is passed to the modal

  return (
    <div className="relative" ref={dropdownRef}>
      {/* User Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2 bg-transparent border border-gray-300 rounded-full hover:bg-gray-100 transition"
      >
        {/* Profile Image (with fallback) */}
        <div className="relative h-8 w-8 rounded-full bg-orange-600 grid place-items-center text-white text-lg font-bold">
          {user?.image ? (
            <Image
              src={user?.image}
              alt={user?.name}
              width={32}
              height={32}
              className="rounded-full object-cover h-8 w-8"
            />
          ) : (
            user?.name?.substring(0, 2)?.toUpperCase() || "U"
          )}
        </div>
        <span className="font-medium">{user.name || "User"}</span>
      </button>

      {/* Dropdown Menu (Visible only when open) */}
      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-white shadow-md rounded-lg border border-gray-200">
          <div className="px-4 py-3 text-gray-800 border-b">
            <div className="flex items-center gap-2">
              {/* Profile Image in Modal (with fallback) */}
              <div className="relative h-10 w-10 rounded-full bg-orange-600 grid place-items-center text-white text-lg font-bold">
                {user?.image ? (
                  <Image
                    src={user?.image}
                    alt={user?.name}
                    width={40}
                    height={40}
                    className="rounded-full object-cover h-10 w-10"
                  />
                ) : (
                  user?.name?.substring(0, 2)?.toUpperCase() || "U"
                )}
              </div>
              <div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>
          </div>
          <Logout />
        </div>
      )}
    </div>
  );
}
