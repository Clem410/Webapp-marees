import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next"; // 1. Importer le package
import "./globals.css";

export const metadata: Metadata = {
  title: "Marées Sync - Calendrier et Horaires des Marées",
  description: "Synchronisez les 30 jours glissants de marées de n'importe quel port français dans votre agenda.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="bg-slate-950 text-white antialiased">
        {children}
        <Analytics /> {/* 2. Ajouter le composant ici */}
      </body>
    </html>
  );
}