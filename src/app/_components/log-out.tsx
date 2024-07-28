"use client";
import { logOut } from "@/auth";

export default function LogOut() {
  return (
    <button
      className="bg-red-400 p-1 rounded-md hover:bg-red-300 transition-colors"
      onClick={() => logOut()}
    >
      Log out
    </button>
  );
}
