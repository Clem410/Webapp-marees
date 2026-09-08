export interface Port {
  id: string;        // Identifiant dans l'URL (ex: saint-malo)
  name: string;      // Nom affiché
  apiMareeId: string;// Identifiant exact pour l'API de marée
  region: string;    // Région
}

export const PORTS: Port[] = [
  { id: "saint-malo", name: "Saint-Malo", apiMareeId: "saint-malo", region: "Bretagne" },
  { id: "brest", name: "Brest", apiMareeId: "brest", region: "Bretagne" },
  { id: "cherbourg", name: "Cherbourg", apiMareeId: "cherbourg", region: "Normandie" },
  { id: "le-havre", name: "Le Havre", apiMareeId: "le-havre", region: "Normandie" },
  { id: "lorient", name: "Lorient", apiMareeId: "lorient", region: "Bretagne" },
  { id: "la-rochelle", name: "La Rochelle (Les Minimes)", apiMareeId: "la-rochelle-pallice", region: "Charente-Maritime" },
  { id: "les-sables-d-olonne", name: "Les Sables-d'Olonne", apiMareeId: "les-sables-d-olonne", region: "Vendée" },
  { id: "royan", name: "Royan", apiMareeId: "royan", region: "Charente-Maritime" },
  { id: "arcachon", name: "Arcachon (Eyrac)", apiMareeId: "arcachon-jetee-d-eyrac", region: "Gironde" },
  { id: "bayonne", name: "Bayonne / Saint-Jean-de-Luz", apiMareeId: "boucau-bayonne-biarritz", region: "Pays Basque" },
];