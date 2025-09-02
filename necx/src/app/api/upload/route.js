import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import mysql from "mysql2/promise";
import { Readable } from "stream";

export const config = {
  api: {
    bodyParser: false,
  },
};

console.log("DB config:", {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  //host: "192.168.2.10",
  //port: 3307,
  //user: "necx",
  //password: "Dvr7$HK9kH&#mBGz",
  //database: "necx",
  waitForConnections: true,
  connectionLimit: 5,
});

const uploadDir = path.join(process.cwd(), "public", "uploads");

export async function POST(req) {
  try {
    console.log("📌 POST /api/upload called");

    const formidable = (await import("formidable")).default;

    const form = formidable({
      multiples: true,
      uploadDir,
      keepExtensions: true,
    });

    // Wrap request for Formidable
    const nodeReq = Object.assign(Readable.fromWeb(req.body), {
      headers: Object.fromEntries(req.headers),
      method: req.method,
      url: req.url,
    });

    console.log("📌 Parsing form data...");
    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(nodeReq, (err, fields, files) => {
        if (err) reject(err);
        else resolve([fields, files]);
      });
    });

    console.log("📌 Form parsed:", { fields, files });

    // Flatten all files from Formidable
    const fileArray = [];
    for (const key in files) {
      const f = files[key];
      if (Array.isArray(f)) {
        fileArray.push(...f);
      } else {
        fileArray.push(f);
      }
    }

    console.log(`📌 Flattened files array:`, fileArray.map(f => f.originalFilename));

    // Group files by card number
    const groups = {};
    for (const file of fileArray) {
    // Accept either underscore or dash between parts
    const match = file.originalFilename.match(/^IMG[-_](\d+)[-_]?(FRONT|BACK)\.jpg$/i);
    if (!match) {
        console.log(`⚠️ Skipping file (pattern mismatch): ${file.originalFilename}`);
        continue;
    }

    const [, num, side] = match;
    if (!groups[num]) groups[num] = {};
    groups[num][side.toLowerCase()] = file;
    }

    console.log("📌 Grouped files:", Object.keys(groups));

    // Process each group
    const results = [];
    for (const num of Object.keys(groups).sort((a, b) => a - b)) {
      const { front, back } = groups[num];

      if (!front || !back) {
        console.log(`⚠️ Skipping group ${num} (missing front or back)`);
        continue;
      }

      console.log(`📌 Processing group ${num}: front=${front.originalFilename}, back=${back.originalFilename}`);

      const [rows] = await pool.query(
        "INSERT INTO item (collectible_id, user_id, front, back) VALUES (?, ?, '', '')",
        [-1, 1]
      );
      const itemId = rows.insertId;
      console.log(`📌 Inserted item with ID ${itemId}`);

      const frontFileName = `${itemId}_FRONT.jpg`;
      const backFileName = `${itemId}_BACK.jpg`;

      const frontPath = path.join(uploadDir, frontFileName);
      const backPath = path.join(uploadDir, backFileName);

      console.log(`📌 Renaming files: ${front.filepath} -> ${frontPath}, ${back.filepath} -> ${backPath}`);
      await fs.rename(front.filepath, frontPath);
      await fs.rename(back.filepath, backPath);

      const dbFrontPath = `/uploads/${frontFileName}`;
      const dbBackPath = `/uploads/${backFileName}`;

      console.log(`📌 Updating DB paths for item ${itemId}`);
      await pool.query(
        "UPDATE item SET front=?, back=? WHERE id=?",
        [dbFrontPath, dbBackPath, itemId]
      );

      results.push({ id: itemId, front: dbFrontPath, back: dbBackPath });
      console.log(`✅ Finished processing group ${num}`);
    }

    console.log("📌 All files processed successfully");
    return NextResponse.json({ success: true, items: results });
  } catch (err) {
    console.error("❌ Error in /api/upload:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}