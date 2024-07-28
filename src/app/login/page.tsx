"use client";

import { authenticate } from "@/auth";

export default function Login() {
  return (
    <main className="max-w-lg w-full mx-auto p-2 my-12">
      <div className="bg-white border rounded-lg p-4 w-full shadow-md">
        <h1 className="text-xl mb-2">Sign in</h1>
        <form action={authenticate} className="flex flex-col gap-1">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="border border-solid border-neutral-400 w-full rounded-sm p-1 mb-1"
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border border-solid border-neutral-400 w-full  rounded-sm p-1 mb-1"
          />

          <button
            type="submit"
            className="w-fit p-1 rounded-md bg-green-400 hover:bg-green-300 transition-colors"
          >
            Sign in
          </button>
        </form>
      </div>
    </main>
  );
}
