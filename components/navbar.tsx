"use client";

import Link from "next/link";

import { FaQuoteLeft } from "react-icons/fa";
import { LogoutButton } from "./logout-button";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/quotes" className="flex items-center">
              <FaQuoteLeft className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-800">
                QuoteShare
              </span>
            </Link>
          </div>
          <div className="flex items-center">
            <LogoutButton />
          </div>
        </div>
      </div>
    </nav>
  );
}
