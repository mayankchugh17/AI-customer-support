import { NextResponse } from "next/server";
import { getSession } from "./app/lib/getSession";

export async function proxy(request) {
  const session = await getSession();
  console.log("session is ", session);
  if(!session)
  {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}`)
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*"],
};
