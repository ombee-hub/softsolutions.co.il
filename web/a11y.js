// Accessibility widget: floating button + settings panel. Settings are stored per viewer in localStorage.
(function () {
  const html = document.documentElement;
  const he = html.lang === 'he';


  const T = he ? {
    open: 'פתיחת תפריט נגישות', title: 'תפריט נגישות', close: 'סגירה',
    reset: 'איפוס כל הגדרות הנגישות', statement: 'הצהרת נגישות', privacy: 'מדיניות פרטיות',
  } : {
    open: 'Open accessibility menu', title: 'Accessibility menu', close: 'Close',
    reset: 'Reset all accessibility settings', statement: 'Accessibility statement', privacy: 'Privacy policy',
  };

  // [key, Hebrew label, English label, icon path(s)]
  const OPTIONS = [
    ['contrast', 'ניגודיות +', 'Contrast +', '<circle cx="12" cy="12" r="9"/><path d="M12 3v18a9 9 0 0 0 0-18z" fill="currentColor"/>'],
    ['links', 'הדגשת קישורים', 'Highlight links', '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>'],
    ['bigtext', 'טקסט גדול', 'Bigger text', '<path d="M3 7V5h9v2M7.5 5v14M6 19h3"/><path d="M13 11v-1h8v1M17 10v9M15.5 19h3"/>'],
    ['spacing', 'ריווח טקסט', 'Text spacing', '<path d="M7 8l-4 4 4 4M17 8l4 4-4 4M3 12h2M9 12h2M13 12h2M19 12h2"/>'],
    ['noanim', 'ביטול הנפשות', 'Pause animations', '<circle cx="12" cy="12" r="9" stroke-dasharray="2 3"/><path d="M10 9v6M14 9v6"/>'],
    ['noimg', 'הסתרת תמונות', 'Hide images', '<rect x="3" y="5" width="16" height="14" rx="2"/><path d="M3 16l5-5 4 4 3-3 4 4"/><path d="M17 2l5 5M22 2l-5 5"/>'],
    ['dyslexia', 'תמיכה בדיסלקציה', 'Dyslexia friendly', '<path d="M4 18V6h3a6 6 0 0 1 0 12z"/><path d="M15 18V9a3 3 0 0 1 3-3h1M14 12h5"/>'],
    ['cursor', 'סמן גדול', 'Big cursor', '<path d="M5 3l14 7-6 2-2 6z"/>'],
    ['tooltips', 'תיאורים', 'Tooltips', '<path d="M4 4h16v12h-9l-5 4v-4H4z"/><path d="M12 8v.01M12 11v3"/>'],
    ['lineheight', 'גובה שורה', 'Line height', '<path d="M10 6h11M10 10h11M10 14h11M10 18h11M4 4v16M2 6l2-2 2 2M2 18l2 2 2-2"/>'],
    ['gray', 'רוויה', 'Desaturate', '<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>'],
    ['align', 'יישור טקסט', 'Align text', '<path d="M4 6h16M4 10h10M4 14h16M4 18h10"/>'],
  ];

  const KEY = 'ss-a11y';
  const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } };
  const save = (s) => { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) { /* storage blocked */ } };
  let state = load();

  const apply = () => {
    OPTIONS.forEach(([k]) => html.classList.toggle('a11y-' + k, !!state[k]));
    panel.querySelectorAll('[data-opt]').forEach((b) => b.setAttribute('aria-pressed', String(!!state[b.dataset.opt])));
  };

  // ---------- markup ----------
  const root = document.createElement('div');
  root.className = 'a11y-widget';
  root.innerHTML = `
    <button class="a11y-launch" aria-expanded="false" aria-controls="a11yPanel" aria-label="${T.open}" title="${T.title}">
      <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="4" r="2" fill="currentColor" stroke="none"/><path d="M4 8l8 1.5L20 8M12 9.5V14m0 0l-3.5 7M12 14l3.5 7"/></svg>
    </button>
    <div class="a11y-panel" id="a11yPanel" role="dialog" aria-modal="false" aria-label="${T.title}" hidden>
      <div class="a11y-panel__head">
        <button class="a11y-close" aria-label="${T.close}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
        <span class="a11y-panel__title">${T.title}</span>
      </div>
      <div class="a11y-grid">
        ${OPTIONS.map(([k, lh, le, icon]) => `
        <button class="a11y-opt" data-opt="${k}" aria-pressed="false">
          <svg viewBox="0 0 24 24" aria-hidden="true">${icon}</svg>
          <span>${he ? lh : le}</span>
        </button>`).join('')}
      </div>
      <button class="a11y-reset">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 12a8 8 0 1 1-2.3-5.7M20 4v5h-5"/></svg>
        ${T.reset}
      </button>
      <div class="a11y-foot">
        <a href="accessibility.html">${T.statement}</a>
        <a href="privacy.html">${T.privacy}</a>
      </div>
    </div>`;
  document.body.appendChild(root);

  const launch = root.querySelector('.a11y-launch');
  const panel = root.querySelector('.a11y-panel');

  const setOpen = (open) => {
    panel.hidden = !open;
    launch.setAttribute('aria-expanded', String(open));
    if (open) panel.querySelector('.a11y-close').focus();
    else launch.focus();
  };

  launch.addEventListener('click', () => setOpen(panel.hidden));
  root.querySelector('.a11y-close').addEventListener('click', () => setOpen(false));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !panel.hidden) setOpen(false); });
  document.addEventListener('click', (e) => { if (!panel.hidden && !root.contains(e.target)) setOpen(false); });

  panel.querySelectorAll('[data-opt]').forEach((b) => b.addEventListener('click', () => {
    state[b.dataset.opt] = !state[b.dataset.opt];
    save(state); apply();
  }));
  root.querySelector('.a11y-reset').addEventListener('click', () => {
    state = {}; save(state); apply();
  });

  // ---------- tooltips: show alt / aria-label text on hover and focus ----------
  const tip = document.createElement('div');
  tip.className = 'a11y-tip'; tip.hidden = true;
  document.body.appendChild(tip);
  const describe = (el) => el && (el.getAttribute('alt') || el.getAttribute('aria-label') || el.getAttribute('title'));
  const showTip = (e) => {
    if (!state.tooltips) return;
    const el = e.target.closest('img[alt]:not([alt=""]), [aria-label], [title]');
    const text = describe(el);
    if (!text || root.contains(el)) { tip.hidden = true; return; }
    const r = el.getBoundingClientRect();
    tip.textContent = text; tip.hidden = false;
    tip.style.top = `${Math.max(8, r.top - tip.offsetHeight - 8)}px`;
    tip.style.left = `${Math.min(window.innerWidth - tip.offsetWidth - 8, Math.max(8, r.left + r.width / 2 - tip.offsetWidth / 2))}px`;
  };
  document.addEventListener('mouseover', showTip);
  document.addEventListener('focusin', showTip);
  document.addEventListener('scroll', () => { tip.hidden = true; }, { passive: true });

  apply();
})();
