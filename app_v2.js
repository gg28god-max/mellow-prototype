/* Mellow test prototype v2. Screens are laid out on a 390 x 844 canvas with the exact
   positions of the Figma frames ("Opal library (Dark)" + "Mellow v2" pages).
   Plain JS, no build step, no data leaves the device. */
(() => {
  "use strict";

  // ---------- Logos ----------
  const ACROBAT = '<svg viewBox="0 0 200 200" aria-hidden="true"><defs><radialGradient id="ag" cx="0.37" cy="0.3" r="0.8"><stop offset="0" stop-color="#3D302D"/><stop offset="0.6" stop-color="#231513"/></radialGradient></defs><rect width="200" height="200" fill="#ED3B24"/><rect x="9.2" y="9.2" width="181.6" height="181.6" fill="url(#ag)"/><path d="M52.8 164.3C58.1 161.8 68.8 150.7 74.5 141.7C77.3 137.4 80.4 132.5 81.5 130.7C83.7 127.3 95.3 123.0 111.9 119.4L119.5 117.8L127.1 123.2C137.4 130.6 145.3 133.5 155.2 133.5C162.3 133.5 163.2 133.3 165.7 130.8C169.6 126.9 169.6 120.8 165.7 117.4C160.0 112.5 141.8 110.4 126.7 112.9L121.9 113.7L117.0 108.3C114.3 105.3 109.6 99.1 106.5 94.5L100.9 86.1L104.1 73.4C109.5 51.6 108.1 37.7 100.0 33.5C86.3 26.4 80.9 44.1 89.0 69.3L92.1 79.1L90.4 84.3C87.8 92.3 81.3 108.5 76.7 118.3L72.6 127.2L62.6 132.2C40.3 143.4 32.2 151.6 35.2 160.2C37.1 165.7 45.6 167.7 52.8 164.3ZM40.2 160.4C34.3 156.3 41.8 147.4 59.3 138.0C68.3 133.1 69.4 133.3 65.5 139.2C54.2 156.4 45.2 163.9 40.2 160.4ZM141.6 126.9C135.2 124.3 125.9 117.7 127.0 116.6C127.4 116.2 133.4 115.7 140.2 115.6C155.4 115.5 158.9 116.9 159.0 123.1C159.0 129.0 151.1 130.8 141.6 126.9ZM86.0 122.4C86.0 122.1 87.2 119.6 88.6 116.8C90.8 112.5 95.4 101.0 98.4 92.6C98.9 91.1 99.9 92.0 104.0 97.9C106.8 101.9 110.6 107.1 112.5 109.4C114.4 111.8 116.0 114.0 116.0 114.3C116.0 114.6 112.7 115.5 108.6 116.4C104.5 117.3 97.8 119.1 93.6 120.4C89.4 121.7 86.0 122.6 86.0 122.4ZM91.5 65.8C87.5 52.0 88.8 36.0 93.8 36.0C98.4 36.1 100.2 40.9 99.0 50.3C98.0 58.5 94.9 72.0 93.9 72.0C93.6 72.0 92.5 69.2 91.5 65.8Z" fill="#fff" fill-rule="evenodd"/></svg>';
  const PRIME = '<svg viewBox="0 0 200 200" aria-hidden="true"><rect width="200" height="200" fill="#fff"/><path d="M114.6 145.9C125.3 144.4 138.0 140.6 147.6 136.0C165.8 127.2 167.2 121.2 149.6 127.5C132.6 133.6 121.9 135.4 101.5 135.4C75.9 135.5 58.6 131.6 36.1 120.8C30.4 118.1 25.5 116.1 25.2 116.5C24.2 117.5 30.4 123.1 38.5 128.5C60.8 143.4 88.0 149.6 114.6 145.9ZM168.7 136.1C172.2 131.6 175.0 123.6 175.0 118.4C175.0 115.3 174.7 115.0 170.8 113.9C165.3 112.5 157.4 113.3 151.6 115.9C144.4 119.0 145.7 120.2 155.3 119.4C168.7 118.3 169.9 119.9 165.5 132.5C164.1 136.3 163.0 139.9 163.0 140.3C163.0 142.1 165.6 140.2 168.7 136.1ZM34.0 101.1L34.0 94.2L38.2 95.8C42.1 97.1 42.9 97.1 46.2 95.7C59.0 90.3 56.4 66.0 43.0 66.0C40.8 66.0 37.6 66.7 36.0 67.5C34.3 68.4 33.0 68.6 33.0 68.0C33.0 67.5 31.4 67.0 29.5 67.0L26.0 67.0L26.0 87.5L26.0 108.0L30.0 108.0L34.0 108.0L34.0 101.1ZM170.9 95.9C173.5 95.0 174.1 94.3 173.8 92.2C173.5 89.7 173.3 89.6 167.2 89.9C162.3 90.1 160.4 89.7 158.9 88.4C155.5 85.4 156.5 84.0 162.0 84.0C173.5 84.0 179.0 75.8 172.1 68.9C166.3 63.1 153.7 65.8 150.4 73.5C148.3 78.6 148.6 86.8 151.0 90.8C154.4 96.3 163.2 98.6 170.9 95.9ZM68.8 85.4C69.1 74.2 69.2 74.0 76.2 74.0C78.7 74.0 79.0 73.7 79.0 70.5C79.0 65.9 77.1 65.2 72.1 67.8C68.8 69.5 68.1 69.6 67.6 68.4C67.3 67.6 65.7 67.0 63.5 67.0L60.0 67.0L60.0 81.6L60.0 96.1L64.2 95.8L68.5 95.5L68.8 85.4ZM91.8 81.2L92.1 67.0L87.5 67.0L83.0 67.0L83.0 81.6L83.0 96.1L87.2 95.8L91.5 95.5L91.8 81.2ZM107.2 84.8L107.5 73.6L110.7 72.6C116.2 71.1 117.0 72.6 117.0 85.1L117.0 96.0L121.0 96.0L124.9 96.0L125.2 84.8L125.5 73.6L128.7 72.6C134.2 71.1 135.0 72.6 135.0 85.2L135.0 96.1L139.2 95.8L143.5 95.5L143.8 86.0C144.2 74.6 143.5 70.5 140.9 67.9C138.5 65.5 132.4 65.4 127.6 67.7C124.3 69.2 123.9 69.2 122.2 67.7C119.8 65.5 113.8 65.5 109.7 67.6C107.6 68.8 106.5 68.9 106.2 68.1C106.0 67.5 104.3 67.0 102.4 67.0L99.0 67.0L99.0 81.5L99.0 96.0L103.0 96.0L106.9 96.0L107.2 84.8ZM35.2 89.3C34.4 89.0 34.0 86.4 34.0 81.4C34.0 74.5 34.2 73.9 36.4 72.9C42.1 70.3 46.0 74.0 46.0 81.8C46.0 88.5 41.3 91.8 35.2 89.3ZM157.5 78.0C155.6 74.9 160.0 71.3 164.7 72.2C167.1 72.7 167.6 76.1 165.4 77.7C163.3 79.2 158.4 79.4 157.5 78.0ZM90.8 60.8C92.4 59.2 92.3 55.5 90.6 54.0C88.5 52.4 85.0 53.1 83.4 55.5C80.7 59.6 87.3 64.3 90.8 60.8Z" fill="#00A8E1" fill-rule="evenodd"/></svg>';
  const tile = (txt, bg, fg = "#fff", size) => `<svg viewBox="0 0 48 48" aria-hidden="true"><rect width="48" height="48" fill="${bg}"/><text x="24" y="24" dy=".35em" text-anchor="middle" font-family="Inter,Arial" font-weight="800" font-size="${size || (txt.length > 2 ? 13 : txt.length > 1 ? 16 : 22)}" fill="${fg}">${txt}</text></svg>`;
  const NETFLIX = '<svg viewBox="0 0 48 48" aria-hidden="true"><rect width="48" height="48" fill="#fff"/><path d="M15 9h7l4.5 15V9H33v30h-6.5L22 24v15h-7z" fill="#E50914"/></svg>';
  const SPOTIFY = '<svg viewBox="0 0 48 48" aria-hidden="true"><rect width="48" height="48" fill="#fff"/><circle cx="24" cy="24" r="16" fill="#1DB954"/><g fill="none" stroke="#000" stroke-linecap="round"><path d="M15 19.5c6-2 13-1.5 18.5 1.5" stroke-width="3"/><path d="M16 25c5-1.5 10.5-1 15 1.5" stroke-width="2.5"/><path d="M17 30c4-1 8-.7 11.5 1" stroke-width="2"/></g></svg>';
  const PLAID = '<svg viewBox="0 0 72 72" aria-hidden="true"><rect width="72" height="72" fill="#fff"/><g fill="#111" transform="rotate(45 36 36)">' +
    [0, 1, 2].map((i) => [0, 1, 2].map((j) => `<rect x="${21 + i * 11}" y="${21 + j * 11}" width="8" height="8" rx="1.5"/>`).join("")).join("") + "</g></svg>";
  const ico = (inner, c) => `<svg viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${inner}</svg>`;
  const slash = (c) => `<path d="M4 4L20 20" stroke="#0f0f10" stroke-width="5"/><path d="M4 4L20 20" stroke="${c}"/>`;
  const MINT = "#7fe8c8", CORAL = "#f2607a";
  const ICO = {
    pay: ico('<rect x="2" y="5" width="20" height="14" rx="3"/><path d="M2 10h20M6 15h4"/>', MINT),
    keyok: ico('<circle cx="8" cy="15" r="4"/><path d="M11 12L20 3M17 6l3 3M14 9l2 2"/>', MINT),
    power: ico('<path d="M12 3v8"/><path d="M6.3 6.8a8 8 0 1 0 11.4 0"/>', MINT),
    shield: ico('<path d="M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>', MINT),
    user: ico('<circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-6 8-6s8 2 8 6"/>', MINT),
    money: ico('<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="3"/>' + slash(CORAL), CORAL),
    key: ico('<circle cx="8" cy="15" r="4"/><path d="M11 12L20 3M17 6l3 3M14 9l2 2"/>' + slash(CORAL), CORAL),
    data: ico('<ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>' + slash(CORAL), CORAL),
  };
  const feat = (y, icon, tone, title, sub) => `<li class="row feat" data-t style="top:${y}px"><span class="disc ${tone}" aria-hidden="true">${icon}</span><span class="txt"><span class="t">${title}</span><span class="s">${sub}</span></span></li>`;
  const CHECK = '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M12 25l8 8 16-17" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  // ---------- Data ----------
  const money = (n) => n.toFixed(2).replace(".", ",") + " $";
  const SUBS = [
    { id: "netflix", name: "Netflix", price: 16.49, per: "mois", next: "4 déc.", logo: NETFLIX },
    { id: "adobe", name: "Adobe Acrobat", short: "Adobe", price: 14.99, per: "mois", next: "4 déc.", logo: ACROBAT },
    { id: "spotify", name: "Spotify", price: 11.99, per: "mois", next: "12 déc.", logo: SPOTIFY },
    { id: "prime", name: "Amazon Prime", short: "Amazon", price: 99.0, per: "an", next: "12 janv.", yearly: true, logo: PRIME },
  ];
  const sub = (id) => SUBS.find((s) => s.id === id);
  const BL_ICO = {
    lock: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2.5"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>`,
    x: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>`,
    face: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 8V6a2 2 0 0 1 2-2h2M16 4h2a2 2 0 0 1 2 2v2M20 16v2a2 2 0 0 1-2 2h-2M8 20H6a2 2 0 0 1-2-2v-2M9 9.5v1.5M15 9.5v1.5M12 9.5v3.5h-1M9 16c1.7 1.2 4.3 1.2 6 0"/></svg>`,
    chev: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>`,
    down: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>`,
  };
  const BANKS = [
    { id: "rbc", name: "RBC Banque Royale", short: "RBC", logo: `<img src="logos/rbc.png" alt="">`, theme: { hero: "#06336b", hero2: "#0a55b0", acc: "#0a55b0", svc: "Services bancaires aux particuliers", user: "Carte client ou nom d’utilisateur", reg: "S’inscrire", forgot: "Mot de passe oublié ?", prev: "Aperçu des comptes", prevs: "Soldes sans te connecter" } },
    { id: "scotia", name: "Banque Scotia", short: "Scotia", logo: `<img src="logos/scotiabank.png" alt="">`, theme: { hero: "#0b1f3f", hero2: "#17346a", acc: "#0a62c9", svc: "Particuliers et entreprises", user: "Carte client ou nom d’utilisateur", reg: "S’inscrire", forgot: "Mot de passe oublié ?", prev: "Aperçu des comptes", prevs: "Soldes sans te connecter" } },
    { id: "desj", name: "Desjardins", short: "Desjardins", logo: `<img src="logos/desjardins.png" alt="">`, theme: { hero: "#00452b", hero2: "#007a49", acc: "#007a49", svc: "AccèsD Particuliers", user: "Numéro de carte ou code d’utilisateur", reg: "Devenir membre", forgot: "Mot de passe oublié ?", prev: "Aperçu des comptes", prevs: "Soldes sans te connecter" } },
    { id: "td", name: "Banque TD", short: "TD", logo: `<img src="logos/td.png" alt="">`, theme: { hero: "#0f4a1c", hero2: "#2a9a3a", acc: "#238a32", svc: "Services bancaires EasyWeb", user: "Numéro d’accès ou nom d’utilisateur", reg: "S’inscrire à EasyWeb", forgot: "Mot de passe oublié ?", prev: "Aperçu des comptes", prevs: "Soldes sans te connecter" } },
    { id: "bmo", name: "BMO", short: "BMO", logo: `<img src="logos/bmo.png" alt="">`, theme: { hero: "#00396b", hero2: "#0079c1", acc: "#0075be", svc: "Services bancaires aux particuliers", user: "Numéro de carte ou nom d’utilisateur", reg: "S’inscrire", forgot: "Mot de passe oublié ?", prev: "Aperçu des comptes", prevs: "Soldes sans te connecter" } },
  ];
  const REVIEW = [
    { id: "r1", raw: "DRI*ADOBE 8004", guess: "Adobe Acrobat", price: 14.99 },
    { id: "r2", raw: "DRI*XYZ 8004", guess: null, price: 9.0 },
    { id: "r3", raw: "SPOTIFY P1A2B3", guess: "Spotify", price: 11.99 },
  ];

  // ---------- State ----------
  const S = { screen: "welcome", bank: BANKS[0], detail: null, review: {}, adobe: "active", toggles: { push: true, alerts: true } };

  // ---------- Test harness state ----------
  const TASKS = [
    { id: "T1", short: "Connecter ta banque",
      text: "Tu viens de télécharger Mellow. Connecte ta banque (choisis celle que tu veux) et vérifie les frais que l’app a trouvés." },
    { id: "T2", short: "Arrêter un abonnement",
      text: "Tu ne te sers plus d’Adobe Acrobat. Fais en sorte de ne plus payer pour cet abonnement." },
    { id: "T3", short: "Trouver le paiement annuel",
      text: "Tu veux savoir quand ton prochain gros paiement annuel va arriver. Trouve-le et ouvre-le." },
  ];
  const H = { idx: -1, running: false, start: 0, taps: 0, results: [], marks: {}, notifUsed: false };

  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  // ---------- Position helpers (Figma coordinates) ----------
  const T = (y) => `data-t style="top:${y}px"`;              // anchored to the top
  const B = (y, h) => `data-b style="bottom:${844 - y - h}px"`; // anchored to the bottom (buttons)

  // ---------- Building blocks ----------
  const BACK_ICO = `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14.5 6l-6 6 6 6"/></svg>`;
  const nav = (title, back) => `<header class="nav">${back ? `<button class="back" data-go="${back}" aria-label="Retour">${BACK_ICO}</button>` : ""}<h1>${esc(title)}</h1></header>`;
  const btn = (y, label, attrs, cls = "") => `<button class="btn ${cls}" ${B(y, 56)} ${attrs}>${label}</button>`;
  const link = (y, label, attrs, cls = "") => `<button class="link ${cls}" ${B(y, 28)} ${attrs}>${label}</button>`;
  const metric = (y, cap, val) => `<div class="metric a" ${T(y)}><div class="cap">${cap}</div><div class="val">${val}</div></div>`;
  const plaid = (y, bottom) => `<div class="plaid" ${bottom ? B(y, 32) : T(y)}>Sécurisé par <b>${PLAID.replace('viewBox="0 0 72 72"', 'viewBox="14 14 44 44" width="14" height="14"').replace('fill="#fff"', 'fill="none"').replace('fill="#111"', 'fill="currentColor"')}PLAID</b></div>`;
  const success = (y, confetti) => `<div class="success" ${T(y)} aria-hidden="true"><div class="g"></div><div class="ring"></div><div class="disc">${CHECK}</div>${confetti ? [["#b8f27c", 104, 4, 4, 12], ["#7fe8c8", 158, 40, 6, 6], ["#f6c76b", 170, 110, 4, 10], ["#f2607a", 30, 120, 6, 6], ["#4f9fb8", 36, 50, 4, 12], ["#fff", 58, 26, 6, 6], ["#f6c76b", 104, 182, 4, 10]].map(([c, x, yy, w, h]) => `<i class="c" style="background:${c};left:${x}px;top:${yy}px;width:${w}px;height:${h}px"></i>`).join("") : ""}</div>`;
  const glowStatus = (strong) => `<div class="glow${strong ? " strong" : ""}"></div><div class="sb" aria-hidden="true"><span class="time">9:41</span><span class="icons"><span class="bars"><i style="height:4px"></i><i style="height:6px"></i><i style="height:8px"></i><i style="height:11px"></i></span><span class="bat"><i></i></span></span></div>`;

  function subRow(s, y, subtitle, opts = {}) {
    return `<li class="row" ${T(y)}><button class="row-hit" data-open="${s.id}" style="position:absolute;inset:0;border-radius:30px" aria-label="${esc(s.name)}, ${money(s.price)} par ${s.per}, ${esc(subtitle)}"></button>
      <span class="logo" aria-hidden="true">${s.logo}</span><span class="t" aria-hidden="true">${esc(s.name)}</span><span class="s${opts.warn ? " warn" : ""}" aria-hidden="true">${esc(subtitle)}</span>
      <span class="p" aria-hidden="true">${money(s.price)}</span><span class="pp" aria-hidden="true">par ${s.per}</span><span class="chev" aria-hidden="true">›</span></li>`;
  }
  const tabbar = (cur) => `<nav class="tabbar" aria-label="Navigation principale">${[["dash", "Abonnements"], ["calendar", "Calendrier"], ["settings", "Réglages"]].map(([id, l], i) => `<button data-tab="${id}" style="left:${5 + i * 94}px" ${cur === id ? 'aria-current="page"' : ""}>${l}</button>`).join("")}</nav>`;
  const sectionWithCount = (y, label, n) => `<div class="a" data-t style="top:${y}px;left:28px;display:flex;align-items:center;gap:12px"><h2 class="sect">${label}</h2><span class="count" aria-label="${n} au total">${n}</span></div>`;

  // ---------- Screens ----------
  const SCREENS = {
    welcome: () => ({ strong: true, html: `
      <div class="orbit a" data-t style="top:50px;left:0" aria-hidden="true"><i class="ring" style="left:125px;top:76px;width:140px;height:140px"></i><i class="ring" style="left:81px;top:32px;width:228px;height:228px"></i><i class="sphere-glow"></i><i class="orb" style="--a:-90.0;--r:114px;--dir:1;--sp:var(--orbit-t)"><i class="chip" style="width:44px;height:44px;margin:-22px 0 0 -22px;border-radius:22px"><img src="logos/netflix.png" alt="" style="height:24px"></i></i><i class="orb" style="--a:-38.6;--r:114px;--dir:1;--sp:var(--orbit-t)"><i class="chip" style="width:84px;height:34px;margin:-17px 0 0 -42px;border-radius:17px"><img src="logos/hbo.png" alt="" style="height:12px"></i></i><i class="orb" style="--a:64.3;--r:114px;--dir:1;--sp:var(--orbit-t)"><i class="chip" style="width:92px;height:34px;margin:-17px 0 0 -46px;border-radius:17px"><img src="logos/youtube.png" alt="" style="height:14px"></i></i><i class="orb" style="--a:115.7;--r:114px;--dir:1;--sp:var(--orbit-t)"><i class="chip" style="width:44px;height:44px;margin:-22px 0 0 -22px;border-radius:22px"><img src="logos/prime.png" alt="" style="height:20px"></i></i><i class="orb" style="--a:218.6;--r:114px;--dir:1;--sp:var(--orbit-t)"><i class="chip" style="width:44px;height:44px;margin:-22px 0 0 -22px;border-radius:22px"><img src="logos/adobe.png" alt="" style="height:24px"></i></i><i class="orb" style="--a:167.1;--r:114px;--dir:1;--sp:var(--orbit-t)"><i class="chip" style="width:90px;height:34px;margin:-17px 0 0 -45px;border-radius:17px"><img src="logos/bell.png" alt="" style="height:14px"></i></i><i class="orb" style="--a:12.9;--r:114px;--dir:1;--sp:var(--orbit-t)"><i class="chip" style="width:40px;height:40px;margin:-20px 0 0 -20px;border-radius:20px"><img src="logos/spotify.png" alt="" style="width:100%;height:100%"></i></i><i class="sphere"><b>M</b></i></div>
      <h1 class="hd pt a wi w1" data-t style="top:492px;left:24px">Annule tes abonnements.</h1>
      <p class="body a wi w2" data-t style="top:544px;left:24px;width:342px">Connecte ta banque. Mellow trouve les paiements qui reviennent et t’aide à les annuler.</p>
      ${btn(660, "Commencer", 'data-go="bank"')}
      ${link(740, "J’ai déjà un compte", 'data-go="bank"')}` }),

    bank: () => ({ html: `${nav("Choisis ta banque", "welcome")}
      <div class="a" data-t style="top:128px;left:24px;width:342px;height:52px;border-radius:26px;background:var(--raised);border:1px solid var(--line2);display:flex;align-items:center;gap:10px;padding:0 18px;color:var(--grey);font:400 16px/1 Inter" aria-hidden="true"><i style="width:16px;height:16px;border-radius:50%;border:2px solid var(--grey)"></i>Rechercher une banque</div>
      <h2 class="sect a" data-t style="top:200px;left:28px">Banques populaires</h2>
      <ul>${BANKS.map((b, i) => `<li class="row bank" ${T(244 + i * 96)}><button data-bank="${b.id}" style="position:absolute;inset:0;border-radius:30px" aria-label="${esc(b.name)}"></button><span class="logo" aria-hidden="true">${b.logo}</span><span class="t" aria-hidden="true">${esc(b.name)}</span><span class="s" aria-hidden="true">Particuliers et entreprises</span><span class="chev" aria-hidden="true">›</span></li>`).join("")}</ul>` }),

    consent: () => ({ html: `${nav("Connecter ta banque", "bank")}
      <h1 class="hd pt a" data-t style="top:184px;left:24px">Tu gardes le contrôle.</h1>
      <ul>${feat(236, ICO.shield, "mint", "Lecture seule", "On ne peut rien payer ni déplacer.")}${feat(340, ICO.keyok, "mint", "Ton mot de passe reste privé", "Tu te connectes chez ta banque.")}${feat(444, ICO.power, "mint", "Tu peux couper en tout temps", "Et tes données ne sont jamais vendues.")}${feat(548, ICO.pay, "mint", "Seulement tes paiements", "Les récurrents, sur 12 mois.")}</ul>
      ${plaid(668, true)}
      ${btn(716, "Connecter ma banque", 'data-go="banklogin"')}
      ${link(782, "Pas maintenant", 'data-go="bank"')}` }),

    consent2: () => ({ html: `${nav("Connecter ta banque", "consent")}
      <h1 class="hd pt a" data-t style="top:184px;left:24px">Ce qu’on ne fera jamais.</h1>
      <ul>${feat(272, ICO.money, "coral", "On ne déplace jamais ton argent", "On ne peut ni l’envoyer, ni le retirer.")}${feat(380, ICO.key, "coral", "On ne voit jamais ton mot de passe", "Tu te connectes sur le site de ta banque.")}${feat(488, ICO.data, "coral", "On ne vend jamais tes données", "Elles ne sont ni vendues, ni partagées.")}</ul>
      <p class="body a center" data-t style="top:612px;left:24px;width:342px">Ensuite, tu te connectes à ta banque.</p>
      ${plaid(668, true)}
      ${btn(716, "Connecter ma banque", 'data-go="banklogin"')}
      ${link(782, "Pas maintenant", 'data-go="bank"')}` }),

    banklogin: () => { const b = S.bank, th = b.theme; return { bare: true, light: true, html: `
      <div class="bl" style="--bh:${th.hero};--bh2:${th.hero2};--ba:${th.acc}">
        <div class="bl-hero" aria-hidden="true"></div>
        <button class="bl-back" data-go="consent" aria-label="Retour">${BACK_ICO}</button>
        <span class="bl-logo" aria-hidden="true">${b.logo}</span>
        <h1 class="bl-name">${esc(b.name)}</h1>
        <p class="bl-sub">${esc(th.svc)}</p>
        <button class="bl-in" data-sheet="banklogin">Se connecter</button>
        <div class="bl-card" aria-label="${esc(th.prev)}"><span class="ic" aria-hidden="true">${BL_ICO.lock}</span><span class="tx"><b>${esc(th.prev)}</b><i>${esc(th.prevs)}</i></span><span class="ch" aria-hidden="true">${BL_ICO.chev}</span></div>
        <p class="bl-note">Page simulée pour la démo. Mellow n’affiche jamais la vraie page de ta banque.</p>
      </div>` }; },

    signin: () => ({ html: `${nav("Connexion à " + S.bank.short, "consent")}
      <div class="handoff" ${T(180)} aria-hidden="true">
        <span class="logo" style="left:63px">${PLAID}</span>
        <span class="dots">${[0, 1, 2, 3, 4].map((i) => `<i class="${i === 2 ? "on" : ""}"></i>`).join("")}</span>
        <span class="logo" style="left:207px">${S.bank.logo}</span>
        <span class="lb" style="left:63px">Plaid</span><span class="lb" style="left:207px">Banque</span>
      </div>
      <form id="signin" novalidate>
        <label class="sr" for="u">Identifiant</label>
        <input id="u" class="field" ${T(340)} placeholder="Identifiant" value="demo.mellow" autocomplete="off" autocapitalize="off">
        <label class="sr" for="p">Mot de passe</label>
        <input id="p" class="field" type="password" ${T(424)} placeholder="Mot de passe" value="demo1234" autocomplete="off">
        <p class="body a" data-t style="top:512px;left:24px;width:342px">Tes identifiants vont à ta banque, pas à Mellow. (Ici, ce sont de faux identifiants de démo.)</p>
        ${plaid(608, true)}
        <button class="btn" type="submit" ${B(716, 56)}>Se connecter</button>
      </form>` }),

    connecting: () => ({ html: `${nav("Connexion", "banklogin")}
      <div class="handoff" ${T(230)} role="img" aria-label="Plaid transmet les données de ${esc(S.bank.short)} à Mellow">
        <span class="logo" style="left:63px">${PLAID}</span>
        <span class="dots">${[0, 1, 2, 3, 4].map(() => "<i></i>").join("")}</span>
        <span class="logo" style="left:207px">${S.bank.logo}</span>
        <span class="lb" style="left:63px">Plaid</span><span class="lb" style="left:207px">${esc(S.bank.short)}</span>
      </div>
      <h2 class="hd a center w342" data-t style="top:372px">Connexion à ${esc(S.bank.short)}</h2>
      <p class="body a center" data-t style="top:424px;left:40px;width:310px">On relie ton compte de façon sécurisée. Ça prend environ 30 secondes.</p>
      ${link(740, "Annuler", 'data-go="bank"')}` }),

    connected: () => ({ strong: true, html: `
      <header class="nav"><h2>Compte lié</h2></header>
      <span class="logo l88" data-t style="top:140px;left:151px" aria-hidden="true">${S.bank.logo}</span>
      <h1 class="hd pt a center w342" data-t style="top:256px;left:24px">Compte chèques ··4821</h1>
      <p class="body a center w342" data-t style="top:298px;left:24px">${esc(S.bank.name)}</p>
      <section class="okcard a" data-t style="top:356px" aria-label="Banque connectée">
        <span class="okck" aria-hidden="true"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></span>
        <h2>Banque connectée</h2>
        <p>Mellow peut lire tes paiements des 12 derniers mois. Il ne peut rien payer ni déplacer.</p>
      </section>
      ${btn(716, "Analyser mon compte", 'data-go="scanning"')}` }),

    scanning: () => ({ strong: true, html: `
      <h1 class="hd pt a" data-t style="top:156px;left:24px">On analyse 12 mois…</h1>
      <div class="pbar a" data-t style="top:236px" role="progressbar" aria-label="Progression de l’analyse" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><i id="pb"></i></div>
      <div class="cnt a" data-t style="top:258px"><span id="sc-n" aria-live="polite">0 trouvé</span><b id="sc-m">0 $/mois</b></div>
      <ul id="sc-list" class="sclist" aria-label="Abonnements trouvés"></ul>
      ${btn(716, "Voir les résultats pour l’instant", 'data-go="scanned"', "sec")}` }),

    slow: () => ({ strong: true, html: `
      <button class="bl-back2" data-go="connected" aria-label="Retour">${BACK_ICO}<span>Retour</span></button>
      <h1 class="hd pt a center w342" data-t style="top:266px;left:24px;white-space:normal;line-height:34px">Ça prend plus de temps que prévu</h1>
      <div class="pbar a" data-t style="top:350px" aria-hidden="true"><i style="width:65%"></i></div>
      <p class="body a center w342" data-t style="top:380px">Certaines banques mettent quelques minutes. Tu peux quitter cet écran : Mellow continue et te prévient quand c’est prêt.</p>
      <div class="set a" data-t style="top:486px;left:24px;width:342px"><span id="l-ready">Me prévenir quand c’est prêt</span><button class="switch" role="switch" aria-labelledby="l-ready" aria-checked="${S.toggles.push}" data-toggle="push"></button></div>
      ${btn(716, "Continuer en arrière-plan", 'data-go="scanned"')}
      ${link(782, "Annuler l’analyse", 'data-go="connected"')}` }),

    empty: () => ({ strong: true, html: `
      <button class="bl-back2" data-go="connected" aria-label="Retour">${BACK_ICO}<span>Retour</span></button>
      <h1 class="hd pt a center w342" data-t style="top:316px;left:24px;white-space:normal">Aucun paiement récurrent</h1>
      <p class="body a center w342" data-t style="top:372px">On a vérifié 12 mois de transactions sur ce compte. Essaie un autre compte, ou ajoute un abonnement toi-même.</p>
      ${btn(716 - 68, "Ajouter un abonnement", 'data-go="dash"')}
      ${btn(716, "Connecter un autre compte", 'data-go="bank"', "sec")}` }),

    scanned: () => { const rowFor = (r, i) => { const x = r.guess ? sub(r.guess === "Adobe Acrobat" ? "adobe" : r.guess === "Spotify" ? "spotify" : "") : null;
        const logo = x ? x.logo : GI('<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 .9-1 1.7M12 17h.01"/>');
        const name = r.guess || "Inconnu";
        return `<li class="row" ${T(356 + i * 108)}><button class="row-hit" data-go="review" style="position:absolute;inset:0;border-radius:30px" aria-label="${esc(name)}, ${money(r.price)} par mois, ${esc(r.raw)}"></button>
          <span class="logo${x ? "" : " gic"}" aria-hidden="true">${logo}</span><span class="t" aria-hidden="true">${esc(name)}</span><span class="s" aria-hidden="true">${esc(r.raw)}</span>
          <span class="p" aria-hidden="true">${money(r.price)}</span><span class="pp" aria-hidden="true">par mois</span><span class="chev" aria-hidden="true">›</span></li>`; };
      return { strong: true, html: `
      <span class="tck a" data-t style="top:84px;left:28px" aria-hidden="true"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></span>
      <h1 class="title a" data-t style="top:76px;left:68px;line-height:40px">Analyse terminée</h1>
      ${metric(132, "On a trouvé " + SCAN_POOL.length + " abonnements", SCAN_TOTAL + " $/mois")}
      <p class="a" data-t style="top:264px;left:28px;font:400 14px/18px Inter;color:var(--grey)">${SCAN_POOL.length - REVIEW.length} reconnus · environ ${(SCAN_TOTAL * 12).toLocaleString("fr-CA").replace(/\s/g, " ")} $ par an</p>
      ${sectionWithCount(308, "À vérifier", REVIEW.length)}
      <ul>${REVIEW.map(rowFor).join("")}</ul>
      ${btn(716, "Vérifier les " + REVIEW.length + " paiements", 'data-go="review"')}
      <p class="fine a" ${B(784, 18)}>Rien n’est annulé sans ton accord.</p>` }; },

    review: () => {
      const left = REVIEW.filter((r) => !S.review[r.id]).length;
      const done = REVIEW.filter((r) => S.review[r.id] && S.review[r.id] !== "later");
      const banner = done.length > 0;
      const y0 = banner ? 288 : 228;
      const names = done.map((r) => esc(S.review[r.id]));
      return { html: `${nav("Vérification", null)}
      <h1 class="hd a" data-t style="top:128px;left:24px">14 trouvés, ${left === 0 ? "tout est vérifié" : left + " à vérifier"}</h1>
      <p class="body a" data-t style="top:172px;left:24px">${11 + done.length} confirmés · 412 $/mois</p>
      ${banner ? `<div class="banner" ${T(212)} role="status">${names.length > 1 ? names.slice(0, -1).join(", ") + " et " + names.slice(-1) : names[0]} confirmé${names.length > 1 ? "s" : ""}.${left ? " " + left + " à vérifier." : ""}</div>` : ""}
      <h2 class="sect a" data-t style="top:${y0}px;left:28px">À regarder</h2>
      <ul>${REVIEW.map((r, i) => { const v = S.review[r.id]; const ok = v && v !== "later";
        const t = ok ? v : r.guess || r.raw;
        const s = ok ? "Confirmé" : v === "later" ? "Plus tard" : r.guess ? "Payé le 4 nov." : "Inconnu · touche pour nommer";
        return `<li class="row charge" ${T(y0 + 44 + i * 104)}><button data-review="${r.id}" style="position:absolute;inset:0;border-radius:30px" aria-label="${esc(t)}, ${money(r.price)} par mois, ${s}"></button><span class="box${ok ? " on" : ""}" aria-hidden="true">${ok ? "✓" : ""}</span><span class="t" aria-hidden="true">${esc(t)}</span><span class="s" aria-hidden="true">${s}</span><span class="p" aria-hidden="true">${money(r.price)}</span><span class="pp" aria-hidden="true">par mois</span></li>`; }).join("")}</ul>
      <div class="cta-fade" ${B(716, 128)}></div>
      ${btn(756, left === 0 ? "Continuer" : "Continuer (vérifier plus tard)", 'data-go="dash"')}` };
    },

    dash: () => {
      const rows = ["netflix", "adobe", "spotify"].filter((id) => !(id === "adobe" && S.adobe === "cancelled")).map(sub);
      const cancelled = S.adobe === "cancelled";
      return { tabs: "dash", html: `
      <h1 class="title a" data-t style="top:76px;left:28px;line-height:40px">Abonnements</h1>
      ${metric(132, "Tu dépenses", cancelled ? "397 $/mois" : "412 $/mois")}
      <p class="a" data-t style="top:264px;left:28px;font:400 14px/18px Inter;color:var(--grey)">${cancelled ? "2 que tu n’utilises peut-être pas · 26 $/mois" : "3 que tu n’utilises peut-être pas · 41 $/mois"}</p>
      ${sectionWithCount(308, "Actifs", cancelled ? 13 : 14)}
      <ul>${rows.map((s, i) => subRow(s, 356 + i * 108, s.id === "adobe" && S.adobe === "pending" ? "Annulation en cours" : "Renouvelle le " + s.next, { warn: s.id === "adobe" && S.adobe === "pending" })).join("")}</ul>` };
    },

    calendar: () => {
      const rows = ["netflix", "adobe", "prime"].filter((id) => !(id === "adobe" && S.adobe === "cancelled")).map(sub);
      const total = rows.reduce((a, s) => a + s.price, 0);
      const subtitle = (s) => s.id === "adobe" ? (S.adobe === "pending" ? "Annulation en cours" : s.next + " · fin de l’essai") : s.yearly ? s.next + " · une fois par an" : s.next;
      return { tabs: "calendar", html: `
      <h1 class="title a" data-t style="top:76px;left:28px;line-height:40px">Calendrier</h1>
      ${metric(132, "À payer avant le 15 janv.", money(total))}
      ${sectionWithCount(278, "À venir", rows.length)}
      <ul>${rows.map((s, i) => subRow(s, 324 + i * 108, subtitle(s), { warn: s.id === "adobe" && S.adobe === "pending" })).join("")}</ul>` };
    },

    settings: () => ({ tabs: "settings", html: `${nav("Réglages", "dash")}
      <h2 class="sect a" data-t style="top:140px;left:28px">Notifications</h2>
      <div class="set" ${T(184)}><span id="l-push">Notifications push</span><button class="switch" role="switch" aria-labelledby="l-push" aria-checked="${S.toggles.push}" data-toggle="push"></button></div>
      <div class="set" ${T(264)}><span id="l-alerts">Alertes d’essai et de frais</span><button class="switch" role="switch" aria-labelledby="l-alerts" aria-checked="${S.toggles.alerts}" data-toggle="alerts"></button></div>
      <p class="small a" data-t style="top:336px;left:30px;width:330px;line-height:16px">Activé par défaut. On te prévient 1 jour avant la fin d’un essai ou un paiement.</p>
      <h2 class="sect a" data-t style="top:388px;left:28px">Compte</h2>
      <button class="set" ${T(432)}>Banques connectées<span class="chev" aria-hidden="true">›</span></button>
      <button class="set" ${T(512)}>Aide<span class="chev" aria-hidden="true">›</span></button>
      <button class="link coral" data-t style="top:628px;left:115px;width:160px">Se déconnecter</button>` }),

    detail: () => {
      const s = sub(S.detail);
      const pending = s.id === "adobe" && S.adobe === "pending";
      const actions = pending ? `
        <section class="status" ${T(372)} role="status" aria-labelledby="st-h">
          <h2 id="st-h">On l’annule pour toi</h2>
          <p>On a écrit à Adobe aujourd’hui. Ça prend souvent 1 à 3 jours. Tu n’as rien à faire.</p>
          <ol>
            <li class="done" style="top:105px"><i></i><b>Demande envoyée à Adobe</b><span>Aujourd’hui</span></li>
            <li style="top:155px"><i></i><b>Adobe confirme</b><span>Souvent 1 à 3 jours</span></li>
            <li style="top:205px"><i></i><b>Tu reçois une notification</b><span>Quand c’est fait</span></li>
          </ol>
        </section>
        <button class="link" data-t style="top:666px;left:115px;width:160px" data-stop>Arrêter la demande</button>
        <button class="link" data-t style="top:716px;font-size:13px" data-go="cancelled">(Pour le test : simuler la réponse d’Adobe)</button>` : `
        <button class="action" ${T(380)} data-go="dash">Garder cet abonnement<span class="chev" aria-hidden="true">›</span></button>
        <button class="action coral" ${T(460)} data-cancel="${s.id}">Annule-le pour moi<span class="chev" aria-hidden="true">›</span></button>`;
      return { html: `${nav("Détails", "back")}
      <span class="logo l72" data-t style="top:140px;left:159px" aria-hidden="true">${s.logo}</span>
      <h2 class="title a center w342" data-t style="top:228px">${esc(s.name)}</h2>
      <p class="body a center w342" data-t style="top:272px">${money(s.price)} par ${s.per} · renouvelle le ${s.next}</p>
      ${actions}` };
    },

    cancelled: () => ({ strong: true, html: `${success(150)}
      <h1 class="title a center w342" data-t style="top:366px;line-height:48px">Adobe est annulé</h1>
      ${metric(440, "Tu viens d’économiser", "179,88 $/an")}
      <p class="body a center" data-t style="top:584px;left:40px;width:310px">Plus aucun paiement de 14,99 $. On te prévient si Adobe te facture encore.</p>
      ${btn(716, "Retour aux abonnements", 'data-go="dash"')}` }),
  };

  // ---------- Scaling: the 390 px Figma frame fills the phone width ----------
  const device = $("device");
  const framedMQ = window.matchMedia("(min-width:600px)");
  let scale = 1, viewH = 844;
  function fit() {
    const framed = framedMQ.matches;
    device.classList.toggle("framed", framed);
    const w = framed ? 390 : device.clientWidth, h = framed ? 844 : device.clientHeight;
    if (framed) scale = Math.min(1, (window.innerHeight - 48) / 844);
    else {
      const s0 = Math.min(w / 390, 1.2);
      // Short screens (browser bars showing): shrink a little so most screens fit without scrolling.
      scale = h / s0 < 760 ? Math.max(h / 760, s0 * 0.86) : s0;
    }
    device.style.setProperty("--s", scale);
    viewH = framed ? 844 : h / scale;
    device.style.setProperty("--s", scale);
    device.style.setProperty("--h", viewH);
    layout();
  }
  // Grow the canvas when the phone is shorter than the content, so nothing overlaps; the screen scrolls instead.
  function layout() {
    const c = document.querySelector("#screen .canvas");
    if (!c) return;
    c.style.height = Math.max(viewH, 400) + "px";
    const cr = c.getBoundingClientRect(), k = cr.width / 390;
    let topMax = 0, botExt = 0;
    c.querySelectorAll("[data-t]").forEach((el) => { const r = el.getBoundingClientRect(); topMax = Math.max(topMax, (r.bottom - cr.top) / k); });
    c.querySelectorAll("[data-b]").forEach((el) => { const r = el.getBoundingClientRect(); botExt = Math.max(botExt, (cr.bottom - r.top) / k); });
    if (c.dataset.tabs) botExt = Math.max(botExt, 116);
    const need = topMax + (botExt ? 20 + botExt : 24);
    c.style.height = Math.max(viewH, need) + "px";
  }

  // ---------- Render ----------
  let prev = [];
  let nextTrans = "fade";
  const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function go(screen) {
    const wasBack = screen === "back";
    if (screen === "back") { screen = prev.pop() || "dash"; }
    else if (S.screen !== screen) prev.push(S.screen);
    if (["dash", "calendar", "settings"].includes(screen)) prev = [];
    if (screen === "cancelled") S.adobe = "cancelled";
    const from = S.screen, tabs = ["dash", "calendar", "settings"];
    nextTrans = wasBack ? "back"
      : tabs.includes(from) && tabs.includes(screen) ? "fade"
      : screen === "detail" ? "up"
      : ["connected", "scanned", "cancelled"].includes(screen) ? "pop"
      : screen === "connecting" ? "fade"
      : "fwd";
    S.screen = screen;
    render();
    onScreen(screen);
  }
  function render() {
    const v = SCREENS[S.screen]();
    const el = $("screen");
    const trans = reduceMotion() ? "none" : nextTrans;
    nextTrans = "none";
    // keep the old screen as a non-interactive ghost so it can animate out
    let ghost = null;
    const old = el.querySelector(".canvas");
    if (old && trans !== "none") {
      ghost = old.cloneNode(true);
      ghost.querySelectorAll("*").forEach((n) => { for (const a of [...n.attributes]) if (a.name.startsWith("data-") || a.name === "id" || a.name === "tabindex" || a.name === "for" || a.name === "href") n.removeAttribute(a.name); });
      ghost.setAttribute("aria-hidden", "true"); ghost.inert = true;
      ghost.className = "canvas ghost out-" + trans;
      ghost.style.top = el.scrollTop + "px";
    }
    el.innerHTML = `<div class="canvas${v.light ? " light" : ""}${trans !== "none" ? " in-" + trans : ""}"${v.tabs ? ' data-tabs="1"' : ""}>${v.bare ? glowStatus(false).replace(/<div class="glow[^>]*><\/div>/, "") : glowStatus(v.strong)}${v.html}<div class="home"></div></div>`;
    if (ghost) { el.appendChild(ghost); setTimeout(() => ghost.remove(), 340); }
    if (trans === "fwd" || trans === "up" || trans === "pop") el.querySelectorAll(".canvas > ul > li, .canvas .metric, .canvas .btn, .canvas .link").forEach((n, i) => { n.classList.add("stg"); n.style.setProperty("--i", Math.min(i, 8)); });
    $("tab-layer").innerHTML = v.tabs ? `<div class="ov">${tabbar(v.tabs)}</div>` : "";
    el.scrollTop = 0;
    layout();
    const h = el.querySelector("h1");
    if (h) { h.setAttribute("tabindex", "-1"); h.focus({ preventScroll: true }); }
    if (S.screen === "signin") $("signin").addEventListener("submit", (e) => { e.preventDefault(); go("connecting"); });
    if (S.screen === "scanning") runScan();
    if (S.screen === "connecting") setTimeout(() => { if (S.screen === "connecting") go("connected"); }, 2200);
  }

  // ---------- Scan progress (counts tick up, newest finds rise in) ----------
  const SCAN_MODE = new URLSearchParams(location.search).get("scan") || "";   // "", "slow", "empty" (demo links)
  // 14 different charges the scan "finds" (brands we have logos for + generic categories with cryptic bank names).
  const GI = (d) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  const PNGLOGO = (n) => `<img src="logos/${n}.png" alt="" class="fit">`;
  const SCAN_POOL = [
    { name: "Netflix", cat: "Vidéo", price: 16.49, per: "mois", logo: NETFLIX },
    { name: "Spotify", cat: "Musique", price: 11.99, per: "mois", logo: SPOTIFY },
    { name: "Adobe Acrobat", cat: "Logiciel", price: 14.99, per: "mois", logo: ACROBAT },
    { name: "Amazon Prime", cat: "Livraison et vidéo", price: 99.0, per: "an", logo: PRIME },
    { name: "HBO Max", cat: "Vidéo", price: 12.99, per: "mois", logo: PNGLOGO("hbo") },
    { name: "YouTube", cat: "Vidéo et musique", price: 15.99, per: "mois", logo: PNGLOGO("youtube") },
    { name: "Bell Média", cat: "Télé", price: 24.99, per: "mois", logo: PNGLOGO("bell") },
    { name: "Salle de sport", cat: "Sport", price: 59.99, per: "mois", logo: GI('<path d="M6.5 6.5v11M17.5 6.5v11M3 9v6M21 9v6M6.5 12h11"/>') },
    { name: "Stockage cloud", cat: "Stockage", price: 3.99, per: "mois", logo: GI('<path d="M7 18a4 4 0 0 1-.5-8A5.5 5.5 0 0 1 17 8.5 4 4 0 0 1 17.5 18z"/>') },
    { name: "Journal en ligne", cat: "Actualités", price: 9.99, per: "mois", logo: GI('<rect x="4" y="5" width="16" height="14" rx="2"/><path d="M8 9h8M8 12.5h8M8 16h5"/>') },
    { name: "Jeux vidéo", cat: "Jeux", price: 14.99, per: "mois", logo: GI('<rect x="3" y="8" width="18" height="9" rx="4.5"/><path d="M8 11v3M6.5 12.5h3M15.5 11.8h.01M17.5 13.2h.01"/>') },
    { name: "VPN", cat: "Sécurité", price: 5.99, per: "mois", logo: GI('<path d="M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6z"/>') },
    { name: "Boîte repas", cat: "Repas", price: 110.0, per: "mois", logo: GI('<path d="M6 8h12l-1 11H7z"/><path d="M9 8V6.5a3 3 0 0 1 6 0V8"/>') },
    { name: "Forfait mobile", cat: "Téléphonie", price: 55.0, per: "mois", logo: GI('<rect x="7" y="3" width="10" height="18" rx="2.5"/><path d="M11 18h2"/>') },
  ];
  const monthly = (x) => (x.per === "an" ? x.price / 12 : x.price);
  const SCAN_TOTAL = 412;   // same total as the dashboard; the last find is sized so the 14 finds add up to it
  SCAN_POOL[SCAN_POOL.length - 1].price = Math.round((SCAN_TOTAL - SCAN_POOL.slice(0, -1).reduce((t, x) => t + monthly(x), 0)) * 100) / 100;
  const shuffle = (a) => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const easeIO = (x) => 0.5 - 0.5 * Math.cos(Math.PI * x);

  // One continuous timeline (requestAnimationFrame): the bar, the counts and the finds all follow the same progress p.
  function runScan() {
    const bar = $("pb"), list = $("sc-list"); if (!bar || !list) return;
    const items = shuffle([...SCAN_POOL]), total = items.length;
    const endP = SCAN_MODE === "slow" ? 0.62 : 1, DUR = 8400;
    const t0 = performance.now(); let shown = 0, shownSum = 0, cur = 0, rows = [];
    const rowEl = (x, slot) => { const li = document.createElement("li"); li.className = "row scan"; li.setAttribute("aria-hidden", "false");
      li.style.setProperty("--s", slot + 0.7); li.style.opacity = 0;
      li.innerHTML = `<span class="logo gic" aria-hidden="true">${x.logo}</span><span class="t">${esc(x.name)}</span><span class="s">${esc(x.cat)}</span><span class="p">${money(x.price)}</span><span class="pp">par ${x.per}</span>`;
      list.appendChild(li); return li; };
    const addRow = (x) => {
      if (rows.length === 3) { const old = rows.shift(); old.el.style.setProperty("--s", -1); old.el.style.opacity = 0; setTimeout(() => old.el.remove(), 650); }
      rows.forEach((r, i) => { r.slot = i; r.el.style.setProperty("--s", i); });
      const slot = rows.length, el = rowEl(x, slot); rows.push({ el, slot });
      requestAnimationFrame(() => requestAnimationFrame(() => { el.style.setProperty("--s", slot); el.style.opacity = 1; }));
    };
    const frame = (now) => {
      if (S.screen !== "scanning" || !$("pb")) return;
      const x = Math.min((now - t0) / DUR, 1), p = easeIO(x) * endP;
      bar.style.transform = `scaleX(${p})`; bar.parentNode.setAttribute("aria-valuenow", Math.round(p * 100));
      const n = SCAN_MODE === "empty" ? 0 : Math.min(total, Math.floor(p * total + 1e-6));
      while (shown < n) { const it = items[shown]; addRow(it); shownSum += monthly(it); shown++; $("sc-n").textContent = shown + (shown > 1 ? " trouvés" : " trouvé"); }
      cur += (shownSum - cur) * 0.14; if (Math.abs(shownSum - cur) < 0.5) cur = shownSum;
      $("sc-m").textContent = Math.round(cur) + " $/mois";
      if (x < 1) return requestAnimationFrame(frame);
      setTimeout(() => { if (S.screen === "scanning") go(SCAN_MODE === "slow" ? "slow" : SCAN_MODE === "empty" ? "empty" : "scanned"); }, SCAN_MODE ? 1400 : 900);
    };
    setTimeout(() => requestAnimationFrame(frame), 500);
  }

  // ---------- Sheets ----------
  function sheet(html, opts = {}) {
    $("sheet-layer").innerHTML = `<div class="ov"><div class="scrim" data-close></div><div class="sheet${opts.red ? " red" : ""}${opts.tall ? " tall" : ""}" role="dialog" aria-modal="true" aria-labelledby="sh-t"><div class="grab"></div>${html}</div></div>`;
    const b = $("sheet-layer").querySelector(".sheet input,.sheet button");
    if (b) b.focus({ preventScroll: true });
  }
  function bankSheet() {
    const b = S.bank, th = b.theme;
    $("sheet-layer").innerHTML = `<div class="ov"><div class="scrim" data-close></div><div class="bsheet" style="--ba:${th.acc}" role="dialog" aria-modal="true" aria-labelledby="sh-t">
      <button class="x" data-close aria-label="Fermer">${BL_ICO.x}</button><h2 id="sh-t">Se connecter</h2><span class="lk" aria-hidden="true">${BL_ICO.lock}</span>
      <form id="signin" novalidate>
        <label class="fl" for="u">${esc(th.user)}</label>
        <input id="u" class="bf" value="demo.mellow" autocomplete="off" autocapitalize="off">
        <label class="sr" for="p">Mot de passe</label>
        <input id="p" class="bf" type="password" value="demo1234" autocomplete="off" aria-label="Mot de passe">
        <button class="bb" type="submit"><span aria-hidden="true">${BL_ICO.face}</span>Se connecter avec Face ID</button>
        <button class="bl2" type="submit">Utiliser le mot de passe</button>
        <div class="bfoot"><span>${esc(th.forgot)}</span><span>${esc(th.reg)}</span></div>
      </form></div></div>`;
    $("signin").addEventListener("submit", (e) => { e.preventDefault(); $("sheet-layer").innerHTML = ""; go("connecting"); });
    $("u").focus({ preventScroll: true });
  }
  const closeSheet = () => {
    const layer = $("sheet-layer"), node = layer.firstElementChild;
    if (!node || reduceMotion()) { layer.innerHTML = ""; return; }
    node.classList.add("closing");
    setTimeout(() => { if (layer.firstElementChild === node) layer.innerHTML = ""; }, 200);
  };
  const sb = (y, h) => `style="top:${y}px"`;

  function guessSheet(r) {
    sheet(`<div class="tx" ${sb(110)}><h2 id="sh-t">C’est ${esc(r.guess)} ?</h2><p>On a associé ${esc(r.raw)} à ${esc(r.guess)} à ${money(r.price)}.</p></div>
      <button class="btn" ${sb(236)} data-rv="yes" data-id="${r.id}">Oui, c’est ça</button>
      <button class="link" ${sb(304)} style="color:#d1d1d6" data-rv="no" data-id="${r.id}">Non, c’est autre chose</button>
      <button class="link" ${sb(346)} data-rv="later" data-id="${r.id}">Pas sûr, demande-moi plus tard</button>`);
  }
  function nameSheet(r) {
    sheet(`<div class="tx" ${sb(40)}><h2 id="sh-t">Nomme ce paiement</h2></div>
      <p class="tx" ${sb(84)} style="font:400 15px/20px Inter;color:var(--grey)">${esc(r.raw)} · ${money(r.price)}/mois</p>
      <form id="nameform"><label class="sr" for="nm">Nom du paiement</label>
      <input id="nm" class="field" ${sb(136)} placeholder="ex. Abonnement au gym" autocomplete="off">
      <button class="btn" type="submit" ${sb(232)}>Enregistrer</button></form>
      <button class="link" ${sb(308)} data-rv="later" data-id="${r.id}">Masquer ce paiement</button>`, { tall: true });
    $("nameform").addEventListener("submit", (e) => { e.preventDefault(); S.review[r.id] = $("nm").value.trim() || "Paiement nommé"; closeSheet(); render(); });
  }
  function cancelSheet(id) {
    const s = sub(id);
    sheet(`<div class="tx" ${sb(150)}><h2 id="sh-t">On annule ${esc(s.short || s.name)} ?</h2><p>On contacte ${esc(s.short || s.name)} et on s’en occupe. Ton prochain paiement de ${money(s.price)} est le ${s.next}</p></div>
      <button class="btn" ${sb(300)} data-confirm-cancel="${id}">Annule-le pour moi</button>
      <button class="link coral" ${sb(368)} data-close>Le garder</button>`, { red: true });
  }

  // ---------- Notification (Figma "18 Trial alert") ----------
  function showNotif() {
    if (S.adobe !== "active" || !S.toggles.alerts) return;
    $("notif-layer").innerHTML = `<div class="ov"><button class="notif" data-notif aria-label="Notification Mellow : l’essai d’Adobe Acrobat se termine demain"><span class="app" aria-hidden="true">M</span><span class="meta">Mellow · maintenant</span><b>L’essai d’Adobe Acrobat se termine demain</b><span class="msg">14,99 $/mois à partir du 4 déc. Touche pour l’annuler à ta place, ou le garder.</span></button></div>`;
  }

  // ---------- Events ----------
  document.addEventListener("click", (e) => {
    const t = e.target.closest("button,[data-close]");
    if (!t) return;
    const inApp = !t.closest("#harness-layer") && !t.closest("#taskbar");
    if (inApp && H.running) H.taps++;
    const d = t.dataset;
    if ("close" in d) return closeSheet();
    if (d.sheet === "banklogin") return bankSheet();
    if (d.go) { closeSheet(); return go(d.go); }
    if (d.tab) return go(d.tab);
    if (d.bank) { S.bank = BANKS.find((b) => b.id === d.bank); return go("consent"); }
    if (d.open) { S.detail = d.open; mark("open_" + d.open); return go("detail"); }
    if (d.cancel) return cancelSheet(d.cancel);
    if (d.confirmCancel) { S.adobe = "pending"; closeSheet(); render(); mark("cancel_confirmed"); return; }
    if ("stop" in d) { S.adobe = "active"; return render(); }
    if (d.review) { const r = REVIEW.find((x) => x.id === d.review); return r.guess ? guessSheet(r) : nameSheet(r); }
    if (d.rv) {
      const r = REVIEW.find((x) => x.id === d.id);
      if (d.rv === "yes") { S.review[r.id] = r.guess; closeSheet(); return render(); }
      if (d.rv === "no") return nameSheet(r);
      if (d.rv === "later") { S.review[r.id] = "later"; closeSheet(); return render(); }
    }
    if (d.toggle) { S.toggles[d.toggle] = !S.toggles[d.toggle]; t.setAttribute("aria-checked", S.toggles[d.toggle]); return; }
    if ("notif" in d) { $("notif-layer").innerHTML = ""; H.notifUsed = true; S.detail = "adobe"; mark("open_adobe"); return go("detail"); }
    if (d.h) return harness(d.h, t);
  });

  // ---------- Test harness ----------
  function onScreen(screen) {
    if (screen === "connected") mark("bank_connected");
    if (screen === "dash") mark("dashboard");
  }
  function mark(event) {
    if (!H.running) return;
    const task = TASKS[H.idx].id;
    const t = ((performance.now() - H.start) / 1000).toFixed(1);
    H.marks[task] = H.marks[task] || {};
    if (!H.marks[task][event]) H.marks[task][event] = t;
    const doneOn = { T1: "dashboard", T2: "cancel_confirmed", T3: "open_prime" }[task];
    if (event === doneOn) finishTask(true);
  }
  function taskbar(show) {
    const b = $("taskbar");
    if (!show) { b.innerHTML = ""; return; }
    const task = TASKS[H.idx];
    b.innerHTML = `<div class="ov"><div class="taskbar" role="region" aria-label="Tâche en cours"><button class="tb-chip" data-h="tb" aria-expanded="false" aria-label="Tâche ${H.idx + 1} sur 3 : ${esc(task.short)}">${H.idx + 1}/3</button><span class="lbl">${H.idx + 1}/3 · ${task.short}</span><button data-h="reread">Relire</button><button data-h="giveup">Abandonner</button></div></div>`;
  }
  function overlay(html) { const layer = $("harness-layer"), fresh = !layer.firstElementChild; layer.innerHTML = `<div class="harness${fresh ? "" : " swap"}" role="dialog" aria-modal="true">${html}</div>`; const f = $("harness-layer").querySelector("h1"); if (f) { f.tabIndex = -1; f.focus(); } }
  const closeOverlay = () => { $("harness-layer").innerHTML = ""; };

  const HI = (d) => `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  const HICO = {
    flask: HI('<path d="M9 3h6M10 3v6l-5.2 8.6A2 2 0 0 0 6.5 21h11a2 2 0 0 0 1.7-3.4L14 9V3"/><path d="M7.5 15h9"/>'),
    tasks: HI('<path d="M9 6h11M9 12h11M9 18h11"/><path d="M3.5 6l1.3 1.3L7 5M3.5 12l1.3 1.3L7 11M3.5 18l1.3 1.3L7 17"/>'),
    mic: HI('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>'),
    chat: HI('<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/><path d="M9 11h6M9 14h3"/>'),
    copy: HI('<rect x="8" y="8" width="12" height="12" rx="2.5"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>'),
    lock: HI('<rect x="5" y="11" width="14" height="9" rx="2.5"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>'),
    info: HI('<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>'),
    user: HI('<circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-6 8-6s8 2 8 6"/>'),
  };
  const irow = (ico, html) => `<li><span class="hic" aria-hidden="true">${ico}</span><span>${html}</span></li>`;
  function intro() {
    overlay(`<div class="hhead"><span class="hbadge" aria-hidden="true">${HICO.flask}</span><div class="kicker">Test utilisateur · environ 10 minutes</div></div>
      <h1>Merci de tester Mellow</h1>
      <p class="lead">Mellow trouve tes abonnements et les annule pour toi.</p>
      <div class="hcall"><span class="hic" aria-hidden="true">${HICO.info}</span><p><b>C’est un prototype.</b> Rien n’est réel et aucune vraie banque n’est connectée.</p></div>
      <div class="hcall"><span class="hic" aria-hidden="true">${HICO.user}</span><p>On teste l’app, <b>pas toi</b>. Si c’est difficile, c’est l’app qui doit changer.</p></div>
      <h2 class="hsub">Ce qui t’attend</h2>
      <ul class="hlist">${irow(HICO.tasks, "<b>3 petites tâches</b> à faire dans l’app.")}${irow(HICO.mic, "Dis à voix haute ce que tu penses, si tu peux.")}${irow(HICO.chat, "<b>Une question rapide</b> après chaque tâche.")}${irow(HICO.copy, "À la fin, copie tes résultats et envoie-les à la personne qui t’a invité.")}</ul>
      <p class="muted hpriv"><span aria-hidden="true">${HICO.lock}</span>Aucune donnée n’est envoyée ni enregistrée par ce site.</p>
      <button class="hbtn" data-h="next">Commencer</button>`);
  }
  function taskCard() {
    const task = TASKS[H.idx];
    overlay(`<div class="kicker">Tâche ${H.idx + 1} sur 3</div><div class="tsegs" role="img" aria-label="Tâche ${H.idx + 1} sur 3">${[0, 1, 2].map((i) => `<i class="${i < H.idx ? "done" : i === H.idx ? "on" : ""}"></i>`).join("")}</div><h1>${task.short}</h1>
      <p class="task-text">${task.text}</p>
      <p class="muted tnext">${H.idx < 2 ? `Après celle-ci, il reste ${2 - H.idx} tâche${H.idx === 0 ? "s" : ""}. On te les montre une à la fois.` : "C’est la dernière tâche."}</p>
      <p class="muted">Le chronomètre démarre quand tu touches le bouton. Touche la pastille 1/3 en haut pour relire la consigne.</p>
      <button class="hbtn" data-h="start">Commencer la tâche</button>`);
  }
  function startTask() {
    closeOverlay();
    H.running = true; H.start = performance.now(); H.taps = 0;
    taskbar(true);
    const task = TASKS[H.idx].id;
    if (task === "T1") { S.screen = "welcome"; prev = []; render(); }
    if (task === "T2") { go("dash"); setTimeout(() => { if (H.running && TASKS[H.idx].id === "T2") showNotif(); }, 3000); }
    if (task === "T3") { go("dash"); }
  }
  function finishTask(ok) {
    if (!H.running) return;
    H.running = false;
    const time = ((performance.now() - H.start) / 1000).toFixed(1);
    const task = TASKS[H.idx];
    H.results[H.idx] = { id: task.id, ok, time, taps: H.taps, marks: H.marks[task.id] || {}, notif: task.id === "T2" ? H.notifUsed : undefined, seq: null };
    taskbar(false);
    $("notif-layer").innerHTML = "";
    setTimeout(() => seqCard(ok), ok ? 900 : 0);
  }
  function seqCard(ok) {
    overlay(`<div class="kicker">Tâche ${H.idx + 1} · ${ok ? "réussie" : "abandonnée"}</div>
      <h1>Dans l’ensemble, cette tâche était…</h1>
      <div class="seq" role="group" aria-label="De 1, très difficile, à 7, très facile">${[1, 2, 3, 4, 5, 6, 7].map((n) => `<button data-h="seq" data-v="${n}" aria-pressed="false">${n}</button>`).join("")}</div>
      <div class="seq-ends"><span>1 · Très difficile</span><span>7 · Très facile</span></div>
      <button class="hbtn" data-h="afterseq" disabled>Continuer</button>`);
  }
  function summary() {
    const rows = H.results.map((r) => `<tr><td>${r.id}</td><td>${r.ok ? "Oui" : "Non"}</td><td>${r.time} s</td><td>${r.taps}</td><td>${r.seq}/7</td></tr>`).join("");
    const code = "MELLOW-TEST\n" + H.results.map((r) => `${r.id} | réussi: ${r.ok ? "oui" : "non"} | temps: ${r.time}s | touches: ${r.taps} | facilité: ${r.seq}/7` +
      (r.id === "T1" && r.marks.bank_connected ? ` | banque connectée à ${r.marks.bank_connected}s` : "") +
      (r.id === "T2" ? ` | notification utilisée: ${r.notif ? "oui" : "non"}` : "")).join("\n") + `\nappareil: ${window.innerWidth}x${window.innerHeight}`;
    overlay(`<div class="kicker">C’est terminé</div><h1>Merci, c’est très utile !</h1>
      <table class="results"><thead><tr><th>Tâche</th><th>Réussie</th><th>Temps</th><th>Touches</th><th>Facilité</th></tr></thead><tbody>${rows}</tbody></table>
      <p>Dernière étape : copie ce texte et envoie-le à la personne qui t’a invité (texto ou courriel).</p>
      <label for="out" class="sr">Résultats</label>
      <textarea id="out" class="out" readonly>${esc(code)}</textarea>
      <button class="hbtn" data-h="copy" style="margin-top:0">Copier les résultats</button>
      <button class="hlink" data-h="restart">Recommencer le test</button>`);
  }
  function harness(action, el) {
    if (action === "next") { H.idx = 0; return taskCard(); }
    if (action === "start") return startTask();
    if (action === "tb") {
      const bar = el.closest(".taskbar"), open = bar.classList.toggle("open");
      el.setAttribute("aria-expanded", open); clearTimeout(H.tbT);
      if (open) H.tbT = setTimeout(() => { bar.classList.remove("open"); el.setAttribute("aria-expanded", "false"); }, 6000);
      return;
    }
    if (action === "reread") {
      const task = TASKS[H.idx];
      return sheet(`<div class="tx" style="top:48px"><h2 id="sh-t">Tâche ${H.idx + 1}</h2><p style="color:#fff;font-size:18px;line-height:26px">${task.text}</p></div><button class="btn" style="top:300px" data-close>OK</button>`);
    }
    if (action === "giveup") return finishTask(false);
    if (action === "seq") {
      el.parentElement.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", "false"));
      el.setAttribute("aria-pressed", "true");
      H.results[H.idx].seq = +el.dataset.v;
      $("harness-layer").querySelector('[data-h="afterseq"]').disabled = false;
      return;
    }
    if (action === "afterseq") { H.idx++; return H.idx < TASKS.length ? taskCard() : summary(); }
    if (action === "copy") {
      const ta = $("out"); ta.select();
      (navigator.clipboard ? navigator.clipboard.writeText(ta.value) : Promise.reject()).then(() => { el.textContent = "Copié ✓"; }).catch(() => { document.execCommand("copy"); el.textContent = "Copié ✓"; });
      return;
    }
    if (action === "restart") location.reload();
  }

  // ---------- Start ----------
  window.addEventListener("resize", fit);
  if (framedMQ.addEventListener) framedMQ.addEventListener("change", fit);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(layout);
  const demo = new URLSearchParams(location.search).has("demo");
  render();
  fit();
  if (!demo) intro();
})();
