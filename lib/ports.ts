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
  { id: "bayonne", name: "Bayonne-Boucau", apiId: "bayonne" },
  { id: "bordeaux", name: "Bordeaux", apiId: "bordeaux" },
  { id: "boulogne-sur-mer", name: "Boulogne-sur-Mer", apiId: "boulogne-sur-mer" },
  { id: "brest", name: "Brest", apiId: "brest" },
  { id: "calais", name: "Calais", apiId: "calais" },
  { id: "cherbourg", name: "Cherbourg", apiId: "cherbourg" },
  { id: "concarneau", name: "Concarneau", apiId: "concarneau" },
  { id: "dieppe", name: "Dieppe", apiId: "dieppe" },
  { id: "douarnenez", name: "Douarnenez", apiId: "douarnenez" },
  { id: "dunkerque", name: "Dunkerque", apiId: "dunkerque" },
  { id: "fecamp", name: "Fécamp", apiId: "fecamp" },
  { id: "granville", name: "Granville", apiId: "granville" },
  { id: "le-havre", name: "Le Havre", apiId: "le-havre" },
  { id: "la-rochelle", name: "La Rochelle", apiId: "la-rochelle-pallice" },
  { id: "lorient", name: "Lorient", apiId: "lorient" },
  { id: "marseille", name: "Marseille", apiId: "marseille" },
  { id: "morlaix", name: "Morlaix", apiId: "morlaix" },
  { id: "nantes", name: "Nantes", apiId: "nantes" },
  { id: "nice", name: "Nice", apiId: "nice" },
  { id: "paimpol", name: "Paimpol", apiId: "paimpol" },
  { id: "roscoff", name: "Roscoff", apiId: "roscoff" },
  { id: "saint-brieuc", name: "Saint-Brieuc", apiId: "saint-brieuc" },
  { id: "saint-jean-de-luz", name: "Saint-Jean-de-Luz", apiId: "saint-jean-de-luz" },
  { id: "saint-malo", name: "Saint-Malo", apiId: "saint-malo" },
  { id: "saint-nazaire", name: "Saint-Nazaire", apiId: "saint-nazaire" },
  { id: "sete", name: "Sète", apiId: "sete" },
  { id: "toulon", name: "Toulon", apiId: "toulon" }
].sort((a, b) => a.name.localeCompare(b.name));