"use client";

import NavCard from "@/components/NavCard";

export default function Home() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Welcome to NECX</h1>
      <p className="mb-8 text-gray-600">
        Manage and identify your collectible cards with ease.
      </p>
      <div className="grid grid-cols-2 gap-6">
        <NavCard title="Search Cards" href="/search" icon="🔍" />
        <NavCard title="Import Cards" href="/import" icon="📤" />
        <NavCard title="Identify a Card" href="/identify" icon="🆔" />
        <NavCard title="My Collection" href="/users/me/items" icon="👤" />
      </div>
    </main>
  );
}
