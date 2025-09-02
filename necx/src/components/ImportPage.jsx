"use client";

import { useState } from "react";

export default function ImportPage() {
  const [files, setFiles] = useState([]);
  const [status, setStatus] = useState("");

  const handleUpload = async () => {
    const formData = new FormData();
    for (const file of files) {
      formData.append("files", file);
    }

    setStatus("Uploading...");
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (data.success) {
      setStatus(`✅ ${data.items.length} kaarten geüpload`);
    } else {
      setStatus("❌ Fout bij uploaden: " + data.error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl mb-4">Importeer Scans</h1>
      <input
        type="file"
        multiple
        accept=".jpg"
        onChange={(e) => setFiles(Array.from(e.target.files))}
      />
      <button
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
        onClick={handleUpload}
      >
        Upload
      </button>
      <p className="mt-3">{status}</p>
    </div>
  );
}
