import mysql from "mysql2/promise";

async function testConnection() {
  const pool = mysql.createPool({
    host: "192.168.2.10",       // IP van je NAS
    port: 3307,                 // MariaDB poort
    user: "necx",
    password: "Dvr7$HK9kH&#mBGz",
    database: "necx",
    waitForConnections: true,
    connectionLimit: 5
  });

  let connection;
  try {
    connection = await pool.getConnection();
    console.log("✅ Verbonden met MariaDB vanaf Node.js");

    // Voer dezelfde INSERT uit als in mysqlsh
    const [result] = await connection.query(
      "INSERT INTO item (collectible_id, user_id, front, back) VALUES (?, ?, ?, ?)",
      [-1, 1, "", ""]
    );

    console.log("✅ Query gelukt:", result);

    // Optioneel: SELECT om te checken
    const [rows] = await connection.query("SELECT * FROM item LIMIT 5");
    console.log("Sample rows:", rows);
  } catch (err) {
    console.error("❌ Fout:", err);
  } finally {
    if (connection) await connection.release();
    await pool.end();
  }
}

testConnection();
