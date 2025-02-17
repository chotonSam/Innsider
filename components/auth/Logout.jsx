"use client";

import { signOut } from "next-auth/react";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";

export default function Logout() {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    await signOut({ callbackUrl: "/login" });
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className={`w-full px-4 py-2 text-left font-semibold transition ${
        loading
          ? "bg-gray-300 text-gray-800 cursor-not-allowed" // Darker text for contrast
          : "text-primary hover:bg-primary hover:text-white"
      }`}
    >
      {loading ? (
        <span className="flex items-center">
          <FaSpinner className="animate-spin mr-2" /> Logging out...
        </span>
      ) : (
        "Logout"
      )}
    </button>
  );
}
