"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Port {
  site_id: string;
  site_name: string;
}

export default function MareesApp() {
  const [ports, setPorts] = useState<Port[]>([]);
  const [search, setSearch] = useState("");
  const [selectedPortId, setSelectedPortId] = useState("");
  const [loading, setLoading] = useState(true);
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    setOrigin(window.location.host);
    fetch("https://api-maree.fr/sites")
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : data.sites || [];
        setPorts(list);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur de chargement des ports", err);
        setLoading(false);
      });
  }, []);

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
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-slate-100 flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-xl space-y-4">
        
        {/* BLOC DE NAVIGATION */}
        <div className="flex items-center justify-between bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-3.5 shadow-xl">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            <span className="text-xs font-semibold text-slate-300">Générateur iCal</span>
          </div>
          <Link
            href="/dashboard"
            className="px-3 py-1.5 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 text-xs font-semibold rounded-lg transition-all flex items-center gap-1 shadow-sm"
          >
            📊 Dashboard 24h &rarr;
          </Link>
        </div>

        {/* BLOC PRINCIPAL DE LA PAGE 1 */}
        <div className="w-full bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6">
          
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-600/10 border border-blue-500/20 text-2xl mb-1 shadow-inner">
              🌊
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-blue-400 bg-clip-text text-transparent">
              Marées Sync
            </h1>
            <p className="text-sm text-slate-400 max-w-md mx-auto">
              Synchronisez les 30 jours glissants de marées de n'importe quel port français directement dans votre agenda.
            </p>
          </div>

          <div className="space-y-4 pt-2">
            {/* Étape 1 : Recherche */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                1. Rechercher un port
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-500">
                  🔍
                </span>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Ex: La Rochelle, Brest, Arcachon..."
                  className="w-full pl-10 pr-4 py-3 bg-slate-950/60 border border-slate-800 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm text-white placeholder-slate-500 transition-all"
                />
              </div>
            </div>

            {/* Étape 2 : Liste déroulante */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 flex justify-between">
                <span>2. Sélectionner dans la liste</span>
                <span className="text-blue-400 font-normal">
                  ({filteredPorts.length} port{filteredPorts.length > 1 ? "s" : ""} disponible{filteredPorts.length > 1 ? "s" : ""})
                </span>
              </label>
              <div className="relative">
                <select
                  value={selectedPortId}
                  onChange={(e) => setSelectedPortId(e.target.value)}
                  disabled={loading}
                  className="w-full px-4 py-3 bg-slate-950/60 border border-slate-800 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm text-white transition-all appearance-none cursor-pointer disabled:opacity-50"
                >
                  <option value="" className="bg-slate-900 text-slate-400">
                    {loading ? "Chargement des ports en cours..." : "-- Choisir un port --"}
                  </option>
                  {filteredPorts.map((port) => (
                    <option key={port.site_id} value={port.site_id} className="bg-slate-900 text-white">
                      {port.site_name}
                    </option>
                  ))}
                </select>
                <span className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-slate-500 text-xs">
                  ▼
                </span>
              </div>
            </div>

            {/* Actions conditionnelles */}
            {selectedPortId && (
              <div className="mt-6 p-5 bg-gradient-to-br from-blue-950/40 to-slate-900/60 border border-blue-500/20 rounded-xl space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-blue-400">
                    Options de synchronisation
                  </h3>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={`/api/feed/${selectedPortId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-xl shadow-lg shadow-blue-600/20 transition-all duration-200"
                  >
                    📥 Télécharger .ics
                  </a>
                  <a
                    href={`webcal://${origin}/api/feed/${selectedPortId}`}
                    className="flex-1 inline-flex items-center justify-center px-4 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-sm font-medium rounded-xl transition-all duration-200"
                  >
                    📅 S'abonner (Webcal)
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Mention légale obligatoire intégrée */}
          <div className="pt-4 border-t border-slate-800/80 text-center space-y-1">
            <p className="text-[11px] leading-relaxed text-slate-500">
              Données de marée fournies par api-maree.fr sous licence CC BY, calculées à partir de composantes harmoniques Ifremer / PREVIMER, elles-mêmes sous licence CC BY.
            </p>
            <p className="text-[11px] font-medium text-slate-400">
              © 2026 Clément Saux. All rights reserved.
            </p>
          </div>

        </div>

      </div>
    </main>
  );
}