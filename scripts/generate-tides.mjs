// scripts/generate-tides.mjs
import fs from 'fs';
import path from 'path';

const API_KEY = "3b6588e53753051746a9347875a6a525"; 

const PORTS = [
  { id: "la-rochelle", apiId: "la-rochelle-pallice" },
  { id: "brest", apiId: "brest" },
  { id: "saint-malo", apiId: "saint-malo" },
  { id: "arcachon", apiId: "arcachon-jetee-d-eyrac" },
];

async function generateDatabase() {
  const database = {};
  const today = new Date();
  const fromDate = today.toISOString().split("T")[0];

  const futureDate = new Date();
  futureDate.setDate(today.getDate() + 30);
  const toDate = futureDate.toISOString().split("T")[0];

  console.log(`⏳ Récupération des marées du ${fromDate} au ${toDate} (30 jours glissants)...\n`);

  for (const port of PORTS) {
    console.log(`🔍 Interrogation pour ${port.id} (${port.apiId})...`);
    try {
      const url = `https://api-maree.fr/tide-extrema?site=${port.apiId}&from=${fromDate}&to=${toDate}&tz=Europe/Paris&key=${API_KEY}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Erreur HTTP ${response.status}: ${errText}`);
      }

      const json = await response.json();
      
      if (!json.data || json.data.length === 0) {
        console.warn(`⚠️ Aucune donnée retournée pour ${port.id}`);
        database[port.id] = [];
        continue;
      }

      database[port.id] = json.data.map((day) => ({
        date: day.date,
        extrema: day.extrema.map((ext) => ({
          type: ext.type,
          time: ext.time,
          height: ext.height,
          ...(ext.coef ? { coef: ext.coef } : {}),
        })),
      }));

      console.log(`✅ Succès : ${json.data.length} jours récupérés pour ${port.id}.`);
    } catch (error) {
      console.error(`❌ Échec pour ${port.id} :`, error.message);
      database[port.id] = [];
    }
  }

  const fileContent = `// Fichier généré automatiquement - Ne pas modifier à la main
export interface TidePoint {
  type: "PM" | "BM";
  time: string;
  height: number;
  coef?: number;
}

export interface DayTides {
  date: string;
  extrema: TidePoint[];
}

export const TIDES_DATABASE: Record<string, DayTides[]> = ${JSON.stringify(database, null, 2)};
`;

  const outputPath = path.join(process.cwd(), "lib", "tides-database.ts");
  fs.writeFileSync(outputPath, fileContent, "utf-8");
  console.log(`\n🎉 Base de données générée avec succès (${fromDate} -> ${toDate}) dans ${outputPath} !`);
}

generateDatabase();