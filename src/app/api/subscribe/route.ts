import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({
    message: "Subscribe API - POST endpoint",
    email: body.email,
    status: "Subscription received",
  });
}
