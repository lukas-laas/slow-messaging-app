"use client";
import { logOut } from "@/auth";

export default function LogOut() {
  return <button onClick={() => logOut()}>Log out</button>;
}
