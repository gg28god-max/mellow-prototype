/* Mellow test prototype v2. Screens are laid out on a 390 x 844 canvas with the exact
   positions of the Figma frames ("Opal library (Dark)" + "Mellow v2" pages).
   Plain JS, no build step, no data leaves the device. */
(() => {
  "use strict";

  // ---------- Logos ----------
  const DODO = !new URLSearchParams(location.search).has("m");   // dodo mascot by default; ?m=1 shows the old M
  const LG = (n, cls = "") => `<img class="lg ${cls}${["netflix", "spotify", "acrobat", "rbc", "scotiabank", "td", "bmo", "desjardins"].includes(n) && !cls ? " sym" : ""}" src="logos/v2/${n}${["netflix", "spotify", "acrobat", "rbc", "scotiabank", "td", "bmo", "desjardins"].includes(n) ? "-icon" : ""}.png" alt="">`;
  const ACROBAT = LG("acrobat", "bleed");
  const PRIME = LG("prime");
  const tile = (txt, bg, fg = "#fff", size) => `<svg viewBox="0 0 48 48" aria-hidden="true"><rect width="48" height="48" fill="${bg}"/><text x="24" y="24" dy=".35em" text-anchor="middle" font-family="Inter,Arial" font-weight="800" font-size="${size || (txt.length > 2 ? 13 : txt.length > 1 ? 16 : 22)}" fill="${fg}">${txt}</text></svg>`;
  const NETFLIX = LG("netflix");
  const SPOTIFY = LG("spotify");
  const PLAID = LG("plaid");
  const ico = (inner, c) => `<svg viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${inner}</svg>`;
  const slash = (c) => `<path d="M4 4L20 20" stroke="#0f0f10" stroke-width="5"/><path d="M4 4L20 20" stroke="${c}"/>`;
  const MINT = "#7fe8c8", CORAL = "#f2607a";
  const ICO = {
    pay: ico('<rect x="2" y="5" width="20" height="14" rx="3"/><path d="M2 10h20M6 15h4"/>', MINT),
    keyok: ico('<circle cx="8" cy="15" r="4"/><path d="M11 12L20 3M17 6l3 3M14 9l2 2"/>', MINT),
    power: ico('<path d="M12 3v8"/><path d="M6.3 6.8a8 8 0 1 0 11.4 0"/>', MINT),
    shield: ico('<path d="M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>', MINT),
    user: ico('<circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-6 8-6s8 2 8 6"/>', MINT),
    userx: ico('<circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-6 8-6s8 2 8 6"/>' + slash(CORAL), CORAL),
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
    { id: "rbc", name: "RBC Banque Royale", short: "RBC", logo: LG("rbc"), theme: { hero: "#06336b", hero2: "#0a55b0", acc: "#0a55b0", svc: "Services bancaires aux particuliers", user: "Carte client ou nom d’utilisateur", reg: "S’inscrire", forgot: "Mot de passe oublié ?", prev: "Aperçu des comptes", prevs: "Soldes sans te connecter" } },
    { id: "scotia", name: "Banque Scotia", short: "Scotia", logo: LG("scotiabank"), theme: { hero: "#0b1f3f", hero2: "#17346a", acc: "#0a62c9", svc: "Particuliers et entreprises", user: "Carte client ou nom d’utilisateur", reg: "S’inscrire", forgot: "Mot de passe oublié ?", prev: "Aperçu des comptes", prevs: "Soldes sans te connecter" } },
    { id: "desj", name: "Desjardins", short: "Desjardins", logo: LG("desjardins"), theme: { hero: "#00452b", hero2: "#007a49", acc: "#007a49", svc: "AccèsD Particuliers", user: "Numéro de carte ou code d’utilisateur", reg: "Devenir membre", forgot: "Mot de passe oublié ?", prev: "Aperçu des comptes", prevs: "Soldes sans te connecter" } },
    { id: "td", name: "Banque TD", short: "TD", logo: LG("td"), theme: { hero: "#0f4a1c", hero2: "#2a9a3a", acc: "#238a32", svc: "Services bancaires EasyWeb", user: "Numéro d’accès ou nom d’utilisateur", reg: "S’inscrire à EasyWeb", forgot: "Mot de passe oublié ?", prev: "Aperçu des comptes", prevs: "Soldes sans te connecter" } },
    { id: "bmo", name: "BMO", short: "BMO", logo: LG("bmo"), theme: { hero: "#00396b", hero2: "#0079c1", acc: "#0075be", svc: "Services bancaires aux particuliers", user: "Numéro de carte ou nom d’utilisateur", reg: "S’inscrire", forgot: "Mot de passe oublié ?", prev: "Aperçu des comptes", prevs: "Soldes sans te connecter" } },
  ];
  const REVIEW = [
    { id: "r1", raw: "DRI*ADOBE 8004", guess: "Adobe Acrobat", price: 14.99 },
    { id: "r2", raw: "DRI*XYZ 8004", guess: null, price: 9.0 },
    { id: "r3", raw: "SPOTIFY P1A2B3", guess: "Spotify", price: 11.99 },
  ];

  // ---------- State ----------
  const S = { screen: "welcome", bank: BANKS[0], detail: null, review: {}, adobe: "active", toggles: { push: true, alerts: true, holder: false, routing: false }, accts: ["chq"] };
  const ACCTS = [
    { id: "chq", name: "Compte chèques", kind: "Chèques", mask: "4821" },
    { id: "sav", name: "Compte épargne", kind: "Épargne", mask: "3365" },
    { id: "visa", name: "Carte de crédit Visa", kind: "Carte de crédit", mask: "7712" },
    { id: "mc", name: "Carte de crédit Mastercard", kind: "Carte de crédit", mask: "0441" },
  ];
  const STREAM = ["Vidéo", "Musique", "Vidéo et musique", "Livraison et vidéo", "Télé"], SOFT = ["Stockage", "Actualités", "Sécurité", "Logiciel"];
  const myAccts = () => { const m = ACCTS.filter((c) => S.accts.includes(c.id)); return m.length ? m : [ACCTS[0]]; };
  const accOf = (x) => { const id = STREAM.includes(x.cat) ? "visa" : SOFT.includes(x.cat) ? "mc" : "chq", m = myAccts(); return m.find((c) => c.id === id) || m.find((c) => c.kind === "Chèques") || m[0]; };
  const DOMAIN = { rbc: "rbcroyalbank.com", scotia: "scotiabank.com", desj: "desjardins.com", td: "td.com", bmo: "bmo.com" };
  const navLogo = (back) => `<header class="nav navlogo"><button class="back" data-go="${back}" aria-label="Retour">${BACK_ICO}</button><span class="logo" role="img" aria-label="${esc(S.bank.name)}">${S.bank.logo}</span></header>`;
  const nAcc = () => S.accts.length;
  const authLabel = () => nAcc() ? `Autoriser · ${nAcc()} compte${nAcc() > 1 ? "s" : ""}` : "Choisis au moins un compte";

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
  const metricVal = (val) => { const m = /^([\d\s\u00a0,.]+?)\s*\$(?:\/(\w+))?$/.exec(val); return m ? `<b>${m[1].trim()}</b><small>$ CAD${m[2] ? " /" + m[2] : ""}</small>` : esc(val); };
  const metric = (y, cap, val) => `<div class="metric a" ${T(y)}><div class="cap">${cap}</div><div class="val">${metricVal(val)}</div></div>`;
  const plaid = (y, bottom) => `<div class="plaid" ${bottom ? B(y, 32) : T(y)}>Sécurisé par <img class="plaidlogo" src="logos/v2/plaid.png" alt="Plaid"></div>`;
  const success = (y, confetti) => `<div class="success" ${T(y)} aria-hidden="true"><div class="g"></div><div class="ring"></div><div class="disc">${CHECK}</div>${confetti ? [["#b8f27c", 104, 4, 4, 12], ["#7fe8c8", 158, 40, 6, 6], ["#f6c76b", 170, 110, 4, 10], ["#f2607a", 30, 120, 6, 6], ["#4f9fb8", 36, 50, 4, 12], ["#fff", 58, 26, 6, 6], ["#f6c76b", 104, 182, 4, 10]].map(([c, x, yy, w, h]) => `<i class="c" style="background:${c};left:${x}px;top:${yy}px;width:${w}px;height:${h}px"></i>`).join("") : ""}</div>`;
  const glowStatus = (strong) => `<div class="glow${strong === "calm" ? " calm" : strong ? " strong" : ""}"></div><div class="sb" aria-hidden="true"><span class="time">9:41</span><span class="icons"><span class="bars"><i style="height:4px"></i><i style="height:6px"></i><i style="height:8px"></i><i style="height:11px"></i></span><span class="bat"><i></i></span></span></div>`;

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
      <div class="orbit a${DODO ? " solo" : ""}" data-t style="top:50px;left:0" aria-hidden="true"><i class="ring" style="left:125px;top:76px;width:140px;height:140px"></i><i class="ring" style="left:81px;top:32px;width:228px;height:228px"></i><i class="sphere-glow"></i>${DODO ? '<img class="wordmark" src="dodo/mellow-wordmark.png" alt="Mellow">' : ""}<i class="orb" style="--a:-90.0;--r:114px;--dir:1;--sp:var(--orbit-t)"><i class="chip" style="width:44px;height:44px;margin:-22px 0 0 -22px;border-radius:22px"><img src="logos/v2/netflix-icon.png" alt="" style="height:22px"></i></i><i class="orb" style="--a:-38.6;--r:114px;--dir:1;--sp:var(--orbit-t)"><i class="chip" style="width:84px;height:34px;margin:-17px 0 0 -42px;border-radius:17px"><img src="logos/v2/hbo.png" alt="" style="height:12px"></i></i><i class="orb" style="--a:64.3;--r:114px;--dir:1;--sp:var(--orbit-t)"><i class="chip" style="width:92px;height:34px;margin:-17px 0 0 -46px;border-radius:17px"><img src="logos/v2/youtube.png" alt="" style="height:14px"></i></i><i class="orb" style="--a:115.7;--r:114px;--dir:1;--sp:var(--orbit-t)"><i class="chip" style="width:44px;height:44px;margin:-22px 0 0 -22px;border-radius:22px"><img src="logos/v2/prime.png" alt="" style="height:20px"></i></i><i class="orb" style="--a:218.6;--r:114px;--dir:1;--sp:var(--orbit-t)"><i class="chip" style="width:44px;height:44px;margin:-22px 0 0 -22px;border-radius:22px"><img src="logos/v2/adobe.png" alt="" style="height:24px"></i></i><i class="orb" style="--a:167.1;--r:114px;--dir:1;--sp:var(--orbit-t)"><i class="chip" style="width:90px;height:34px;margin:-17px 0 0 -45px;border-radius:17px"><img src="logos/v2/bell.png" alt="" style="height:14px"></i></i><i class="orb" style="--a:12.9;--r:114px;--dir:1;--sp:var(--orbit-t)"><i class="chip" style="width:40px;height:40px;margin:-20px 0 0 -20px;border-radius:20px"><img src="logos/v2/spotify-icon.png" alt="" style="width:100%;height:100%;padding:6px;object-fit:contain"></i></i><i class="sphere${DODO ? " dodo" : ""}">${DODO ? `<img src="${reduceMotion() ? "dodo/dodo-wave-still.png" : "dodo/dodo-wave.webp"}" alt="">` : "<b>M</b>"}</i></div>
      <h1 class="hd pt a wi w1" data-t style="top:492px;left:24px">Annule tes abonnements.</h1>
      <p class="body a wi w2" data-t style="top:544px;left:24px;width:342px">Connecte ta banque. Mellow trouve les paiements qui reviennent et t’aide à les annuler.</p>
      ${btn(660, "Commencer", 'data-go="bank"')}
      ${link(740, "J’ai déjà un compte", 'data-go="bank"')}` }),

    bank: () => ({ html: `${nav("Choisis ta banque", "welcome")}
      <form class="srch a" data-t style="top:128px" role="search" id="bqform" novalidate><label class="sr" for="bq">Rechercher une banque</label>
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="M16 16l4 4"/></svg>
        <input id="bq" type="search" placeholder="Rechercher une banque" autocomplete="off" autocapitalize="off" spellcheck="false" enterkeyhint="search"><button type="button" class="srch-x" id="bq-x" aria-label="Effacer la recherche" hidden>×</button></form>
      <h2 class="sect a" data-t style="top:200px;left:28px" id="bq-h">Banques populaires</h2>
      <ul>${BANKS.map((b, i) => `<li class="row bank" ${T(244 + i * 96)} data-key="${esc(b.name + " " + b.short + " " + (b.alias || ""))}"><button data-bank="${b.id}" style="position:absolute;inset:0;border-radius:30px" aria-label="${esc(b.name)}"></button><span class="logo" aria-hidden="true">${b.logo}</span><span class="t" aria-hidden="true">${esc(b.name)}</span><span class="s" aria-hidden="true">Particuliers et entreprises</span><span class="chev" aria-hidden="true">›</span></li>`).join("")}</ul>
      <p class="a bq-empty" id="bq-empty" data-t style="top:260px;left:24px;width:342px" hidden role="status"></p>` }),

    consent: () => ({ html: `<header class="nav"><button class="back" data-go="bank" aria-label="Retour">${BACK_ICO}</button><h1 class="sr">Connecter ta banque</h1></header>
      <div class="plaidtop a" data-t style="top:116px"><img src="logos/v2/plaid-icon.png" alt=""><b>PLAID</b><span>Connexion sécurisée</span></div>
      <h1 class="hd pt a" data-t style="top:244px;left:24px">Tu gardes le contrôle.</h1>
      <ul>${feat(304, ICO.shield, "mint", "Lecture seule", "On ne peut rien payer ni déplacer.")}${feat(396, ICO.keyok, "mint", "Ton mot de passe reste privé", "Tu te connectes chez ta banque.")}${feat(488, ICO.power, "mint", "Tu peux couper en tout temps", "Tes données ne sont jamais vendues.")}${feat(580, ICO.pay, "mint", "Seulement tes paiements", "Les récurrents, sur 12 mois.")}</ul>
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

    accounts: () => ({ strong: "calm", html: `${navLogo("banklogin")}
      <h1 class="hd pt a" data-t style="top:128px;left:24px">Quels comptes partager ?</h1>
      <p class="body a" data-t style="top:172px;left:24px;width:342px;font-size:14px;line-height:20px">Lecture seule · Révocable en tout temps · Via Plaid</p>
      <ul class="acctlist" aria-label="Comptes de ${esc(S.bank.short)}">${ACCTS.map((x, i) => `<li><button class="row acct" ${T(228 + i * 88)} role="checkbox" aria-checked="${S.accts.includes(x.id)}" data-acct="${x.id}"><span class="ack" aria-hidden="true"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></span><span class="t">${esc(x.name)}</span><span class="s">${esc(x.kind)} · ····${x.mask}</span></button></li>`).join("")}</ul>
      <button class="btn authz" id="authz" ${B(716, 56)} data-go="access"${nAcc() ? "" : " disabled"}>${authLabel()}</button>
      ${link(782, "Refuser", 'data-go="bank"')}` }),

    access: () => ({ strong: "calm", html: `${navLogo("accounts")}
      <p class="secdom a" data-t style="top:120px"><svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 018 0v3"/></svg>Zone sécurisée · ${DOMAIN[S.bank.id]}</p>
      <h2 class="hd a" data-t style="top:156px;left:24px">Ce que Mellow lit</h2>
      <p class="body a" data-t style="top:200px;left:24px;width:342px;font-size:15px;line-height:22px">Solde, transactions, dates des relevés et détails des paiements.</p>
      <h2 class="sect a" data-t style="top:290px;left:28px">Ce que Mellow ne lit pas</h2>
      <ul>${feat(334, ICO.userx, "coral", "Ton nom et n° de compte", "Mellow n’en a pas besoin.")}${feat(422, ICO.money, "coral", "Aucun pouvoir sur ton argent", "On ne peut rien payer ni déplacer.")}</ul>
      <p class="fine legal" data-t style="top:526px">En touchant Autoriser, je demande à ${esc(S.bank.short)} de partager les informations de mes comptes avec Mellow, via Plaid, jusqu’à l’expiration de l’accès ou jusqu’à ce que je demande l’arrêt.</p>
      <p class="fine legal" data-t style="top:612px">Révoque en tout temps dans l’app ${esc(S.bank.short)}, sur ${DOMAIN[S.bank.id]} ou dans Mellow, sous Réglages.</p>
      ${btn(716, authLabel(), 'data-go="connected"', "authz")}` }),

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

    connected: () => { const sel = ACCTS.filter((x) => S.accts.includes(x.id)), n = sel.length, y0 = 262, endY = y0 + n * 72;
      const AI = { Chèques: GI('<rect x="3" y="6" width="18" height="12" rx="2.5"/><circle cx="12" cy="12" r="2.5"/><path d="M6.5 9.5v.01M17.5 14.5v.01"/>'), Épargne: GI('<path d="M5 11c0-3.3 3.1-6 7-6s7 2.7 7 6c0 2-1 3.7-2.5 4.8V19h-3v-1.5h-3V19h-3v-3.2C6 14.7 5 13 5 11z"/><path d="M9.5 10.5v.01M19 10.5h2"/>'), "Carte de crédit": GI('<rect x="3" y="5.5" width="18" height="13" rx="2.5"/><path d="M3 10h18M7 14.5h3"/>') };
      const row = (x, i) => `<li class="row acc" data-t style="top:${y0 + i * 72}px;--d:${(0.35 + i * 0.8).toFixed(2)}s"><span class="logo gic" aria-hidden="true">${AI[x.kind]}</span><span class="t">${esc(x.name)}</span><span class="s">${esc(x.kind)} · ····${x.mask}</span><i class="spin" aria-hidden="true"></i><span class="ok" aria-hidden="true"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></span></li>`;
      return { strong: "calm", html: `
      <span class="logo l56" data-t style="top:84px;left:167px" aria-hidden="true">${S.bank.logo}</span>
      <h1 class="hd pt a center w342" id="lk-t" data-t style="top:158px;left:24px">${reduceMotion() ? n + " compte" + (n > 1 ? "s" : "") + " lié" + (n > 1 ? "s" : "") : "Connexion de tes comptes…"}</h1>
      <p class="body a center w342" id="lk-s" data-t style="top:202px;left:24px" aria-live="polite">${esc(S.bank.name)}</p>
      <ul aria-label="Comptes liés">${sel.map(row).join("")}</ul>
      <section class="okcard a late" data-t style="top:${endY + 12}px;--od:${(0.35 + n * 0.8).toFixed(2)}s" aria-label="Banque connectée">
        <span class="okck" aria-hidden="true"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></span>
        <h2>Banque connectée</h2>
        <p>Mellow peut lire tes paiements des 12 derniers mois. Il ne peut rien payer ni déplacer.</p>
      </section>
      ${btn(716, n > 1 ? "Analyser mes comptes" : "Analyser mon compte", `id="lk-b" data-go="scanning"${reduceMotion() ? "" : " disabled"}`)}` }; },

    scanning: () => ({ strong: "calm", html: `
      <div class="scanbank a" data-t style="top:60px;left:151px" aria-hidden="true"><i></i><i></i><span class="logo l88">${S.bank.logo}</span><b class="sweep"></b></div>
      <h1 class="hd pt a center w342" data-t style="top:184px;left:24px">On analyse 12 mois…</h1>
      <div class="pbar a" data-t style="top:252px" role="progressbar" aria-label="Progression de l’analyse" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><i id="pb"></i></div>
      <div class="cnt a" data-t style="top:274px"><span id="sc-n" aria-live="polite">0 trouvé</span><b id="sc-m">0 $/mois</b></div>
      <ul id="sc-list" class="sclist" aria-label="Abonnements trouvés"></ul>
      ${btn(716, "Voir les résultats pour l’instant", 'data-go="scanned"', "sec")}` }),

    slow: () => ({ strong: "calm", html: `
      <button class="bl-back2" data-go="connected" aria-label="Retour">${BACK_ICO}<span>Retour</span></button>
      <h1 class="hd pt a center w342" data-t style="top:266px;left:24px;white-space:normal;line-height:34px">Ça prend plus de temps que prévu</h1>
      <div class="pbar a" data-t style="top:350px" aria-hidden="true"><i style="width:65%"></i></div>
      <p class="body a center w342" data-t style="top:380px">Certaines banques mettent quelques minutes. Tu peux quitter cet écran : Mellow continue et te prévient quand c’est prêt.</p>
      <div class="set a" data-t style="top:486px;left:24px;width:342px"><span id="l-ready">Me prévenir quand c’est prêt</span><button class="switch" role="switch" aria-labelledby="l-ready" aria-checked="${S.toggles.push}" data-toggle="push"></button></div>
      ${btn(716, "Continuer en arrière-plan", 'data-go="scanned"')}
      ${link(782, "Annuler l’analyse", 'data-go="connected"')}` }),

    empty: () => ({ strong: "calm", html: `
      <button class="bl-back2" data-go="connected" aria-label="Retour">${BACK_ICO}<span>Retour</span></button>
      <h1 class="hd pt a center w342" data-t style="top:316px;left:24px;white-space:normal">Aucun paiement récurrent</h1>
      <p class="body a center w342" data-t style="top:372px">On a vérifié 12 mois de transactions sur ce compte. Essaie un autre compte, ou ajoute un abonnement toi-même.</p>
      ${btn(716 - 68, "Ajouter un abonnement", 'data-go="dash"')}
      ${btn(716, "Connecter un autre compte", 'data-go="bank"', "sec")}` }),

    scanned: () => {
      const toCheck = ["Adobe Acrobat", "Inconnu", "Spotify"], RID = { "Adobe Acrobat": "r1", "Inconnu": "r2", "Spotify": "r3" };
      const left = toCheck.filter((n) => { const v = S.review[RID[n]]; return !(v && v !== "later"); }).length, n = SCAN_POOL.length;
      return { strong: "calm", pin: `<div class="pin"><div class="cta-fade pinfade" aria-hidden="true"></div><button class="btn pinbtn" data-go="${left ? "review" : "wallet"}">${left ? "Continuer" : "Voir mes abonnements"}</button><p class="fine pintxt">Rien n’est annulé sans ton accord.</p></div>`, html: `
      <span class="tck a" data-t style="top:84px;left:28px" aria-hidden="true"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></span>
      <h1 class="title a" data-t style="top:76px;left:68px;line-height:40px">Analyse terminée</h1>
      <section class="metric mvc a" ${T(132)} aria-label="Total mensuel"><div class="cap">${n} abonnements trouvés</div><div class="val">${metricVal(SCAN_TOTAL + " $/mois")}</div></section>
      ${left ? `<div class="row todo a" ${T(276)} role="status"><span class="logo gic" aria-hidden="true">${QMARK}</span><span class="t">${left} paiement${left > 1 ? "s" : ""} à confirmer</span><span class="s warn">On n’est pas sûr de leur nom</span></div>` : `<p class="a hintline" data-t style="top:300px;left:28px">Tout est vérifié.</p>`}
      <div class="pinspace" data-t style="top:420px;height:150px" aria-hidden="true"></div>` }; },

    wallet: () => {
      const AC = myAccts(), i = Math.min(S.walletIdx || 0, AC.length - 1);
      return { html: `${nav("Par compte", "scanned")}
      <div class="wdots" data-t style="top:112px" id="wdots" role="tablist" aria-label="Comptes">${AC.map((c, k) => `<button class="wd${k === i ? " on" : ""}" role="tab" data-wi="${k}" aria-selected="${k === i}" aria-label="${esc(c.name)}"></button>`).join("")}</div>
      <div class="wcar" data-t style="top:136px" id="wcar" tabindex="0" aria-label="Tes comptes, fais glisser">${AC.map((c, k) => `<article class="wcard c-${c.id}" aria-label="${esc(c.name)} ····${c.mask}"><span class="logo" aria-hidden="true">${S.bank.logo}</span><span class="wk">${esc(c.kind)}</span><div class="wb"><b>${esc(c.name.replace("Carte de crédit ", "").replace("Compte ", "Compte "))}</b><span class="wm">···· ${c.mask}</span></div></article>`).join("")}</div>
      <div class="wl" data-t style="top:352px" id="wlist" aria-live="polite"></div>
      <div class="pinspace" data-t style="top:900px;height:150px" aria-hidden="true"></div>`, pin: `<div class="pin"><div class="cta-fade pinfade" aria-hidden="true"></div><button class="btn pinbtn" data-go="dash">Continuer</button><p class="fine pintxt">Rien n’est annulé sans ton accord.</p></div>` }; },

    review: () => {
      const cur = REVIEW.find((r) => !S.review[r.id]), total = REVIEW.length, doneN = REVIEW.filter((r) => S.review[r.id]).length;
      const bars = `<div class="rvbars" data-t style="top:116px" aria-hidden="true">${REVIEW.map((r, i) => `<i class="${S.review[r.id] ? "on" : i === doneN ? "cur" : ""}"></i>`).join("")}</div>`;
      if (!cur) { const ok = REVIEW.filter((r) => S.review[r.id] !== "later").length;
        return { html: `${nav("Vérification", "scanned")}${bars}
        <h1 class="hd a" data-t style="top:160px;left:24px">Tout est vérifié</h1>
        <p class="body a" data-t style="top:208px;left:24px">${ok} paiement${ok > 1 ? "s" : ""} confirmé${ok > 1 ? "s" : ""}${ok < total ? ", " + (total - ok) + " pour plus tard" : ""}.</p>
        <div class="cta-fade" ${B(716, 128)}></div>${btn(756, "Voir mes abonnements", 'data-go="wallet"')}` }; }
      const k = doneN + 1;
      return { html: `${nav("Vérification", "scanned")}${bars}
      <p class="eyebrow-s a" data-t style="top:144px;left:28px">${k} sur ${total}</p>
      <section class="rvcard a" ${T(176)} aria-label="Paiement à confirmer"><span class="logo gic" aria-hidden="true">${QMARK}</span><h1 class="rvt">${esc(cur.raw)}</h1><p class="rvp"><b>${money(cur.price)}</b> /mois</p>
        ${cur.guess ? `<p class="rvg">On pense que c’est <b>${esc(cur.guess)}</b> ?</p>` : `<p class="rvg">On ne reconnaît pas ce nom</p>`}
        <button class="rvproof" data-evq="${esc(SCAN_POOL.find((x) => x.raw === cur.raw).name)}">Voir la preuve dans ta banque <span aria-hidden="true">›</span></button></section>
      <div class="cta-fade" ${B(716, 188)}></div>
      ${cur.guess ? `${btn(584, "Oui, c’est " + esc(cur.guess), `data-rv="yes" data-id="${cur.id}"`)}${btn(652, "Non, c’est autre chose", `data-rv="no" data-id="${cur.id}"`, "sec")}` : btn(652, "Nommer ce paiement", `data-rv="no" data-id="${cur.id}"`)}
      ${link(722, "Pas sûr, plus tard", `data-rv="later" data-id="${cur.id}"`)}` };
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

  function wireWallet() {
    const car = $("wcar"), list = $("wlist"), AC = myAccts(); if (!car || !list) return;
    const draw = (i) => {
      S.walletIdx = i; const c = AC[i];
      const mine = SCAN_POOL.filter((x) => accOf(x).id === c.id).sort((a, b) => monthly(b) - monthly(a));
      const tot = mine.reduce((t, x) => t + monthly(x), 0);
      document.querySelectorAll(".wd").forEach((d, k) => { d.classList.toggle("on", k === i); d.setAttribute("aria-selected", k === i); });
      list.innerHTML = `<h2 class="wt">${esc(c.name)}</h2><p class="ws">${mine.length ? `${mine.length} paiements récurrents · <b>${money(tot)}</b> /mois` : "Aucun paiement récurrent trouvé"}</p>` +
        (mine.length ? `<ul class="wrows">${mine.map((x) => { const u = x.uncertain; return `<li><button class="wrow" data-${u ? "evq" : "ev"}="${esc(x.name)}"><span class="logo${u || /currentColor|class="fit"/.test(x.logo) ? " gic" : ""}" aria-hidden="true">${u ? QMARK : x.logo}</span><span class="wn"><b>${esc(u ? x.raw : x.name)}</b><small>${u ? (x.guess ? x.guess + " ?" : "Non reconnu") : esc(x.cat)}</small></span><span class="wp">${money(x.price)}<small>/${x.per === "an" ? "an" : "mois"}</small></span></button></li>`; }).join("")}</ul>` : `<p class="wempty">Ce compte sert surtout à épargner. Rien à annuler ici.</p>`);
      layout();
    };
    const step = () => { const a = car.querySelector(".wcard"); return a.offsetWidth + 14; };
    let t; car.addEventListener("scroll", () => { clearTimeout(t); t = setTimeout(() => { const i = Math.max(0, Math.min(AC.length - 1, Math.round(car.scrollLeft / step()))); if (i !== S.walletIdx) draw(i); }, 60); });
    document.querySelectorAll(".wd").forEach((d) => d.addEventListener("click", () => { const i = +d.dataset.wi; car.scrollTo({ left: i * step(), behavior: reduceMotion() ? "auto" : "smooth" }); draw(i); }));
    // mouse / trackpad drag (touch already swipes natively) + arrow keys + big forgiving drag zone
    const k = () => car.getBoundingClientRect().width / car.offsetWidth || 1;
    let down = false, x0 = 0, s0 = 0, moved = false;
    car.addEventListener("pointerdown", (e) => { if (e.pointerType === "touch") return; down = true; moved = false; x0 = e.clientX; s0 = car.scrollLeft; car.classList.add("drag"); });
    window.addEventListener("pointermove", (e) => { if (!down) return; const dx = e.clientX - x0; if (Math.abs(dx) > 4) moved = true; car.scrollLeft = s0 - dx / k(); });
    window.addEventListener("pointerup", () => { if (!down) return; down = false; const d = (car.scrollLeft - s0); car.classList.remove("drag"); const b = Math.round(s0 / step()), i = Math.max(0, Math.min(AC.length - 1, Math.abs(d) > 40 ? b + Math.sign(d) : b)); car.scrollTo({ left: i * step(), behavior: reduceMotion() ? "auto" : "smooth" }); });
    car.addEventListener("dragstart", (e) => e.preventDefault());
    car.addEventListener("keydown", (e) => { if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return; e.preventDefault(); const i = Math.max(0, Math.min(AC.length - 1, (S.walletIdx || 0) + (e.key === "ArrowRight" ? 1 : -1))); car.scrollTo({ left: i * step(), behavior: "smooth" }); });
    car.scrollLeft = (S.walletIdx || 0) * step(); draw(S.walletIdx || 0);
  }
  let lkTimers = [];
  function wireConnected() {
    lkTimers.forEach(clearTimeout); lkTimers = [];
    if (reduceMotion()) return;
    const sel = ACCTS.filter((x) => S.accts.includes(x.id)), n = sel.length, t = $("lk-t"), sub = $("lk-s"), b = $("lk-b");
    const at = (ms, f) => lkTimers.push(setTimeout(() => { if (S.screen === "connected" && $("lk-t")) f(); }, ms));
    sel.forEach((x, i) => at((0.35 + i * 0.8 + 0.8) * 1000, () => { sub.textContent = `${S.bank.name} · ${i + 1} sur ${n} connecté${i ? "s" : ""}`; }));
    at((0.35 + (n - 1) * 0.8 + 1.25) * 1000, () => { t.textContent = `${n} compte${n > 1 ? "s" : ""} lié${n > 1 ? "s" : ""}`; sub.textContent = S.bank.name; b.disabled = false; });
  }
  function wireBankSearch() {
    const inp = $("bq"); if (!inp) return;
    const norm = (s) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const rows = [...document.querySelectorAll(".row.bank")], head = $("bq-h"), empty = $("bq-empty"), x = $("bq-x");
    const run = () => {
      const q = norm(inp.value.trim()); let n = 0;
      rows.forEach((li) => { const hit = !q || norm(li.dataset.key).includes(q); li.hidden = !hit; if (hit) { li.style.top = 244 + n * 96 + "px"; n++; } });
      head.textContent = q ? (n ? (n === 1 ? "1 résultat" : n + " résultats") : "Aucun résultat") : "Banques populaires";
      empty.hidden = n > 0; if (!n) empty.innerHTML = `On n’a pas trouvé « ${esc(inp.value.trim())} ».<br>Vérifie l’orthographe ou essaie un autre nom.`;
      x.hidden = !inp.value; layout();
    };
    inp.addEventListener("input", run);
    x.addEventListener("click", (e) => { e.stopPropagation(); inp.value = ""; run(); inp.focus(); });
    $("bqform").addEventListener("submit", (e) => { e.preventDefault(); const v = rows.filter((li) => !li.hidden); if (v.length === 1) v[0].querySelector("button").click(); else inp.blur(); });
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
    $("tab-layer").innerHTML = v.tabs ? `<div class="ov">${tabbar(v.tabs)}</div>` : v.pin ? `<div class="ov">${v.pin}</div>` : "";
    el.scrollTop = 0;
    layout();
    if (window.syncDev) window.syncDev();
    const h = el.querySelector("h1");
    if (h) { h.setAttribute("tabindex", "-1"); h.focus({ preventScroll: true }); }
    if (S.screen === "signin") $("signin").addEventListener("submit", (e) => { e.preventDefault(); go("connecting"); });
    if (S.screen === "bank") wireBankSearch();
    if (S.screen === "wallet") wireWallet();
    if (S.screen === "connected") wireConnected();
    if (S.screen === "scanning") runScan();
    if (S.screen === "connecting") setTimeout(() => { if (S.screen === "connecting") go("accounts"); }, 2200);
  }

  // ---------- Scan progress (counts tick up, newest finds rise in) ----------
  const SCAN_MODE = new URLSearchParams(location.search).get("scan") || "";   // "", "slow", "empty" (demo links)
  // 14 different charges the scan "finds" (brands we have logos for + generic categories with cryptic bank names).
  const GI = (d) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  const PNGLOGO = (n) => LG(n);
  const SCAN_POOL = [
    { name: "Netflix", cat: "Vidéo", price: 16.49, per: "mois", logo: NETFLIX },
    { name: "Spotify", cat: "Musique", price: 11.99, per: "mois", logo: SPOTIFY, uncertain: true, raw: "SPOTIFY P1A2B3", guess: "Spotify" },
    { name: "Adobe Acrobat", cat: "Logiciel", price: 14.99, per: "mois", logo: ACROBAT, uncertain: true, raw: "DRI*ADOBE 8004", guess: "Adobe Acrobat" },
    { name: "Amazon Prime", cat: "Livraison et vidéo", price: 99.0, per: "an", logo: PRIME },
    { name: "HBO Max", cat: "Vidéo", price: 12.99, per: "mois", logo: PNGLOGO("hbo") },
    { name: "YouTube", cat: "Vidéo et musique", price: 15.99, per: "mois", logo: PNGLOGO("youtube") },
    { name: "Bell Média", cat: "Télé", price: 24.99, per: "mois", logo: PNGLOGO("bell") },
    { name: "Salle de sport", cat: "Sport", price: 64.99, per: "mois", logo: GI('<path d="M6.5 6.5v11M17.5 6.5v11M3 9v6M21 9v6M6.5 12h11"/>') },
    { name: "Stockage cloud", cat: "Stockage", price: 9.99, per: "mois", logo: GI('<path d="M7 18a4 4 0 0 1-.5-8A5.5 5.5 0 0 1 17 8.5 4 4 0 0 1 17.5 18z"/>') },
    { name: "Journal", cat: "Actualités", price: 14.99, per: "mois", logo: GI('<rect x="4" y="5" width="16" height="14" rx="2"/><path d="M8 9h8M8 12.5h8M8 16h5"/>') },
    { name: "Inconnu", cat: "Non reconnu", price: 9.0, per: "mois", unknown: true, uncertain: true, raw: "DRI*XYZ 8004", logo: GI('<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 .9-1 1.7M12 17h.01"/>') },
    { name: "VPN", cat: "Sécurité", price: 11.99, per: "mois", logo: GI('<path d="M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6z"/>') },
    { name: "Boîte repas", cat: "Repas", price: 110.0, per: "mois", logo: GI('<path d="M6 8h12l-1 11H7z"/><path d="M9 8V6.5a3 3 0 0 1 6 0V8"/>') },
    { name: "Forfait mobile", cat: "Téléphonie", price: 55.0, per: "mois", logo: GI('<rect x="7" y="3" width="10" height="18" rx="2.5"/><path d="M11 18h2"/>') },
  ];
  const QMARK = GI('<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 .9-1 1.7M12 17h.01"/>');
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
      const unsure = x.uncertain; li.innerHTML = `<span class="logo gic" aria-hidden="true">${unsure ? QMARK : x.logo}</span><span class="t">${esc(unsure ? x.raw : x.name)}</span><span class="s">${esc(unsure ? "À confirmer" : x.cat)}</span><span class="p">${money(x.price)}</span><span class="pp">par ${x.per}</span>`;
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
        <button class="bb" type="submit">Se connecter</button>
      </form></div></div>`;
    $("signin").addEventListener("submit", (e) => { e.preventDefault(); $("sheet-layer").innerHTML = ""; S.accts = ["chq"]; go("connecting"); });
    $("u").focus({ preventScroll: true });
  }
  const closeSheet = () => {
    const layer = $("sheet-layer"), node = layer.firstElementChild;
    if (!node || reduceMotion()) { layer.innerHTML = ""; return; }
    node.classList.add("closing");
    setTimeout(() => { if (layer.firstElementChild === node) layer.innerHTML = ""; }, 200);
  };
  const sb = (y, h) => `style="top:${y}px"`;

  const MONTHS = ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."];
  const DESC = { "Netflix": "NETFLIX.COM", "Adobe Acrobat": "DRI*ADOBE 8004", "Inconnu": "DRI*XYZ 8004", "Spotify": "SPOTIFY P1A2B3", "Amazon Prime": "AMZN PRIME CA", "HBO Max": "MAX.COM HBO", "YouTube": "GOOGLE YOUTUBE PREMIUM", "Bell Média": "BELL MEDIA CRAVE", "Salle de sport": "GYM FITNESS PLUS", "Stockage cloud": "CLOUD STORAGE PLAN", "Journal": "JOURNAL NUMERIQUE", "VPN": "VPN SECURE SERVICE", "Boîte repas": "MEAL BOX LIVRAISON", "Forfait mobile": "FORFAIT MOBILE PREAUTH" };
  function evSheet(name, rv) {
    const x = SCAN_POOL.find((s) => s.name === name); if (!x) return;
    const rid = rv ? { "Adobe Acrobat": "r1", "Inconnu": "r2", "Spotify": "r3" }[name] : null, open = rid && !(S.review[rid] && S.review[rid] !== "later");
    const h = [...name].reduce((n, c) => n + c.charCodeAt(0), 0), day = 3 + (h % 22), yearly = x.per === "an";
    const sel = ACCTS.filter((c) => S.accts.includes(c.id)), card = sel.find((c) => c.kind === "Carte de crédit");
    const acc = accOf(x);
    const pays = yearly ? [{ d: `12 janv. 2026`, p: x.price }] : [0, 1, 2, 3].map((i) => ({ d: `${day} ${MONTHS[(10 - i + 12) % 12]} 2026`, p: x.price }));
    $("sheet-layer").innerHTML = `<div class="ov"><div class="scrim" data-close></div><div class="sheet ev" role="dialog" aria-modal="true" aria-labelledby="sh-t"><div class="grab"></div>
      <div class="evbody">
        <div class="evhead"><span class="logo${rid || /currentColor|class="fit"/.test(x.logo) ? " gic" : ""}" aria-hidden="true">${rid ? QMARK : x.logo}</span>
          <div><p class="eyebrow${rid ? " warn" : ""}">${rid ? "À vérifier" : "Reconnu"}</p><h2 id="sh-t">${esc(rid ? x.raw : x.name)}</h2></div></div>
        <p class="evprice"><em><b>${money(x.price)}</b> /${yearly ? "an" : "mois"}</em>${rid ? `<span class="warnp">${x.guess ? "On pense que c’est " + esc(x.guess) + " ?" : "On ne reconnaît pas ce nom"}</span>` : `<span>${esc(x.cat)}</span>`}</p>
        <div class="evgroup">
          <div class="evrow"><span class="evic" aria-hidden="true"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10l9-6 9 6M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18"/></svg></span><div><b>${esc(acc.name)} · ····${acc.mask}</b><span class="mono">${esc(DESC[x.name] || x.name.toUpperCase())}</span></div></div>
          <div class="evrow"><span class="evic" aria-hidden="true"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3l3 3-3 3M4 11V9a3 3 0 013-3h13M7 21l-3-3 3-3M20 13v2a3 3 0 01-3 3H4"/></svg></span><div><b>${yearly ? "Chaque année, le 12 janv." : "Chaque mois, vers le " + day}</b><span>${yearly ? "1 paiement" : "12 paiements identiques"} sur 12 mois</span></div></div>
        </div>
        <h3>${yearly ? "Dernier paiement" : "Derniers paiements"}</h3>
        <ul class="evlist">${pays.map((q) => `<li><span>${q.d}</span><b>${money(q.p)}</b></li>`).join("")}</ul>
        ${yearly ? "" : '<p class="evmore">+ 8 paiements plus anciens, même montant</p>'}
      </div>
      ${open ? (x.guess ? `<div class="evfoot"><button class="btn evbtn" data-rv="yes" data-id="${rid}">Oui, c’est ${esc(x.guess)}</button><button class="btn sec evbtn" data-rv="no" data-id="${rid}">Non, c’est autre chose</button><button class="link" data-rv="later" data-id="${rid}">Pas sûr, plus tard</button></div>` : `<div class="evfoot"><button class="btn evbtn" data-rv="no" data-id="${rid}">Nommer ce paiement</button><button class="link" data-rv="later" data-id="${rid}">Plus tard</button></div>`) : `<div class="evfoot"><button class="btn evbtn" data-close>Fermer</button></div>`}</div></div>`;
    $("sheet-layer").querySelector(".sheet.ev").classList.toggle("act", !!open);
    $("sheet-layer").querySelector(".evbtn").focus({ preventScroll: true });
  }
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
    $("notif-layer").innerHTML = `<div class="ov"><button class="notif" data-notif aria-label="Notification Mellow : l’essai d’Adobe Acrobat se termine demain"><span class="app${DODO ? " dodo" : ""}" aria-hidden="true">${DODO ? '<img src="dodo/dodo-front.png" alt="">' : "M"}</span><span class="meta">Mellow · maintenant</span><b>L’essai d’Adobe Acrobat se termine demain</b><span class="msg">14,99 $/mois à partir du 4 déc. Touche pour l’annuler à ta place, ou le garder.</span></button></div>`;
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
    if (d.ev) return evSheet(d.ev);
    if (d.evq) return evSheet(d.evq, true);
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
    if (d.acct) { const on = !S.accts.includes(d.acct); S.accts = on ? [...S.accts, d.acct] : S.accts.filter((x) => x !== d.acct); t.setAttribute("aria-checked", on); const z = $("authz"); z.textContent = authLabel(); z.disabled = !nAcc(); return; }
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

  // ---------- Designer panel (outside the phone, desktop only; ?dev=1 or ?demo=1) ----------
  const DEV_FLOW = [
    ["welcome", "Bienvenue"], ["bank", "Choisir la banque"], ["consent", "Tu gardes le contrôle"], ["banklogin", "Page de la banque"],
    ["connecting", "Connexion en cours"], ["accounts", "Choix des comptes"], ["access", "Permissions"], ["connected", "Compte lié"],
    ["scanning", "Analyse"], ["scanned", "Résultats"], ["review", "Vérification"], ["wallet", "Par compte (cartes)"], ["dash", "Abonnements"],
    ["calendar", "Calendrier"], ["settings", "Réglages"], ["detail", "Détail (Adobe)"], ["cancelled", "Annulation confirmée"],
    ["slow", "Analyse lente"], ["empty", "Aucun paiement"],
  ];
  const q = new URLSearchParams(location.search);
  if (q.has("dev") || q.has("demo")) {
    const dv = document.createElement("aside");
    dv.id = "dev"; dv.setAttribute("aria-label", "Panneau de navigation du designer");
    dv.innerHTML = `<h2>Écrans</h2><div class="dv-nav"><button data-dv="prev" aria-label="Écran précédent">←</button><button data-dv="next" class="dv-next">Suivant →</button></div>
      <h3>Banque</h3><div class="dv-banks">${BANKS.map((b) => `<button data-dvbank="${b.id}" aria-pressed="${b.id === S.bank.id}">${esc(b.short)}</button>`).join("")}</div>
      <h3>Parcours</h3><ol>${DEV_FLOW.map(([id, l]) => `<li><button data-dvgo="${id}">${esc(l)}</button></li>`).join("")}</ol>
      <p class="dv-hint">Flèches ← → du clavier. Sur petit écran : bouton « Écrans » en bas à droite.</p>`;
    document.body.appendChild(dv);
    const tg = document.createElement("button"); tg.id = "dvtoggle"; tg.type = "button"; tg.textContent = "Écrans ☰"; tg.setAttribute("aria-controls", "dev");
    tg.addEventListener("click", () => { const o = dv.classList.toggle("open"); tg.setAttribute("aria-expanded", o); });
    document.body.appendChild(tg);
    const jump = (id) => {
      if (id === "detail") S.detail = S.detail || "adobe";
      if (id === "cancelled") S.adobe = "cancelled";
      if ((id === "connected" || id === "wallet" || id === "scanned") && S.accts.length < 2) S.accts = ["chq", "sav", "visa"];
      if (S.screen === "scanning") clearTimeout(0);
      $("harness-layer").innerHTML = ""; $("sheet-layer").innerHTML = ""; $("notif-layer").innerHTML = "";
      nextTrans = "fade"; prev = []; S.screen = id; render();
    };
    const step = (d) => { const i = DEV_FLOW.findIndex(([id]) => id === S.screen); jump(DEV_FLOW[(Math.max(i, 0) + d + DEV_FLOW.length) % DEV_FLOW.length][0]); };
    dv.addEventListener("click", (e) => {
      const t = e.target.closest("button"); if (!t) return; e.stopPropagation();
      if (t.dataset.dv) return step(t.dataset.dv === "next" ? 1 : -1);
      if (t.dataset.dvgo) return jump(t.dataset.dvgo);
      if (t.dataset.dvbank) { S.bank = BANKS.find((b) => b.id === t.dataset.dvbank); dv.querySelectorAll("[data-dvbank]").forEach((x) => x.setAttribute("aria-pressed", x === t)); render(); }
    });
    document.addEventListener("keydown", (e) => {
      if (/INPUT|TEXTAREA/.test(document.activeElement?.tagName || "") || e.metaKey || e.ctrlKey) return;
      if (e.key === "ArrowRight") step(1); else if (e.key === "ArrowLeft") step(-1);
    });
    window.syncDev = () => dv.querySelectorAll("[data-dvgo]").forEach((x) => x.classList.toggle("on", x.dataset.dvgo === S.screen));
  }

  // ---------- Start ----------
  window.addEventListener("resize", fit);
  if (framedMQ.addEventListener) framedMQ.addEventListener("change", fit);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(layout);
  const demo = new URLSearchParams(location.search).has("demo");
  if (new URLSearchParams(location.search).has("wallet")) { S.screen = "wallet"; S.accts = ["chq", "sav", "visa", "mc"]; S.bank = S.bank || BANKS[0]; }
  render();
  fit();
  if (!demo) intro();
})();
