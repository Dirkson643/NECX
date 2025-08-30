import Airtable from "airtable";

const base = new Airtable({ apiKey: process.env.AIRTABLE_TOKEN }).base(
  process.env.AIRTABLE_BASE_ID
);

export async function fetchCards() {
  const records = await base(process.env.AIRTABLE_TABLE_NAME)
    .select({ maxRecords: 20 })
    .firstPage();

  return records.map((r) => ({
    id: r.id,
    name: r.fields.Name || "",
    image: r.fields["Card Front"]?.[0]?.url || null
  }));
}
