import { NextResponse } from "next/server";
import pool from "@/lib/db.js";

export async function GET(req, { params }) {
  const { id } = params; // ✅ correct

  try {
    const [rows] = await pool.query(
      `SELECT i.id, i.front, i.back, c.name, c.year
       FROM item i
       JOIN collectible c ON i.collectible_id = c.id
       WHERE i.user_id = ?`,
      [id]
    );
    return NextResponse.json(rows);
  } catch (err) {
    console.error("Error fetching user items:", err);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
