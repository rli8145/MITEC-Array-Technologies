import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const res = await fetch(
      "https://mitec-array-technologies-6.onrender.com/routes",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err: any) {
    console.log(err);
    return NextResponse.json(
      { error: "Backend request failed" },
      { status: 500 }
    );
  }
}
