import { AlertTriangle, Droplets, Facebook, Gauge, Volume2 } from "lucide-react";
import logo from "./assets/wizard-logo.png";
import logoWhite from "./assets/wizard-logo-white.png";
import atraSeal from "./assets/atra-golden-rule-seal.png";
import bbbBadge from "./assets/bbb-a-plus.png";

const COMPANY = "Wizard Transmission";
const MAPS_QUERY = "Wizard Transmission, 2271 W Evans Ave, Denver, CO 80223";
// The current site says 1994 in three places (banner, About timeline, repair page) and
// 1995 in one (home-page story). We use 1994; the owner must confirm.
const FOUNDED = 1994;
const YEARS = new Date().getFullYear() - FOUNDED;

export default {
  COMPANY,
  ABBR: "wt",
  NOUN: "shop",
  PHONE: "3037338494",
  PHONE_DISPLAY: "(303) 733-8494",
  EMAIL: "",
  ADDRESS: "2271 W Evans Ave",
  CITY: "Denver, CO 80223",
  MAPS_QUERY,
  FOUNDED,
  YEARS,
  GOOGLE_PLACE_ID: "",
  // Shown until live Google data loads. From our lead research on 2026-10-14; confirm before launch.
  FALLBACK_RATING: { rating: 4.8, userRatingCount: 217 },
  END_DATE: "2026-11-20T23:59:59-07:00",

  BRAND: { name: "Wizard", logo, logoWhite, logoAlt: "Wizard Transmission" },
  TOPBAR: `Family owned since ${FOUNDED}`,
  HOURS: [["Monday – Friday", "7:00am – 5:00pm"], ["Saturday", "Closed"], ["Sunday", "Closed"]],
  HOURS_SHORT: "Mon–Fri 7am–5pm",

  HERO: {
    eyebrow: `2271 W EVANS AVE · DENVER · SINCE ${FOUNDED}`,
    title: ["Denver's transmission ", "wizards."],
    text: "Automatic, manual, differential and 4x4 repair from a family-owned shop. ATRA-certified technicians, honest estimates, and a 3-year / 36,000-mile warranty on every rebuild.",
    cta: "Book a Free Inspection",
    coupon: {
      kicker: "ALWAYS FREE",
      big: "27-point",
      title: "inspection + diagnostic scan",
      text: "A 3–4 hour drivetrain check before anyone talks about price.",
    },
  },

  MAKES: ["Ford", "Chevrolet", "GMC", "Jeep", "Dodge", "Chrysler", "Honda", "Acura", "Nissan", "Lexus", "Audi", "BMW", "Cadillac", "Jaguar", "Hyundai", "Diesels", "RVs & motorhomes"],

  SERVICES: {
    eyebrow: "WHAT WE FIX",
    title: ["Pick a gear. ", "We know them all."],
    text: "Specialists, not generalists: a few services, done on every make and model, foreign and domestic.",
    main: [
      {
        gear: "1",
        title: "Transmission Repair",
        photo: "/photos/automatic.webp",
        alt: "Cutaway of an automatic transmission's gear sets",
        desc: "Automatic and manual, from a quick repair to a complete rebuild.",
        bullets: ["Complete rebuilds with OEM parts", "Manual rebuilds: shafts, gears, synchros, bearings", "Cooler flush, the weak spot in many designs"],
        warranty: "3 yr / 36,000 mi",
      },
      {
        gear: "2",
        title: "Differential Repair",
        photo: "/photos/differential.webp",
        alt: "Close-up of a differential's spider gears and carrier",
        desc: "Accurate diagnosis at no charge, then the fix it actually needs.",
        bullets: ["Soft overhaul: bearings, shims, axle seals", "Complete overhaul: ring and pinion", "Re-gearing for oversized tires"],
        warranty: "2 yr / 24,000 mi",
      },
      {
        gear: "3",
        title: "4x4 & AWD",
        photo: "/photos/offroad-4x4.webp",
        alt: "A pickup truck climbing a rocky mountain trail",
        desc: "Four-wheel drive, all-wheel drive and transfer cases, built for Colorado.",
        bullets: ["Transfer case service and repair", "Locking hub service", "Leak checks and lubrication"],
        warranty: "2 yr / 24,000 mi",
      },
    ],
    more: [
      { gear: "4", title: "Custom Rebuilds", desc: "Built to spec for towing and high-performance vehicles, with auxiliary cooling to beat heat." },
      { gear: "5", title: "RVs, Motorhomes & Diesels", desc: "Two buildings, five bays and a 30,000 lb lift for RVs, motorhomes and heavy vehicles." },
      { gear: "R", title: "Fluid & Filter Service", desc: "Fresh fluid before winter. Rocking out of a snowbank is hard on a transmission." },
    ],
  },

  GUARANTEE: {
    eyebrow: "THE WIZARD GUARANTEE",
    title: ["Backed in writing. ", "Serviced for life."],
    text: "Every rebuild leaves with a warranty and free annual service for as long as you own the vehicle.",
    terms: [
      ["3 yr / 36,000 mi", "Warranty on transmission rebuilds"],
      ["2 yr / 24,000 mi", "Warranty on differential, 4x4 and AWD rebuilds"],
      ["Free for life", "Annual service while you own the vehicle"],
      ["Free towing", "In most cases within the Denver metro"],
    ],
    badges: [
      { img: atraSeal, alt: "ATRA member, Golden Rule Warranty, nationwide", title: "ATRA Golden Rule Warranty", text: "Member · honored nationwide" },
      { img: bbbBadge, alt: "BBB Accredited Business, A+ rating", title: "BBB A+ Rating", text: "Accredited Business", url: "https://www.bbb.org/denver/business-reviews/transmissions-automobile/wizard-transmission-in-denver-co-42684" },
    ],
    certified: { title: "ATRA-certified technicians", text: "Automatic Transmission Rebuilders Association certification: more intensive than most." },
  },

  SIGNS: {
    eyebrow: "KNOW THE WARNING SIGNS",
    title: ["Feel it, hear it, smell it? ", "Bring it in."],
    text: "Drivetrain problems don't fix themselves, and caught early, a repair can save a rebuild.",
    cards: [
      { name: "Shifting", icon: Gauge, items: ["Slipping or erratic shifts", "Harsh engagement from park into gear", "Won't engage, or stuck in 4WD"] },
      { name: "Noises", icon: Volume2, items: ["Grinding, shaking or engine racing", "Whining or howling when accelerating", "Clunk or whistle near the axle"] },
      { name: "Leaks & smells", icon: Droplets, items: ["Reddish fluid under the car", "A sweet burning smell", "Low or dark fluid"] },
      { name: "Dash lights", icon: AlertTriangle, items: ["Check engine light", "Overdrive light stuck on or flashing", "Transmission temperature or 4WD light"] },
    ],
  },

  ABOUT: {
    eyebrow: "OUR STORY",
    title: ["Named by Mom. ", "Earned in the shop."],
    photo: { src: "/photos/wizard-family.webp", alt: "The Wizard Transmission team in red shop shirts outside the West Evans Avenue shop" },
    text: [
      "Adam Lightfield built his first transmission at 15. When he finally opened his own shop, his mother Wanda named it: she'd always said he had magic hands, and she liked words that start with W.",
      `${YEARS} years later, Wizard is still independent and family run, with the same promise: quality repairs at fair prices, and honesty at the estimate.`,
    ],
    timeline: [
      ["Age 15", "Builds his first transmission, then trains at Wyoming Tech."],
      ["1980s", "Rebuilds in Fort Collins and Loveland, then six years with AAMCO in California."],
      ["1991", "Comes home to Colorado to manage and build at a Denver shop."],
      [String(FOUNDED), "Opens Wizard Transmission on March 1 at 1790 South Broadway."],
      ["1999", "Buys the shop on West Evans: five bays, a dedicated rebuild building and an RV lift."],
    ],
  },

  BOOK: {
    nav: "Free Inspection",
    eyebrow: "FREE 27-POINT INSPECTION",
    title: ["Something feel off? ", "Let's take a look."],
    text: "Request your free inspection and diagnostic scan. We'll call to set a time.",
    steps: [
      ["Free inspection", "27 points plus a full diagnostic scan, at no charge."],
      ["Straight answer", "What's wrong and what it really needs, explained before any work."],
      ["Built in-house", "Rebuilt in our own rebuild shop with OEM parts."],
      ["Covered", "Warranty plus free annual service while you own it."],
    ],
    submit: "Request Free Inspection",
    note: "We'll call to set up your inspection. Prefer to talk now? Call",
    fields: [
      [{ name: "name", label: "Name", required: true, autoComplete: "name" }, { name: "phone", label: "Phone", type: "tel", required: true, autoComplete: "tel" }],
      [{ name: "email", label: "Email", type: "email", autoComplete: "email" }, { name: "vehicle", label: "Vehicle", placeholder: "Year, make, model" }],
      [{ name: "service", label: "Service", type: "select", placeholder: "Choose a service…", options: ["Not sure / free inspection", "Transmission Repair", "Differential Repair", "4x4 & AWD", "Custom Rebuilds", "RVs, Motorhomes & Diesels", "Fluid & Filter Service"] }, { name: "date", label: "Preferred day", type: "date" }],
      { name: "notes", label: "What's it doing?", type: "textarea", placeholder: "Slipping, leaks, noises, warning lights, when it started…" },
    ],
  },

  VISIT: {
    eyebrow: "VISIT THE SHOP",
    title: ["Find us on ", "West Evans."],
    areas: "Serving Denver and the metro area. Free towing available in most cases within the metro.",
  },

  FOOTER_BLURB: `Family-owned transmission, differential and 4x4 specialists on West Evans Avenue in Denver since ${FOUNDED}.`,
  SOCIAL_LINKS: [
    { name: "Facebook", url: "https://www.facebook.com/134393236611884", icon: Facebook, top: true },
  ],
};
