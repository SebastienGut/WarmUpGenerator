// Logo Warmup Generator : le W en ruban qui finit en flèche montante (dessin de
// Seb, brand/logo-warmup.png). Icônes et favicon : python scripts/build-logo.py.

/** Le dessin seul, à la hauteur de la classe passée (largeur ≈ 1,67 × hauteur). */
export function LogoMark({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    // Image fixe de 200 × 120 px, servie telle quelle : pas besoin de next/image.
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/logo-mark.png" alt="" width={201} height={120} className={className} />
  );
}

/** Logo complet : dessin + nom, pour l'en-tête. */
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <LogoMark />
      <span className="font-display text-[19px] leading-[0.95]">
        Warmup
        <br />
        Generator
      </span>
    </span>
  );
}
