import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { port: string } }
) {
  const siteId = params.port;
  
  // Calcul des 30 jours glissants (de aujourd'hui à J+30)
  const today = new Date();
  const from = today.toISOString().split("T")[0];
  const future = new Date();
  future.setDate(today.getDate() + 30);
  const to = future.toISOString().split("T")[0];

  try {
    const apiRes = await fetch(
      `https://api-maree.fr/tide-extrema?site=${siteId}&from=${from}&to=${to}&tz=Europe/Paris`
    );
    const data = await apiRes.json();

    if (!data || !data.data) {
      return new NextResponse("Port introuvable ou données indisponibles", { status: 404 });
    }

    const portName = data.site_name || siteId;

    let icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Marées Sync//Clément Saux//FR",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      `X-WR-CALNAME:Marées - ${portName}`,
      "X-WR-TIMEZONE:Europe/Paris",
    ];

    data.data.forEach((dayObj: any) => {
      const dateStr = dayObj.date.replace(/-/g, ""); // YYYYMMDD
      if (dayObj.extrema && Array.isArray(dayObj.extrema)) {
        dayObj.extrema.forEach((ext: any, idx: number) => {
          const [hours, minutes] = ext.time.split(":");
          const timeStr = `${hours}${minutes}00`;
          const dtstart = `${dateStr}T${timeStr}`;

          // Durée de l'événement fixée à 15 minutes pour l'agenda
          const d = new Date(`${dayObj.date}T${ext.time}:00`);
          d.setMinutes(d.getMinutes() + 15);
          const endHours = String(d.getHours()).padStart(2, "0");
          const endMins = String(d.getMinutes()).padStart(2, "0");
          const dtend = `${dateStr}T${endHours}${endMins}00`;

          const isPM = ext.type === "PM";
          const summary = isPM
            ? `🌊 Pleine Mer : ${ext.height}m (Coef ${ext.coef || "N/C"})`
            : `📉 Basse Mer : ${ext.height}m`;

          const description = `Port : ${portName}\\nType : ${isPM ? "Pleine Mer" : "Basse Mer"}\\nHauteur : ${ext.height} m${ext.coef ? `\\nCoefficient : ${ext.coef}` : ""}\\n\\nDonnées fournies par api-maree.fr (Ifremer / PREVIMER)`;
          const uid = `tide-${siteId}-${dateStr}-${idx}-${ext.time.replace(":", "")}@marees-sync`;
          const nowIso = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

          icsContent.push(
            "BEGIN:VEVENT",
            `UID:${uid}`,
            `DTSTAMP:${nowIso}`,
            `DTSTART;TZID=Europe/Paris:${dtstart}`,
            `DTEND;TZID=Europe/Paris:${dtend}`,
            `SUMMARY:${summary}`,
            `DESCRIPTION:${description}`,
            "END:VEVENT"
          );
        });
      }
    });

    icsContent.push("END:VCALENDAR");

    return new NextResponse(icsContent.join("\r\n"), {
      status: 200,
      headers: {
        "Content-Type": "text/calendar; charset=utf-8",
        "Content-Disposition": `attachment; filename="marees-${siteId}-30-jours.ics"`,
      },
    });
  } catch (err) {
    console.error("Erreur API ICS", err);
    return new NextResponse("Erreur interne du serveur", { status: 500 });
  }
}