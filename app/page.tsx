// app/page.tsx
"use client";

import { useState } from "react";
import { PORTS } from "@/lib/ports";

export default function Home() {
  const [search, setSearch] = useState("");

  const filteredPorts = PORTS.filter((port) =>
    port.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen p-6 max-w-2xl mx-auto font-sans">
      <h1 className="text-3xl font-bold mb-2">Marées Sync</h1>
      <p className="text-gray-600 mb-6">
        Générez et abonnez-vous aux flux de marées iCal (30 jours glissants).
      </p>

      {/* Barre de recherche */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="🔍 Rechercher un port (ex: La Rochelle, Brest...)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Liste des ports filtrés */}
      <div className="space-y-3">
        {filteredPorts.length === 0 ? (
          <p className="text-gray-500 text-center py-8">Aucun port trouvé.</p>
        ) : (
          filteredPorts.map((port) => {
            const feedUrl = `https://${typeof window !== "undefined" ? window.location.host : ""}/api/feed/${port.id}`;
            const webcalUrl = `webcal://${typeof window !== "undefined" ? window.location.host : ""}/api/feed/${port.id}`;

            return (
              <div
                key={port.id}
                className="p-4 border border-gray-200 rounded-lg shadow-sm bg-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
              >
                <div>
                  <h2 className="font-semibold text-lg">{port.name}</h2>
                  <span className="text-xs text-gray-400">ID: {port.id}</span>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={webcalUrl}
                    className="px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition"
                  >
                    S'abonner
                  </a>
                  <a
                    href={`/api/feed/${port.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-200 transition"
                  >
                    Télécharger .ics
                  </a>
                </div>
              </div>
            );
          })
        )}
      </div>

      <footer className="mt-12 text-center text-xs text-gray-400">
        Données de marées fournies par api-maree.fr — Mention CC BY Ifremer/PREVIMER
      </footer>
    </main>
  );
}