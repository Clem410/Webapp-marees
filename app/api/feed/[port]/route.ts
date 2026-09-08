import { NextResponse } from "next/server";

interface ExtremaItem {
  type: "PM" | "BM";
  time: string; // "HH:MM"
  height: number;
  coef?: number;
}

interface DayData {
  date: string; // "YYYY-MM-DD"
  extrema: ExtremaItem[];
}

interface TideApiResponse {
  site_id: string;
  site_name: string;
  timezone: string;
  data: DayData[];
}

interface FlatExtrema {
  date: string;
  time: string;
  type: "PM" | "BM";
  height: number;
  coef?: number;
  timestamp: number;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ port: string }> | { port: string } }
) {
  const resolvedParams = await params;
  const siteId = resolvedParams.port;

  if (!siteId) {
    return new NextResponse("ID du port manquant", { status: 400 });
  }

  const apiKey = process.env.API_MAREE_KEY || process.env.API_KEY;
  if (!apiKey) {
    return new NextResponse("Clé API manquante dans la configuration Vercel", { status: 500 });
  }

  try {
    const today = new Date();
    const futureDate = new Date();
    futureDate.setDate(today.getDate() + 30);

    const formatDate = (d: Date) => d.toISOString().split("T")[0];
    const fromStr = formatDate(today);
    const toStr = formatDate(futureDate);

    const apiUrl = `https://api-maree.fr/tide-extrema?site=${siteId}&from=${fromStr}&to=${toStr}&tz=Europe/Paris&key=${apiKey}`;

    const apiRes = await fetch(apiUrl, {
      headers: {
        "User-Agent": "Webapp-Marees/1.0",
        "Accept": "application/json",
      },
      next: { revalidate: 3600 },
    });

    if (!apiRes.ok) {
      const errorText = await apiRes.text();
      return new NextResponse(
        `Erreur de l'API externe (${apiRes.status}): ${errorText}`,
        { status: apiRes.status }
      );
    }

    const json: TideApiResponse = await apiRes.json();
    const siteName = json.site_name || siteId;

    let icsLines = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Webapp Marees//Tide Calendar//FR",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      `X-WR-CALNAME:Marées - ${siteName}`,
      "X-WR-TIMEZONE:Europe/Paris",
    ];

    let allExtrema: FlatExtrema[] = [];

    // 1. Récupération et aplatissement global de tous les extrema de la période
    if (json.data && Array.isArray(json.data)) {
      for (const day of json.data) {
        if (!day.extrema || !Array.isArray(day.extrema)) continue;
        for (const ext of day.extrema) {
          if (!ext.time || !day.date) continue;
          const timestamp = new Date(`${day.date}T${ext.time}:00`).getTime();
          allExtrema.push({
            date: day.date,
            time: ext.time,
            type: ext.type,
            height: ext.height,
            coef: ext.coef,
            timestamp,
          });
        }
      }
    }

    // 2. Tri chronologique global rigoureux
    allExtrema.sort((a, b) => a.timestamp - b.timestamp);

    // 3. Filtrage global anti-bruit (résout le jitter des petits coefficients)
    let cleanedExtrema: FlatExtrema[] = [];
    for (const ext of allExtrema) {
      if (cleanedExtrema.length === 0) {
        cleanedExtrema.push(ext);
        continue;
      }

      const lastExt = cleanedExtrema[cleanedExtrema.length - 1];
      const timeDiffMinutes = (ext.timestamp - lastExt.timestamp) / (1000 * 60);

      // Si c'est le même type (ex: PM et PM)
      if (ext.type === lastExt.type) {
        // Deux marées du même type à moins de 10h (600 min) d'intervalle = artéfact de l'API sur courbe plate
        if (timeDiffMinutes < 600) {
          // On garde la plus prononcée (la plus haute pour une PM, la plus basse pour une BM)
          if (ext.type === "PM" && ext.height > lastExt.height) {
            cleanedExtrema[cleanedExtrema.length - 1] = ext;
          } else if (ext.type === "BM" && ext.height < lastExt.height) {
            cleanedExtrema[cleanedExtrema.length - 1] = ext;
          }
          continue;
        }
      } 
      // Si ce sont des types alternés (PM et BM)
      else {
        // Un demi-cycle normal dure ~6h. Si moins de 3h (180 min), c'est du bruit.
        if (timeDiffMinutes < 180) {
          continue;
        }
      }

      cleanedExtrema.push(ext);
    }

    // 4. Génération des événements iCal à partir de la liste nettoyée
    for (const ext of cleanedExtrema) {
      const [hours, minutes] = ext.time.split(":");
      const dtStartStr = `${ext.date.replace(/-/g, "")}T${hours}${minutes}00`;
      
      const startDate = new Date(`${ext.date}T${ext.time}:00`);
      const endDate = new Date(startDate.getTime() + 30 * 60 * 1000);
      const endHours = String(endDate.getHours()).padStart(2, "0");
      const endMinutes = String(endDate.getMinutes()).padStart(2, "0");
      const endDateStr = `${ext.date.replace(/-/g, "")}T${endHours}${endMinutes}00`;

      const isPM = ext.type === "PM";
      const tideLabel = isPM ? "Pleine Mer" : "Basse Mer";
      const emoji = isPM ? "🌊" : "📉";
      
      const coefText = (ext.coef !== undefined && ext.coef !== null && ext.coef !== 0 && ext.coef !== ("" as any)) 
        ? ` (Coef ${ext.coef})` 
        : "";
        
      const summary = `${emoji} ${tideLabel}${coefText} : ${ext.height}m`;

      const description = `${tideLabel} à ${siteName}\\nHauteur : ${ext.height} m${ext.coef ? `\\nCoefficient : ${ext.coef}` : ""}\\nSource : api-maree.fr`;

      const uid = `${ext.date}-${ext.type}-${ext.time}-${siteId}@webapp-marees`;

      icsLines.push("BEGIN:VEVENT");
      icsLines.push(`UID:${uid}`);
      icsLines.push(`DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z`);
      icsLines.push(`DTSTART;TZID=Europe/Paris:${dtStartStr}`);
      icsLines.push(`DTEND;TZID=Europe/Paris:${endDateStr}`);
      icsLines.push(`SUMMARY:${summary}`);
      icsLines.push(`DESCRIPTION:${description}`);
      icsLines.push("END:VEVENT");
    }

    icsLines.push("END:VCALENDAR");

    const icsContent = icsLines.join("\r\n");

    return new NextResponse(icsContent, {
      status: 200,
      headers: {
        "Content-Type": "text/calendar; charset=utf-8",
        "Content-Disposition": `attachment; filename="marees-${siteId}.ics"`,
      },
    });
  } catch (err) {
    console.error("Erreur lors de la génération du flux ICS :", err);
    return new NextResponse("Erreur interne du serveur", { status: 500 });
  }
}