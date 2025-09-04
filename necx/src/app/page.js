// src/app/page.js
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Upload, IdCard, FolderOpen } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="w-full flex justify-between items-center px-8 py-4 bg-white shadow">
        <h1 className="text-2xl font-bold text-blue-600">NECX</h1>
        <button className="text-sm text-gray-600 hover:text-blue-600">
          Login / Profile
        </button>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-16 bg-gradient-to-r from-blue-50 to-blue-100">
        <h2 className="text-4xl font-extrabold text-gray-800">
          Welkom bij NECX
        </h2>
        <p className="mt-4 text-lg text-gray-600 max-w-xl">
          Beheer, identificeer en deel je collectible cards in één platform.
        </p>
        <Link
          href="/users/me/items"
          className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
        >
          👉 Start met je collectie
        </Link>
      </section>

      {/* Navigation Grid */}
      <section className="flex-1 px-8 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <Link href="/search">
            <Card className="cursor-pointer hover:shadow-lg transition">
              <CardContent className="flex flex-col items-center py-8">
                <Search className="w-10 h-10 text-blue-600 mb-4" />
                <h3 className="text-lg font-semibold">Zoek Kaarten</h3>
                <p className="text-sm text-gray-500 mt-2 text-center">
                  Vind snel kaarten in de database.
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/import">
            <Card className="cursor-pointer hover:shadow-lg transition">
              <CardContent className="flex flex-col items-center py-8">
                <Upload className="w-10 h-10 text-blue-600 mb-4" />
                <h3 className="text-lg font-semibold">Importeer Kaarten</h3>
                <p className="text-sm text-gray-500 mt-2 text-center">
                  Upload scans van je kaarten.
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/identify">
            <Card className="cursor-pointer hover:shadow-lg transition">
              <CardContent className="flex flex-col items-center py-8">
                <IdCard className="w-10 h-10 text-blue-600 mb-4" />
                <h3 className="text-lg font-semibold">Identificeer</h3>
                <p className="text-sm text-gray-500 mt-2 text-center">
                  Herken kaarten automatisch met AI.
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/users/me/items">
            <Card className="cursor-pointer hover:shadow-lg transition">
              <CardContent className="flex flex-col items-center py-8">
                <FolderOpen className="w-10 h-10 text-blue-600 mb-4" />
                <h3 className="text-lg font-semibold">Mijn Collectie</h3>
                <p className="text-sm text-gray-500 mt-2 text-center">
                  Bekijk en beheer je eigen collectie.
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full text-center py-6 text-sm text-gray-500 bg-white border-t">
        © {new Date().getFullYear()} NECX | Over | Contact | Github
      </footer>
    </main>
  );
}
