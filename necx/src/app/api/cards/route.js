import { fetchCards } from "@/lib/airtable";

export async function GET() {
  try {
    const cards = await fetchCards();
    return new Response(JSON.stringify(cards), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    console.error("Airtable fetch failed:", err);
    return new Response(JSON.stringify({ error: "Airtable fetch failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
