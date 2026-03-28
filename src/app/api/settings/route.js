import { connectDB } from "@/app/lib/DB";
import Settings from "@/app/models/Settings";
import { NextResponse } from "next/server";

//GET API
export async function GET(req) {
  try {
    console.log("GET API Called");

    await connectDB();
    const { searchParams } = new URL(req.url);
    // console.log("Search Params",searchParams);
    const ownerId = searchParams.get("ownerId");
    // console.log("Owner ID is ", ownerId);
    if (!ownerId) {
      return NextResponse.json(
        { message: "Owner Id is required" },
        { status: 400 },
      );
    }
    const result = await Settings.findOne({ownerId});
    console.log("User is ", result);

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ message: "Settings error" }, { status: 500 });
  }
}

// POST API
export async function POST(req) {
  try {
    await connectDB();
    const { ownerId, businessName, supportEmail, knowledge } = await req.json();
  
    if (!ownerId) {
      return NextResponse.json(
        { message: "Owner Id is required" },
        { status: 400 },
      );
    }
    const result = await Settings.findOneAndUpdate(
      { ownerId },
      { ownerId, businessName, supportEmail, knowledge },
      { new: true, upsert: true },
    );
    // Here upsert means If document exist update it else create is
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ message: "Settings error" }, { status: 500 });
  }
}
