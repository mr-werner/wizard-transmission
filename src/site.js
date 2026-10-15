import { ClipboardCheck, Cog, Droplets, Facebook, Gauge, Mountain, MapPin, Search, ShieldCheck, Sparkles, Star, Wand2, Waves, Wrench, Phone, AlertTriangle, Volume2 } from "lucide-react";

const COMPANY = "Wizard Transmission";
const MAPS_QUERY = "Wizard Transmission, 2271 W Evans Ave, Denver, CO 80223";
const FOUNDED = 1995;
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
  GOOGLE_PLACE_ID: "",
  // Shown until live Google data loads. From a third-party listing on 2026-10-14; confirm before launch.
  FALLBACK_RATING: { rating: 4.8, userRatingCount: 217 },
  END_DATE: "2026-11-20T23:59:59-07:00",

  BRAND: { name: "Wizard", sub: "TRANSMISSION · DENVER", icon: Wand2 },
  ANNOUNCE: `Family owned and operated since ${FOUNDED} · Free 27-point inspection and diagnostic scan`,

  HOURS: [], // Not listed on the current site; confirm with the shop.
  HOURS_SHORT: "",

  HERO: {
    eyebrow: `WEST EVANS AVENUE, DENVER · SINCE ${FOUNDED}`,
    title: ["Denver's honest ", "transmission specialists."],
    text: `Automatic, manual, differential and 4x4 work from a family-owned shop that has been earning Denver's trust for ${YEARS} years, starting at the estimate.`,
    cta: "Request a Free Inspection",
    card: [
      { icon: ClipboardCheck, title: "Free quality check", text: "27-point inspection and diagnostic scan" },
      { icon: MapPin, title: "2271 W Evans Ave", text: "Denver, CO 80223" },
      { icon: ShieldCheck, title: "Warranty on all work", text: "Every repair and rebuild is covered" },
    ],
  },

  STATS: (rating) => [
    [String(FOUNDED), "Family owned since"],
    [`${YEARS} yrs`, "Rebuilding transmissions"],
    [rating ? `${rating.rating.toFixed(1)} ★` : "5 ★", "Google rating"],
    ["Free", "27-point inspection"],
  ],

  SERVICES: {
    eyebrow: "WHAT WE DO",
    title: ["Transmissions are all we do. ", "So we do them right."],
    text: "Specialists, not generalists. If it shifts, spins or sends power to the wheels, we know it inside and out.",
    cta: "Request an estimate",
    items: [
      { title: "Automatic Transmissions", desc: "Diagnosis, repair and rebuilds for all makes and models.", icon: Cog },
      { title: "Manual Transmissions", desc: "Clutches, gear sets and manual gearbox repair done by hand.", icon: Gauge },
      { title: "Custom Rebuilds", desc: "Rebuilds tailored to how you drive, tow or race.", icon: Sparkles },
      { title: "Differential Repair", desc: "Whining, clunking or leaking diffs, with diagnosis at no cost.", icon: Wrench },
      { title: "4x4 & AWD", desc: "Transfer cases and drivetrains for Colorado's mountain miles.", icon: Mountain },
      { title: "Free Quality Check", desc: "A complimentary 27-point inspection and diagnostic scan.", icon: Search },
    ],
  },

  FEATURE: {
    id: "signs",
    nav: "Warning Signs",
    eyebrow: "KNOW THE WARNING SIGNS",
    title: ["Catch it early, ", "save a rebuild."],
    text: "Transmission problems rarely fix themselves. If you notice any of these, bring it in for a free check.",
    cards: [
      { name: "Slipping", icon: Gauge, lead: "Revs climb but the car doesn't.", items: ["RPMs flare between gears", "Sluggish acceleration", "Feels like it's in neutral"] },
      { name: "Rough shifts", icon: AlertTriangle, lead: "Harsh, late or delayed.", items: ["Clunk when shifting into drive", "Delay before it engages", "Hard or jerky upshifts"] },
      { name: "Leaks & smells", icon: Droplets, lead: "Fluid is the lifeblood.", items: ["Red fluid under the car", "Burning smell after driving", "Low or dark fluid"] },
      { name: "Noises & shudder", icon: Volume2, lead: "Listen to your drivetrain.", items: ["Whining or humming", "Shudder at steady speed", "Grinding in manual gears"] },
    ],
  },

  PROCESS: {
    eyebrow: "HOW IT WORKS",
    title: ["We earn your trust ", "at the estimate."],
    text: "Quality repairs at fair prices, explained before any work begins.",
    steps: [
      ["Free inspection", "27-point inspection and diagnostic scan at no charge."],
      ["Honest estimate", "We tell you what's wrong and what it really needs, repair or rebuild."],
      ["Expert repair", "Your transmission is rebuilt or repaired in-house."],
      ["Warrantied work", "Every job is backed by our warranty."],
    ],
  },

  ABOUT: {
    nav: "Our Story",
    eyebrow: "OUR STORY",
    title: ["It started in ", "a home garage."],
    text: [
      "Adam started rebuilding transmissions in his garage while working full time at another shop. With his parents' encouragement and his wife's business sense, he opened Wizard Transmission on his 31st birthday, March 1, 1995.",
      "His mother, Wanda, named the business. She'd always said he was a wizard at fixing things. More than three decades later, it's still an independent, family-owned shop focused on quality repairs at fair prices.",
    ],
    badge: [String(FOUNDED), "Opened March 1"],
    tiles: [
      { label: "Automatic", icon: Cog },
      { label: "Manual", icon: Gauge },
      { label: "Differential", icon: Wrench },
      { label: "4x4 & AWD", icon: Mountain },
    ],
    credentials: [
      { title: "Family owned", desc: "Independent and operated by the family that started it." },
      { title: "Warranty on all work", desc: "Every repair and rebuild is covered." },
      { title: "All makes and models", desc: "Cars, trucks, SUVs, 4x4 and AWD." },
      { title: "BBB listed", desc: "Find us with the Better Business Bureau in Denver." },
    ],
  },

  REVIEWS: {
    title: ["Trusted by Denver ", "drivers."],
    text: "Read what customers say about the shop on Google.",
    quoteSource: "",
    quotes: [],
  },

  BOOK: {
    nav: "Free Inspection",
    eyebrow: "FREE INSPECTION",
    title: ["Something feel off? ", "Let's take a look."],
    text: "Request a free 27-point inspection and diagnostic scan. We'll call to set a time.",
    points: ["Free 27-point inspection and scan", "Free differential diagnosis", "Warranty on all work"],
    submit: "Request Free Inspection",
    note: "We'll call to set up your inspection. Prefer to talk now? Call",
    fields: [
      [{ name: "name", label: "Name", required: true, autoComplete: "name" }, { name: "phone", label: "Phone", type: "tel", required: true, autoComplete: "tel" }],
      [{ name: "email", label: "Email", type: "email", autoComplete: "email" }, { name: "vehicle", label: "Vehicle", placeholder: "Year, make, model" }],
      [{ name: "service", label: "Service", type: "select", placeholder: "Choose a service…", options: ["Not sure / free inspection", "Automatic Transmissions", "Manual Transmissions", "Custom Rebuilds", "Differential Repair", "4x4 & AWD"] }, { name: "date", label: "Preferred day", type: "date" }],
      { name: "notes", label: "What's it doing?", type: "textarea", placeholder: "Slipping, leaks, noises, when it started…" },
    ],
  },

  VISIT: {
    nav: "Visit",
    eyebrow: "VISIT THE SHOP",
    title: ["Find us on ", "West Evans."],
    areas: "Serving Denver and the surrounding metro area.",
  },

  FOOTER_BLURB: `Family-owned transmission specialists on West Evans Avenue in Denver since ${FOUNDED}.`,
  SOCIAL_LINKS: [
    { name: "Facebook", url: "https://www.facebook.com/pages/Wizard-Transmissions/134393236611884", icon: Facebook },
    { name: "Google", url: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAPS_QUERY)}`, icon: Star },
  ],
};
