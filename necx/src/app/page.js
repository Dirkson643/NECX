"use client";

import { useEffect, useState } from "react";
import Card from "@/components/Card";

export default function HomePage() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadCards() {
      try {
        const res = await fetch("/api/cards");
        const data = await res.json();
        if (res.ok) {
          setCards(Array.isArray(data) ? data : []);
        } else {
          setError(data.error || "Unknown error");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadCards();
  }, []);

  if (loading) return <p className="p-6">Loading cards...</p>;
  if (error) return <p className="p-6 text-red-600">Error: {error}</p>;

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">My Trading Card Collection</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cards.map(card => (
          <Card key={card.id} name={card.name} image={card.image} />
        ))}
      </div>
    </main>
  );
}
