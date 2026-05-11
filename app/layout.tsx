import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://decoratherm.com"),
  title: {
    default: "DECORATHERM — Isolation thermique extérieure & ravalement de façade | Qualibat RGE",
    template: "%s | DECORATHERM",
  },
  description:
    "DECORATHERM, installateur certifié Qualibat RGE en isolation thermique extérieure (ITE) et ravalement de façade. Intervention France entière pour donneurs d'ordre, maîtres d'œuvre et entreprises générales.",
  keywords: [
    "ITE",
    "isolation thermique extérieure",
    "ravalement de façade",
    "Qualibat RGE",
    "installateur ITE",
    "DECORATHERM",
  ],
  openGraph: {
    title: "DECORATHERM — Isolation thermique extérieure & ravalement de façade",
    description:
      "Installateur spécialiste ITE et ravalement, certifié Qualibat RGE. France entière.",
    locale: "fr_FR",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${jakarta.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-[var(--color-bg)] text-[var(--color-navy)]">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "DECORATHERM",
              legalName: "DECORATHERM SAS",
              description:
                "Installateur spécialiste de l'isolation thermique extérieure (ITE), de l'isolation intérieure et du ravalement de façade. Certifié Qualibat RGE.",
              telephone: "+33621913001",
              email: "exploitation@decoratherm.com",
              areaServed: "FR",
              url: "https://decoratherm.com",
              logo: "https://decoratherm.com/icon.svg",
              image: "https://decoratherm.com/opengraph-image",
              address: {
                "@type": "PostalAddress",
                streetAddress: "21 Chemin du Prieuré",
                addressLocality: "La Rochelle",
                postalCode: "17000",
                addressCountry: "FR",
              },
              identifier: [
                { "@type": "PropertyValue", propertyID: "SIREN", value: "942177171" },
                { "@type": "PropertyValue", propertyID: "SIRET", value: "94217717100017" },
                { "@type": "PropertyValue", propertyID: "APE", value: "43.29A" },
              ],
              sameAs: ["https://decoratherm.com"],
            }),
          }}
        />
      </body>
    </html>
  );
}
