import { NextRequest, NextResponse } from "next/server";
import { scalekit } from "@/app/lib/scalekit";

export async function GET() {
    try {
        const redirectURL = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback`;
        console.log("Redirect URL is ",redirectURL);
        const url = scalekit.getAuthorizationUrl(redirectURL);
        console.log(url);
        return NextResponse.redirect(url);
    } catch (error) {
        console.log(error);
    }
    
}