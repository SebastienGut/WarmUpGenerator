// Séances récentes, gardées sur l'appareil uniquement (localStorage) : pas de
// compte, rien ne quitte le téléphone. Sert à relancer « mon Push du lundi »
// en un tap — l'usage réel en salle est répétitif.

export interface SavedSession {
  query: string;
  label: string;
  savedAt: number;
}

const KEY = "wg:sessions";
const MAX = 6;

/** Ce qui identifie une routine : ses zones (ou ses exercices), dans n'importe quel ordre. */
export function compositionOf(query: string): string {
  const p = new URLSearchParams(query);
  const zones = p.get("z");
  const ids = (zones ?? p.get("s") ?? "").split(",").filter(Boolean).sort();
  return `${zones ? "z" : "s"}:${ids.join(",")}`;
}

export function loadSessions(): SavedSession[] {
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed)
      ? parsed.filter((s): s is SavedSession => typeof s?.query === "string" && typeof s?.label === "string")
      : [];
  } catch {
    return [];
  }
}

export function saveSession(session: Omit<SavedSession, "savedAt">) {
  try {
    // La séance relancée remonte en tête ; même composition (zones, ou exercices
    // pour les anciennes URL) = même entrée, avec ses derniers réglages.
    const others = loadSessions().filter((s) => compositionOf(s.query) !== compositionOf(session.query));
    const next = [{ ...session, savedAt: Date.now() }, ...others].slice(0, MAX);
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // Navigation privée ou stockage bloqué : l'outil fonctionne sans.
  }
}

export function removeSession(query: string) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(loadSessions().filter((s) => s.query !== query)));
  } catch {
    // idem
  }
}
