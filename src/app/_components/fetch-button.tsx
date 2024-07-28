"use client";
import { refetchData } from "@/queries";

export default function FetchButton() {
  return (
    <button
      className="bg-neutral-400 hover:bg-neutral-300 p-1 rounded-md transition-colors"
      onClick={() => refetchData()}
    >
      Fetch
    </button>
  );
}
