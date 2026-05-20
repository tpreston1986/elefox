import type { FormDefinition } from "../types";
import { fiveElementWellnessForm } from "./five-element-wellness";

export const forms: Record<string, FormDefinition> = {
  [fiveElementWellnessForm.slug]: fiveElementWellnessForm,
};

export function getForm(slug: string): FormDefinition | null {
  return forms[slug] ?? null;
}

export function allFormSlugs(): string[] {
  return Object.keys(forms);
}
