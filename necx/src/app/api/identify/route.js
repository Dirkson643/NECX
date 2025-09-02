import { NextResponse } from "next/server";
import pool from "@/lib/db.js";

export async function POST(req) {
  try {
    const { file, itemId } = await req.json();
    const base64Image = file; // assuming frontend sends base64

    // Ximilar API request
    const ximilarRes = await fetch(
      "https://api.ximilar.com/collectibles/v2/sport_id",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${process.env.XIMILAR_API_KEY}`,
        },
        body: JSON.stringify({
          records: [{ _base64: base64Image }],
          pricing: false,
          "Top Category": "Card",
          Side: "front",
          Category: "Card/Sport Card",
          Subcategory: "Baseball",
        }),
      }
    );

    const data = await ximilarRes.json();

    // Extract the first record's relevant data
    const record = data?.records?.[0];
    const object = record?._objects?.[0];
    const tags = object?._tags || {};
    const bestMatch = object?._identification?.best_match;

    console.log("Category:", record?.Category);
    // Take the first name from Subcategory array
    console.log(
    "Subcategory:",
    tags?.Subcategory?.[0]?.name || "N/A"
    );
    console.log("Best match company:", bestMatch?.company);
    console.log("Best match card_number:", bestMatch?.card_number);
    console.log("Best match name:", bestMatch?.name);
    console.log("Best match year:", bestMatch?.year);
    console.log("Best match full_name:", bestMatch?.full_name);
    // Take the first name from Autograph array
    console.log(
    "Autograph:",
    tags?.Autograph?.[0]?.name || "N/A"
    );
    console.log("Best match set_name:", bestMatch?.set_name); // product Finest, Leaf, Signature Series, Triple Thread
    console.log("Best match sub_set:", bestMatch?.sub_set);   // [base], parallel or name of insert set

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error identifying card:", err);
    return NextResponse.json(
      { error: "Identification failed", details: err.message },
      { status: 500 }
    );
  }
}
