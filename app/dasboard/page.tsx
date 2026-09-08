"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Port {
  site_id: string;
  site_name: string;
  lat?: number;
  lon?: number;
}

interface TideData {
  dateTime?: string;
  height?: number;
  type?: "PM" | "BM";
  coef?: number;
}

export default function DashboardPage() {
  const [ports, setPorts] = useState<Port[]>([]);
  const [search, setSearch] = useState("");
  const [selectedPortId, setSelectedPortId] = useState("");
  const [selectedPortName, setSelectedPortName] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingData, setLoadingData] = useState(false);
  const [tideExtremas, setTideExtremas] = useState<TideData[]>([]);
  const [hourlyTides, setHourlyTides] = useState<TideData[]>([]);

  useEffect(() => {
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

  useEffect(() => {
    if (!selectedPortId) return;
    const port = ports.find((p) => p.site_id === selectedPortId);
    if (port) setSelectedPortName(port.site_name);

    setLoadingData(true);
    // Exemple d'appel pour récupérer les données détaillées du port sélectionné
    fetch(`https://api-maree.fr/v1/tides/${selectedPortId}`)
      .then((res) => res.json())
      .then((data) => {
        // Adaptation selon la structure exacte renvoyée par l'API
        setTideExtremas(data.extremas || data.tides || []);
        setHourlyTides(data.hourly || []);
        setLoadingData(false);
      })
      .catch((err) => {
        console.error("Erreur de chargement des données de marée", err);
        setLoadingData(false);
      });
  }, [selectedPortId, ports]);

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
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-slate-100 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Navigation Header */}
        <div className="flex items-center justify-between bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-4 shadow-xl">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-xl shadow-inner">
              🌊
            </span>
            <div>
              <h1 className="text-base font-bold tracking-tight text-white">Marées Sync</h1>
              <p className="text-xs text-slate-400">Dashboard analytique des 24h</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded-xl border border-slate-700 transition-all"
            >
              📅 Sync iCal
            </Link>
            <span className="px-3.5 py-2 bg-blue-600/20 border border-blue-500/30 text-blue-400 text-xs font-semibold rounded-xl shadow-inner">
              📊 Dashboard
            </span>
          </div>
        </div>

        {/* Section Sélection du Port */}
        <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                Rechercher un port
              </label>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Ex: La Rochelle, Brest..."
                className="w-full px-4 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl focus:outline-none focus:border-blue-500 text-sm text-white placeholder-slate-500 transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 flex justify-between">
                <span>Sélectionner le port</span>
                <span className="text-blue-400 font-normal">({filteredPorts.length} dispos)</span>
              </label>
              <select
                value={selectedPortId}
                onChange={(e) => setSelectedPortId(e.target.value)}
                disabled={loading}
                className="w-full px-4 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl focus:outline-none focus:border-blue-500 text-sm text-white transition-all appearance-none cursor-pointer disabled:opacity-50"
              >
                <option value="" className="bg-slate-900 text-slate-400">
                  {loading ? "Chargement..." : "-- Choisir un port --"}
                </option>
                {filteredPorts.map((port) => (
                  <option key={port.site_id} value={port.site_id} className="bg-slate-900 text-white">
                    {port.site_name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Affichage des Données Détaillées si un port est sélectionné */}
        {selectedPortId ? (
          <div className="space-y-6 animate-in fade-in duration-300">
            
            {/* Fiche d'identité du port */}
            <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 shadow-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-md border border-blue-500/20">
                  Station active
                </span>
                <h2 className="text-2xl font-extrabold text-white mt-2">{selectedPortName}</h2>
                <p className="text-xs text-slate-400 mt-1">Identifiant technique : {selectedPortId}</p>
              </div>
              {loadingData && (
                <div className="flex items-center gap-2 text-xs text-blue-400 animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                  Chargement des données marégraphiques...
                </div>
              )}
            </div>

            {/* Grille de données : Pleines et Basses Mers (Extremas) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200">
                    🌊 Pleines & Basses Mers (24h)
                  </h3>
                  <span className="text-xs text-slate-400">Extremas</span>
                </div>
                
                <div className="space-y-3">
                  {tideExtremas.length > 0 ? (
                    tideExtremas.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-slate-950/50 border border-slate-800/80 rounded-xl">
                        <div className="flex items-center gap-3">
                          <span className={`px-2 py-1 rounded-lg text-xs font-bold ${item.type === 'PM' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'bg-slate-800 text-slate-400 border border-slate-700'}`}>
                            {item.type || 'TIDE'}
                          </span>
                          <span className="text-sm font-semibold text-white">{item.dateTime || '--:--'}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-bold text-white">{item.height ? `${item.height} m` : '--'}</span>
                          {item.coef && <span className="block text-xs text-blue-400">Coef : {item.coef}</span>}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-slate-500 text-center py-4">
                      {loadingData ? "Récupération des extrêmes..." : "Données d'extrema disponibles via l'API du port."}
                    </p>
                  )}
                </div>
              </div>

              {/* Bloc tendance / Analyse horaire */}
              <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200">
                    📈 Suivi Horaire & Hauteurs
                  </h3>
                  <span className="text-xs text-slate-400">Pas horaire</span>
                </div>

                <div className="max-h-64 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                  {hourlyTides.length > 0 ? (
                    hourlyTides.map((hour, idx) => (
                      <div key={idx} className="flex items-center justify-between px-3 py-2 bg-slate-950/30 border border-slate-800/40 rounded-lg text-xs">
                        <span className="text-slate-400">{hour.dateTime}</span>
                        <span className="font-medium text-slate-200">{hour.height} m</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-slate-500 text-center py-4">
                      {loadingData ? "Chargement du profil horaire..." : "Courbe de hauteur continue prête à l'affichage."}
                    </p>
                  )}
                </div>
              </div>

            </div>

          </div>
        ) : (
          <div className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-12 text-center space-y-3">
            <span className="text-3xl">📍</span>
            <h3 className="text-sm font-semibold text-slate-300">Aucun port sélectionné</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Utilisez la barre de recherche ci-dessus pour sélectionner un port et afficher l'ensemble de ses données marégraphiques détaillées.
            </p>
          </div>
        )}

        {/* Pied de page Légal et Copyright */}
        <div className="pt-6 border-t border-slate-800/80 text-center space-y-1.5">
          <p className="text-[11px] leading-relaxed text-slate-500">
            Données de marée fournies par api-maree.fr sous licence CC BY, calculées à partir de composantes harmoniques Ifremer / PREVIMER, elles-mêmes sous licence CC BY.
          </p>
          <p className="text-[11px] font-medium text-slate-400">
            © 2026 Clément Saux. All rights reserved.
          </p>
        </div>

      </div>
    </main>
  );
}