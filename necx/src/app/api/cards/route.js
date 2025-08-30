import { NextResponse } from "next/server";
import { fetchCards } from "@/lib/airtable";

export async function GET() {
  try {
    const records = await fetchCards();
    return NextResponse.json(records);
  } catch (error) {
    console.error("Error fetching cards:", error); // <-- add this
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
