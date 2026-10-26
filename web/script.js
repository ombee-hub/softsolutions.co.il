// Header shadow on scroll
const header = document.querySelector('.header');
const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Mobile menu: side drawer with a dimmed overlay
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
const navClose = document.getElementById('navClose');
const overlay = document.getElementById('navOverlay');
const setMenu = (open) => {
  nav.classList.toggle('is-open', open);
  overlay.hidden = !open;
  document.body.classList.toggle('menu-open', open);
  burger.setAttribute('aria-expanded', String(open));
  (open ? navClose : burger).focus();
};
burger.addEventListener('click', () => {
  // open with the products group expanded, unless another group is already open
  if (!nav.querySelector('.nav__group.is-open')) nav.querySelector('.nav__toggle').click();
  setMenu(true);
});
navClose.addEventListener('click', () => setMenu(false));
overlay.addEventListener('click', () => setMenu(false));
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && nav.classList.contains('is-open')) setMenu(false); });
// the drawer only exists below the desktop breakpoint: close it if the window grows past it
matchMedia('(min-width: 1061px)').addEventListener('change', (e) => {
  if (e.matches && nav.classList.contains('is-open')) setMenu(false);
});
nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => {
  if (nav.classList.contains('is-open')) setMenu(false);
}));

// Dropdown groups: hover on desktop (CSS), click to expand in the mobile menu
nav.querySelectorAll('.nav__toggle').forEach((btn) => {
  btn.addEventListener('click', () => {
    const group = btn.parentElement;
    const open = !group.classList.contains('is-open');
    nav.querySelectorAll('.nav__group.is-open').forEach((g) => {
      g.classList.remove('is-open');
      g.querySelector('.nav__toggle').setAttribute('aria-expanded', 'false');
    });
    group.classList.toggle('is-open', open);
    btn.setAttribute('aria-expanded', String(open));
  });
});

// Feature tabs (home page)
const tabs = document.querySelectorAll('.tabs [role="tab"]');
tabs.forEach((t) => t.addEventListener('click', () => {
  tabs.forEach((x) => {
    const on = x === t;
    x.setAttribute('aria-selected', String(on));
    document.getElementById(x.getAttribute('aria-controls')).hidden = !on;
  });
}));

// Blog category filter
const chips = document.querySelectorAll('.chip[data-filter]');
chips.forEach((c) => c.addEventListener('click', () => {
  chips.forEach((x) => x.setAttribute('aria-pressed', String(x === c)));
  document.querySelectorAll('.b-card[data-cat]').forEach((card) => {
    card.hidden = c.dataset.filter !== 'all' && card.dataset.cat !== c.dataset.filter;
  });
}));

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (en.isIntersecting) {
      en.target.classList.add('is-in');
      io.unobserve(en.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = `${(i % 3) * 80}ms`;
  io.observe(el);
});

// Contact form (front-end only – connect to a backend / form service before going live)
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let ok = true;
    form.querySelectorAll('[required]').forEach((f) => {
      const valid = f.value.trim() && f.checkValidity();
      f.classList.toggle('invalid', !valid);
    f.setAttribute('aria-invalid', String(!valid));
      if (!valid) ok = false;
    });
    if (!ok) { form.querySelector('[aria-invalid="true"]').focus(); return; }
    form.reset();
    document.getElementById('formOk').hidden = false;
  });
}

// Cookie consent: third-party embeds (the Google map) load only after "accept" or an explicit click
const CONSENT_KEY = 'ss-cookie-consent';
const getConsent = () => { try { return localStorage.getItem(CONSENT_KEY); } catch (e) { return null; } };
const setConsent = (v) => { try { localStorage.setItem(CONSENT_KEY, v); } catch (e) { /* storage blocked */ } };

const loadMaps = () => document.querySelectorAll('iframe[data-src]').forEach((f) => {
  f.src = f.dataset.src;
  f.removeAttribute('data-src');
  f.hidden = false;
  f.nextElementSibling?.remove();
});
document.querySelectorAll('[data-load-map]').forEach((b) => b.addEventListener('click', loadMaps));
if (getConsent() === 'accepted') loadMaps();

// the banner appears on the home page only
if (!getConsent() && document.body.dataset.page === 'index') {
  const he = document.documentElement.lang === 'he';
  const banner = document.createElement('div');
  banner.className = 'cookie-banner';
  banner.setAttribute('role', 'region');
  banner.setAttribute('aria-label', he ? 'הודעת עוגיות' : 'Cookie notice');
  banner.innerHTML = he
    ? '<p>אתר זה משתמש בעוגיות (Cookies) כדי לשפר את חוויית הגלישה שלך. לפרטים נוספים ניתן לעיין <a href="privacy.html">במדיניות הפרטיות</a>.</p><div class="cookie-banner__actions"><button class="btn btn--primary btn--sm" data-consent="accepted">מאשר/ת</button><button class="btn btn--ghost btn--sm" data-consent="declined">ביטול</button></div>'
    : '<p>This website uses cookies to improve your browsing experience. For more information, see our <a href="privacy.html">privacy policy</a>.</p><div class="cookie-banner__actions"><button class="btn btn--primary btn--sm" data-consent="accepted">Accept</button><button class="btn btn--ghost btn--sm" data-consent="declined">Decline</button></div>';
  // cookie icon: a round cookie with a bite taken out and chocolate chips
  banner.insertAdjacentHTML('afterbegin', '<span class="cookie-banner__icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M21 12.5A9 9 0 1 1 11.5 3a3 3 0 0 0 3.5 3.5 3 3 0 0 0 3 3 3 3 0 0 0 3 3z"/><circle cx="8.5" cy="9.5" r="1.2"/><circle cx="14" cy="13.5" r="1.2"/><circle cx="9" cy="15.5" r="1.2"/><circle cx="16" cy="18" r=".8"/></svg></span>');
  document.body.appendChild(banner);
  // keep the accessibility button above the banner
  const lift = () => document.documentElement.style.setProperty('--cookie-h', `${banner.offsetHeight + 16}px`);
  lift();
  window.addEventListener('resize', lift);
  document.body.classList.add('cookie-open');
  banner.querySelectorAll('[data-consent]').forEach((b) => b.addEventListener('click', () => {
    setConsent(b.dataset.consent);
    if (b.dataset.consent === 'accepted') loadMaps();
    banner.remove();
    document.body.classList.remove('cookie-open');
    window.removeEventListener('resize', lift);
  }));
}

document.getElementById('year').textContent = new Date().getFullYear();
