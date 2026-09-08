"use client";

import { useState } from "react";
import { PORTS } from "@/lib/ports";

export default function Home() {
  const [selectedPort, setSelectedPort] = useState(PORTS[0]?.id || "la-rochelle");
  const [copied, setCopied] = useState(false);

  const handleCopy = (url: string) => {
    const webcalUrl = url.replace(/^https?:\/\//, "webcal://");
    navigator.clipboard.writeText(webcalUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-cyan-500 selection:text-white">
      <div className="max-w-4xl mx-auto px-6 py-12 w-full">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight mb-3 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Marées Sync
          </h1>
          <p className="text-slate-400 max-w-lg mx-auto">
            Synchronisez les horaires de marées officiels directement dans votre calendrier personnel (Google Calendar, Apple Calendar, Outlook).
          </p>
        </header>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl backdrop-blur-xl mb-12">
          <label htmlFor="port-select" className="block text-sm font-medium text-slate-300 mb-2">
            Sélectionnez votre port :
          </label>
          <select
            id="port-select"
            value={selectedPort}
            onChange={(e) => setSelectedPort(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 mb-8 transition-all"
          >
            {PORTS.map((port) => (
              <option key={port.id} value={port.id}>
                {port.name}
              </option>
            ))}
          </select>

          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={`/api/feed/${selectedPort}`}
                download={`marees-${selectedPort}.ics`}
                className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white font-medium py-3 px-6 rounded-xl text-center transition-all shadow-lg shadow-cyan-900/20 flex items-center justify-center gap-2"
              >
                <span>📥 Télécharger le fichier .ics</span>
              </a>

              <button
                onClick={() => handleCopy(`${window.location.origin}/api/feed/${selectedPort}`)}
                className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium py-3 px-6 rounded-xl text-center transition-all border border-slate-700 flex items-center justify-center gap-2"
              >
                <span>{copied ? "✨ Lien copié !" : "📋 Copier le lien d'abonnement"}</span>
              </button>
            </div>

            <p className="text-xs text-slate-500 text-center mt-2">
              Astuce : Le lien d&apos;abonnement (webcal) met à jour automatiquement votre calendrier en arrière-plan.
            </p>
          </div>
        </div>
      </div>

      <footer className="py-6 px-4 text-center text-xs text-slate-500 border-t border-slate-900 bg-slate-950/50">
        <p className="max-w-2xl mx-auto leading-relaxed">
          Données de marée fournies par{" "}
          <a
            href="https://api-maree.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-slate-300 transition-colors"
          >
            api-maree.fr
          </a>{" "}
          sous licence CC BY, calculées à partir de composantes harmoniques Ifremer / PREVIMER, elles-mêmes sous licence CC BY.
        </p>
      </footer>
    </main>
  );
}