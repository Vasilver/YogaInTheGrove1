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
/css/site.css         NEW shared design: tokens + building blocks for every page (section 3)
/js/site.js           NEW shared behavior: header, menu, dropdown, join dialog, forms, lightbox, map embeds
/css/global.css       OLD design system — not used by redesigned pages (see section 3)
/css/<page>.css       OLD page styles — not used by redesigned pages
/js/events-data.js    SINGLE SOURCE for all classes and events (calendar + homepage)
/img/, /photos/       images
/videos/              video files
/_template.html       OLD page template — don't use; new pages start from index.html
/sitemap.xml          must list every public page (see 5.8)
/components/nav.html  OUTDATED — do not copy from it (see below)
```

**Navigation:** there is no shared include. Every page contains its own copy of the header, nav, join dialog and footer. When any of these change, update **every page** in the same commit. The reference is always `index.html` on `redesign`, never `components/nav.html`.

**Schedule changes:** edit only `js/events-data.js`. Never hard-code dates or class times in page HTML.

---

## 3. Design system

**The homepage `index.html` on `redesign` is the signed-off design (4 Nov 2026) and the reference for every other page.** When in doubt, copy how the homepage does it. Do not use `css/global.css`, `css/<page>.css` or `_template.html` — they belong to the old design.

### 3.1 Where the styles and scripts live

- **`css/site.css`** holds everything shared: tokens, base, header, nav dropdown, buttons, links, sections, cards, FAQ, closing, footer, join dialog, lightbox and the inner-page blocks (3.4). Every page links it.
- **`js/site.js`** holds the shared behavior: header on scroll, mobile menu, community dropdown, scroll reveal, join dialog, Formspree forms, lightbox, click-to-load embeds. Every page loads it with `<script src="js/site.js" defer>` (from `/blog/` use `../`).
- Page-specific styles stay in a small `<style>` block in that page's `<head>`, page-specific scripts in a small inline `<script>` (e.g. the homepage hero and filters).
- A new shared look or behavior goes into `site.css` / `site.js`, never copied into single pages. These two files affect every page — tell the other person before changing them.

### 3.2 Tokens (CSS variables on `:root`)

Always use these variables. Never hard-code a color or font size.

| Variable | Value | Use |
|---|---|---|
| `--ivory` | #F8F4EC | page background |
| `--paper` | #FAF6EE | cards, raised surfaces, dialogs |
| `--beige` | #E8DCC4 | warm sections (community), footer |
| `--mist` | #E6ECDF | pale sage sections (what's happening) |
| `--moss` | #6F8A69 | buttons, food section, accents |
| `--olive` | #4E5C4B | button hover, emphasis in headings |
| `--sage` | #A8BFA1 | link underlines, hover borders, Om mark |
| `--clay` | #C57B57 | Om symbol, kirtan accents, FAQ "+", focus ring |
| `--flame` | #D8C3A5 | soft sand tile background |
| `--ink` | #353A30 | main text |
| `--ink-soft` | #5E6457 | secondary text |
| `--line` | #DDD2BC | borders, dividers |
| `--on-olive` | #F4EEE2 | text on moss/olive |
| `--radius` | 14px | cards, images, dialogs |
| `--step--1` … `--step-4` | .875rem → clamp(2.5rem,7vw,5rem) | type scale |

### 3.3 Typography

- Headings (H1–H3): **Cormorant Garamond**, weight 400, *italic*, line-height 1.08. The second half of a heading is often wrapped in `<em>` in `--olive` ("Come for the practice. *Stay for the people.*").
- Body: **Jost** weight 300, 1.0625rem, line-height 1.7. Bold labels use weight 500–600.
- Om symbol ॐ: font "Tiro Devanagari Sanskrit" (loaded only for that one character), color `--clay`, `aria-hidden="true"`. Used in the logo, footer and as a large faded mark in the closing section.
- Eyebrows above section headings: small, lowercase, letter-spaced (`.eyebrow`).

### 3.4 Building blocks (reuse, don't reinvent)

- **Header:** sticky, logo "ॐ Yoga in *the Grove* ॐ", nav: our story · schedule · community ▾ (our community, teachers, practice, food for life) · find us · blog. The "join us on the mat" button appears in the nav after scrolling past the hero. Mobile: "menu" pill button.
- **Buttons:** `.btn` = moss pill with arrow → that slides on hover; `.btn.small`, `.btn.ghost`. Text links: `.link` (moss, sage underline).
- **Page width:** `.wrap` max 1160px, 20px side padding; reading text `.narrow` (max 64ch).
- **Sections:** `section` with generous vertical padding; `.sec-head` = eyebrow + H2 + short intro. Alternate backgrounds down the page: ivory → beige → mist → moss → ivory. The soft moving "window light" stripes are used on beige/ivory sections.
- **Cards:** `.g` (paper, line border, radius, lifts on hover) with `.when` label, H3, short text, `.tag`. Filter chips: `.filters` buttons with `aria-pressed`.
- **Practice cards:** `<details class="practice">` with image, roman numeral (i. ii. iii.), H3, short line, "+" that rotates when open.
- **Photo tiles:** `<figure class="tile">` with `.tile-open` button that opens the lightbox; italic caption; photo credit "Photos: Erik Jimenez Photography" where his photos are used.
- **FAQ:** `.faq` with `<details><summary>` question + answer paragraph, plus a matching `FAQPage` JSON-LD block.
- **Closing:** big italic H2, join button, address + opening hours, faded Om mark.
- **Join dialog:** every page includes the same `#joinDialog` (Formspree form, see 5.7) opened by any `[data-open-join]` button.
- **Footer:** beige, Om + name + address, clickable phone + email (`.foot-contact`), footer nav incl. instagram and facebook.

Inner pages (see `about.html`, `contact.html`, `blog.html` as examples):

- **Page hero:** `.page-hero` = light version (ivory + window light). `.page-hero.photo` = photo version: first child `<img class="ph-bg">` (real `<img>` with alt text), darker shade at the bottom, text bottom-left. Eyebrow + H1 + `.lede`, optional `.ph-actions`.
- **Text on photos must be easy to read:** eyebrow white, weight 500, uppercase; lede white, weight 400; strong shade + text shadow. Never thin or semi-transparent text on a photo.
- **Current page in the nav:** add `aria-current="page"` to the page's own nav link.
- **Split:** `.split` (text + photo side by side, `.flip` swaps sides). **Prose:** `.prose` reading column. **Callout:** `.callout` big italic quote band (beige).
- **Info cards:** `.info` + `.card` (address, hours as `<dl class="hours-list">`, contact). **Steps:** `ol.steps` (roman numerals).
- **Click-to-load embeds:** `.embed[data-src]` with a `[data-load]` button for Google Maps / Street View, so nothing loads until the visitor asks for it.
- **Forms outside the dialog:** `.form-card` + `form.join-form[data-formspree][data-done="<id of success box>"]`, success box `.form-done` with `hidden`.
- **Article cards:** `.posts` + `a.post` (image, `.meta`, title, excerpt, "read the guide →").
- **One CTA per page end:** the closing section is the page's call to action. Don't stack a second CTA band right above it; adapt the closing's eyebrow and text instead (see `blog.html`).
- Backgrounds: `.bg-mist`, `.bg-beige`, `.bg-paper`; window light on any section with `.light`.

### 3.5 Motion and accessibility

- Gentle motion only: sections rise in on scroll, hero text fades in, hover lifts. Everything must switch off under `prefers-reduced-motion: reduce` (the homepage already does this — keep that block).
- Visible focus ring (`--clay`), skip link, `aria-*` on menu, dropdown and dialogs as on the homepage.

### 3.6 General

- Mobile first: every page must work at 390 px width.
- Tone of voice: warm, calm, inviting, lowercase nav labels and eyebrows. Keep it.
- After the design changes in a way that affects all pages, update this section in the same commit.

---

## 4. How we work (two people, two Claude chats)

**During the relaunch:** all new work goes **directly onto the branch `redesign`**. `main` is the live site and stays untouched until the relaunch is finished and `redesign` is merged into `main` (that merge is the launch).

1. Always pull the latest `redesign` before you start, and push as soon as a page or change is done.
2. Commit straight to `redesign` — no feature branches or pull requests needed during the relaunch.
3. **Never commit or push to `main`.** Only the launch merge touches `main`, and only when both of us have agreed.
4. Split work by page and agree who does which. Never work on the same page at the same time. Changes to shared parts (header, nav, footer, join dialog, `css/site.css`) are announced to the other person first, because they touch every page.
5. Commit messages: `type(scope): description` — e.g. `feat(teachers): rebuild page in new design`, `fix(seo): add H1 to teachers page`. Say in the message or the chat who it was (Anna / Anne), since we share one GitHub account.
6. Never commit passwords, API keys or personal data of students (form submissions, emails, phone numbers).
7. Don't leave helper files in the repo (screenshots, fonts, test pages). The repo is the website.

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
- No placeholder text on a live page — no `[Teacher Name]`, "Lorem ipsum", "TBD". If content is missing, leave the section out and tell the person you're working with what's missing.
- No invented testimonials or reviews. Only real quotes, with the person's consent.

### 5.4 Images

- Content images (people, food, studio) use `<img>`, **not** CSS `background-image` — otherwise they have no alt text and don't appear in Google Images. CSS backgrounds only for purely decorative textures.
- **Alt text on every `<img>`:**
  - Describe what is visible + context: `alt="Vishal Das leading a hatha yoga class at Yoga in the Grove"`.
  - Include the location only where natural. Max ~125 characters.
  - Decorative images: `alt=""`.
  - **Don't guess.** If you can't tell who or what is in the photo, write `alt="TODO: describe"` and tell the person you're working with.
- File names: lowercase, hyphens, descriptive — `vishal-das-hatha-class.webp`, not `1000029697.jpg` or `kirtan.jpg.png`.
- Format: WebP (keep a JPG fallback only if needed). Max 1920 px wide. **Target under 200 KB**, hero image under 300 KB.
- Always set `width` and `height` attributes (prevents layout shift).
- `loading="lazy"` on every image below the first screen. The hero image gets `fetchpriority="high"` and no lazy loading.

### 5.5 Structured data (JSON-LD)

- **Site-wide:** one `LocalBusiness` block (type `ExerciseGym`) in every page's `<head>`, with the exact NAP data from section 5.6 (incl. `email`). Remove `servesCuisine` and `HealthAndBeautyBusiness`. `YogaStudio` is not a schema.org type — don't use it.
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
- The homepage join form only really sends on yogainthegrove.org. In any preview it shows the success message without sending. Keep that behavior on all pages, and do the real test-send after launch.
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

## 6. Definition of done — check before every push

- [ ] One H1, logical H2/H3 order
- [ ] Title ≤ 60 characters, description 120–155 characters, both unique
- [ ] Canonical, OG tags (page-specific image), favicon links present
- [ ] Every `<img>` has alt text (or `alt=""` if decorative); no `TODO` left unless flagged to the other person
- [ ] Images WebP, < 200 KB, width/height set, lazy-loaded below the fold
- [ ] JSON-LD valid (Rich Results Test), NAP matches section 5.6
- [ ] No placeholder text
- [ ] Forms actually submit to Formspree
- [ ] Header, nav, join dialog and footer identical to `index.html`
- [ ] Uses the tokens and building blocks from section 3, no old `global.css`
- [ ] `sitemap.xml` updated if pages were added/removed
- [ ] Checked on mobile (390 px) and desktop
- [ ] Anything that still needs client input is listed in the chat / to-do list

---

## 7. Rules for Claude

1. Read the files you change completely before editing.
2. Follow this file. If a request conflicts with it, point that out instead of silently breaking a rule.
3. Do only what was asked. No extra features, libraries or pages.
4. Never invent facts about the studio (names, times, prices, quotes). Ask, or mark as TODO.
5. Keep diffs small: one logical change per commit.
6. When a new convention is agreed, update this file in the same commit.

---

*Last updated: 2026-11-04 — shared `css/site.css` + `js/site.js`, inner-page building blocks (Our Story, Find Us, Blog).*
