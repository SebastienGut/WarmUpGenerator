// Contrôle de contraste WCAG AA, à coller dans la console (ou via un outil de
// navigateur) sur une page rendue. Renvoie les textes visibles sous le seuil :
// 4,5:1 (3:1 pour le grand texte, ≥ 24 px ou ≥ 18,7 px en gras).
(() => {
  const parse = (c) => {
    const m = c.match(/rgba?\(([^)]+)\)/);
    if (!m) return null;
    const [r, g, b, a = 1] = m[1].split(/[ ,/]+/).filter(Boolean).map(Number);
    return { r, g, b, a };
  };
  const lum = ({ r, g, b }) => {
    const f = (v) => ((v /= 255) <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  };
  const mix = (top, under) => ({
    r: top.r * top.a + under.r * (1 - top.a),
    g: top.g * top.a + under.g * (1 - top.a),
    b: top.b * top.a + under.b * (1 - top.a),
    a: 1,
  });
  const bgOf = (el) => {
    const layers = [];
    for (let e = el; e; e = e.parentElement) {
      const c = parse(getComputedStyle(e).backgroundColor);
      if (c && c.a > 0) {
        layers.push(c);
        if (c.a >= 1) break;
      }
    }
    let out = { r: 255, g: 255, b: 255, a: 1 };
    for (let i = layers.length - 1; i >= 0; i--) out = mix(layers[i], out);
    return out;
  };
  const bad = [];
  for (const el of document.querySelectorAll("body *")) {
    if (![...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) continue;
    const st = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    if (!r.width || !r.height || st.visibility === "hidden" || Number(st.opacity) === 0) continue;
    if (el.closest("[aria-hidden=true]") || el.closest(".sr-only")) continue;
    let fg = parse(st.color);
    if (!fg) continue;
    const bg = bgOf(el);
    fg = mix(fg, bg);
    const [l1, l2] = [lum(fg), lum(bg)].sort((a, b) => b - a);
    const ratio = (l1 + 0.05) / (l2 + 0.05);
    const size = parseFloat(st.fontSize);
    const large = size >= 24 || (size >= 18.66 && Number(st.fontWeight) >= 700);
    if (ratio < (large ? 3 : 4.5)) bad.push(`${ratio.toFixed(2)} « ${el.textContent.trim().slice(0, 40)} » ${size}px`);
  }
  return bad.length ? bad.slice(0, 30) : "contraste OK";
})();
