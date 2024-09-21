import { NextRequest, NextResponse } from "next/server";
import Message from "@/utils/schema/messages";
import dbConnect from "@/utils/db";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const walletAddress = searchParams.get("walletAddress");

    if (!walletAddress) {
      return NextResponse.json(
        { error: "Wallet address is required" },
        { status: 400 }
      );
    }

    const messages = await Message.find({ walletAddress }).sort({
      createdAt: 1,
    });
    return NextResponse.json(messages);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();

    // Check if body.text is an object and stringify it
    if (typeof body.text === "object") {
      body.text = JSON.stringify(body.text);
    }

    const message = await Message.create(body);
    return NextResponse.json(message, { status: 201 });
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
