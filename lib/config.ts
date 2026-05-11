// Centralized site config — modify prices, contact, projects here.

export const SITE = {
  name: "DECORATHERM",
  tagline: "Isolation & ravalement de façade.",
  phone: "06 21 91 30 01",
  phoneTel: "+33621913001",
  email: "exploitation@decoratherm.com",
  zone: "France entière",
  certifications: ["Qualibat RGE", "Décennale", "RC Pro"],
};

// Mentions légales DECORATHERM (registre INSEE/Sirene).
export const LEGAL = {
  raisonSociale: "DECORATHERM",
  formeJuridique: "SAS",
  capital: "30 000 €",
  siren: "942 177 171",
  siret: "94217717100017",
  apeCode: "43.29A",
  apeLibelle: "Travaux d'isolation",
  rgeId: "7131D112",
  adresse: {
    rue: "21 Chemin du Prieuré",
    complement: "Cedex 1",
    cp: "17000",
    ville: "La Rochelle",
    pays: "France",
  },
  dirigeants: [
    { nom: "Petre-Ionut BERTICI", fonction: "Président" },
    { nom: "Windinmi Isak OUEDRAOGO", fonction: "Directeur Général" },
  ],
};

// Devis simulator — tarifs DECORATHERM.
// CEE = Certificat d'Économie d'Énergie (aide d'État déductible). Forfait 10 €/m²
// pour les travaux d'amélioration énergétique (ITE et Isolation intérieure).
// Le ravalement seul n'est pas éligible aux CEE.
export const PRICING = {
  ite: {
    label: "ITE — Isolation thermique extérieure",
    base: 120, // €/m²
    starting: "à partir de 120€/m²",
    ceeRate: 10, // €/m²
  },
  isoInt: {
    label: "Isolation intérieure (combles, rampants, mur)",
    base: 90, // €/m²
    starting: "à partir de 90€/m²",
    ceeRate: 10, // €/m²
  },
  ravalement: {
    label: "Ravalement de façade",
    base: 60, // €/m²
    starting: "à partir de 60€/m²",
    ceeRate: 0, // non éligible aux CEE
  },
  storeyCoef: {
    rdc: 1,
    "r+1": 1.15,
    "r+2+": 1.3,
  },
  spread: { low: 0.85, high: 1.15 },
};

// Stats / chiffres clés.
export const STATS = [
  { value: 500, suffix: "+", label: "Chantiers à l'actif des équipes" },
  { value: 10, suffix: " ans", label: "Expérience cumulée des équipes" },
  { value: 100, suffix: "%", label: "Clients satisfaits" },
  { value: 0, suffix: "", label: "Qualibat RGE", textOverride: "RGE" },
];

// Projects — placeholder images via picsum.photos.
// To add real photos: drop file in /public/chantiers/ (naming convention <slug>-before.jpg / <slug>-after.jpg)
// and replace the picsum URL with "/chantiers/<slug>-before.jpg".
export type Project = {
  slug: string;
  title: string;
  type: "ITE" | "ITI" | "RAVALEMENT";
  location: string;
  surface: string;
  duration: string;
  before: string;
  after: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "bretagne-lotissement-ite-bardage",
    title: "Lotissement maison — ITE + bardage bois",
    type: "ITE",
    location: "Bretagne",
    surface: "—",
    duration: "—",
    before: "/hero_before.jpg",
    after: "/hero_after.jpg",
  },
  {
    slug: "ite-maison-etage-ton-pierre",
    title: "Maison à étage — finition ton pierre",
    type: "ITE",
    location: "—",
    surface: "—",
    duration: "—",
    before: "/chantiers/ite-2-before.jpg",
    after: "/chantiers/ite-2-after.jpg",
  },
  {
    slug: "ite-pavillon-blanc",
    title: "Pavillon plain-pied — finition blanche",
    type: "ITE",
    location: "—",
    surface: "—",
    duration: "—",
    before: "/chantiers/ite-3-before.jpg",
    after: "/chantiers/ite-3-after.jpg",
  },
  {
    slug: "ite-pavillon-ton-pierre",
    title: "Pavillon plain-pied — finition ton pierre",
    type: "ITE",
    location: "—",
    surface: "—",
    duration: "—",
    before: "/chantiers/ite-4-before.jpg",
    after: "/chantiers/ite-4-after.jpg",
  },
  {
    slug: "iti-combles-perdus",
    title: "Combles perdus — soufflage laine minérale",
    type: "ITI",
    location: "—",
    surface: "—",
    duration: "—",
    before: "/chantiers/iti-1-before.jpg",
    after: "/chantiers/iti-1-after.jpg",
  },
  {
    slug: "iti-rampants",
    title: "Rampants de toiture — pose en sous-face",
    type: "ITI",
    location: "—",
    surface: "—",
    duration: "—",
    before: "/chantiers/iti-2-before.jpg",
    after: "/chantiers/iti-2-after.jpg",
  },
  {
    slug: "ravalement-mur-cloture",
    title: "Mur de clôture — enduit projeté",
    type: "RAVALEMENT",
    location: "—",
    surface: "—",
    duration: "—",
    before: "/chantiers/ral-1-before.jpg",
    after: "/chantiers/ral-1-after.jpg",
  },
];
