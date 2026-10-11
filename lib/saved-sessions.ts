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
    // La séance relancée remonte en tête ; même composition = même entrée.
    const liftsOf = (q: string) => new URLSearchParams(q).get("s");
    const others = loadSessions().filter((s) => liftsOf(s.query) !== liftsOf(session.query));
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
