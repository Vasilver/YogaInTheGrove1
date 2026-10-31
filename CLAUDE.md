# CLAUDE.md — Yoga in the Grove

Rules and context for anyone (human or AI) working on yogainthegrove.org.
Claude reads this file before every task. **If a decision affects how the site is built, write it down here** — chats are not shared between team members, this file is.

Maintained by Élan Social Studios (Anna & Anne). Lines marked **[CONFIRM]** still need confirmation from the client.

---

## 1. Project facts

- **What:** Website of Yoga in the Grove, a non-profit neighborhood yoga studio (Hatha, Kirtan, Meditation, Seva, Food for Life) at 3220 Virginia Street, Coconut Grove, FL 33133.
- **Main goal of the site:** turn visitors into class bookings (calendar reservations) and inquiries.
- **Tech:** plain static HTML + CSS + vanilla JavaScript. No framework, no build step, no npm, no database.
- **Hosting:** GitHub Pages from repo `Vasilver/YogaInTheGrove1`, branch `main`, repository root. Domain via `CNAME` → yogainthegrove.org. Whatever is merged into `main` is live within minutes.
- **Forms:** Formspree (client's existing account). Known form ID: `xgolnjqv` (calendar reservation form). Other form IDs: **[CONFIRM — agency has no account access yet]**.
- **Analytics:** none for now (no GA4, no tracking scripts). Do not add any without approval.

Do not introduce frameworks, build tools, CMSs or paid services without written approval from the client.

---

## 2. Repository structure

```
/                     one .html file per page (index, about, teachers, practice,
                      calendar, community, contact, blog, foodforlife)
/blog/                blog articles, one .html file each
/css/global.css       design system: colors, fonts, spacing (see section 3)
/css/<page>.css       page-specific styles
/js/events-data.js    SINGLE SOURCE for all classes and events (calendar + homepage)
/img/, /photos/       images
/videos/              video files
/_template.html       starting point for every new page
/sitemap.xml          must list every public page (see 5.8)
/components/nav.html  OUTDATED — do not copy from it (see below)
```

**Navigation:** there is no shared include. Every page contains its own copy of the nav and footer. When the nav or footer changes, update **every page** in the same commit. Use the nav from `index.html` as the reference, not `components/nav.html`.

**Schedule changes:** edit only `js/events-data.js`. Never hard-code dates or class times in page HTML.

---

## 3. Design system

> **Being redesigned.** The values below describe the old design. The new homepage on the `redesign` branch sets the new design. Once it is signed off, this section gets updated with the new colors, fonts and spacing, and every other page follows it. Until then, ask before applying the old values to new pages.

- Use the CSS variables in `css/global.css` for all colors, fonts and sizes. Never hard-code a hex color or font size in page CSS.
- Colors: `--deep-forest` #2b2d22, `--warm-cream` #f5f0e8, `--sage` #7a8c6e, `--ochre` #c4954a, `--warm-bark` #4a3f30 (+ tints `--sage-light`, `--cream-dark`, `--ochre-muted`).
- Fonts: Cormorant Garamond (headings), Jost 300 (body).
- New pages start from `_template.html`.
- Mobile first: every change must work at 390 px width.
- Tone of voice: warm, calm, inviting, lowercase nav labels. Keep it.

---

## 4. How we work (two people, two Claude chats)

**During the relaunch:** all new work is based on the branch `redesign`, not `main`. `main` stays as the old live site until the relaunch is finished and `redesign` is merged into `main`.

1. Always start from the latest `redesign`.
2. Work on a branch: `feature/<short-name>`, `fix/<short-name>` or `claude/<short-name>`. Never commit straight to `redesign` or `main`.
3. Open a pull request into `redesign`. The **other** person reviews and merges.
4. Merge finished work quickly — don't leave branches open for days.
5. Don't edit the same page on two branches at the same time. Split work by page.
6. Commit messages: `type(scope): description` — e.g. `feat(calendar): hide past events`, `fix(seo): add H1 to teachers page`.
7. Never commit passwords, API keys or personal data of students (form submissions, emails, phone numbers).

---

## 5. SEO requirements (apply to every page)

### 5.1 `<head>` — required on every page

| Element | Rule |
|---|---|
| `<html lang="en">` | Always. |
| `<title>` | Unique. **Max 60 characters.** Pattern: `Primary Keyword in Coconut Grove, Miami \| Yoga in the Grove`. |
| `<meta name="description">` | Unique. **120–155 characters.** Mentions what the page offers, the location, and a reason to click. |
| `<link rel="canonical">` | Absolute URL of the page itself, e.g. `https://yogainthegrove.org/teachers.html`. |
| Open Graph | `og:title`, `og:description`, `og:url`, `og:type`, `og:site_name` ("Yoga in the Grove"), `og:locale` ("en_US"), `og:image`. |
| `og:image` | **Page-specific** image, 1200×630 px, under 300 KB, absolute URL. Not the same food photo on every page. |
| Favicon | `<link rel="icon" href="/favicon.ico" sizes="any">`, `<link rel="icon" href="/favicon.svg" type="image/svg+xml">`, `<link rel="apple-touch-icon" href="/apple-touch-icon.png">`. |
| `meta keywords` | Not used by Google. Don't add to new pages. |
| `meta robots` | Don't set (indexable by default). Only `noindex` on 404 and thank-you pages. |
| Fonts | `<link rel="preconnect" href="https://fonts.googleapis.com">` and `https://fonts.gstatic.com` (crossorigin) before the font stylesheet. |

### 5.2 Headings

- **Exactly one `<h1>` per page.** It contains the page's main keyword or the location. If the keyword isn't given in the task, ask before writing the H1.
- Slogans ("You don't have to be ready…") can stay as visual headlines, but then as `<p class="…">` above or below the H1 — or the H1 combines both.
- `<h2>` for page sections, `<h3>` inside sections. Never skip a level (no H2 → H4).
- Never use a heading tag just to make text big. Use a CSS class instead.

### 5.3 Content

- Primary keyword appears naturally in the first 100 words of the page.
- Mention "Coconut Grove" and/or "Miami" where it reads naturally. Never keyword-stuff.
- Every page links to the calendar (booking) at least once, with a clear call to action.
- Internal links use descriptive text ("see the class schedule"), not "click here".
- No placeholder text on a live page — no `[Teacher Name]`, "Lorem ipsum", "TBD". If content is missing, leave the section out and list it in the pull request.
- No invented testimonials or reviews. Only real quotes, with the person's consent.

### 5.4 Images

- Content images (people, food, studio) use `<img>`, **not** CSS `background-image` — otherwise they have no alt text and don't appear in Google Images. CSS backgrounds only for purely decorative textures.
- **Alt text on every `<img>`:**
  - Describe what is visible + context: `alt="Vishal Das leading a hatha yoga class at Yoga in the Grove"`.
  - Include the location only where natural. Max ~125 characters.
  - Decorative images: `alt=""`.
  - **Don't guess.** If you can't tell who or what is in the photo, write `alt="TODO: describe"` and list it in the pull request.
- File names: lowercase, hyphens, descriptive — `vishal-das-hatha-class.webp`, not `1000029697.jpg` or `kirtan.jpg.png`.
- Format: WebP (keep a JPG fallback only if needed). Max 1920 px wide. **Target under 200 KB**, hero image under 300 KB.
- Always set `width` and `height` attributes (prevents layout shift).
- `loading="lazy"` on every image below the first screen. The hero image gets `fetchpriority="high"` and no lazy loading.

### 5.5 Structured data (JSON-LD)

- **Site-wide:** one `LocalBusiness` block (type `ExerciseGym`) in every page's `<head>`, with the exact NAP data from section 5.6. Remove `servesCuisine` and `HealthAndBeautyBusiness`.
- **Calendar + homepage:** `Event` schema for upcoming classes, generated from `js/events-data.js` in the same script that renders the events (name, startDate with time zone, endDate, location, organizer, `eventAttendanceMode`, `eventStatus`, `offers` if there is a price/donation).
- **Blog articles:** `Article` schema (headline, author, datePublished, dateModified, image).
- **Optional:** `BreadcrumbList` on blog articles.
- Validate every change with Google's Rich Results Test before merging.

### 5.6 NAP — single source of truth

Name, address, phone, email and hours must be **identical** on the website, in JSON-LD, in the footer, on Google Business Profile, Yelp, Facebook and Instagram. Only change them here first, then everywhere.

| Field | Value |
|---|---|
| Name | Yoga in the Grove |
| Address | 3220 Virginia Street, Coconut Grove, FL 33133, USA |
| Phone | +1 (929) 944-2045 (Vishal Das) |
| Email | marjazz2012@gmail.com |
| Hours | Monday–Friday 7:00 am – 8:00 pm · Saturday 8:00 am – 6:00 pm · Sunday 9:00 am – 2:00 pm |
| Geo | 25.7285, -80.2406 |

JSON-LD `openingHoursSpecification` must match exactly: Mo–Fr `07:00`–`20:00`, Sa `08:00`–`18:00`, Su `09:00`–`14:00`. JSON-LD `email` and `telephone` must match the table (the current JSON-LD still says info@yogainthegrove.org and wrong hours — fix on all pages).

- Footer on every page: name, address, clickable phone (`<a href="tel:+19299442045">`), clickable email (`<a href="mailto:marjazz2012@gmail.com">`).

### 5.7 Forms (Formspree)

- Every form posts to Formspree (`action="https://formspree.io/f/<FORM_ID>"`, `method="POST"`). No form may exist that sends nothing.
- Until separate form IDs exist, all forms use the existing ID `xgolnjqv` and include a hidden field `<input type="hidden" name="form" value="contact|reservation|community">` plus a matching `_subject`, so submissions can be told apart in the inbox.
- Show the success message **only after** Formspree confirms (HTTP 200). On error, show a friendly error with the email address.
- Add a honeypot field (`_gotcha`) against spam.
- Short privacy note under every form, linking to the privacy policy **[CONFIRM — client to provide policy]**.
- Never log, copy or commit form submissions.

### 5.8 Technical

- `robots.txt` at root: allow all + `Sitemap: https://yogainthegrove.org/sitemap.xml`.
- `sitemap.xml`: add/remove pages in the same commit as the page itself. Update `<lastmod>` when a page changes meaningfully.
- `404.html` at root (GitHub Pages uses it automatically), branded, with links to home, calendar and contact.
- No duplicate pages. Redirect stubs (like `food-for-life.html`) stay out of the sitemap.
- YouTube: load embeds only on click (preview image + play button), not as 4 live iframes.
- Videos: always set a `poster` image.
- External links: `rel="noopener"` when `target="_blank"`.
- Icon-only links (Instagram, Facebook) need `aria-label`.
- Text on images must stay readable (contrast ratio ≥ 4.5:1 for body text).
- Performance targets (PageSpeed Insights, mobile): LCP < 2.5 s, CLS < 0.1, total page weight < 2 MB.

---

## 6. Definition of done — check before every pull request

- [ ] One H1, logical H2/H3 order
- [ ] Title ≤ 60 characters, description 120–155 characters, both unique
- [ ] Canonical, OG tags (page-specific image), favicon links present
- [ ] Every `<img>` has alt text (or `alt=""` if decorative); no `TODO` left unless listed in the PR
- [ ] Images WebP, < 200 KB, width/height set, lazy-loaded below the fold
- [ ] JSON-LD valid (Rich Results Test), NAP matches section 5.6
- [ ] No placeholder text
- [ ] Forms actually submit to Formspree
- [ ] Nav and footer identical on all pages
- [ ] `sitemap.xml` updated if pages were added/removed
- [ ] Checked on mobile (390 px) and desktop
- [ ] PR description lists anything that still needs client input

---

## 7. Rules for Claude

1. Read the files you change completely before editing.
2. Follow this file. If a request conflicts with it, point that out instead of silently breaking a rule.
3. Do only what was asked. No extra features, libraries or pages.
4. Never invent facts about the studio (names, times, prices, quotes). Ask, or mark as TODO.
5. Keep diffs small: one logical change per commit.
6. When a new convention is agreed, propose an update to this file in the same pull request.

---

*Last updated: 2026-10-28 — full rewrite by Élan Social Studios (replaces the empty template from 2026-02-21).*
