import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    const [rows] = await pool.query(
      "SELECT id, name, image_url, category_id FROM item ORDER BY id DESC LIMIT 50"
    );
    return NextResponse.json(rows);
  } catch (err) {
    console.error("DB error:", err);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
