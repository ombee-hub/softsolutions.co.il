# softsolutions.co.il

A redesign of the Softsolutions website. It is a static site in Hebrew (RTL) and English (LTR).

## Folder structure

- `web/` – the finished site. Open `web/index.html` in a browser. This is the folder you upload to the server.
  - `web/en/` – the English version
  - `web/images/` – all images (WebP)
  - `styles.css`, `script.js`, `a11y.js` (accessibility widget) – shared by both languages
- `build/` – the page sources and the build script
  - `src/` – Hebrew page content, `src-en/` – English page content
  - `build.js` – wraps every page with the shared header, menu, footer and CTA band
  - `blog-data.js`, `blog-data-en.js` + `blog-gen.js` – blog posts, generated into `src/` and `src-en/`
  - `customers-data.js` – the customer list

## Rebuilding after a change

The header, menu and footer are defined only in `build/build.js`. Edit the page content in `build/src*` and then run:

```sh
node build/blog-gen.js    # only if the blog changed
node build/build.js web
```

Changes to `styles.css`, `script.js` or `a11y.js` in `web/` don't need a rebuild.

Design & development: [OMBee](https://ombee.co.il)
