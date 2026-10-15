# Wizard Transmission — Blueprint WebStudio Concept

Independent, non-official redesign concept for http://www.wizardtransmission.net/ (Denver, CO).
Preview: https://wt.blueprintwebstudio.com (noindex; the demo code lives in the Neon `demos` table).

All business content is in `src/site.js`; colors and fonts are in `src/theme.css`. `src/App.jsx` is the shared layout.

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Build

```bash
npm run build
```

## Deployment

Vercel project `wizard-transmission` (framework: Vite). Connect the repo under Vercel → Settings → Git so pushes to `main` deploy automatically.
Domain `wt.blueprintwebstudio.com` is a CNAME at Porkbun pointing to the target Vercel shows for this project.

Environment variables (all optional):

| Variable | Purpose |
|---|---|
| `VITE_CONCEPT_END_DATE` | Countdown end date in the concept widget (defaults to 2026-11-20) |
| `GOOGLE_PLACES_API_KEY`, `GOOGLE_PLACE_ID` | Live Google rating and review excerpts (`api/google-reviews.js`) |
| `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` | Request-form emails (`api/contact.js`). Without them the form shows a demo message |

The "I'm Interested" form posts to `api/demo-interest.js`, which proxies to the main studio site.

## What changed from the current site

- Real Wizard Transmission logo (from the current site's `logo.jpg`, cleaned to a transparent black version for the header and a white version for the footer); favicon from the shop's own white-on-black touch icon.
- Palette from the brand: logo black, the site's CTA red (#960000, brightened to #b3121b) and the "since 1994" banner yellow (#ffcc00), plus a warm paper neutral. Oswald / Barlow type to echo the original's condensed headings.
- New layout with Wizard's own motifs: the logo's gear-and-shooting-stars as animated line art, a shifter H-pattern (1-2-3-4-5-R) numbering the services, a yellow "free 27-point inspection" coupon in the hero, and a scrolling all-makes strip replacing the old logo-collage banner.
- Awards and credentials from the current site in their own section: ATRA Golden Rule Warranty member seal, BBB A+ Accredited Business badge (links to the shop's BBB page) and ATRA-certified technicians.
- Pulled the useful facts out of the deep pages and put them up front: 3 yr / 36,000 mi rebuild warranty, 2 yr / 24,000 mi on differential and 4x4/AWD, free annual service for life of ownership, free towing in most of the metro, RV/motorhome lift, hours (Mon–Fri 7–5).
- Warning-signs section built from the symptoms already listed on the transmission, differential and 4x4 pages.
- Founding story condensed into a short timeline (age 15 → AAMCO → 1991 → 1994 on South Broadway → 1999 West Evans).
- Fixed the conflicting dates: the title said "over 15 years", the banner and About page say 1994, and the home-page story says March 1, 1995. The concept uses 1994 (three of four mentions) and computes the years automatically.
- Removed the dead Google+ link and the stale blog/specials; switched the old `/pages/` Facebook URL to the page-ID form.
- Added an online inspection request form (the current site has no online booking), re-enabled pinch-zoom, and added descriptive alt text.
- The Google rating (4.8, 217 reviews) links to Google. No review quotes are shown because the current site has no testimonials.

## Before client presentation

- **Confirm the founding year: 1994 or 1995.** The current site says both (March 1, 1994 on the About page, March 1, 1995 / "31st birthday" on the home page).
- Confirm the Google rating and count. 4.8 / 217 is a fallback from our lead research checked 2026-10-14.
- Confirm warranty terms are current (3 yr / 36k rebuilds, 2 yr / 24k differential and 4x4/AWD, free annual service, ATRA Golden Rule nationwide) and that free towing in the metro is still offered.
- Confirm BBB accreditation and A+ rating are current (the badge is from the current site) and ATRA membership/certification.
- Confirm the free 27-point inspection, free differential diagnosis and hours (Mon–Fri 7am–5pm).
- Ask for a high-resolution or vector logo; the only one on the current site is 250×120 px.
- Get permission for the team photo, ask who is pictured, and request more shop photos; service photos are the stock images from the current site.
- Check the Facebook link (https://www.facebook.com/134393236611884) still resolves to the shop's page.
- The warning-signs list is condensed from the current site's service pages; have the shop review it.
- Add the shop's email and decide where inspection requests go.
- Keep the independent-concept disclaimer visible; do not imply this is the company's official site.
- The countdown is display-only, not access control. The subdomain is public to anyone with the URL.
