import type { FormDefinition } from "../types";
import { fiveElementWellnessForm } from "./five-element-wellness";
import { fiveElementForm } from "./five-element";

export const forms: Record<string, FormDefinition> = {
  [fiveElementWellnessForm.slug]: fiveElementWellnessForm,
  [fiveElementForm.slug]: fiveElementForm,
};

export function getForm(slug: string): FormDefinition | null {
  return forms[slug] ?? null;
}

export function allFormSlugs(): string[] {
  return Object.keys(forms);
}
