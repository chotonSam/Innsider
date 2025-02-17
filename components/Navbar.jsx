import { auth } from "@/auth";
import Link from "next/link";
import { FaHotel } from "react-icons/fa";
import UserDropdown from "./auth/UserDropdown";

const Navbar = async ({ sidemenu }) => {
  const session = await auth();
  const user = session?.user;

  return (
    <nav className="flex justify-between items-center px-6 py-4 text-gray-900 bg-transparent">
      {/* Logo */}
      <Link href="/">
        <div className="flex items-center space-x-2 text-3xl font-semibold">
          <FaHotel className="text-primary text-3xl transition-colors" />
          <span className="font-bold transition-colors relative">
            Innsider
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></span>
          </span>
        </div>
      </Link>

      {/* Spacer for equal spacing */}
      <div className="flex-grow"></div>

      {/* Navigation Links */}
      <ul className="flex items-center gap-6">
        <li className="relative group">
          <Link
            href="/"
            className="relative px-4 py-2 text-gray-700 hover:text-primary transition duration-300 font-semibold"
          >
            Recommended Places
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </li>

        <li className="relative group">
          <Link
            href="/"
            className="relative px-4 py-2 text-gray-700 hover:text-primary transition duration-300 font-semibold"
          >
            About Us
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </li>

        <li className="relative group">
          <Link
            href="/bookings"
            className="relative px-4 py-2 text-gray-700 hover:text-primary transition duration-300 font-semibold"
          >
            Bookings
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full "></span>
          </Link>
        </li>

        {/* User Dropdown or Login Button */}
        {sidemenu &&
          (user ? (
            <UserDropdown user={user} />
          ) : (
            <Link
              href="/login"
              className="px-5 py-2 bg-primary text-white rounded-lg shadow-sm hover:bg-orange-600 transition duration-300 font-semibold"
            >
              Login
            </Link>
          ))}
      </ul>
    </nav>
  );
};

export default Navbar;
