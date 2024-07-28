"use client";
import { refetchData } from "@/queries";

export default function FetchButton() {
  return <button onClick={() => refetchData()}>Fetch messages</button>;
}
