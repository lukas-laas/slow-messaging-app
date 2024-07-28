"use client";

import { authenticate } from "@/auth";

export default function Login() {
  return (
    <main className="max-w-lg w-full mx-auto my-2 p-2">
      <h1>Sign in</h1>
      <div className="bg-white border rounded-lg p-2 border-solid border-neutral-400 w-full ">
        <form action={authenticate} className="flex flex-col gap-1">
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="border border-solid border-neutral-400 w-full rounded-sm p-1"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border border-solid border-neutral-400 w-full  rounded-sm p-1"
          />

          <button
            type="submit"
            className="w-fit p-1 rounded-sm bg-green-400 hover:bg-green-300"
          >
            Sign in
          </button>
        </form>
      </div>
    </main>
  );
}
