"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const authenticate = async (formData: FormData) => {
  let access = false;
  try {
    const password = formData.get("password");
    const username = formData.get("username");
    if (password !== process.env.LOGIN_PASSWORD)
      throw new Error("Access denied");
    const expires = new Date(Date.now() + 60 * 60 * 1000);

    //Not encrypting for this assignment for the sake of simplicity.
    cookies().set(
      "session",
      JSON.stringify({ user: username, expires: expires }),
      {
        expires,
        httpOnly: true,
      }
    );
    access = true;
  } catch (error) {
    console.log(error.message);
  }
  //Redirects should be placed outside try catch according to Next documentation.
  if (access) redirect("/messages");
};
