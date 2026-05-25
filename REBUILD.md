# Willow & Rosé — Rebuild Brief

A single-file luxury picnic website. Use this document to **rebuild a sister site** for another picnic / event-styling brand, or to onboard a new developer onto this codebase.

---

## 1. Brand snapshot

| | |
|---|---|
| Name | Willow & Rosé |
| Service | Bespoke luxury picnic experiences |
| Location | Katy & Houston, Texas |
| Contact | bookings@willowandroseco.com · 832-263-8293 |
| Socials | @willowandrose.co |
| Voice | Feminine-luxe. Em-dashes, occasional ♥. Italicised accent words ("*Curated* Moments", "*Your Occasion*"). Never salesy. |

---

## 2. Stack & hosting

- **Single static `index.html`** — no build step, no framework, no npm.
- **Hosted on Vercel** (free tier). Connect the repo → import → deploy. No env vars, no functions.
- **Content layer** — Google Sheets, fetched on page load via the free `opensheet.elk.sh` JSON proxy. Owner edits the sheet; site updates within ~60s.
- **Form layer** — one Vercel serverless function at [api/inquiry.js](api/inquiry.js) that posts to Gmail SMTP via [nodemailer](https://www.nodemailer.com). Credentials live in env vars (`GMAIL_USER`, `GMAIL_APP_PASSWORD`, optional `NOTIFY_TO`) — set them in Vercel Dashboard → Settings → Environment Variables, and locally in `.env.local` (gitignored). Requires a Gmail App Password ([generate here](https://myaccount.google.com/apppasswords)) — Google requires 2-Step Verification first.
- **Images** — committed to `/images/portfolio/`. Owner may override by pasting an external image URL into the Sheet's `image_url` column.
- **Fonts** — Google Fonts CDN: Playfair Display, Cormorant Garamond, Jost.

---

## 3. Design tokens

All defined as CSS variables on `:root` at the top of [index.html](index.html). Lift these wholesale into a sister site, then re-key for the new brand.

### Color

```
Forest greens (text + dark sections):
  --f1: #1C2E22   /* deepest — body text, dark hero, dark addon section */
  --f2: #2E4835
  --f3: #3D5A44
  --f4: #5A7A62
  --f5: #8AAA90
  --f6: #B5C8BA
  --fp: #EDF2EE   /* palest forest tint */

Blush pinks (accent + CTA):
  --b1: #C4849A   /* primary CTA, eyebrow accents */
  --b2: #D4A0B4
  --b3: #EDB5C4   /* italic accent text on dark bgs */
  --b4: #F5D4E0
  --bp: #FDF0F4

Ivories (page bg + cards):
  --iv:  #FDFAF5   /* body bg */
  --iv2: #F8F3EC   /* alt section bg */
  --iv3: #EDE4D8   /* borders */
  --iv4: #C9BAA8

Gold (stars + accents):
  --gd:  #C4A060
  --gd2: #D4B483
```

### Typography

```
--sr  : 'Playfair Display'      — display serif, all h1/h2 + price numbers
--sr2 : 'Cormorant Garamond'    — italic accent serif (subheadings, quotes)
--sn  : 'Jost'                  — body sans (300 weight default)
```

Headings are 400 weight (never bold). Italic words inside headings use `<em>` and pick up the blush accent color. Eyebrows are tiny uppercase, `letter-spacing: 0.3em`, blush-colored.

### Spacing & layout

- Section padding: `6rem 3.5rem` (desktop), `4rem 1.5rem` (mobile).
- Content max-width: `1100px` inside sections.
- Breakpoints: `768px` (tablet/mobile), `480px` (small phone).
- Card shadows: hover-only, `0 12px 40px rgba(28,46,34,0.09)` and `transform: translateY(-4px)`.

---

## 4. Page structure

In document order:

1. **Mobile menu overlay** (`.nav-mobile-menu`) — hidden by default, full-screen on hamburger tap.
2. **Nav** (`<nav>`) — transparent over hero, fades to ivory + shadow once scrolled past 60px. Logo is `images/logo.png` (transparent PNG, gold-on-transparent wreath) sized at 130px desktop / 72px tablet / 64px small-phone.
3. **Hero** — full-viewport, layered gradient background (forest greens with subtle blush radial), centered headline with italic accent, two CTAs, and a 4-up stats strip pinned to the bottom.
4. **How We Help** — 6-card grid on `--iv2` background, emoji icons.
5. **Packages** — 3-up pricing grid; middle card is `.pkg.featured` with "Most Popular" ribbon and a thicker border. Cards have a gradient header strip + body with features, price, and CTA.
6. **Gallery mosaic** — 4-column grid, asymmetric (one tall cell, one wide cell). Gradient fallbacks via `.gc1`–`.gc6` if no image URL.
7. **Add-ons** — 2-up grid on **dark forest** background (`--f1`), light text. Each card has a circular icon and tags.
8. **CTA banner** — full-bleed blush gradient with a single white button.
9. **Testimonials** — 3-up cards on `--iv2`, plus a featured quote on dark forest and a 4-up counter strip.
10. **Booking form** — split 50/50: dark forest image panel left (with contact info), ivory form panel right.
11. **Footer** — dark forest top section with 4 columns, slimmer dark bottom strip with copyright + social links.

Mobile collapses every grid to single column, stacks the booking split, and reflows the hero stats into 2×2.

---

## 5. Dynamic content contract

The Google Sheet has **three tabs**. Tab names and column headers must match exactly:

### Tab: `Packages`
| Column | Type | Notes |
|---|---|---|
| name | text | "The Intimate" |
| for | text | "For 2 guests" |
| desc | text | One-line tagline |
| features | text | Bullets separated by `|` (pipe) |
| price | text | "$150" |
| price_note | text | "/ experience" |
| featured | text | `yes` / `no` — the featured row becomes the "Most Popular" card |
| icon | text | One emoji |

### Tab: `Addons`
| Column | Notes |
|---|---|
| name, price, desc, tags, icon | `tags` is pipe-separated. Add-ons here also auto-populate the form's checkbox list. |

### Tab: `Portfolio`
| Column | Notes |
|---|---|
| caption | Overlay text |
| image_url | Either `/images/portfolio/1.jpg` (local) or an external URL |
| size | `tall`, `wide`, or empty for default square cell |

The full canonical seed lives in [content.json](content.json) — paste it into the Sheet when setting up a new site.

---

## 6. Integrations setup checklist

When rebuilding for a new client, in this order:

1. Duplicate this repo, swap brand strings (name, contact, location, logo file).
2. Re-key the CSS variables (`:root`) to the new brand's palette — keep the structure identical.
3. Create the client's Google Sheet from `content.json`. Share read-only by link. Note the sheet ID.
4. On the client's Google Workspace account: enable 2-Step Verification, then generate an App Password at [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords). Set the three env vars (`GMAIL_USER`, `GMAIL_APP_PASSWORD`, `NOTIFY_TO`) in Vercel Dashboard → Settings → Environment Variables for Production + Preview.
5. In `index.html`, replace one string:
   - `REPLACE_WITH_GOOGLE_SHEET_ID`
6. Drop the new logo at `images/logo.png` (transparent PNG preferred) and the hero photo at `images/hero-bg.png`.
7. Drop 6 portfolio photos at `/images/portfolio/1.jpg`–`6.jpg` per the sizing in that folder's README.
8. Push to GitHub → import on Vercel → deploy. Add the custom domain.

---

## 7. Rebuild prompt (paste-ready)

Use this prompt to scaffold a sister brand:

> Rebuild the Willow & Rosé luxury picnic site for **{NEW BRAND}**, based in **{CITY}**, contact **{EMAIL}** / **{PHONE}**. Keep the entire layout, component structure, typography, and Google Sheets + Web3Forms integrations identical. Only change:
> 1. Brand name and contact strings throughout.
> 2. The `:root` color palette — new accent color is **{HEX}**, replacing the blush pink scale (`--b1` through `--bp`).
> 3. Logo file at `images/logo.png` (transparent PNG) and hero photo at `images/hero-bg.png`.
> 4. Hero headline copy and the three package names/prices.
> 5. The 6 portfolio image slots.
>
> Keep the forest green text scale, ivory background scale, gold accent, and all three typefaces. Keep the "Most Popular" featured package pattern in the middle. Keep the dark add-ons section, the blush CTA banner, and the split-image booking form.

---

## 8. Known quirks

- The logo sits on a small ivory pill so it reads against both the dark transparent hero nav and the ivory scrolled nav. If a client provides a logo with a transparent background (PNG), you can drop the `background` / `padding` / `box-shadow` from `.nav-logo img` and use a `filter: brightness(0) invert(1)` trick on the hero state instead.
- `opensheet.elk.sh` caches sheet responses for ~30–60s. Owner edits take up to a minute to appear live.
- Web3Forms requires the first inquiry to be **verified by the owner** clicking a link in the activation email. After that, submissions are silent and unlimited.
- The site renders defaults from HTML first, then overrides with sheet data once it loads. This means SEO and first-paint are fast even though the sheet is the source of truth.
