import type { ClientDemoConfig } from "../types";
import { fiveElementWellness } from "./five-element-wellness";

export const demoClients: Record<string, ClientDemoConfig> = {
  [fiveElementWellness.slug]: fiveElementWellness,
};

export function getDemoClient(slug: string): ClientDemoConfig | null {
  return demoClients[slug] ?? null;
}

export function allDemoSlugs(): string[] {
  return Object.keys(demoClients);
}
