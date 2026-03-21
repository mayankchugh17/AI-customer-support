import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export async function GET(request)
{
    const cookieStore = await cookies();
    cookieStore.delete("access token");
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}`);
}