import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./auth";

export async function middleware(request: NextRequest) {
  const currentUser = await getSession();

  if (!currentUser) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/", "/statistics"],
};
