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

- Fixed the conflicting dates: the current site says "since 1994" in one place, March 1, 1995 in the founding story, and "over 15 years" in the title. The concept uses 1995 and computes the years automatically.
- Removed the dead Google+ link and the empty blog link; fixed the "&amp;" in the page title.
- Re-enabled pinch-zoom on phones (the current site blocks it) and added descriptive alt text.
- Added an online estimate request form (the current site is call or contact form only) and a transmission warning-signs guide.
- Tells Adam's founding story up front, since it's the shop's best trust signal.

## Before client presentation

- Confirm the founding year (1994 or 1995) and the shop's hours, which the current site doesn't list.
- Confirm the Google rating and count. 4.8 / 217 is a fallback from a third-party listing checked 2026-10-14.
- Get the warranty terms; the current site says "the best warranty in town" with no details.
- Confirm the free 27-point inspection and diagnostic scan, and free differential diagnosis, are still offered.
- The warning-signs guide is general guidance written for the concept; have the shop review it.
- Confirm the ZIP code (80223) and add the shop's email; decide where estimate requests go.
- BBB: the current site links a Denver BBB review page; confirm whether the shop is accredited before using that word.
- Replace the icon wordmark with the business's real logo, and add real photos with permission.
- Keep the independent-concept disclaimer visible; do not imply this is the company's official site.
- The countdown is display-only, not access control. The subdomain is public to anyone with the URL.
