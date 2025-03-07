"use client";

import { signOut } from "next-auth/react";
import { FiLogOut } from "react-icons/fi";

export default function LogoutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut()}
      className="text-gray-600 hover:text-red-500 text-2xl"
    >
      <FiLogOut />
    </button>
  );
}
