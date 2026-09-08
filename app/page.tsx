"use client";

import { useState, useEffect } from "react";

interface Port {
  site_id: string;
  site_name: string;
}

export default function MareesApp() {
  const [ports, setPorts] = useState<Port[]>([]);
  const [search, setSearch] = useState("");
  const [selectedPortId, setSelectedPortId] = useState("");
  const [loading, setLoading] = useState(true);

  // 1. Chargement de la liste exhaustive au démarrage
  useEffect(() => {
    fetch("https://api-maree.fr/sites")
      .then((res) => res.json())
      .then((data) => {
        // L'API renvoie un objet avec la clé "sites"
        const list = Array.isArray(data) ? data : data.sites || [];
        setPorts(list);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur de chargement des ports", err);
        setLoading(false);
      });
  }, []);

  // 2. Filtrage dynamique + Tri alphabétique français
  const filteredPorts = ports
    .filter((port) =>
      (port.site_name || "").toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) =>
      (a.site_name || "").localeCompare(b.site_name || "", "fr", {
        sensitivity: "base",
      })
    );

  return (
    <div className="max-w-xl mx-auto p-6 bg-slate-900 text-slate-100 rounded-xl shadow-xl border border-slate-700 mt-10">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold flex items-center justify-center gap-2">
          🌊 Marées Sync
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Synchronisez les 30 jours glissants de marées de n'importe quel port français dans votre agenda.
        </p>
      </div>

      <div className="space-y-4">
        {/* Étape 1 : Recherche textuelle optionnelle pour filtrer */}
        <div>
          <label className="block text-sm font-medium mb-1">
            1. Rechercher votre port (ex: La Rochelle, Brest, Arcachon...)
          </label>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tapez pour filtrer..."
            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-blue-500 text-white"
          />
        </div>

        {/* Étape 2 : Liste déroulante complète et interactive */}
        <div>
          <label className="block text-sm font-medium mb-1">
            2. Sélectionner dans la liste ({filteredPorts.length} port{filteredPorts.length > 1 ? 's' : ''} disponible{filteredPorts.length > 1 ? 's' : ''})
          </label>
          <select
            value={selectedPortId}
            onChange={(e) => setSelectedPortId(e.target.value)}
            disabled={loading}
            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-blue-500 text-white"
          >
            <option value="">
              {loading ? "Chargement des ports..." : "-- Choisir un port --"}
            </option>
            {filteredPorts.map((port) => (
              <option key={port.site_id} value={port.site_id}>
                {port.site_name}
              </option>
            ))}
          </select>
        </div>

        {/* Actions conditionnelles si un port est sélectionné */}
        {selectedPortId && (
          <div className="mt-6 p-4 bg-slate-800 border border-slate-700 rounded-lg space-y-3">
            <h3 className="font-semibold text-blue-400">Actions pour le port sélectionné</h3>
            <div className="flex gap-3 flex-wrap">
              <a
                href={`https://api-maree.fr/v1/ics/${selectedPortId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition"
              >
                Télécharger le fichier .ics
              </a>
              <a
                href={`webcal://api-maree.fr/v1/ics/${selectedPortId}`}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium rounded-lg transition"
              >
                S'abonner via URL Agenda
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Message légal d'origine en bas de page */}
      <div className="mt-8 pt-4 border-t border-slate-800 text-center text-xs text-slate-500">
        Données fournies par api-maree.fr • CC BY Ifremer/PREVIMER
      </div>
    </div>
  );
}