import { NextRequest, NextResponse } from "next/server";
import { getStructuredResponse } from "@/utils/phalaRes";
import { makeSwap } from "@/utils/swapQuote";

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();
    const structuredResponse = await getStructuredResponse(message);
    await makeSwap(structuredResponse);
    return NextResponse.json(
      { success: true, message: "Swap initiated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing swap:", error);
    return NextResponse.json(
      { success: false, message: "Error processing swap" },
      { status: 500 }
    );
  }
}
