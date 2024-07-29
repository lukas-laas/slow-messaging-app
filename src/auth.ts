"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import z from "zod";

const LoginSchema = z.object({
  password: z.string().min(1),
  username: z.string().min(1).max(255),
});

export const authenticate = async (formData: FormData) => {
  let access = false;

  try {
    const password = formData.get("password");
    const username = formData.get("username");

    const valid = LoginSchema.safeParse({
      username: username,
      password: password,
    });

    if (valid.error) throw valid.error;

    if (password !== process.env.LOGIN_PASSWORD)
      throw new Error("Access denied");
    const expires = new Date(Date.now() + 5 * 60 * 1000).getTime();

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
    console.log(error);
  }
  if (access) redirect("/");
};

export const logOut = () => {
  cookies().delete("session");
  redirect("/login");
};

export const getSession = async () => {
  const sessionCookie = cookies().get("session")?.value;
  if (!sessionCookie) {
    return null;
  }
  const session = await JSON.parse(sessionCookie);

  return session;
};
