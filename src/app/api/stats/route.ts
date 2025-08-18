import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "Stats API - GET endpoint",
    stats: {
      github: "Coming soon",
      wakatime: "Coming soon",
      spotify: "Coming soon",
    },
  });
}
