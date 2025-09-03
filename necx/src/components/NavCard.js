"use client";

import Link from "next/link";
import Image from "next/image";

export default function NavCard({ title, href, icon, image }) {
  return (
    <Link
      href={href}
      className="block rounded-2xl shadow-md hover:shadow-lg transition p-6 bg-white"
    >
      <div className="flex items-center space-x-4">
        {image ? (
          <Image
            src={image}
            alt={title}
            width={48}
            height={48}
            className="rounded-lg"
          />
        ) : (
          <span className="text-3xl">{icon}</span>
        )}
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
    </Link>
  );
}
