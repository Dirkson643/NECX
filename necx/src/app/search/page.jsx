"use client";

import { useState } from "react";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const searchUsers = async (q) => {
    setQuery(q);
    if (q.length < 2) {
      setUsers([]);
      return;
    }

    const res = await fetch(`/api/users/search?query=${encodeURIComponent(q)}`);
    const data = await res.json();
    setUsers(data);
  };

  const selectUser = async (user) => {
    setSelectedUser(user);
    setUsers([]);

    const res = await fetch(`/api/users/${user.id}/items`);
    const data = await res.json();
    setItems(data);
  };

  // Convert a local image URL to base64
  const toBase64 = async (url) => {
    const res = await fetch(url);
    const blob = await res.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  // Identify card via Ximilar API
  const identifyCard = async (item) => {
    try {
      const base64 = await toBase64(item.front);

      const res = await fetch("/api/identify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ file: base64, itemId: item.id }),
      });

      const data = await res.json();
      console.log("Ximilar Response:", data);
    } catch (err) {
      console.error("Error identifying card:", err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Search Users</h1>

      {/* Search input */}
      <input
        type="text"
        value={query}
        onChange={(e) => searchUsers(e.target.value)}
        placeholder="Type a user name..."
        className="border rounded p-2 w-full"
      />

      {/* User list */}
      {users.length > 0 && (
        <ul className="border rounded mt-2 bg-white shadow">
          {users.map((u) => (
            <li
              key={u.id}
              className="p-2 cursor-pointer hover:bg-gray-100"
              onClick={() => selectUser(u)}
            >
              {u.name}
            </li>
          ))}
        </ul>
      )}

      {/* Items */}
      {selectedUser && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">
            Items for {selectedUser.name}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {items.map((item) => (
              <div key={item.id} className="border rounded shadow p-2">
                <div className="flex space-x-2">
                  {/* Front image clickable */}
                  <img
                    src={item.front}
                    alt="Front"
                    className="w-24 h-32 object-cover cursor-pointer"
                    onClick={() => identifyCard(item)}
                  />
                  <img
                    src={item.back}
                    alt="Back"
                    className="w-24 h-32 object-cover"
                  />
                </div>
                <div className="mt-2">
                  <p className="font-bold">{item.name}</p>
                  <p className="text-sm text-gray-600">{item.year}</p>
                  {/* ID button */}
                  <button
                    onClick={() => identifyCard(item)}
                    className="mt-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    ID
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}