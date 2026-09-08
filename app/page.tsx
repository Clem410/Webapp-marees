"use client"; // Si tu es en Next.js App Router avec du state client, utilise "use client" au sommet

import { useState, useEffect } from "react";

interface Site {
  site_id: string;
  site_name: string;
  latitude: number;
  longitude: number;
}

export default function Home() {
  const [sites, setSites] = useState<Site[]>([]);
  const [search, setSearch] = useState("");
  const [selectedSite, setSelectedSite] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/sites")
      .then((res) => res.json())
      .then((data) => {
        if (data.sites) {
          setSites(data.sites);
          if (data.sites.length > 0) setSelectedSite(data.sites[0].site_id);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur chargement des sites", err);
        setLoading(false);
      });
  }, []);

  // Filtrer les ports selon la recherche textuelle
  const filteredSites = sites.filter((site) =>
    site.site_name.toLowerCase().includes(search.toLowerCase())
  );

  const feedUrl = typeof window !== "undefined" ? `${window.location.origin}/api/feed/${selectedSite}` : "";
  const webcalUrl = feedUrl.replace(/^https?:\/\//, "webcal://");

  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-center p-6">
      <div className="max-w-xl w-full bg-slate-800 p-8 rounded-2xl shadow-xl border border-slate-700">
        <h1 className="text-3xl font-bold mb-2 text-center">🌊 Marées Sync</h1>
        <p className="text-slate-400 text-center mb-6">
          Synchronisez les 30 jours glissants de marées de n'importe quel port français dans votre agenda.
        </p>

        {loading ? (
          <p className="text-center py-8 text-slate-400 animate-pulse">Chargement de la liste exhaustive des ports...</p>
        ) : (
          <div className="space-y-6">
            {/* Barre de recherche textuelle */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                1. Rechercher votre port (ex: La Rochelle, Brest, Arcachon...)
              </label>
              <input
                type="text"
                placeholder="Tapez un nom de port..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-white"
              />
            </div>

            {/* Liste déroulante filtrée */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                2. Sélectionner dans la liste ({filteredSites.length} trouvés)
              </label>
              <select
                value={selectedSite}
                onChange={(e) => setSelectedSite(e.target.value)}
                size={6} // Affiche une petite boîte liste pour voir plusieurs choix d'un coup
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-white overflow-y-auto"
              >
                {filteredSites.map((site) => (
                  <option key={site.site_id} value={site.site_id} className="py-1 px-2 hover:bg-blue-600 rounded">
                    {site.site_name}
                  </option>
                ))}
              </select>
            </div>

            {/* Actions de téléchargement / abonnement */}
            {selectedSite && (
              <div className="pt-4 border-t border-slate-700 space-y-3">
                <a
                  href={webcalUrl}
                  className="block w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white font-medium text-center rounded-lg transition shadow-lg"
                >
                  📅 S'abonner au calendrier (Webcal)
                </a>
                <a
                  href={`/api/feed/${selectedSite}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-3 px-4 bg-slate-700 hover:bg-slate-600 text-slate-200 font-medium text-center rounded-lg transition"
                >
                  📥 Télécharger le fichier .ics direct
                </a>
              </div>
            )}
          </div>
        )}
      </div>

      <footer className="mt-8 text-xs text-slate-500 text-center">
        Données fournies par api-maree.fr • CC BY Ifremer/PREVIMER
      </footer>
    </main>
  );
}