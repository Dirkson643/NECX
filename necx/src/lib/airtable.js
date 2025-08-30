// src/lib/airtable.js

export async function fetchCards() {
  if (!process.env.AIRTABLE_TOKEN || !process.env.AIRTABLE_BASE_ID || !process.env.AIRTABLE_TABLE_NAME) {
    throw new Error("Missing Airtable env vars")
  }

  const res = await fetch(
    `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_TABLE_NAME}`,
    {
      headers: { Authorization: `Bearer ${process.env.AIRTABLE_TOKEN}` },
      cache: "no-store", // always fetch fresh data
    }
  );

  if (!res.ok) {
    throw new Error(`Airtable fetch failed: ${res.statusText}`);
  }

  const data = await res.json();
  return Array.isArray(data.records)
    ? data.records.map(r => ({
        id: r.id,
        name: r.fields.Name || "No Name",
        image: r.fields["Card Front"]?.[0]?.url || null,
      }))
    : [];
}
