// lib/ports.ts
export interface Port {
  id: string;
  name: string;
  apiId: string;
}

export const PORTS: Port[] = [
  { id: "ajaccio", name: "Ajaccio", apiId: "ajaccio" },
  { id: "arcachon", name: "Arcachon", apiId: "arcachon-jetee-d-eyrac" },
  { id: "bastia", name: "Bastia", apiId: "bastia" },
  { id: "bayonne", name: "Bayonne", apiId: "bayonne-boucau" },
  { id: "bordeaux", name: "Bordeaux", apiId: "bordeaux" },
  { id: "boulogne-sur-mer", name: "Boulogne-sur-Mer", apiId: "boulogne-sur-mer" },
  { id: "brest", name: "Brest", apiId: "brest" },
  { id: "calais", name: "Calais", apiId: "calais" },
  { id: "cannes", name: "Cannes", apiId: "cannes" },
  { id: "cherbourg", name: "Cherbourg", apiId: "cherbourg-en-cotentin" },
  { id: "concarneau", name: "Concarneau", apiId: "concarneau" },
  { id: "dieppe", name: "Dieppe", apiId: "dieppe" },
  { id: "douarnenez", name: "Douarnenez", apiId: "douarnenez" },
  { id: "dunkerque", name: "Dunkerque", apiId: "dunkerque" },
  { id: "fecamp", name: "Fécamp", apiId: "fecamp" },
  { id: "granville", name: "Granville", apiId: "granville" },
  { id: "la-rochelle", name: "La Rochelle", apiId: "la-rochelle-pallice" },
  { id: "le-havre", name: "Le Havre", apiId: "le-havre" },
  { id: "les-sables-d-olonne", name: "Les Sables-d'Olonne", apiId: "les-sables-d-olonne" },
  { id: "lorient", name: "Lorient", apiId: "lorient" },
  { id: "marseille", name: "Marseille", apiId: "marseille" },
  { id: "nantes", name: "Nantes", apiId: "nantes" },
  { id: "nice", name: "Nice", apiId: "nice" },
  { id: "quiberon", name: "Quiberon", apiId: "quiberon" },
  { id: "rochefort", name: "Rochefort", apiId: "rochefort" },
  { id: "roscoff", name: "Roscoff", apiId: "roscoff" },
  { id: "royan", name: "Royan", apiId: "royan" },
  { id: "saint-malo", name: "Saint-Malo", apiId: "saint-malo" },
  { id: "saint-nazaire", name: "Saint-Nazaire", apiId: "saint-nazaire" },
  { id: "sete", name: "Sète", apiId: "sete" },
  { id: "toulon", name: "Toulon", apiId: "toulon" },
].sort((a, b) => a.name.localeCompare(b.name, 'fr', { sensitivity: 'base' }));