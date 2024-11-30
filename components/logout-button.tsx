"use client";

import { useRouter } from "next/navigation";
import { removeAuthToken } from "@/lib/auth";
import { FaSignOutAlt } from "react-icons/fa";

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    removeAuthToken();
    router.push("/login");
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
    >
      <FaSignOutAlt className="mr-2 h-4 w-4" />
      Logout
    </button>
  );
}
