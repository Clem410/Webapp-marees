import { NextResponse } from "next/server";
import { createEvents, EventAttributes } from "ics";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ port: string }> }
): Promise<Response> {
  const { port: siteId } = await params;
  const apiKey = process.env.API_MAREE_KEY;

  if (!apiKey) {
    return new NextResponse("Configuration serveur incomplète (API Key manquante)", {
      status: 500,
    });
  }

  // Calcul dynamique de la fenêtre de 30 jours glissants (Aujourd'hui -> J+30)
  const today = new Date();
  const fromDate = today.toISOString().split("T")[0];

  const futureDate = new Date();
  futureDate.setDate(today.getDate() + 30);
  const toDate = futureDate.toISOString().split("T")[0];

  try {
    const url = `https://api-maree.fr/tide-extrema?site=${siteId}&from=${fromDate}&to=${toDate}&tz=Europe/Paris&key=${apiKey}`;
    
    const response = await fetch(url, {
      next: { revalidate: 43200 }, // Cache 12h
    });

    if (!response.ok) {
      throw new Error(`Erreur API externe: ${response.status}`);
    }

    const json = await response.json();
    const portTides = json.data || [];
    const portName = siteId; // Nom par défaut, ou nettoyé si besoin

    const tidesData: EventAttributes[] = [];

    for (const dayEntry of portTides) {
      const [year, month, day] = dayEntry.date.split("-").map(Number);

      for (const extrema of dayEntry.extrema) {
        const [hour, minute] = extrema.time.split(":").map(Number);
        const isHighTide = extrema.type === "PM";

        const title = isHighTide
          ? `🌊 PM ${extrema.coef ? `(Coeff. ${extrema.coef})` : ""} - ${portName}`
          : `📉 BM - ${portName}`;

        const description = isHighTide
          ? `Pleine Mer à ${portName}\nHauteur : ${extrema.height}m\nCoefficient : ${extrema.coef || "N/A"}`
          : `Basse Mer à ${portName}\nHauteur : ${extrema.height}m`;

        tidesData.push({
          start: [year, month, day, hour, minute],
          duration: { minutes: 30 },
          title,
          description,
          location: portName,
          status: "CONFIRMED",
          busyStatus: "FREE",
        });
      }
    }

    return new Promise<Response>((resolve) => {
      createEvents(tidesData, (error, value) => {
        if (error || !value) {
          resolve(
            new NextResponse("Erreur lors de la génération du calendrier", { status: 500 })
          );
          return;
        }

        resolve(
          new NextResponse(value, {
            status: 200,
            headers: {
              "Content-Type": "text/calendar; charset=utf-8",
              "Content-Disposition": `inline; filename="marees-${siteId}.ics"`,
              "Cache-Control": "s-maxage=43200, stale-while-revalidate=86400",
            },
          })
        );
      });
    });
  } catch (error) {
    console.error("Erreur de récupération des marées :", error);
    return new NextResponse("Impossible de récupérer les données de marée", { status: 500 });
  }
}