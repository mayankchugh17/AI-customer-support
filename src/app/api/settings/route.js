import { connectDB } from "@/app/lib/DB";
import Settings from "@/app/models/Settings";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { ownerId } = await req.json();
    if (!ownerId) {
      return NextResponse.json(
        { message: "Owner Id is required" },
        { status: 400 },
      );
    }
    await connectDB();

    const result = await Settings.findById({ownerId});
    return NextResponse.json(result);

  } catch (error) {
    return NextResponse.json({ message: "Settings error" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { ownerId, businessName, supportEmail, knowledge } = await req.json();
    if (!ownerId) {
      return NextResponse.json(
        { message: "Owner Id is required" },
        { status: 400 },
      );
    }
    await connectDB();
    const result = await Settings.findByIdAndUpdate(
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
