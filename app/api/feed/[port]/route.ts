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

    if (json.data && Array.isArray(json.data)) {
      for (const day of json.data) {
        if (!day.extrema || !Array.isArray(day.extrema)) continue;

        // 1. Tri chronologique rigoureux des extrema de la journée
        const sortedExtrema = [...day.extrema].sort((a, b) => 
          (a.time || "").localeCompare(b.time || "")
        );

        let filteredExtrema: ExtremaItem[] = [];
        
        // 2. Sécurité : filtre les extrema aberrants (< 2h d'intervalle)
        for (const ext of sortedExtrema) {
          if (!ext.time) continue;
          const [h, m] = ext.time.split(":").map(Number);
          const currentTotalMinutes = h * 60 + m;

          if (filteredExtrema.length > 0) {
            const lastExt = filteredExtrema[filteredExtrema.length - 1];
            const [lh, lm] = lastExt.time.split(":").map(Number);
            const lastTotalMinutes = lh * 60 + lm;

            if (currentTotalMinutes - lastTotalMinutes < 120) {
              continue;
            }
          }
          filteredExtrema.push(ext);
        }

        for (const ext of filteredExtrema) {
          const [hours, minutes] = ext.time.split(":");
          const dtStartStr = `${day.date.replace(/-/g, "")}T${hours}${minutes}00`;
          
          const startDate = new Date(`${day.date}T${ext.time}:00`);
          const endDate = new Date(startDate.getTime() + 30 * 60 * 1000);
          const endHours = String(endDate.getHours()).padStart(2, "0");
          const endMinutes = String(endDate.getMinutes()).padStart(2, "0");
          const endDateStr = `${day.date.replace(/-/g, "")}T${endHours}${endMinutes}00`;

          const isPM = ext.type === "PM";
          const tideLabel = isPM ? "Pleine Mer" : "Basse Mer";
          const emoji = isPM ? "🌊" : "📉";
          
          const coefText = (ext.coef !== undefined && ext.coef !== null && ext.coef !== 0 && ext.coef !== ("" as any)) 
            ? ` (Coef ${ext.coef})` 
            : "";
            
          const summary = `${emoji} ${tideLabel}${coefText} : ${ext.height}m`;

          const description = `${tideLabel} à ${siteName}\\nHauteur : ${ext.height} m${ext.coef ? `\\nCoefficient : ${ext.coef}` : ""}\\nSource : api-maree.fr`;

          const uid = `${day.date}-${ext.type}-${ext.time}-${siteId}@webapp-marees`;

          icsLines.push("BEGIN:VEVENT");
          icsLines.push(`UID:${uid}`);
          icsLines.push(`DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z`);
          icsLines.push(`DTSTART;TZID=Europe/Paris:${dtStartStr}`);
          icsLines.push(`DTEND;TZID=Europe/Paris:${endDateStr}`);
          icsLines.push(`SUMMARY:${summary}`);
          icsLines.push(`DESCRIPTION:${description}`);
          icsLines.push("END:VEVENT");
        }
      }
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