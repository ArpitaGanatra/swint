import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const { nextUrl } = req;

  console.log(nextUrl, "url");

  try {
    const response = await fetch(
      `https://api.1inch.dev/fusion-plus/quoter/v1.0/quote/receive${nextUrl.search}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.INCH_API_KEY}`,
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json({ data, status: 200 });
  } catch (error) {
    return NextResponse.json({ data: error, status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const response = await fetch(
      "https://api.1inch.dev/fusion-plus/quoter/v1.0/quote/build",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.INCH_API_KEY}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json({ data, status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "An error occurred", status: 500 });
  }
}
