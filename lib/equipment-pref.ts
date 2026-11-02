// Matériel disponible, mémorisé sur l'appareil (pas de compte) : réglé une fois,
// il s'applique à toutes les routines suivantes.
import type { Equipment } from "@/lib/bank";

const KEY = "wg:equipment";

export function loadEquipment(): Equipment {
  try {
    const v = window.localStorage.getItem(KEY);
    return v === "none" || v === "band" || v === "gym" ? v : "gym";
  } catch {
    return "gym";
  }
}

export function saveEquipment(eq: Equipment) {
  try {
    window.localStorage.setItem(KEY, eq);
  } catch {
    // Navigation privée ou stockage bloqué : le réglage vaut pour la page.
  }
}
