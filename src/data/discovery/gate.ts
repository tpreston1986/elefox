import { createHash } from "node:crypto";
import type { AstroCookies } from "astro";
import type { FormDefinition } from "./types";

/**
 * Optional passphrase lock for a discovery form, checked on the server so
 * the questions never reach someone without it. Light protection, same
 * spirit as the proposal microsites: one shared phrase per client.
 */

export const gateCookieName = (slug: string) => `disc_${slug}`;

/** Forgiving input: case, spaces, and punctuation don't matter. */
export const normalizePassphrase = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]/g, "");

export const hashPassphrase = (s: string) =>
  createHash("sha256").update(normalizePassphrase(s)).digest("hex");

export function isUnlocked(cookies: AstroCookies, form: FormDefinition): boolean {
  if (!form.passphraseHash) return true;
  return cookies.get(gateCookieName(form.slug))?.value === form.passphraseHash;
}

export function unlock(cookies: AstroCookies, form: FormDefinition): void {
  if (!form.passphraseHash) return;
  cookies.set(gateCookieName(form.slug), form.passphraseHash, {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: import.meta.env.PROD,
    maxAge: 60 * 60 * 24 * 60,
  });
}
