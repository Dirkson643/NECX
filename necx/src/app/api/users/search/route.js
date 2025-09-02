import { NextResponse } from "next/server";
import pool from "@/lib/db.js";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query") || "";

  try {
    const [rows] = await pool.query(
      "SELECT id, name FROM user WHERE name LIKE ? LIMIT 20",
      [`%${query}%`]
    );
    return NextResponse.json(rows);
  } catch (err) {
    console.error("Error searching users:", err);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
