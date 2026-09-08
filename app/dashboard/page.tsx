"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Port {
  site_id: string;
  site_name: string;
}

interface TideEvent {
  type: "PM" | "BM";
  timeFormatted: string;
  dateFormatted: string;
  height: string;
  coef?: string;
  dateTime: Date;
}

export default function DashboardPage() {
  const [ports, setPorts] = useState<Port[]>([]);
  const [search, setSearch] = useState("");
  const [selectedPortId, setSelectedPortId] = useState("");
  const [selectedPortName, setSelectedPortName] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingData, setLoadingData] = useState(false);
  const [tideExtremas, setTideExtremas] = useState<TideEvent[]>([]);

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

    // Récupération et parsing du fichier ICS officiel du port
    fetch(`https://api-maree.fr/v1/ics/${selectedPortId}`)
      .then((res) => res.text())
      .then((text) => {
        const events: TideEvent[] = [];
        const blocks = text.split("BEGIN:VEVENT");

        for (let i = 1; i < blocks.length; i++) {
          const block = blocks[i];
          const summaryMatch = block.match(/SUMMARY:(.*)/);
          const dtstartMatch = block.match(/DTSTART(?:;[^:]*)?:([0-9TISOZ]+)/);
          const descMatch = block.match(/DESCRIPTION:(.*)/);

          if (summaryMatch && dtstartMatch) {
            const summary = summaryMatch[1].trim();
            const dtStr = dtstartMatch[1].trim();
            const description = descMatch ? descMatch[1].trim() : "";

            const year = parseInt(dtStr.substring(0, 4));
            const month = parseInt(dtStr.substring(4, 6)) - 1;
            const day = parseInt(dtStr.substring(6, 8));
            const hour = parseInt(dtStr.substring(9, 11) || "0");
            const minute = parseInt(dtStr.substring(11, 13) || "0");

            const date = new Date(Date.UTC(year, month, day, hour, minute));
            const isPM = summary.toLowerCase().includes("plein") || summary.toLowerCase().includes("pm");
            const type = isPM ? "PM" : "BM";

            const fullText = `${summary} ${description}`;
            const heightMatch = fullText.match(/([0-9]+[.,][0-9]+)\s*m/i);
            const height = heightMatch ? heightMatch[1].replace(",", ".") + " m" : "--";

            const coefMatch = fullText.match(/coef[ficiênt\s]*[:\s]*([0-9]+)/i);
            const coef = coefMatch ? coefMatch[1] : undefined;

            events.push({
              type,
              dateTime: date,
              timeFormatted: date.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Paris" }),
              dateFormatted: date.toLocaleDateString("fr-FR", { weekday: "short", day: "numeric", month: "short", timeZone: "Europe/Paris" }),
              height,
              coef,
            });
          }
        }

        events.sort((a, b) => a.dateTime.getTime() - b.dateTime.getTime());
        setTideExtremas(events);
        setLoadingData(false);
      })
      .catch((err) => {
        console.error("Erreur de chargement des marées", err);
        setLoadingData(false);
      });
  }, [selectedPortId, ports]);

  const filteredPorts = ports
    .filter((port) => (port.site_name || "").toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => (a.site_name || "").localeCompare(b.site_name || "", "fr", { sensitivity: "base" }));

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
              <p className="text-xs text-slate-400">Dashboard analytique des marées</p>
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
          <div className="space-y-6">
            
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
                  Chargement des marées...
                </div>
              )}
            </div>

            {/* Grille des Pleines & Basses Mers */}
            <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200">
                  🌊 Calendrier des Pleines & Basses Mers (Prochains jours)
                </h3>
                <span className="text-xs text-slate-400">{tideExtremas.length} événements</span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto pr-1">
                {tideExtremas.length > 0 ? (
                  tideExtremas.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3.5 bg-slate-950/50 border border-slate-800/80 rounded-xl">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${item.type === 'PM' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'bg-slate-800 text-slate-400 border border-slate-700'}`}>
                            {item.type === 'PM' ? 'Pleine Mer' : 'Basse Mer'}
                          </span>
                          <span className="text-xs text-slate-400">{item.dateFormatted}</span>
                        </div>
                        <p className="text-base font-bold text-white pt-1">{item.timeFormatted}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-extrabold text-white">{item.height}</span>
                        {item.coef && <span className="block text-xs font-semibold text-blue-400">Coef : {item.coef}</span>}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-500 text-center col-span-full py-8">
                    {loadingData ? "Analyse du calendrier en cours..." : "Aucune donnée disponible pour ce port."}
                  </p>
                )}
              </div>
            </div>

          </div>
        ) : (
          <div className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-12 text-center space-y-3">
            <span className="text-3xl">📍</span>
            <h3 className="text-sm font-semibold text-slate-300">Aucun port sélectionné</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Utilisez la recherche ci-dessus pour sélectionner un port et afficher l'ensemble de ses horaires et hauteurs de marée.
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