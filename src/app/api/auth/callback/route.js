import { NextResponse } from "next/server";
import { scalekit } from "@/app/lib/scalekit";

export async function GET(request)
{   
   const { searchParams } = new URL(request.url);
   const code = searchParams.get("code");
    const redirectURL = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback`;

    if(!code)
    {
        return NextResponse.status(400).json({message:"Code is not found"})
    }

    // Creating the session
    const authResult  = scalekit.authenticateWithCode(code, redirectURL);
    
    NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}`)
};