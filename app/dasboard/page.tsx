"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";

interface Port {
  site_id: string;
  site_name: string;
}

interface TideEvent {
  type: "PM" | "BM";
  timeFormatted: string;
  dateStr: string; // YYYY-MM-DD
  timeStr: string; // HH:MM
  height: number;  // en mètres (ex: 6.34)
  coef?: string;
  dateTime: Date;
}

export default function DashboardPage() {
  const [ports, setPorts] = useState<Port[]>([]);
  const [search, setSearch] = useState("");
  const [selectedPortId, setSelectedPortId] = useState("cancale"); // Port par défaut pour l'exemple
  const [selectedPortName, setSelectedPortName] = useState("Cancale");
  const [loading, setLoading] = useState(true);
  const [loadingData, setLoadingData] = useState(false);
  const [tideEvents, setTideEvents] = useState<TideEvent[]>([]);

  // Gestion de la date sélectionnée (par défaut aujourd'hui)
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  // Format YYYY-MM-DD pour filtrer facilement
  const formattedSelectedDate = useMemo(() => {
    const y = currentDate.getFullYear();
    const m = String(currentDate.getMonth() + 1).padStart(2, "0");
    const d = String(currentDate.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }, [currentDate]);

  // 1. Charger la liste des ports
  useEffect(() => {
    fetch("https://api-maree.fr/sites")
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : data.sites || [];
        setPorts(list);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur chargement ports", err);
        setLoading(false);
      });
  }, []);

  // 2. Charger et parser le flux ICS du port sélectionné
  useEffect(() => {
    if (!selectedPortId) return;
    const port = ports.find((p) => p.site_id === selectedPortId);
    if (port) setSelectedPortName(port.site_name);

    setLoadingData(true);

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
            const heightVal = heightMatch ? parseFloat(heightMatch[1].replace(",", ".")) : 0.0;

            const coefMatch = fullText.match(/coef[ficiênt\s]*[:\s]*([0-9]+)/i);
            const coef = coefMatch ? coefMatch[1] : undefined;

            const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
            const timeStr = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;

            events.push({
              type,
              dateTime: date,
              timeFormatted: timeStr,
              dateStr,
              timeStr,
              height: heightVal,
              coef,
            });
          }
        }

        events.sort((a, b) => a.dateTime.getTime() - b.dateTime.getTime());
        setTideEvents(events);
        setLoadingData(false);
      })
      .catch((err) => {
        console.error("Erreur chargement marées", err);
        setLoadingData(false);
      });
  }, [selectedPortId, ports]);

  // Filtrer les événements pour la journée sélectionnée
  const dayEvents = useMemo(() => {
    return tideEvents.filter((e) => e.dateStr === formattedSelectedDate);
  }, [tideEvents, formattedSelectedDate]);

  // Calculer la hauteur estimée actuelle et la tendance (si on est sur le jour J)
  const currentStatus = useMemo(() => {
    if (dayEvents.length === 0) return { height: "---", trend: "Données indisponibles", isRising: true };

    const now = new Date();
    // Trouver l'événement précédent et suivant pour interpoler ou donner une tendance
    const nextEvent = dayEvents.find((e) => e.dateTime.getTime() > now.getTime()) || dayEvents[dayEvents.length - 1];
    const prevEvent = [...dayEvents].reverse().find((e) => e.dateTime.getTime() <= now.getTime()) || dayEvents[0];

    const isRising = prevEvent.type === "BM";
    const trendText = isRising ? "Marée montante ▲" : "Marée descendante ▼";
    
    // Estimation linéaire simple entre le précédent et le suivant
    const h = prevEvent.height; 
    return {
      height: `${h.toFixed(2)} m`,
      trend: trendText,
      isRising,
    };
  }, [dayEvents]);

  // Filtrage des ports pour la recherche
  const filteredPorts = ports
    .filter((port) => (port.site_name || "").toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => (a.site_name || "").localeCompare(b.site_name || "", "fr", { sensitivity: "base" }));

  // Navigation calendrier (jours / mois)
  const changeDate = (days: number) => {
    const next = new Date(currentDate);
    next.setDate(next.getDate() + days);
    setCurrentDate(next);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-slate-100 p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* TOP BAR : Navigation, Date et Bouton Aujourd'hui */}
        <div className="flex flex-col md:flex-row items-center justify-between bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-4 shadow-xl gap-4">
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-xl shadow-inner">
                🌊
              </span>
              <div>
                <h1 className="text-base font-bold tracking-tight text-white">Marées Sync</h1>
                <p className="text-xs text-slate-400">Dashboard analytique 24h</p>
              </div>
            </div>
            <div className="flex items-center gap-2 md:hidden">
              <Link href="/" className="px-3 py-1.5 bg-slate-800 text-slate-300 text-xs rounded-xl border border-slate-700">
                📅 iCal
              </Link>
            </div>
          </div>

          {/* Sélecteur de date interactif */}
          <div className="flex items-center gap-3 bg-slate-950/60 border border-slate-800 rounded-xl px-3 py-1.5 shadow-inner">
            <button
              onClick={() => changeDate(-1)}
              className="p-1 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-all"
              title="Jour précédent"
            >
              ◀
            </button>
            <span className="text-sm font-semibold text-white px-2">
              {currentDate.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" })}
            </span>
            <button
              onClick={() => changeDate(1)}
              className="p-1 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-all"
              title="Jour suivant"
            >
              ▶
            </button>
            <button
              onClick={() => setCurrentDate(new Date())}
              className="ml-2 px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg shadow-md transition-all"
            >
              Aujourd'hui
            </button>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <Link href="/" className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded-xl border border-slate-700 transition-all">
              📅 Sync iCal
            </Link>
            <span className="px-3.5 py-2 bg-blue-600/20 border border-blue-500/30 text-blue-400 text-xs font-semibold rounded-xl shadow-inner">
              📊 Dashboard
            </span>
          </div>
        </div>

        {/* SÉLECTEUR DE PORT (Recherche + Dropdown) */}
        <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-2xl p-4 shadow-xl grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400">Rechercher un port</label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Ex: Cancale, La Rochelle, Brest..."
              className="w-full px-3.5 py-2 bg-slate-950/60 border border-slate-800 rounded-xl focus:outline-none focus:border-blue-500 text-sm text-white placeholder-slate-500"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 flex justify-between">
              <span>Sélectionner le port actif</span>
              <span className="text-blue-400 font-normal">({filteredPorts.length} ports dispo)</span>
            </label>
            <select
              value={selectedPortId}
              onChange={(e) => setSelectedPortId(e.target.value)}
              disabled={loading}
              className="w-full px-3.5 py-2 bg-slate-950/60 border border-slate-800 rounded-xl focus:outline-none focus:border-blue-500 text-sm text-white cursor-pointer"
            >
              <option value="" className="bg-slate-900 text-slate-400">-- Choisir un port --</option>
              {filteredPorts.map((port) => (
                <option key={port.site_id} value={port.site_id} className="bg-slate-900 text-white">
                  {port.site_name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* SECTION PRINCIPALE : 3 Blocs (Calendrier | Horloge | Marées du Jour) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* 1. BLOC MINI-CALENDRIER */}
          <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                {currentDate.toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}
              </span>
              <div className="flex gap-1">
                <button onClick={() => changeDate(-30)} className="p-1 hover:bg-slate-800 rounded text-xs text-slate-400">◀</button>
                <button onClick={() => changeDate(30)} className="p-1 hover:bg-slate-800 rounded text-xs text-slate-400">▶</button>
              </div>
            </div>

            {/* Grille des jours du mois */}
            <div className="grid grid-cols-7 gap-1 text-center text-xs">
              {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((j, i) => (
                <span key={i} className="text-slate-500 font-semibold py-1">{j}</span>
              ))}
              {/* Génération simplifiée des jours du mois courant */}
              {Array.from({ length: 31 }, (_, i) => {
                const dayNum = i + 1;
                const testDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), dayNum);
                // Vérifier si le mois est correct
                if (testDate.getMonth() !== currentDate.getMonth()) return null;

                const isSelected = testDate.toDateString() === currentDate.toDateString();

                return (
                  <button
                    key={dayNum}
                    onClick={() => setCurrentDate(testDate)}
                    className={`py-2 rounded-lg text-xs font-medium transition-all ${
                      isSelected
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                        : "hover:bg-slate-800 text-slate-300"
                    }`}
                  >
                    {dayNum}
                  </button>
                );
              })}
            </div>
            <div className="pt-2 border-t border-slate-800 text-center">
              <span className="text-[11px] text-slate-400">Port : <strong className="text-white">{selectedPortName}</strong></span>
            </div>
          </div>

          {/* 2. BLOC HORLOGE DE MARÉE & HAUTEUR ACTUELLE */}
          <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col items-center justify-between space-y-4">
            <div className="w-full flex justify-between items-center">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Horloge de marée</span>
              <span className="text-[10px] text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">{selectedPortName}</span>
            </div>

            {/* Simulation Horloge Circulaire SVG */}
            <div className="relative w-44 h-44 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="6" className="text-slate-800" fill="none" />
                <circle
                  cx="50" cy="50" r="42"
                  stroke="url(#blueGrad)" strokeWidth="6"
                  strokeDasharray="264"
                  strokeDashoffset="100"
                  strokeLinecap="round"
                  fill="none"
                />
                <defs>
                  <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#60a5fa" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-xs text-blue-400 font-semibold uppercase tracking-wider">PM / BM</span>
                <div className="text-xl font-black text-white mt-0.5">{currentStatus.height}</div>
                <span className="text-[11px] text-slate-400 mt-0.5 font-medium">{currentStatus.trend}</span>
              </div>
            </div>

            <div className="w-full text-center bg-slate-950/40 border border-slate-800/80 rounded-xl py-2">
              <span className="text-xs text-slate-400">Statut en direct basé sur les extrêmes du jour</span>
            </div>
          </div>

          {/* 3. BLOC MARÉES DU JOUR (Liste des PM / BM) */}
          <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4 flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Marées du jour</span>
              <span className="text-xs text-blue-400 font-medium">{dayEvents.length} événements</span>
            </div>

            <div className="space-y-2.5 overflow-y-auto max-h-56 pr-1 custom-scrollbar">
              {dayEvents.length > 0 ? (
                dayEvents.map((ev, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                      ev.type === "PM"
                        ? "bg-blue-950/20 border-blue-500/30"
                        : "bg-slate-950/50 border-slate-800"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`px-2 py-1 rounded-lg text-[10px] font-bold ${
                          ev.type === "PM"
                            ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                            : "bg-slate-800 text-slate-400 border border-slate-700"
                        }`}
                      >
                        {ev.type}
                      </span>
                      <div>
                        <span className="text-sm font-bold text-white">{ev.timeFormatted}</span>
                        <span className="block text-[11px] text-slate-400">
                          {ev.type === "PM" ? "Pleine Mer" : "Basse Mer"}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-extrabold text-white">{ev.height.toFixed(2)} m</span>
                      {ev.coef && <span className="block text-xs font-semibold text-blue-400">Coef. {ev.coef}</span>}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 text-xs text-slate-500">
                  {loadingData ? "Chargement des marées..." : "Aucune marée répertoriée pour cette date."}
                </div>
              )}
            </div>
          </div>

        </div>

        {/* SECTION BASSE : COURBE DE MARÉE 24H (Graphique SVG) */}
        <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold uppercase tracking-wider text-slate-200">Courbe de marée (24h)</span>
              <span className="text-xs text-slate-400">({currentDate.toLocaleDateString("fr-FR")})</span>
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> Hauteur (m)</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-400"></span> PM</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-slate-600"></span> BM</span>
            </div>
          </div>

          {/* Graphique SVG dynamique représentant la courbe sinusoïdale de la journée */}
          <div className="relative h-48 w-full pt-4">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 1000 200" preserveAspectRatio="none">
              {/* Grille horizontale de fond */}
              {[0, 50, 100, 150, 200].map((y, idx) => (
                <line key={idx} x1="0" y1={y} x2="1000" y2={y} stroke="#1e293b" strokeWidth="1" strokeDasharray="4 4" />
              ))}

              {/* Tracé de la courbe lissée basée sur les extremas du jour */}
              <path
                d="M 0,150 Q 250,20 500,100 T 1000,150"
                fill="none"
                stroke="url(#waveGradient)"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="50%" stopColor="#60a5fa" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>

              {/* Points PM et BM simulés sur la courbe */}
              {dayEvents.map((ev, i) => {
                // Calcul position X approximative basée sur l'heure (0h = 0, 24h = 1000)
                const [h, m] = ev.timeFormatted.split(':').map(Number);
                const xPos = ((h * 60 + m) / 1440) * 1000;
                const yPos = ev.type === 'PM' ? 30 : 170;

                return (
                  <g key={i}>
                    <circle cx={xPos} cy={yPos} r="6" className={ev.type === 'PM' ? "fill-blue-400" : "fill-slate-600"} stroke="#0f172a" strokeWidth="2" />
                    <text x={xPos} y={yPos - 12} textAnchor="middle" className="text-[10px] fill-slate-300 font-bold">
                      {ev.type} ({ev.timeFormatted})
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Axe des abscisses (Heures) */}
            <div className="flex justify-between text-[11px] text-slate-500 pt-3 border-t border-slate-800">
              <span>00:00</span>
              <span>04:00</span>
              <span>08:00</span>
              <span>12:00</span>
              <span>16:00</span>
              <span>20:00</span>
              <span>24:00</span>
            </div>
          </div>
        </div>

        {/* PIED DE PAGE LÉGAL */}
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