import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://testyourmouse.com";

  // Lista de todas las rutas con sus prioridades
  const routes = [
    { path: "", priority: 1.0 },
    { path: "/click-visualizer", priority: 0.8 },
    { path: "/double-click", priority: 0.8 },
    { path: "/cps-test", priority: 0.9 },
    { path: "/scroll-test", priority: 0.8 },
    { path: "/tracking-jitter", priority: 0.8 },
    { path: "/pro-tools", priority: 0.7 },
    { path: "/privacy-policy", priority: 0.3 },
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route.priority,
  }));
}
