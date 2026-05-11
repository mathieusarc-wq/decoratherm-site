import type { MetadataRoute } from "next";

const BASE = "https://decoratherm.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/services", "/realisations", "/a-propos", "/devis", "/contact"];
  const now = new Date();
  return routes.map((r) => ({
    url: `${BASE}${r}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: r === "" ? 1 : 0.8,
  }));
}
