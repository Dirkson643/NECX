"use client";

import { useEffect, useState } from "react";
import Card from "@/components/Card";

export default function Home() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  if (loading) return <p className="p-6">Loading cards...</p>;
  if (error) return <p className="p-6 text-red-600">Error: {error}</p>;
  
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Welcome to NECX</h1>
      <p className="mb-8 text-gray-600">
        Manage and identify your collectible cards with ease.
      </p>
      <div className="grid grid-cols-2 gap-6">
        <Card title="Search Cards" href="/search" icon="🔍" />
        <Card title="Import Cards" href="/import" icon="📤" />
        <Card title="Identify a Card" href="/identify" icon="🆔" />
        <Card title="My Collection" href="/users/me/items" icon="👤" />
      </div>
    </main>
  )
}
