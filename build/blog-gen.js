// Generates <src>/blog.html and <src>/blog-*.html from the blog data files (Hebrew + English)
const fs = require('fs');
const path = require('path');

const LANGS = [
  { data: './blog-data.js', src: 'src', t: {
    title: 'בלוג | Softsolutions', desc: 'טיפים, עדכוני מוצר וסיפורי לקוח מעולם הפריוריטי והמחוללים של Softsolutions.',
    postTitle: 'הבלוג של Softsolutions', crumbs: 'פירורי לחם', home: 'בית', blog: 'בלוג',
    h1: 'הבלוג', lead: 'טיפים לעבודה עם המחוללים, עדכוני גרסה וסיפורים מהשטח.',
    filter: 'סינון לפי נושא', all: 'הכל', read: 'לקריאת המאמר', author: 'סופטסולושנס', minutes: 'דקת קריאה',
    adjacent: 'מאמרים סמוכים', next: 'המאמר הבא', prev: 'המאמר הקודם',
    moreKicker: 'עוד מהבלוג', moreTitle: 'אולי יעניין אותך גם', allPosts: 'לכל המאמרים',
  } },
  { data: './blog-data-en.js', src: 'src-en', t: {
    title: 'Blog | Softsolutions', desc: 'Tips, product updates and customer stories from the world of Priority and the Softsolutions app builder.',
    postTitle: 'Softsolutions blog', crumbs: 'Breadcrumbs', home: 'Home', blog: 'Blog',
    h1: 'Blog', lead: 'Tips for working with the builders, release notes and stories from the field.',
    filter: 'Filter by topic', all: 'All', read: 'Read article', author: 'Softsolutions', minutes: '1 min read',
    adjacent: 'Adjacent articles', next: 'Next article', prev: 'Previous article',
    moreKicker: 'More from the blog', moreTitle: 'You might also like', allPosts: 'All articles',
  } },
];

for (const { data, src, t } of LANGS) {
  if (!fs.existsSync(path.join(__dirname, data)) || !fs.existsSync(path.join(__dirname, src))) continue;
  const posts = require(data);
  const SRC = path.join(__dirname, src);

  const card = (p, featured) => `
      <a class="b-card${featured ? ' b-card--featured' : ''} reveal" href="${p.slug}.html" data-cat="${p.cat}">
        <div class="b-card__img"><img src="${p.cover}" alt="" loading="lazy"></div>
        <div class="b-card__body">
          <div class="b-meta"><span class="b-tag">${p.catLabel}</span><time datetime="${p.iso}">${p.date}</time></div>
          <h3>${p.title}</h3>
          <p>${p.excerpt}</p>
          <span class="card__more">${t.read}</span>
        </div>
      </a>`;

  const cats = [...new Map(posts.map((p) => [p.cat, p.catLabel])).entries()];

  fs.writeFileSync(path.join(SRC, 'blog.html'), `<!--{"title":"${t.title}","desc":"${t.desc}","section":"resources"}-->

<section class="page-hero">
  <div class="container page-hero__inner page-hero__inner--center">
    <nav class="crumbs" aria-label="${t.crumbs}"><a href="index.html">${t.home}</a><span>${t.blog}</span></nav>
    <h1>${t.h1}</h1>
    <p class="lead">${t.lead}</p>
  </div>
</section>

<section class="section section--tight">
  <div class="container">
    <div class="chips reveal" role="group" aria-label="${t.filter}">
      <button class="chip" aria-pressed="true" data-filter="all">${t.all}</button>
${cats.map(([k, l]) => `      <button class="chip" aria-pressed="false" data-filter="${k}">${l}</button>`).join('\n')}
    </div>
    <div class="b-grid">${posts.map((p, i) => card(p, i === 0)).join('')}
    </div>
  </div>
</section>
`);

  posts.forEach((p, i) => {
    const more = posts.filter((x) => x !== p).sort((a, b) => (b.cat === p.cat) - (a.cat === p.cat)).slice(0, 3);
    const prev = posts[i + 1], next = posts[i - 1];
    fs.writeFileSync(path.join(SRC, p.slug + '.html'), `<!--{"title":"${p.title} | ${t.postTitle}","desc":"${p.excerpt.replace(/"/g, '&quot;')}","section":"resources"}-->

<article class="post-page">
  <header class="page-hero post-hero">
    <div class="container post-hero__inner">
      <nav class="crumbs" aria-label="${t.crumbs}"><a href="index.html">${t.home}</a><a href="blog.html">${t.blog}</a><span>${p.title}</span></nav>
      <span class="b-tag">${p.catLabel}</span>
      <h1>${p.title}</h1>
      <div class="post-meta">
        <span class="post-meta__avatar" aria-hidden="true"><i></i><i></i><i></i></span>
        <span>${t.author}</span><span>·</span><time datetime="${p.iso}">${p.date}</time><span>·</span><span>${t.minutes}</span>
      </div>
    </div>
  </header>

  <div class="container">
    <div class="post-cover"><img src="${p.cover}" alt=""></div>
    <div class="article">
${p.body.trim().split('\n').map((l) => '      ' + l).join('\n')}
    </div>

    <nav class="post-nav" aria-label="${t.adjacent}">
      ${next ? `<a href="${next.slug}.html" class="post-nav__item"><small>${t.next}</small><b>${next.title}</b></a>` : '<span></span>'}
      ${prev ? `<a href="${prev.slug}.html" class="post-nav__item post-nav__item--prev"><small>${t.prev}</small><b>${prev.title}</b></a>` : '<span></span>'}
    </nav>
  </div>
</article>

<section class="section section--tint">
  <div class="container">
    <header class="section__head reveal">
      <span class="kicker">${t.moreKicker}</span>
      <h2>${t.moreTitle}</h2>
    </header>
    <div class="b-grid b-grid--3">${more.map((m) => card(m)).join('')}
    </div>
    <div class="center reveal"><a href="blog.html" class="btn btn--ghost">${t.allPosts}</a></div>
  </div>
</section>
`);
  });
  console.log(`blog ${src}:`, posts.length + 1);
}
