/* Mellow test prototype. Plain JS, no build step, no data leaves the device. */
(() => {
  "use strict";

  // ---------- Logos ----------
  const ACROBAT = '<svg viewBox="0 0 200 200" aria-hidden="true"><defs><radialGradient id="ag" cx="0.37" cy="0.3" r="0.8"><stop offset="0" stop-color="#3D302D"/><stop offset="0.6" stop-color="#231513"/></radialGradient></defs><rect width="200" height="200" fill="#ED3B24"/><rect x="9.2" y="9.2" width="181.6" height="181.6" fill="url(#ag)"/><path d="M52.8 164.3C58.1 161.8 68.8 150.7 74.5 141.7C77.3 137.4 80.4 132.5 81.5 130.7C83.7 127.3 95.3 123.0 111.9 119.4L119.5 117.8L127.1 123.2C137.4 130.6 145.3 133.5 155.2 133.5C162.3 133.5 163.2 133.3 165.7 130.8C169.6 126.9 169.6 120.8 165.7 117.4C160.0 112.5 141.8 110.4 126.7 112.9L121.9 113.7L117.0 108.3C114.3 105.3 109.6 99.1 106.5 94.5L100.9 86.1L104.1 73.4C109.5 51.6 108.1 37.7 100.0 33.5C86.3 26.4 80.9 44.1 89.0 69.3L92.1 79.1L90.4 84.3C87.8 92.3 81.3 108.5 76.7 118.3L72.6 127.2L62.6 132.2C40.3 143.4 32.2 151.6 35.2 160.2C37.1 165.7 45.6 167.7 52.8 164.3ZM40.2 160.4C34.3 156.3 41.8 147.4 59.3 138.0C68.3 133.1 69.4 133.3 65.5 139.2C54.2 156.4 45.2 163.9 40.2 160.4ZM141.6 126.9C135.2 124.3 125.9 117.7 127.0 116.6C127.4 116.2 133.4 115.7 140.2 115.6C155.4 115.5 158.9 116.9 159.0 123.1C159.0 129.0 151.1 130.8 141.6 126.9ZM86.0 122.4C86.0 122.1 87.2 119.6 88.6 116.8C90.8 112.5 95.4 101.0 98.4 92.6C98.9 91.1 99.9 92.0 104.0 97.9C106.8 101.9 110.6 107.1 112.5 109.4C114.4 111.8 116.0 114.0 116.0 114.3C116.0 114.6 112.7 115.5 108.6 116.4C104.5 117.3 97.8 119.1 93.6 120.4C89.4 121.7 86.0 122.6 86.0 122.4ZM91.5 65.8C87.5 52.0 88.8 36.0 93.8 36.0C98.4 36.1 100.2 40.9 99.0 50.3C98.0 58.5 94.9 72.0 93.9 72.0C93.6 72.0 92.5 69.2 91.5 65.8Z" fill="#fff" fill-rule="evenodd"/></svg>';
  const PRIME = '<svg viewBox="0 0 200 200" aria-hidden="true"><rect width="200" height="200" fill="#fff"/><path d="M114.6 145.9C125.3 144.4 138.0 140.6 147.6 136.0C165.8 127.2 167.2 121.2 149.6 127.5C132.6 133.6 121.9 135.4 101.5 135.4C75.9 135.5 58.6 131.6 36.1 120.8C30.4 118.1 25.5 116.1 25.2 116.5C24.2 117.5 30.4 123.1 38.5 128.5C60.8 143.4 88.0 149.6 114.6 145.9ZM168.7 136.1C172.2 131.6 175.0 123.6 175.0 118.4C175.0 115.3 174.7 115.0 170.8 113.9C165.3 112.5 157.4 113.3 151.6 115.9C144.4 119.0 145.7 120.2 155.3 119.4C168.7 118.3 169.9 119.9 165.5 132.5C164.1 136.3 163.0 139.9 163.0 140.3C163.0 142.1 165.6 140.2 168.7 136.1ZM34.0 101.1L34.0 94.2L38.2 95.8C42.1 97.1 42.9 97.1 46.2 95.7C59.0 90.3 56.4 66.0 43.0 66.0C40.8 66.0 37.6 66.7 36.0 67.5C34.3 68.4 33.0 68.6 33.0 68.0C33.0 67.5 31.4 67.0 29.5 67.0L26.0 67.0L26.0 87.5L26.0 108.0L30.0 108.0L34.0 108.0L34.0 101.1ZM170.9 95.9C173.5 95.0 174.1 94.3 173.8 92.2C173.5 89.7 173.3 89.6 167.2 89.9C162.3 90.1 160.4 89.7 158.9 88.4C155.5 85.4 156.5 84.0 162.0 84.0C173.5 84.0 179.0 75.8 172.1 68.9C166.3 63.1 153.7 65.8 150.4 73.5C148.3 78.6 148.6 86.8 151.0 90.8C154.4 96.3 163.2 98.6 170.9 95.9ZM68.8 85.4C69.1 74.2 69.2 74.0 76.2 74.0C78.7 74.0 79.0 73.7 79.0 70.5C79.0 65.9 77.1 65.2 72.1 67.8C68.8 69.5 68.1 69.6 67.6 68.4C67.3 67.6 65.7 67.0 63.5 67.0L60.0 67.0L60.0 81.6L60.0 96.1L64.2 95.8L68.5 95.5L68.8 85.4ZM91.8 81.2L92.1 67.0L87.5 67.0L83.0 67.0L83.0 81.6L83.0 96.1L87.2 95.8L91.5 95.5L91.8 81.2ZM107.2 84.8L107.5 73.6L110.7 72.6C116.2 71.1 117.0 72.6 117.0 85.1L117.0 96.0L121.0 96.0L124.9 96.0L125.2 84.8L125.5 73.6L128.7 72.6C134.2 71.1 135.0 72.6 135.0 85.2L135.0 96.1L139.2 95.8L143.5 95.5L143.8 86.0C144.2 74.6 143.5 70.5 140.9 67.9C138.5 65.5 132.4 65.4 127.6 67.7C124.3 69.2 123.9 69.2 122.2 67.7C119.8 65.5 113.8 65.5 109.7 67.6C107.6 68.8 106.5 68.9 106.2 68.1C106.0 67.5 104.3 67.0 102.4 67.0L99.0 67.0L99.0 81.5L99.0 96.0L103.0 96.0L106.9 96.0L107.2 84.8ZM35.2 89.3C34.4 89.0 34.0 86.4 34.0 81.4C34.0 74.5 34.2 73.9 36.4 72.9C42.1 70.3 46.0 74.0 46.0 81.8C46.0 88.5 41.3 91.8 35.2 89.3ZM157.5 78.0C155.6 74.9 160.0 71.3 164.7 72.2C167.1 72.7 167.6 76.1 165.4 77.7C163.3 79.2 158.4 79.4 157.5 78.0ZM90.8 60.8C92.4 59.2 92.3 55.5 90.6 54.0C88.5 52.4 85.0 53.1 83.4 55.5C80.7 59.6 87.3 64.3 90.8 60.8Z" fill="#00A8E1" fill-rule="evenodd"/></svg>';
  const tile = (letter, bg, fg = "#fff") => `<span style="background:${bg};color:${fg};width:100%;height:100%;display:grid;place-items:center">${letter}</span>`;

  // ---------- Data ----------
  const money = (n) => n.toFixed(2).replace(".", ",") + " $";
  const SUBS = [
    { id: "netflix", name: "Netflix", price: 16.49, per: "mois", next: "4 déc.", logo: tile("N", "#fff", "#E50914") },
    { id: "adobe", name: "Adobe Acrobat", price: 14.99, per: "mois", next: "4 déc.", flag: "Pas utilisé depuis 3 mois", trialEnds: true, logo: ACROBAT },
    { id: "spotify", name: "Spotify", price: 11.99, per: "mois", next: "12 déc.", logo: tile("S", "#1DB954", "#000") },
    { id: "prime", name: "Amazon Prime", price: 99.0, per: "an", next: "12 janv.", yearly: true, logo: PRIME },
  ];
  const BANKS = [
    ["RBC Banque Royale", "RBC", "#005DAA"], ["Desjardins", "D", "#00874E"], ["Banque Nationale", "BN", "#E31B23"],
    ["TD", "TD", "#34A853"], ["BMO", "BMO", "#0079C1"],
  ];
  const REVIEW = [
    { id: "r1", raw: "DRI*ADOBE 8004", guess: "Adobe Acrobat", price: 14.99 },
    { id: "r2", raw: "DRI*XYZ 8004", guess: null, price: 9.0 },
    { id: "r3", raw: "SPOTIFY P1A2B3", guess: "Spotify", price: 11.99 },
  ];

  // ---------- State ----------
  const S = {
    screen: "welcome", tab: "subs", bank: null, detail: null,
    review: {}, adobe: "active", toggles: { push: true, alerts: true },
  };

  // ---------- Test harness state ----------
  const TASKS = [
    { id: "T1", short: "Connecter ta banque",
      text: "Tu viens de télécharger Mellow. Connecte ta banque (choisis celle que tu veux) et vérifie les frais que l’app a trouvés." },
    { id: "T2", short: "Arrêter de payer un abonnement",
      text: "Tu ne te sers plus d’Adobe Acrobat. Fais en sorte de ne plus payer pour cet abonnement." },
    { id: "T3", short: "Trouver le paiement annuel",
      text: "Tu veux savoir quand ton prochain gros paiement annuel va arriver. Trouve-le et ouvre-le." },
  ];
  const H = { idx: -1, running: false, start: 0, taps: 0, results: [], marks: {}, notifUsed: false };

  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  // ---------- Building blocks ----------
  const nav = (title, back) => `<header class="nav">${back ? `<button class="back" data-go="${back}" aria-label="Retour">‹</button>` : "<span></span>"}<h1 class="nav-title">${title}</h1><span></span></header>`;
  const step = (n) => `<div class="step" aria-label="Étape ${n} sur 3"><div class="eyebrow">ÉTAPE ${n} SUR 3</div><div class="bars">${[1, 2, 3].map((i) => `<span class="${i <= n ? "on" : ""}"></span>`).join("")}</div></div>`;
  const logo = (s, lg) => `<span class="logo${lg ? " lg" : ""}">${s.logo}</span>`;
  const subRow = (s, sub) => `<li><button class="row" data-open="${s.id}">${logo(s)}<span class="body"><span class="t">${s.name}</span><span class="s">${sub}</span>${s.id === "adobe" && S.adobe === "active" && S.screen === "dash" ? `<span class="badge">${s.flag}</span>` : ""}${s.id === "adobe" && S.adobe !== "active" ? `<span class="badge ok">${S.adobe === "pending" ? "Annulation en cours" : "Annulé"}</span>` : ""}</span><span class="price"><b>${money(s.price)}</b><span>par ${s.per}</span></span><span class="chev" aria-hidden="true">›</span></button></li>`;
  const tabbar = () => `<nav class="tabbar" aria-label="Navigation principale">${[["subs", "Abonnements"], ["calendar", "Calendrier"], ["settings", "Réglages"]].map(([id, l]) => `<button data-tab="${id}" ${S.tab === id ? 'aria-current="page"' : ""}><span class="ico" aria-hidden="true"></span>${l}</button>`).join("")}</nav>`;
  const activeSubs = () => SUBS.filter((s) => !(s.id === "adobe" && S.adobe === "cancelled"));

  // ---------- Screens ----------
  const SCREENS = {
    welcome: () => ({ cls: "glow-strong no-tabs", html: `
      <div style="padding-top:120px" class="center">
        <div class="logo lg" style="margin:0 auto 26px;background:#fff;color:#000">M</div>
        <h1>Tes abonnements,<br>enfin sous contrôle.</h1>
        <p class="muted gap-lg">Mellow trouve tes abonnements et les annule pour toi. Sans culpabilité.</p>
      </div>
      <div class="bottom"><button class="btn btn-primary" data-go="bank">Commencer</button></div>` }),

    bank: () => ({ cls: "no-tabs", html: `${nav("Choisis ta banque", "welcome")}
      <ul class="list">${BANKS.map(([n, a, c]) => `<li><button class="row" data-bank="${n}"><span class="logo" style="background:${c};color:#fff;font-size:15px">${a}</span><span class="body"><span class="t">${n}</span></span><span class="chev" aria-hidden="true">›</span></button></li>`).join("")}</ul>` }),

    consent: () => ({ cls: "no-tabs", html: `${nav("Connecter ta banque", "bank")}${step(1)}
      <h2>Ce que Mellow peut voir</h2>
      <ul class="list" style="margin-top:14px">
        <li class="card"><h3>Transactions</h3><p class="muted small">Lecture seule de 12 mois de paiements.</p></li>
        <li class="card"><h3>Nom du compte</h3><p class="muted small">Pour que tu reconnaisses le compte.</p></li>
      </ul>
      <h2 class="gap-lg">Ce que Mellow ne peut jamais faire</h2>
      <ul class="card never" style="margin-top:14px">
        <li><span class="x" aria-hidden="true">✕</span>Déplacer, envoyer ou retirer ton argent</li>
        <li><span class="x" aria-hidden="true">✕</span>Voir le mot de passe de ta banque</li>
        <li><span class="x" aria-hidden="true">✕</span>Vendre ou partager tes données</li>
      </ul>
      <div class="plaid"><span>Sécurisé par Plaid</span></div>
      <button class="btn btn-primary" data-go="signin">Accepter et continuer</button>` }),

    signin: () => ({ cls: "no-tabs", html: `${nav("Connexion · " + esc(S.bank || "ta banque"), "consent")}${step(2)}
      <div class="handoff"><span class="tile">Plaid</span><span class="dots">• • •</span><span class="tile">Banque</span></div>
      <form id="signin" class="stack" novalidate>
        <label class="sr" for="u" style="position:absolute;left:-9999px">Identifiant</label>
        <input id="u" class="field" placeholder="Identifiant" value="demo.mellow" autocomplete="off">
        <label for="p" style="position:absolute;left:-9999px">Mot de passe</label>
        <input id="p" class="field" type="password" placeholder="Mot de passe" value="demo1234" autocomplete="off">
        <p class="muted small">Tes identifiants vont à ta banque, pas à Mellow. (Ici, ce sont de faux identifiants de démo.)</p>
        <button class="btn btn-primary" type="submit" style="margin-top:22px">Se connecter</button>
      </form>` }),

    connecting: () => ({ cls: "no-tabs", html: `${nav("Connexion en cours", null)}${step(3)}
      <div class="spinner" role="img" aria-label="Chargement"></div>
      <h2 class="center">Connexion à ${esc(S.bank || "ta banque")}</h2>
      <p class="muted center" style="margin-top:10px">On relie ton compte de façon sécurisée. Ça prend environ 30 secondes.</p>` }),

    scanned: () => ({ cls: "glow-strong no-tabs", html: `
      <div class="check"><i aria-hidden="true">✓</i></div>
      <h1 class="center">Analyse terminée</h1>
      <div class="card metric" style="margin-top:22px"><div class="cap">14 abonnements trouvés</div><div class="val">412,00 $/mois</div></div>
      <p class="muted center" style="margin-top:14px">On a vérifié 12 mois de transactions.</p>
      <div class="bottom"><button class="btn btn-primary" data-go="review">Vérifier les frais</button></div>` }),

    review: () => {
      const left = REVIEW.filter((r) => !S.review[r.id]).length;
      const done = REVIEW.filter((r) => S.review[r.id] && S.review[r.id] !== "later");
      return { cls: "no-tabs", html: `${nav("Vérification", null)}
      <h2>14 trouvés, ${left === 0 ? "tout est vérifié" : left + " à vérifier"}</h2>
      <p class="muted" style="margin:4px 0 16px">${11 + (3 - left)} confirmés · 412 $/mois</p>
      ${done.length ? `<div class="banner" role="status">✓ ${done.map((r) => esc(S.review[r.id])).join(" et ")} confirmé${done.length > 1 ? "s" : ""}.</div>` : ""}
      <div class="section-h"><h3>À regarder</h3></div>
      <ul class="list">${REVIEW.map((r) => { const v = S.review[r.id]; return `<li><button class="row" data-review="${r.id}"><span class="body"><span class="t">${esc(v && v !== "later" ? v : r.raw)}</span><span class="s">${v === "later" ? "Plus tard" : v ? "Confirmé" : r.guess ? "Ressemble à " + r.guess : "Inconnu · touche pour nommer"}</span></span><span class="price"><b>${money(r.price)}</b><span>par mois</span></span><span class="chev" aria-hidden="true">${v && v !== "later" ? "✓" : "›"}</span></button></li>`; }).join("")}</ul>
      <div style="margin-top:26px"><button class="btn btn-primary" data-go="dash">${left === 0 ? "Continuer" : "Continuer (vérifier plus tard)"}</button></div>` };
    },

    dash: () => ({ cls: "", html: `<h1 style="margin:22px 0 16px">Abonnements</h1>
      <div class="card metric"><div class="cap">Tu dépenses</div><div class="val">${S.adobe === "cancelled" ? "397,01" : "412,00"} $/mois</div></div>
      <p class="muted" style="margin-top:10px;font-weight:500">${S.adobe === "cancelled" ? "2 que tu n’utilises peut-être pas · 26 $/mois" : "3 que tu n’utilises peut-être pas · 41 $/mois"}</p>
      <div class="section-h"><h2>Actifs</h2><span class="count">${S.adobe === "cancelled" ? 13 : 14}</span></div>
      <ul class="list">${SUBS.map((s) => subRow(s, s.yearly ? "Renouvelle le " + s.next + " · annuel" : "Renouvelle le " + s.next)).join("")}
      <li><div class="row" style="justify-content:center;color:var(--muted);font-size:14px">et 10 autres abonnements</div></li></ul>` }),

    calendar: () => {
      const subs = activeSubs();
      const total = subs.reduce((a, s) => a + s.price, 0);
      return { cls: "", html: `<h1 style="margin:22px 0 16px">Calendrier</h1>
      <div class="card metric"><div class="cap">À payer avant le 15 janv.</div><div class="val">${money(total)}</div></div>
      <div class="section-h"><h2>À venir</h2><span class="count">${subs.length}</span></div>
      <ul class="list">${subs.map((s) => subRow(s, s.next + (s.id === "adobe" && s.trialEnds && S.adobe === "active" ? " · fin de l’essai" : "") + (s.yearly ? " · une fois par an" : ""))).join("")}</ul>` };
    },

    settings: () => ({ cls: "", html: `<h1 style="margin:22px 0 4px">Réglages</h1>
      <h2 class="gap-lg" style="margin-bottom:12px">Notifications</h2>
      <div class="stack">
        <div class="toggle-row"><span id="l-push">Notifications push</span><button class="switch" role="switch" aria-labelledby="l-push" aria-checked="${S.toggles.push}" data-toggle="push"></button></div>
        <div class="toggle-row"><span id="l-alerts">Alertes d’essai et de paiement</span><button class="switch" role="switch" aria-labelledby="l-alerts" aria-checked="${S.toggles.alerts}" data-toggle="alerts"></button></div>
        <p class="muted small" style="padding:0 6px">Activé par défaut. On te prévient 1 jour avant la fin d’un essai ou un paiement.</p>
      </div>
      <h2 class="gap-lg" style="margin-bottom:12px">Compte</h2>
      <div class="stack"><button class="action">Banques connectées <span class="chev">›</span></button><button class="action">Aide <span class="chev">›</span></button></div>
      <button class="btn-link coral" style="margin-top:24px">Se déconnecter</button>` }),

    detail: () => {
      const s = SUBS.find((x) => x.id === S.detail);
      const isAdobe = s.id === "adobe";
      let actions = `<div class="stack gap-lg"><button class="action" data-go="dash">Garder cet abonnement <span class="chev">›</span></button><button class="action coral" data-cancel="${s.id}">Annule-le pour moi <span class="chev">›</span></button></div>`;
      if (isAdobe && S.adobe === "pending") actions = statusCard();
      if (isAdobe && S.adobe === "cancelled") actions = `<div class="card gap-lg"><h3>Annulé ✓</h3><p class="muted small">Plus aucun paiement de ${money(s.price)}. On te prévient si Adobe te facture encore.</p></div>`;
      return { cls: "no-tabs", html: `${nav("Détails", "back")}
      <div class="center" style="margin-top:8px">${logo(s, true).replace('class="logo lg"', 'class="logo lg" style="margin:0 auto 14px"')}
        <h1 style="font-size:26px">${s.name}</h1>
        <p class="muted" style="margin-top:6px">${money(s.price)} par ${s.per} · renouvelle le ${s.next}</p>
        ${s.yearly ? `<p class="badge" style="margin-top:12px">Paiement annuel · ${money(s.price)} le ${s.next}</p>` : ""}
        ${isAdobe && S.adobe === "active" ? `<p class="badge" style="margin-top:12px">${s.flag}</p>` : ""}
      </div>${actions}` };
    },

    cancelled: () => ({ cls: "glow-strong no-tabs", html: `
      <div class="check"><i aria-hidden="true">✓</i></div>
      <h1 class="center">Adobe Acrobat est annulé</h1>
      <div class="card metric" style="margin-top:22px"><div class="cap">Tu viens d’économiser</div><div class="val">179,88 $/an</div></div>
      <p class="muted center" style="margin-top:14px">Plus aucun paiement de 14,99 $. On te prévient si Adobe te facture encore.</p>
      <div class="bottom"><button class="btn btn-primary" data-go="dash">Retour aux abonnements</button></div>` }),
  };

  function statusCard() {
    return `<div class="card gap-lg" role="status"><h3>On l’annule pour toi</h3>
      <p class="muted small" style="margin-top:6px">On a écrit à Adobe aujourd’hui. Ça prend souvent 1 à 3 jours. Tu n’as rien à faire.</p>
      <ol class="steps"><li class="done"><span class="dot"></span><span><span class="t">Demande envoyée à Adobe</span><br><span class="s">Aujourd’hui</span></span></li>
      <li><span class="dot"></span><span><span class="t">Adobe confirme</span><br><span class="s">Souvent 1 à 3 jours</span></span></li>
      <li><span class="dot"></span><span><span class="t">Tu reçois une notification</span><br><span class="s">Quand c’est fait</span></span></li></ol>
      <button class="btn-link" style="margin-top:8px">Arrêter la demande</button></div>
      <button class="btn-link" data-go="cancelled" style="margin-top:12px;font-size:13px">(Pour le test : simuler la confirmation d’Adobe)</button>`;
  }

  // ---------- Render ----------
  let prev = [];
  function go(screen) {
    if (screen === "back") { const p = prev.pop(); screen = p || "dash"; }
    else if (S.screen !== screen) prev.push(S.screen);
    if (["dash", "calendar", "settings"].includes(screen)) { S.tab = screen === "dash" ? "subs" : screen; prev = []; }
    S.screen = screen;
    render();
    onScreen(screen);
  }
  function render() {
    const v = SCREENS[S.screen]();
    const el = $("screen");
    el.className = "screen " + (v.cls || "");
    const tabs = ["dash", "calendar", "settings"].includes(S.screen);
    el.innerHTML = v.html + (tabs ? tabbar() : "");
    el.scrollTop = 0;
    const h = el.querySelector("h1,h2");
    if (h) { h.setAttribute("tabindex", "-1"); h.focus({ preventScroll: true }); }
    if (S.screen === "signin") $("signin").addEventListener("submit", (e) => { e.preventDefault(); go("connecting"); });
  }

  // ---------- Sheets ----------
  function sheet(html, coral) {
    $("sheet-layer").innerHTML = `<div class="scrim" data-close></div><div class="sheet${coral ? " coral" : ""}" role="dialog" aria-modal="true"><div class="grab"></div>${html}</div>`;
    const b = $("sheet-layer").querySelector(".sheet button,.sheet input");
    if (b) b.focus();
  }
  const closeSheet = () => { $("sheet-layer").innerHTML = ""; };

  function guessSheet(r) {
    sheet(`<h2>Est-ce ${esc(r.guess)} ?</h2><p>On a associé ${esc(r.raw)} à ${esc(r.guess)} à ${money(r.price)}.</p>
      <button class="btn btn-primary" data-rv="yes" data-id="${r.id}">Oui, c’est ça</button>
      <button class="btn-link" style="color:#fff" data-rv="no" data-id="${r.id}">Non, c’est autre chose</button>
      <button class="btn-link" data-rv="later" data-id="${r.id}">Pas sûr, demande-moi plus tard</button>`);
  }
  function nameSheet(r) {
    sheet(`<h2>Nomme ce paiement</h2><p>${esc(r.raw)} · ${money(r.price)}/mois</p>
      <form id="nameform"><label for="nm" style="position:absolute;left:-9999px">Nom</label>
      <input id="nm" class="field" placeholder="ex. Abonnement gym" autocomplete="off">
      <button class="btn btn-primary" type="submit" style="margin-top:16px">Enregistrer</button></form>
      <button class="btn-link" data-rv="later" data-id="${r.id}">Masquer ce paiement</button>`);
    $("nameform").addEventListener("submit", (e) => { e.preventDefault(); const v = $("nm").value.trim() || "Paiement nommé"; S.review[r.id] = v; closeSheet(); render(); });
  }
  function cancelSheet(id) {
    const s = SUBS.find((x) => x.id === id);
    sheet(`<h2>Annuler ${esc(s.name)} pour toi ?</h2><p>On contacte ${esc(s.name.split(" ")[0])} et on s’en occupe. Ton prochain paiement de ${money(s.price)} est le ${s.next}</p>
      <button class="btn btn-primary" data-confirm-cancel="${id}">Annule-le pour moi</button>
      <button class="btn-link coral" data-close>Le garder</button>`, true);
  }

  // ---------- Notification ----------
  function showNotif() {
    if (S.adobe !== "active" || !S.toggles.alerts) return;
    $("notif-layer").innerHTML = `<button class="notif" data-notif aria-label="Notification Mellow : l’essai d’Adobe Acrobat se termine demain"><span class="app">M</span><span><span class="meta">Mellow · maintenant</span><b>L’essai d’Adobe Acrobat se termine demain</b><span class="msg">14,99 $/mois à partir du 4 déc. Touche pour l’annuler à ta place, ou le garder.</span></span></button>`;
  }

  // ---------- Events ----------
  document.addEventListener("click", (e) => {
    const t = e.target.closest("button,[data-close]");
    if (!t) return;
    const inApp = !t.closest("#harness-layer") && !t.closest("#taskbar");
    if (inApp && H.running) H.taps++;
    const d = t.dataset;
    if ("close" in d) return closeSheet();
    if (d.go) { closeSheet(); return go(d.go); }
    if (d.tab) return go(d.tab === "subs" ? "dash" : d.tab);
    if (d.bank) { S.bank = d.bank; return go("consent"); }
    if (d.open) { S.detail = d.open; mark("open_" + d.open); return go("detail"); }
    if (d.cancel) return cancelSheet(d.cancel);
    if (d.confirmCancel) { S.adobe = "pending"; closeSheet(); render(); mark("cancel_confirmed"); return; }
    if (d.review) { const r = REVIEW.find((x) => x.id === d.review); return r.guess ? guessSheet(r) : nameSheet(r); }
    if (d.rv) {
      const r = REVIEW.find((x) => x.id === d.id);
      if (d.rv === "yes") { S.review[r.id] = r.guess; closeSheet(); return render(); }
      if (d.rv === "no") return nameSheet(r);
      if (d.rv === "later") { S.review[r.id] = "later"; closeSheet(); return render(); }
    }
    if (d.toggle) { S.toggles[d.toggle] = !S.toggles[d.toggle]; return render(); }
    if ("notif" in d) { $("notif-layer").innerHTML = ""; H.notifUsed = true; S.detail = "adobe"; mark("open_adobe"); return go("detail"); }
    if (d.h) return harness(d.h, t);
  });

  // ---------- Test harness ----------
  function onScreen(screen) {
    if (screen === "scanned") mark("bank_connected");
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
    if (!show) { b.hidden = true; return; }
    const task = TASKS[H.idx];
    b.hidden = false;
    b.innerHTML = `<span class="lbl">Tâche ${H.idx + 1}/3 · ${task.short}</span><button data-h="reread">Relire</button><button data-h="giveup">Abandonner</button>`;
  }
  function overlay(html) { $("harness-layer").innerHTML = `<div class="harness" role="dialog" aria-modal="true">${html}</div>`; const f = $("harness-layer").querySelector("h1"); if (f) { f.tabIndex = -1; f.focus(); } }
  const closeOverlay = () => { $("harness-layer").innerHTML = ""; };

  function intro() {
    overlay(`<div class="kicker">Test utilisateur · environ 10 minutes</div>
      <h1>Merci de tester Mellow</h1>
      <div class="stack" style="margin-top:16px">
        <p>Mellow est une app qui trouve tes abonnements et les annule pour toi. C’est un <b>prototype</b> : rien n’est réel, aucune vraie banque n’est connectée.</p>
        <p>On teste l’app, <b>pas toi</b>. Si quelque chose est difficile, c’est l’app qui doit changer.</p>
        <ul><li>Tu vas faire 3 petites tâches.</li><li>Si tu peux, dis à voix haute ce que tu penses.</li><li>Après chaque tâche, une question rapide.</li><li>À la fin, tu copies tes résultats et tu les envoies à la personne qui t’a invité.</li></ul>
        <p class="muted small">Aucune donnée n’est envoyée ni enregistrée par ce site.</p>
      </div>
      <button class="btn btn-primary" data-h="next" style="margin-top:28px">Commencer</button>`);
  }
  function taskCard() {
    const task = TASKS[H.idx];
    overlay(`<div class="kicker">Tâche ${H.idx + 1} sur 3</div><h1>${task.short}</h1>
      <p class="task-text">${task.text}</p>
      <p class="muted small">Le chronomètre démarre quand tu touches le bouton. La consigne reste en haut de l’écran.</p>
      <button class="btn btn-primary" data-h="start">Commencer la tâche</button>`);
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
      <button class="btn btn-primary" data-h="afterseq" style="margin-top:28px" disabled>Continuer</button>`);
  }
  function summary() {
    const rows = H.results.map((r) => `<tr><td>${r.id}</td><td>${r.ok ? "Oui" : "Non"}</td><td>${r.time} s</td><td>${r.taps}</td><td>${r.seq}/7</td></tr>`).join("");
    const code = "MELLOW-TEST\n" + H.results.map((r) => `${r.id} | réussi: ${r.ok ? "oui" : "non"} | temps: ${r.time}s | touches: ${r.taps} | facilité: ${r.seq}/7` +
      (r.id === "T1" && r.marks.bank_connected ? ` | banque connectée à ${r.marks.bank_connected}s` : "") +
      (r.id === "T2" ? ` | notification utilisée: ${r.notif ? "oui" : "non"}` : "")).join("\n") + `\nappareil: ${window.innerWidth}x${window.innerHeight}`;
    overlay(`<div class="kicker">C’est terminé</div><h1>Merci, c’est très utile !</h1>
      <table class="results"><thead><tr><th>Tâche</th><th>Réussie</th><th>Temps</th><th>Touches</th><th>Facilité</th></tr></thead><tbody>${rows}</tbody></table>
      <p>Dernière étape : copie ce texte et envoie-le à la personne qui t’a invité (texto ou courriel).</p>
      <label for="out" style="position:absolute;left:-9999px">Résultats</label>
      <textarea id="out" class="out" readonly>${esc(code)}</textarea>
      <button class="btn btn-primary" data-h="copy">Copier les résultats</button>
      <button class="btn-link" data-h="restart" style="color:#555">Recommencer le test</button>`);
  }
  function harness(action, el) {
    if (action === "next") { H.idx = 0; return taskCard(); }
    if (action === "start") return startTask();
    if (action === "reread") { const task = TASKS[H.idx]; return sheetHarness(task); }
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
    if (action === "restart") { location.reload(); }
    if (action === "closeread") return closeSheet();
  }
  function sheetHarness(task) {
    sheet(`<h2>Tâche ${H.idx + 1}</h2><p style="color:#fff">${task.text}</p><button class="btn btn-primary" data-close>OK</button>`);
  }

  // Auto-advance timers on screen change
  const _render = render;
  render = function () {
    _render();
    if (S.screen === "connecting") setTimeout(() => { if (S.screen === "connecting") go("scanned"); }, 2200);
  };

  // Skip the test layer with ?demo=1 (free exploration for the jury or for you)
  const demo = new URLSearchParams(location.search).has("demo");
  render();
  if (!demo) intro();
})();
