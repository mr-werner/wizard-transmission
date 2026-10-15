import blueprintLogo from "./assets/blueprint-webstudio-logo.png";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, CheckCircle2, Clock, MapPin, Menu, Minus, Phone, Plus, ShieldCheck, Star, Truck, X } from "lucide-react";
import SITE from "./site.js";

// -----------------------------------------------------------------------------
// All business content lives in src/site.js. This file only lays it out.
// -----------------------------------------------------------------------------

const { COMPANY, PHONE, PHONE_DISPLAY, EMAIL, ADDRESS, CITY, MAPS_QUERY, FOUNDED, FALLBACK_RATING } = SITE;
const GOOGLE_REVIEWS_URL = SITE.GOOGLE_PLACE_ID
  ? `https://search.google.com/local/reviews?placeid=${SITE.GOOGLE_PLACE_ID}`
  : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAPS_QUERY)}`;
const GOOGLE_WRITE_REVIEW_URL = SITE.GOOGLE_PLACE_ID ? `https://search.google.com/local/writereview?placeid=${SITE.GOOGLE_PLACE_ID}` : null;

// Public contact details for the studio — edit here, no environment variables required.
const STUDIO_PHONE = "+17205156647";
const STUDIO_EMAIL = "hello@blueprintwebstudio.com";
const STUDIO_WEBSITE = "https://blueprintwebstudio.com";
const STUDIO_SOURCE = `${SITE.ABBR}.blueprintwebstudio.com`;

const END_DATE = import.meta.env.VITE_CONCEPT_END_DATE || SITE.END_DATE;

function Title({ parts }) {
  const [plain, em] = parts;
  return <>{plain}{em && <em>{em}</em>}</>;
}

// -----------------------------------------------------------------------------
// CONCEPT COUNTDOWN + INTEREST FORM (Blueprint WebStudio)
// -----------------------------------------------------------------------------

function getRemaining() {
  const ms = Math.max(0, new Date(END_DATE).getTime() - Date.now());
  return {
    days: Math.floor(ms / 86400000),
    hours: Math.floor(ms / 3600000) % 24,
    minutes: Math.floor(ms / 60000) % 60,
    expired: ms === 0,
  };
}

function ConceptInterestModal({ onClose }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", budget: "", message: "", website: "" });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const modalRef = useRef(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const previousFocus = document.activeElement;
    modalRef.current?.focus();
    const handleEscape = (event) => { if (event.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleEscape);
      previousFocus?.focus?.();
    };
  }, [onClose]);

  function update(field, value) { setForm((prev) => ({ ...prev, [field]: value })); }

  async function submit(event) {
    event.preventDefault();
    if (status === "sending") return;
    if (form.website) { setStatus("sent"); return; }
    setStatus("sending");
    setError("");
    try {
      const response = await fetch("/api/demo-interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prospect: COMPANY,
          source: STUDIO_SOURCE,
          page: window.location.href,
          action: "Partner Program Interest",
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          budget: form.budget,
          message: form.message.trim(),
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.success) throw new Error(result.message || "Unable to send your message.");
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setError(err.message || "Please try again.");
    }
  }

  return (
    <div className="interest-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <section className="interest-modal" role="dialog" aria-modal="true" aria-labelledby="interest-title" ref={modalRef} tabIndex={-1}>
        <button type="button" className="interest-close" onClick={onClose} aria-label="Close interest form"><X size={24} /></button>
        <span className="interest-kicker">BLUEPRINT WEBSTUDIO PARTNER PROGRAM</span>
        {status === "sent" ? (
          <div className="interest-success">
            <CheckCircle2 size={44} />
            <h2 id="interest-title">Thank you for your interest.</h2>
            <p>Your message has been sent to Blueprint WebStudio. We'll follow up using the contact information you provided.</p>
            <button type="button" className="interest-submit" onClick={onClose}>Close</button>
          </div>
        ) : (
          <>
            <h2 id="interest-title">Interested in this redesign?</h2>
            <p className="interest-intro">Send a quick note and Blueprint WebStudio will follow up about launching, customizing, or taking over the site.</p>
            <form onSubmit={submit} className="interest-form">
              <label>Name <span>*</span><input value={form.name} onChange={(e) => update("name", e.target.value)} required maxLength={120} autoComplete="name" /></label>
              <label>Email <span>*</span><input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} required maxLength={254} autoComplete="email" /></label>
              <label>Phone<input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} maxLength={40} autoComplete="tel" /></label>
              <label>Budget <span>*</span>
                <select value={form.budget} onChange={(e) => update("budget", e.target.value)} required>
                  <option value="">Select a range...</option>
                  <option value="Under $1,000">Under $1,000</option>
                  <option value="$1,000–$2,500">$1,000–$2,500</option>
                  <option value="$2,500–$5,000">$2,500–$5,000</option>
                  <option value="$5,000–$10,000">$5,000–$10,000</option>
                  <option value="$10,000+">$10,000+</option>
                  <option value="Not sure yet">Not sure yet</option>
                </select>
              </label>
              <label>Message <small>(optional)</small><textarea value={form.message} onChange={(e) => update("message", e.target.value)} maxLength={3000} rows={4} placeholder="Questions, ideas, or anything you'd like us to know..." /></label>
              <div className="interest-honeypot" aria-hidden="true"><label>Website<input type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => update("website", e.target.value)} /></label></div>
              {error && <p className="interest-error" role="alert">{error}</p>}
              <button type="submit" className="interest-submit" disabled={status === "sending"}>{status === "sending" ? "Sending..." : "Send My Interest"}</button>
              <p className="interest-privacy">Your inquiry goes directly to Blueprint WebStudio, not {COMPANY}.</p>
            </form>
          </>
        )}
      </section>
    </div>
  );
}

function ConceptWidget() {
  const [remaining, setRemaining] = useState(getRemaining);
  const [collapsed, setCollapsed] = useState(() => typeof window !== "undefined" && window.innerWidth < 640);
  const [showForm, setShowForm] = useState(false);
  const closeForm = useCallback(() => setShowForm(false), []);

  useEffect(() => {
    const interval = setInterval(() => setRemaining(getRemaining()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <aside className={`concept-widget${collapsed ? " is-collapsed" : ""}`} aria-label="Independent website concept preview">
        <div className="concept-widget-head">
          <span>CONCEPT REVIEW · NOT FOR OFFICIAL USE</span>
          <button type="button" onClick={() => setCollapsed((value) => !value)} aria-label={collapsed ? "Expand concept preview" : "Collapse concept preview"} aria-expanded={!collapsed}>
            {collapsed ? <Plus size={20} /> : <Minus size={20} />}
          </button>
        </div>
        {!collapsed && (
          <div className="concept-widget-body">
            <h2>Private Client Preview</h2>
            <span className="concept-widget-label">PARTNER PROGRAM ELIGIBILITY</span>
            <p>Reserved for review</p>
            <div className="concept-widget-timer" aria-label="Time remaining for concept review">
              {remaining.expired ? <strong>Review window ended</strong> : (
                [[remaining.days, "Days"], [remaining.hours, "Hours"], [remaining.minutes, "Minutes"]].map(([value, unit]) => (
                  <span key={unit}><strong>{String(value).padStart(2, "0")}</strong> {unit}</span>
                ))
              )}
            </div>
            <button type="button" className="concept-widget-cta" onClick={() => setShowForm(true)}>I'm Interested <ArrowUpRight size={18} /></button>
            <div className="concept-widget-links">
              {STUDIO_PHONE && <a href={`tel:${STUDIO_PHONE}`}>Call</a>}
              <a href={`mailto:${STUDIO_EMAIL}`}>Email</a>
              <a href={STUDIO_WEBSITE} target="_blank" rel="noopener noreferrer">Website</a>
            </div>
          </div>
        )}
        <div className="concept-widget-footer">
          <a className="concept-widget-brand" href={STUDIO_WEBSITE} target="_blank" rel="noopener noreferrer" aria-label="Visit Blueprint WebStudio"><span className="studio-logo-mask" style={{ WebkitMaskImage: `url(${blueprintLogo})`, maskImage: `url(${blueprintLogo})` }} aria-hidden="true" /><span>Blueprint WebStudio</span></a>
          <span>Independent concept</span>
        </div>
      </aside>
      {showForm && <ConceptInterestModal onClose={closeForm} />}
    </>
  );
}

// -----------------------------------------------------------------------------
// SIGNATURE MOTIFS: the gear-and-shooting-stars from Wizard's logo, and a
// shifter H-pattern (1-2-3-4-5-R) used to number the services.
// -----------------------------------------------------------------------------

function gearPath(cx, cy, teeth, outer, inner) {
  const step = (Math.PI * 2) / teeth;
  const pts = [];
  for (let i = 0; i < teeth; i += 1) {
    const a = i * step;
    const at = (t, r) => [cx + r * Math.cos(a + step * t), cy + r * Math.sin(a + step * t)];
    pts.push(at(0, inner), at(0.12, outer), at(0.42, outer), at(0.54, inner));
  }
  return `M${pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join("L")}Z`;
}

function StarShape({ x, y, r }) {
  const p = [];
  for (let i = 0; i < 10; i += 1) {
    const rad = i % 2 ? r * 0.45 : r;
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    p.push(`${(x + rad * Math.cos(a)).toFixed(1)},${(y + rad * Math.sin(a)).toFixed(1)}`);
  }
  return <polygon points={p.join(" ")} />;
}

function GearStars({ className = "" }) {
  return (
    <svg className={`gear-stars ${className}`} viewBox="0 0 520 520" aria-hidden="true">
      <g className="gs-trail">
        {[[70, 120, 22], [140, 70, 30], [225, 48, 24], [300, 60, 18], [92, 205, 14], [48, 290, 10], [360, 92, 12]].map(([x, y, r]) => <StarShape key={`${x}-${y}`} x={x} y={y} r={r} />)}
        <path d="M20 160 C120 90 220 60 330 70" />
        <path d="M10 210 C110 140 210 110 320 112" />
      </g>
      <g className="gs-gear">
        <path d={gearPath(300, 300, 22, 190, 166)} />
        <circle cx="300" cy="300" r="118" />
        <circle cx="300" cy="300" r="46" />
      </g>
      <g className="gs-gear small">
        <path d={gearPath(470, 455, 12, 62, 50)} />
        <circle cx="470" cy="455" r="20" />
      </g>
    </svg>
  );
}

function ShiftPattern({ active }) {
  const pos = { 1: [20, 18], 2: [20, 102], 3: [70, 18], 4: [70, 102], 5: [120, 18], R: [120, 102] };
  return (
    <svg className="shift-pattern" viewBox="0 0 140 120" aria-hidden="true">
      <path d="M20 18V102M70 18V102M120 18V102M20 60H120" />
      {Object.entries(pos).map(([g, [x, y]]) => (
        <g key={g} className={String(active) === g ? "on" : ""}>
          <circle cx={x} cy={y} r="14" />
          <text x={x} y={y + 5}>{g}</text>
        </g>
      ))}
    </svg>
  );
}

// -----------------------------------------------------------------------------
// HEADER
// -----------------------------------------------------------------------------

const NAV = [["#services", "Services"], ["#guarantee", "Warranty"], ["#signs", "Warning Signs"], ["#about", "Our Story"], ["#visit", "Visit"]];

function Brand({ light, onClick }) {
  return (
    <a className="brand" href="#home" onClick={onClick} aria-label={`${COMPANY} home`}>
      <img src={light ? SITE.BRAND.logoWhite : SITE.BRAND.logo} alt={SITE.BRAND.logoAlt} width="417" height="232" />
    </a>
  );
}

function SiteHeader() {
  const [menu, setMenu] = useState(false);
  const closeMenu = () => setMenu(false);
  return (
    <div className="sticky-header">
      <div className="topbar">
        <div className="container topbar-inner">
          <span className="topbar-note"><Star size={13} /> {SITE.TOPBAR} <i>·</i> <Clock size={13} /> {SITE.HOURS_SHORT}</span>
          <div className="topbar-contact">
            {SITE.SOCIAL_LINKS.filter(({ url, top }) => url && top).map(({ name, url, icon: Icon }) => (
              <a key={name} href={url} target="_blank" rel="noopener noreferrer" aria-label={`${COMPANY} on ${name}`} title={name}><Icon size={14} /></a>
            ))}
            <a href={`tel:${PHONE}`}><Phone size={13} /> {PHONE_DISPLAY}</a>
          </div>
        </div>
      </div>
      <header className="header">
        <div className="container nav">
          <Brand onClick={closeMenu} />
          <nav className={menu ? "links open" : "links"} aria-label="Main navigation">
            {NAV.map(([href, label]) => <a key={href} href={href} onClick={closeMenu}>{label}</a>)}
            <a className="links-cta" href="#book" onClick={closeMenu}>{SITE.BOOK.nav}</a>
          </nav>
          <a className="nav-phone" href={`tel:${PHONE}`}><small>Call the shop</small>{PHONE_DISPLAY}</a>
          <a className="nav-cta" href="#book">{SITE.BOOK.nav} <ArrowUpRight size={17} /></a>
          <button className="mobile-toggle" type="button" aria-label="Toggle navigation" aria-expanded={menu} onClick={() => setMenu((current) => !current)}>
            {menu ? <X /> : <Menu />}
          </button>
        </div>
      </header>
    </div>
  );
}

// -----------------------------------------------------------------------------
// PAGE SECTIONS
// -----------------------------------------------------------------------------

function Hero({ rating }) {
  const { HERO } = SITE;
  return (
    <section className="hero">
      <div className="hero-bg" aria-hidden="true"><img src="/photos/hero-cutaway.webp" alt="" fetchPriority="high" /></div>
      <GearStars className="hero-gear" />
      <div className="container hero-inner">
        <div className="hero-copy">
          <span className="eyebrow">{HERO.eyebrow}</span>
          <h1><Title parts={HERO.title} /></h1>
          <p>{HERO.text}</p>
          <div className="hero-actions">
            <a className="btn primary" href="#book">{HERO.cta} <ArrowUpRight size={19} /></a>
            <a className="btn ghost" href={`tel:${PHONE}`}><Phone size={18} /> {PHONE_DISPLAY}</a>
          </div>
          {rating && (
            <a className="hero-rating" href={rating.googleMapsUri || GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer">
              <strong>{rating.rating.toFixed(1)}</strong>
              <span className="stars" aria-hidden="true">★★★★★</span>
              <span>{rating.userRatingCount.toLocaleString()} Google reviews</span>
            </a>
          )}
        </div>
        <a className="coupon" href="#book" aria-label="Book a free 27-point inspection">
          <span className="coupon-kicker">{HERO.coupon.kicker}</span>
          <strong>{HERO.coupon.big}</strong>
          <b>{HERO.coupon.title}</b>
          <span className="coupon-text">{HERO.coupon.text}</span>
          <span className="coupon-cta">Claim yours <ArrowRight size={16} /></span>
          <span className="coupon-since"><small>SINCE</small>{FOUNDED}</span>
        </a>
      </div>
    </section>
  );
}

function Makes() {
  const row = SITE.MAKES.map((make) => <span key={make}>{make}<Star size={12} aria-hidden="true" /></span>);
  return (
    <div className="makes" aria-label={`Makes we work on: ${SITE.MAKES.join(", ")} and many more`}>
      <div className="makes-label">All makes &amp; models</div>
      <div className="makes-track" aria-hidden="true"><div>{row}{row}</div></div>
    </div>
  );
}

function Services() {
  const { SERVICES } = SITE;
  return (
    <section className="section services" id="services">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow red">{SERVICES.eyebrow}</span>
            <h2><Title parts={SERVICES.title} /></h2>
          </div>
          <p>{SERVICES.text}</p>
        </div>
        <div className="svc-main">
          {SERVICES.main.map((s) => (
            <article className="svc-card" key={s.title}>
              <div className="svc-photo">
                <img src={s.photo} alt={s.alt} loading="lazy" width="1024" height="450" />
                <span className="knob" aria-hidden="true">{s.gear}</span>
              </div>
              <div className="svc-body">
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <ul>{s.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
                <div className="svc-foot">
                  <span className="svc-warranty"><ShieldCheck size={15} /> {s.warranty} warranty</span>
                  <a href="#book" data-service={s.title}>Free diagnosis <ArrowRight size={15} /></a>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="svc-more">
          {SERVICES.more.map((s) => (
            <article key={s.title}>
              <ShiftPattern active={s.gear} />
              <div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Guarantee() {
  const { GUARANTEE: G } = SITE;
  return (
    <section className="section guarantee" id="guarantee">
      <GearStars className="guarantee-gear" />
      <div className="container guarantee-inner">
        <div className="guarantee-copy">
          <span className="eyebrow">{G.eyebrow}</span>
          <h2><Title parts={G.title} /></h2>
          <p>{G.text}</p>
          <dl className="terms">
            {G.terms.map(([big, small]) => <div key={big}><dt>{big}</dt><dd>{small}</dd></div>)}
          </dl>
        </div>
        <div className="awards" aria-label="Awards and credentials">
          <span className="awards-label">CREDENTIALS</span>
          {G.badges.map(({ img, alt, title, text, url }) => {
            const inner = <><span className="award-plate"><img src={img} alt={alt} loading="lazy" /></span><span><strong>{title}</strong>{text}</span></>;
            return url
              ? <a className="award" key={title} href={url} target="_blank" rel="noopener noreferrer">{inner}<ArrowUpRight size={16} className="award-go" /></a>
              : <div className="award" key={title}>{inner}</div>;
          })}
          <div className="award">
            <span className="award-plate text-plate"><b>ATRA</b><small>CERTIFIED</small></span>
            <span><strong>{G.certified.title}</strong>{G.certified.text}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Signs() {
  const { SIGNS } = SITE;
  return (
    <section className="section signs" id="signs">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">{SIGNS.eyebrow}</span>
            <h2><Title parts={SIGNS.title} /></h2>
          </div>
          <p>{SIGNS.text}</p>
        </div>
        <div className="signs-grid">
          {SIGNS.cards.map(({ name, icon: Icon, items }) => (
            <article key={name}>
              <Icon size={28} strokeWidth={1.6} />
              <h3>{name}</h3>
              <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
          ))}
        </div>
        <a className="btn primary signs-cta" href="#book">Get the free 27-point check <ArrowUpRight size={18} /></a>
      </div>
    </section>
  );
}

function About({ rating }) {
  const { ABOUT } = SITE;
  return (
    <section className="section about" id="about">
      <div className="container about-inner">
        <figure className="about-photo">
          <img src={ABOUT.photo.src} alt={ABOUT.photo.alt} decoding="async" width="1400" height="934" />
          <figcaption><strong>{FOUNDED}</strong><span>Family owned<br />&amp; operated</span></figcaption>
        </figure>
        <div className="about-copy">
          <span className="eyebrow red">{ABOUT.eyebrow}</span>
          <h2><Title parts={ABOUT.title} /></h2>
          {ABOUT.text.map((p) => <p className="about-lead" key={p.slice(0, 24)}>{p}</p>)}
        </div>
      </div>
      <div className="container">
        <ol className="timeline">
          {ABOUT.timeline.map(([year, text]) => <li key={year}><b>{year}</b><span>{text}</span></li>)}
        </ol>
      </div>
      <div className="container" id="reviews">
        <div className="reviews-band">
          <div className="reviews-score">
            <strong>{rating ? rating.rating.toFixed(1) : "★"}</strong>
            <div>
              <span className="stars" aria-hidden="true">★★★★★</span>
              <span>{rating ? `${rating.userRatingCount.toLocaleString()} reviews on Google` : "Reviews on Google"}</span>
            </div>
          </div>
          <p>Real ratings from Denver drivers. See what they say about the shop.</p>
          <div className="reviews-actions">
            <a className="btn dark" href={rating?.googleMapsUri || GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer">Read reviews on Google <ArrowUpRight size={17} /></a>
            {GOOGLE_WRITE_REVIEW_URL && <a className="btn outline" href={GOOGLE_WRITE_REVIEW_URL} target="_blank" rel="noopener noreferrer">Leave a review</a>}
          </div>
        </div>
      </div>
    </section>
  );
}

function RequestForm() {
  const { BOOK } = SITE;
  const blank = Object.fromEntries([...BOOK.fields.flat().map((field) => [field.name, ""]), ["website", ""]]);
  const [form, setForm] = useState(blank);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const pick = (event) => {
      const link = event.target.closest?.("a[data-service]");
      if (link) setForm((prev) => ({ ...prev, service: link.dataset.service }));
    };
    document.addEventListener("click", pick);
    return () => document.removeEventListener("click", pick);
  }, []);

  function update(field, value) { setForm((prev) => ({ ...prev, [field]: value })); }

  async function submit(event) {
    event.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setMessage("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.success) throw new Error(result.message || "Something went wrong.");
      setStatus(result.demo ? "demo" : "sent");
    } catch (err) {
      setStatus("error");
      setMessage(err.message);
    }
  }

  if (status === "sent" || status === "demo") {
    return (
      <div className="book-form book-done">
        <CheckCircle2 size={44} />
        <h3>{status === "demo" ? `This is where ${SITE.BRAND.name} gets your request.` : "Request received."}</h3>
        <p>
          {status === "demo"
            ? `In this concept preview, requests aren't sent anywhere. On the live site they'd land in the ${SITE.NOUN} inbox with everything ${SITE.BRAND.name} needs to call back.`
            : `Thanks, ${form.name.split(" ")[0]}. We'll be in touch to confirm.`}
        </p>
        <button type="button" className="btn dark" onClick={() => setStatus("idle")}>Back to the form</button>
      </div>
    );
  }

  const renderField = (field) => {
    const common = { value: form[field.name], onChange: (e) => update(field.name, e.target.value), required: field.required };
    let control;
    if (field.type === "select") {
      control = (
        <select {...common}>
          <option value="">{field.placeholder || "Choose…"}</option>
          {field.options.map((option) => <option key={option} value={option}>{option}</option>)}
        </select>
      );
    } else if (field.type === "textarea") {
      control = <textarea rows={4} maxLength={3000} placeholder={field.placeholder} {...common} />;
    } else {
      control = <input type={field.type || "text"} maxLength={field.type === "email" ? 254 : 160} placeholder={field.placeholder} autoComplete={field.autoComplete} {...common} />;
    }
    return <label key={field.name}>{field.label}{field.required ? " *" : ""}{control}</label>;
  };

  return (
    <form className="book-form" onSubmit={submit}>
      <div className="book-form-head"><span>Free inspection request</span><small>Takes about a minute</small></div>
      {BOOK.fields.map((row, index) => (Array.isArray(row) ? <div className="book-row" key={index}>{row.map(renderField)}</div> : renderField(row)))}
      <div className="interest-honeypot" aria-hidden="true"><label>Website<input type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => update("website", e.target.value)} /></label></div>
      {message && <p className="form-error" role="alert">{message}</p>}
      <button type="submit" className="btn red full" disabled={status === "sending"}>{status === "sending" ? "Sending…" : BOOK.submit} <ArrowUpRight size={18} /></button>
      <p className="form-note">{BOOK.note} <a href={`tel:${PHONE}`}>{PHONE_DISPLAY}</a>.</p>
    </form>
  );
}

function Book() {
  const { BOOK } = SITE;
  return (
    <section className="section book" id="book">
      <div className="container book-inner">
        <div>
          <span className="eyebrow">{BOOK.eyebrow}</span>
          <h2><Title parts={BOOK.title} /></h2>
          <p>{BOOK.text}</p>
          <ol className="book-steps">
            {BOOK.steps.map(([title, text], i) => (
              <li key={title}><span className="knob" aria-hidden="true">{i + 1}</span><span><b>{title}</b>{text}</span></li>
            ))}
          </ol>
        </div>
        <RequestForm />
      </div>
    </section>
  );
}

function Visit() {
  const { VISIT, HOURS } = SITE;
  const embed = `https://maps.google.com/maps?q=${encodeURIComponent(MAPS_QUERY)}&z=15&output=embed`;
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(MAPS_QUERY)}`;
  return (
    <section className="section visit" id="visit">
      <div className="container visit-inner">
        <div className="visit-info">
          <span className="eyebrow red">{VISIT.eyebrow}</span>
          <h2><Title parts={VISIT.title} /></h2>
          <div className="visit-blocks">
            <div>
              <MapPin size={20} />
              <span><small>ADDRESS</small>{ADDRESS}<br />{CITY}</span>
            </div>
            <div>
              <Phone size={20} />
              <span><small>PHONE</small><a href={`tel:${PHONE}`}>{PHONE_DISPLAY}</a>{EMAIL && <><br /><a href={`mailto:${EMAIL}`}>{EMAIL}</a></>}</span>
            </div>
            <div>
              <Clock size={20} />
              <span><small>HOURS</small>
                {HOURS.map(([day, hours]) => <span className="hours-row" key={day}><b>{day}</b>{hours}</span>)}
              </span>
            </div>
            <div>
              <Truck size={20} />
              <span><small>CAN'T DRIVE IT IN?</small>{VISIT.areas}</span>
            </div>
          </div>
          <a className="btn dark" href={directions} target="_blank" rel="noopener noreferrer">Get Directions <ArrowUpRight size={17} /></a>
        </div>
        <div className="visit-map">
          <iframe title={`Map to ${COMPANY}`} src={embed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-main">
        <div>
          <Brand light />
          <p>{SITE.FOOTER_BLURB}</p>
          <div className="footer-social">
            {SITE.SOCIAL_LINKS.filter(({ url }) => url).map(({ name, url, icon: Icon }) => (
              <a key={name} href={url} target="_blank" rel="noopener noreferrer" aria-label={`${COMPANY} on ${name}`} title={name}><Icon size={16} /></a>
            ))}
          </div>
        </div>
        <div>
          <b>Services</b>
          {[...SITE.SERVICES.main, ...SITE.SERVICES.more].slice(0, 5).map(({ title }) => <a key={title} href="#services">{title}</a>)}
        </div>
        <div>
          <b>Shop</b>
          {NAV.slice(1).map(([href, label]) => <a key={href} href={href}>{label}</a>)}
          <a href="#book">{SITE.BOOK.nav}</a>
        </div>
        <div>
          <b>Contact</b>
          <a href={`tel:${PHONE}`}>{PHONE_DISPLAY}</a>
          {EMAIL && <a href={`mailto:${EMAIL}`}>{EMAIL}</a>}
          <span>{ADDRESS}</span>
          <span>{CITY}</span>
          <span>{SITE.HOURS_SHORT}</span>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} {COMPANY}. Independent design concept, not an official company website.</span>
        <a className="footer-studio-brand" href={STUDIO_WEBSITE} target="_blank" rel="noopener noreferrer" aria-label="Website concept by Blueprint WebStudio">
          <span>Concept redesign by</span>
          <span className="studio-logo-mask" style={{ WebkitMaskImage: `url(${blueprintLogo})`, maskImage: `url(${blueprintLogo})` }} aria-hidden="true" />
          <strong>Blueprint WebStudio</strong>
        </a>
      </div>
    </footer>
  );
}

// -----------------------------------------------------------------------------
// APP — PAGE ORDER
// -----------------------------------------------------------------------------

export default function App() {
  const [reviewData, setReviewData] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/google-reviews", { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => { if (data) setReviewData(data); })
      .catch(() => {});
    return () => controller.abort();
  }, []);

  const live = typeof reviewData?.rating === "number" && typeof reviewData?.userRatingCount === "number";
  const rating = live
    ? { rating: reviewData.rating, userRatingCount: reviewData.userRatingCount, googleMapsUri: reviewData.googleMapsUri || null }
    : FALLBACK_RATING
      ? { rating: FALLBACK_RATING.rating, userRatingCount: FALLBACK_RATING.userRatingCount, googleMapsUri: null }
      : null;

  return (
    <>
      <ConceptWidget />
      <SiteHeader />
      <main id="home">
        <Hero rating={rating} />
        <Makes />
        <Services />
        <Guarantee />
        <Signs />
        <About rating={rating} />
        <Book />
        <Visit />
      </main>
      <Footer />
    </>
  );
}
