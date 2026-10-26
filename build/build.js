// Builds the static multi-page site in two languages: wraps each page body with the shared header/footer.
//   src/*.html    -> <outDir>/*.html     (Hebrew, RTL)
//   src-en/*.html -> <outDir>/en/*.html  (English, LTR)
// Usage: node build.js <outDir>
const fs = require('fs');
const path = require('path');

const OUT = process.argv[2];
const ext = 'target="_blank" rel="noopener"';
const PLANE = '<svg class="plane-icon" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4z"/></svg>';

const LANGS = {
  he: {
    src: 'src', out: '', dir: 'rtl', other: 'en',
    switchLabel: 'EN', switchName: 'English', switchHref: (f) => `en/${f}`,
    home: 'Softsolutions – דף הבית', mainNav: 'ניווט ראשי', openMenu: 'פתיחת תפריט', closeMenu: 'סגירת תפריט',
    contact: 'יצירת קשר', ctaTitle: 'הגיע הזמן להוציא את הפריוריטי לשטח', ctaText: 'ספרו לנו מה הארגון צריך – ונחזור עם הדגמה מותאמת.',
    footerText: 'פתרונות שטח מתקדמים לפריוריטי – כבר מעל 20 שנה.<br>רחוב המדע 2, יקנעם',
    rights: 'כל הזכויות שמורות לסופטסולושנס בע"מ', privacy: 'מדיניות פרטיות', a11y: 'הצהרת נגישות', credit: 'עיצוב ובנייה ע"י:',
    nav: [
      { key: 'products', label: 'מוצרים', items: [
        ['pod.html', 'הפצה ומעקב אספקות'],
        ['technicians.html', 'טכנאי שטח'],
        ['sales-agents.html', 'סוכני שטח'],
        ['wms.html', 'ניהול מחסנים WMS'],
        ['generators.html', 'מחוללי אפליקציות ואתרים'],
        ['http://www.filesmile.co.il', 'ניהול מסמכים – FileSmile', true],
      ] },
      { key: 'customers', label: 'לקוחות', items: [
        ['customers.html', 'הלקוחות שלנו'],
        ['stories.html', 'סיפורי הצלחה'],
      ] },
      { key: 'company', label: 'החברה', items: [
        ['about.html', 'אודות'],
        ['partners.html', 'שותפים עסקיים'],
      ] },
      { key: 'resources', label: 'משאבים', items: [
        ['demos.html', 'מערכות הדגמה'],
        ['https://www.softsolutions.co.il/documentation', 'תיעוד ומדריכים', true],
        ['forms.html', 'טפסים להורדה'],
        ['blog.html', 'בלוג'],
        ['https://service.softsolutions.co.il/priportal/', 'מרכז תמיכה', true],
      ] },
    ],
  },
  en: {
    src: 'src-en', out: 'en', dir: 'ltr', other: 'he',
    switchLabel: 'עב', switchName: 'עברית', switchHref: (f) => `../${f}`,
    home: 'Softsolutions – home', mainNav: 'Main navigation', openMenu: 'Open menu', closeMenu: 'Close menu',
    contact: 'Contact us', ctaTitle: 'Time to take Priority into the field', ctaText: 'Tell us what your organization needs – and we\'ll get back to you with a tailored demo.',
    footerText: 'Advanced field solutions for Priority – for over 20 years.<br>2 HaMada St., Yokneam, Israel',
    rights: 'All rights reserved to Softsolutions Ltd.', privacy: 'Privacy policy', a11y: 'Accessibility statement', credit: 'Design &amp; development:',
    nav: [
      { key: 'products', label: 'Products', items: [
        ['pod.html', 'Distribution &amp; delivery tracking'],
        ['technicians.html', 'Service technicians'],
        ['sales-agents.html', 'Sales agents'],
        ['wms.html', 'Warehouse management (WMS)'],
        ['generators.html', 'App &amp; website builder'],
        ['http://www.filesmile.co.il', 'Document management – FileSmile', true],
      ] },
      { key: 'customers', label: 'Customers', items: [
        ['customers.html', 'Our customers'],
        ['stories.html', 'Success stories'],
      ] },
      { key: 'company', label: 'Company', items: [
        ['about.html', 'About'],
        ['partners.html', 'Business partners'],
      ] },
      { key: 'resources', label: 'Resources', items: [
        ['demos.html', 'Demo apps'],
        ['https://www.softsolutions.co.il/documentation?lang=en', 'Documentation', true],
        ['forms.html', 'Forms'],
        ['blog.html', 'Blog'],
        ['https://service.softsolutions.co.il/priportal/', 'Support center', true],
      ] },
    ],
  },
};

// product icons shown next to the product links in the menu (same drawings as the product cards)
const ICONS = {
  'pod.html': '<path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',
  'technicians.html': '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.4-.6-.6-2.4z"/>',
  'sales-agents.html': '<path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/>',
  'wms.html': '<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z"/><path d="M4 7.5l8 4.5 8-4.5M12 12v9"/>',
  'generators.html': '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><path d="M17.5 14v7M14 17.5h7"/>',
  'http://www.filesmile.co.il': '<path d="M6 3h8l5 5v13H6z"/><path d="M14 3v5h5M9 13h7M9 17h5"/>',
};

const link = ([href, label, external], current, withIcon) =>
  `<a href="${href}"${external ? ' ' + ext : ''}${href === current || (href === 'blog.html' && current && current.startsWith('blog-')) ? ' aria-current="page"' : ''}>${
    withIcon && ICONS[href] ? `<span class="menu-icon" aria-hidden="true"><svg viewBox="0 0 24 24">${ICONS[href]}</svg></span>` : ''}${label}</a>`;

const LOGO = '<img src="images/logo-softsolutions.webp" alt="Softsolutions" class="brand__logo" width="300" height="300">';

const header = (L, file, section) => `
<header class="header" id="top">
  <div class="container header__inner">
    <button class="burger" id="burger" aria-label="${L.openMenu}" aria-expanded="false" aria-controls="nav">
      <span></span><span></span><span></span>
    </button>

    <a href="index.html" class="brand" aria-label="${L.home}">
      ${LOGO}
    </a>

    <nav class="nav" id="nav" aria-label="${L.mainNav}">
      <div class="nav__head">
        <a href="index.html" class="brand" aria-label="${L.home}">${LOGO}</a>
        <button class="nav__close" id="navClose" aria-label="${L.closeMenu}">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>
        </button>
      </div>
${L.nav.map((g) => `      <div class="nav__group${g.key === section ? ' is-active' : ''}">
        <button class="nav__link nav__toggle" aria-expanded="false">${g.label}</button>
        <div class="nav__menu${g.key === 'products' ? ' nav__menu--icons' : ''}">
          ${g.items.map((i) => link(i, file, g.key === 'products')).join('\n          ')}
        </div>
      </div>`).join('\n')}
      <a href="${L.switchHref(file)}" class="lang-switch" hreflang="${L.other}" lang="${L.other}" title="${L.switchName}">${L.switchLabel}</a>
      <a href="contact.html" class="btn btn--primary btn--sm nav__cta">
        ${L.contact}
        ${PLANE}
      </a>
    </nav>
    <div class="nav-overlay" id="navOverlay" hidden></div>
  </div>
</header>`;

const cta = (L) => `
<section class="cta">
  <div class="container cta__inner">
    <div>
      <h2>${L.ctaTitle}</h2>
      <p>${L.ctaText}</p>
    </div>
    <div class="cta__actions">
      <a href="contact.html" class="btn btn--light">
        ${L.contact}
        ${PLANE}
      </a>
      <a href="tel:+97246213563" class="btn btn--outline-light" dir="ltr">04-6213563</a>
    </div>
  </div>
</section>`;

const footer = (L) => `
<footer class="footer">
  <div class="container footer__inner">
    <div class="footer__brand">
      <a href="index.html" class="brand brand--light">
        ${LOGO}
      </a>
      <p>${L.footerText} · <a href="tel:+97246213563" dir="ltr">04-6213563</a></p>
      <div class="social">
        <a href="https://www.linkedin.com/company/soft-solutions-ltd/" ${ext} aria-label="LinkedIn">
          <svg viewBox="0 0 24 24"><path d="M6.5 8.5v10M6.5 5.5v.01M11 18.5v-6a3 3 0 0 1 6 0v6M11 10v8.5"/></svg>
        </a>
        <a href="https://www.facebook.com/softsolutions12" ${ext} aria-label="Facebook">
          <svg viewBox="0 0 24 24"><path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z"/></svg>
        </a>
        <a href="https://www.youtube.com/channel/UC6zUWjmD0k8VnorSsUFc1HA/about" ${ext} aria-label="YouTube">
          <svg viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="12" rx="4"/><path d="M10.5 9.5l4 2.5-4 2.5z"/></svg>
        </a>
      </div>
    </div>
${L.nav.filter((g) => g.key !== 'customers').map((g) => `    <div class="footer__col">
      <h5>${g.label}</h5>
      ${g.items.map((i) => link(i)).join('\n      ')}
      ${g.key === 'company' ? L.nav[1].items.map((i) => link(i)).join('\n      ') + `\n      <a href="contact.html">${L.contact}</a>` : ''}
    </div>`).join('\n')}
  </div>
  <div class="container footer__bottom">
    <span>© <span id="year"></span> ${L.rights}</span>
    <span class="footer__legal"><a href="privacy.html">${L.privacy}</a><a href="accessibility.html">${L.a11y}</a></span>
    <span class="credit">${L.credit} <a class="credit__logo" href="https://ombee.co.il" target="_blank" rel="noopener"><img src="images/ombee-logo.webp" alt="OMBee – Graphic Design and UI/UX" width="800" height="230"></a></span>
  </div>
</footer>`;

const page = (lang, L, file, meta, body) => `<!doctype html>
<html lang="${lang}" dir="${L.dir}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${meta.title}</title>
  <meta name="description" content="${meta.desc}">
  <link rel="alternate" hreflang="${L.other}" href="${L.switchHref(file)}">
  <link rel="icon" href="images/logo-softsolutions.webp">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;700;800;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="styles.css">
</head>
<body data-page="${file.replace('.html', '')}">
${header(L, file, meta.section)}

<main>
${body.trim()}
${meta.cta === false ? '' : cta(L)}
</main>
${footer(L)}

<script src="script.js"></script>
<script src="a11y.js"></script>
</body>
</html>
`;

for (const [lang, L] of Object.entries(LANGS)) {
  const src = path.join(__dirname, L.src);
  if (!fs.existsSync(src)) continue;
  const out = path.join(OUT, L.out);
  fs.mkdirSync(out, { recursive: true });
  for (const f of fs.readdirSync(src).filter((f) => f.endsWith('.html'))) {
    const raw = fs.readFileSync(path.join(src, f), 'utf8');
    const m = raw.match(/^<!--(\{[\s\S]*?\})-->\s*/);
    const meta = JSON.parse(m[1]);
    let html = page(lang, L, f, meta, raw.slice(m[0].length));
    // English pages live one folder down: point shared assets back up
    if (L.out) html = html.replace(/(src|href)="(images\/|styles\.css|script\.js|a11y\.js)/g, '$1="../$2');
    fs.writeFileSync(path.join(out, f), html);
  }
  console.log(`built ${lang}:`, fs.readdirSync(src).filter((f) => f.endsWith('.html')).length);
}
