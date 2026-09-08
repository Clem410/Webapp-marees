import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ port: string }> | { port: string } }
) {
  const resolvedParams = await params;
  const siteId = resolvedParams.port;

  if (!siteId) {
    return new NextResponse("ID du port manquant", { status: 400 });
  }

  try {
    // Récupération directe du fichier ICS officiel depuis l'API externe
    const externalRes = await fetch(`https://api-maree.fr/v1/ics/${siteId}`);

    if (!externalRes.ok) {
      return new NextResponse("Port introuvable ou indisponible sur l'API externe", { status: 404 });
    }

    const icsText = await externalRes.text();

    return new NextResponse(icsText, {
      status: 200,
      headers: {
        "Content-Type": "text/calendar; charset=utf-8",
        "Content-Disposition": `attachment; filename="marees-${siteId}.ics"`,
      },
    });
  } catch (err) {
    console.error("Erreur proxy ICS :", err);
    return new NextResponse("Erreur interne du serveur", { status: 500 });
  }
}