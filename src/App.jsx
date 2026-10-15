import blueprintLogo from "./assets/blueprint-webstudio-logo.png";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, BadgeCheck, CheckCircle2, Clock, MapPin, Menu, Minus, Phone, Plus, X } from "lucide-react";
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
// HEADER
// -----------------------------------------------------------------------------

function BrandMark() {
  const Icon = SITE.BRAND.icon;
  return <span className="brand-mark" aria-hidden="true"><Icon strokeWidth={2} /></span>;
}

function Brand({ onClick }) {
  return (
    <a className="brand" href="#home" onClick={onClick} aria-label={`${COMPANY} home`}>
      <BrandMark />
      <span className="brand-text"><strong>{SITE.BRAND.name}</strong><small>{SITE.BRAND.sub}</small></span>
    </a>
  );
}

function navItems() {
  return [
    ["#services", "Services"],
    SITE.FEATURE && [`#${SITE.FEATURE.id}`, SITE.FEATURE.nav],
    ["#about", SITE.ABOUT.nav || "About"],
    ["#reviews", "Reviews"],
    ["#visit", SITE.VISIT.nav || "Visit"],
  ].filter(Boolean);
}

function SiteHeader() {
  const [menu, setMenu] = useState(false);
  const closeMenu = () => setMenu(false);

  return (
    <div className="sticky-header">
      <div className="announce">
        <div className="container announce-inner">
          <span>{SITE.ANNOUNCE}</span>
          <a href={`tel:${PHONE}`}><Phone size={13} /> {PHONE_DISPLAY}</a>
        </div>
      </div>
      <header className="header">
        <div className="container nav">
          <Brand onClick={closeMenu} />
          <nav className={menu ? "links open" : "links"} aria-label="Main navigation">
            {navItems().map(([href, label]) => <a key={href} href={href} onClick={closeMenu}>{label}</a>)}
            <a className="links-cta" href="#book" onClick={closeMenu}>{SITE.BOOK.nav}</a>
          </nav>
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
      <div className="hero-grid" aria-hidden="true" />
      <div className="container hero-inner">
        <div className="hero-copy">
          <span className="eyebrow light">{HERO.eyebrow}</span>
          <h1><Title parts={HERO.title} /></h1>
          <p>{HERO.text}</p>
          <div className="hero-actions">
            <a className="btn primary" href="#book">{HERO.cta} <ArrowUpRight size={19} /></a>
            <a className="btn ghost" href={`tel:${PHONE}`}><Phone size={18} /> {PHONE_DISPLAY}</a>
          </div>
        </div>
        <aside className="hero-card" aria-label="At a glance">
          {rating ? (
            <a className="hero-rating" href={rating.googleMapsUri || GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer">
              <span className="stars" aria-hidden="true">★★★★★</span>
              <strong>{rating.rating.toFixed(1)}</strong>
              <span>on Google · {rating.userRatingCount.toLocaleString()} reviews</span>
            </a>
          ) : (
            <div className="hero-rating">
              <span className="stars" aria-hidden="true">{HERO.badgeKicker}</span>
              <strong>{HERO.badgeBig}</strong>
              <span>{HERO.badgeSmall}</span>
            </div>
          )}
          <ul>
            {HERO.card.map(({ icon: Icon, title, text }) => (
              <li key={title}><Icon size={18} /><span><b>{title}</b>{text}</span></li>
            ))}
          </ul>
        </aside>
      </div>
      <div className="container stats">
        {SITE.STATS(rating).map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}
      </div>
    </section>
  );
}

function Offers() {
  if (!SITE.OFFERS?.length) return null;
  return (
    <div className="offer-strip" style={{ "--offer-cols": SITE.OFFERS.length }}>
      <div className="container">
        {SITE.OFFERS.map(([title, text]) => <article key={title}><strong>{title}</strong><span>{text}</span></article>)}
      </div>
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
            <span className="eyebrow">{SERVICES.eyebrow}</span>
            <h2><Title parts={SERVICES.title} /></h2>
          </div>
          <p>{SERVICES.text}</p>
        </div>
        <div className="services-grid">
          {SERVICES.items.map(({ title, desc, icon: Icon }, index) => (
            <article className="service-card" key={title}>
              <div className="service-top">
                <span className="service-icon"><Icon size={24} strokeWidth={1.6} /></span>
                <span className="service-num">{String(index + 1).padStart(2, "0")}</span>
              </div>
              <h3>{title}</h3>
              <p>{desc}</p>
              <a href="#book" data-service={title}>{SERVICES.cta} <ArrowRight size={15} /></a>
            </article>
          ))}
        </div>
        {SERVICES.chips && (
          <div className="chips-wrap">
            <div>
              <h3>{SERVICES.chips.title}</h3>
              {SERVICES.chips.note && <p>{SERVICES.chips.note}</p>}
            </div>
            <div className="chips">{SERVICES.chips.items.map((item) => <span key={item}>{item}</span>)}</div>
          </div>
        )}
      </div>
    </section>
  );
}

function Feature() {
  const { FEATURE } = SITE;
  if (!FEATURE) return null;
  return (
    <section className="section feature" id={FEATURE.id}>
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow light">{FEATURE.eyebrow}</span>
            <h2><Title parts={FEATURE.title} /></h2>
          </div>
          <p>{FEATURE.text}</p>
        </div>
        <div className={`feature-grid${FEATURE.cards.length === 3 ? " cols-3" : ""}`}>
          {FEATURE.cards.map(({ name, icon: Icon, tone, lead, items }) => (
            <article className="feature-card" key={name} style={tone ? { "--tone": tone } : undefined}>
              <span className="feature-icon"><Icon size={26} strokeWidth={1.5} /></span>
              <h3>{name}</h3>
              <p>{lead}</p>
              <ul>
                {items.map((item) => <li key={item}><CheckCircle2 size={15} /> {item}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  const { PROCESS } = SITE;
  return (
    <section className="section process">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">{PROCESS.eyebrow}</span>
            <h2><Title parts={PROCESS.title} /></h2>
          </div>
          <p>{PROCESS.text}</p>
        </div>
        <div className="process-grid">
          {PROCESS.steps.map(([title, description], index) => (
            <article key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  const { ABOUT } = SITE;
  return (
    <section className="section about" id="about">
      <div className="container about-inner">
        <div className="about-media" aria-hidden="true">
          <div className="about-quads">
            {ABOUT.tiles.map(({ label, icon: Icon, tone }) => (
              <span className="about-quad" key={label} style={tone ? { "--tone": tone } : undefined}><Icon size={34} strokeWidth={1.4} /><small>{label}</small></span>
            ))}
          </div>
          <div className="about-badge"><strong>{ABOUT.badge[0]}</strong><span>{ABOUT.badge[1]}</span></div>
        </div>
        <div>
          <span className="eyebrow">{ABOUT.eyebrow}</span>
          <h2><Title parts={ABOUT.title} /></h2>
          {ABOUT.text.map((paragraph) => <p className="about-lead" key={paragraph.slice(0, 24)}>{paragraph}</p>)}
          <div className="credentials">
            {ABOUT.credentials.map(({ title, desc }) => (
              <div key={title}>
                <BadgeCheck size={22} strokeWidth={1.6} />
                <span><strong>{title}</strong>{desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Reviews({ data, rating }) {
  const reviews = data?.reviews?.filter((review) => review.text?.text || review.originalText?.text) || [];
  const { REVIEWS } = SITE;
  return (
    <section className="section reviews" id="reviews">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">CUSTOMER REVIEWS</span>
            <h2>{rating ? <>Rated {rating.rating.toFixed(1)} by <em>{rating.userRatingCount.toLocaleString()} customers.</em></> : <Title parts={REVIEWS.title} />}</h2>
          </div>
          <p>{REVIEWS.text}</p>
        </div>
        <div className="reviews-summary">
          <div>
            <span className="google-wordmark">Google</span>
            {rating ? (
              <>
                <strong>{rating.rating.toFixed(1)} <span className="stars">★★★★★</span></strong>
                <span>{rating.userRatingCount.toLocaleString()} Google reviews</span>
              </>
            ) : (
              <span>See what customers say about {COMPANY} on Google.</span>
            )}
          </div>
          <div className="reviews-actions">
            <a className="btn dark" href={rating?.googleMapsUri || GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer">Read reviews on Google <ArrowUpRight size={17} /></a>
            {GOOGLE_WRITE_REVIEW_URL && <a className="btn outline" href={GOOGLE_WRITE_REVIEW_URL} target="_blank" rel="noopener noreferrer">Leave a review</a>}
          </div>
        </div>
        {reviews.length > 0 ? (
          <>
            <div className="reviews-grid">
              {reviews.slice(0, 3).map((review, i) => (
                <article className="review-card" key={`${review.publishTime || i}-${i}`}>
                  <div className="stars" aria-label={`${review.rating} out of 5 stars`}>{"★".repeat(Math.max(0, Math.min(5, Math.round(review.rating || 0))))}</div>
                  <p>{review.text?.text || review.originalText?.text}</p>
                  <footer>
                    <strong>{review.authorAttribution?.displayName || "Google reviewer"}</strong>
                    <small>{review.relativePublishTimeDescription}</small>
                  </footer>
                </article>
              ))}
            </div>
            <p className="reviews-attribution">Reviews provided by Google. A limited selection is displayed.</p>
          </>
        ) : REVIEWS.quotes?.length > 0 && (
          <>
            <div className="quotes-grid">
              {REVIEWS.quotes.map(([text, name]) => (
                <article className="quote-card" key={name}>
                  <blockquote>{text}</blockquote>
                  <footer>{name}<small>{REVIEWS.quoteSource}</small></footer>
                </article>
              ))}
            </div>
          </>
        )}
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
      {BOOK.fields.map((row, index) => (Array.isArray(row) ? <div className="book-row" key={index}>{row.map(renderField)}</div> : renderField(row)))}
      <div className="interest-honeypot" aria-hidden="true"><label>Website<input type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => update("website", e.target.value)} /></label></div>
      {message && <p className="form-error" role="alert">{message}</p>}
      <button type="submit" className="btn primary full" disabled={status === "sending"}>{status === "sending" ? "Sending…" : BOOK.submit} <ArrowUpRight size={18} /></button>
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
          <span className="eyebrow light">{BOOK.eyebrow}</span>
          <h2><Title parts={BOOK.title} /></h2>
          <p>{BOOK.text}</p>
          <ul className="book-points">
            {BOOK.points.map((point) => <li key={point}><CheckCircle2 size={18} /> {point}</li>)}
          </ul>
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
          <span className="eyebrow">{VISIT.eyebrow}</span>
          <h2><Title parts={VISIT.title} /></h2>
          <div className="visit-blocks">
            {ADDRESS && (
              <div>
                <MapPin size={20} />
                <span><small>ADDRESS</small>{ADDRESS}<br />{CITY}</span>
              </div>
            )}
            <div>
              <Phone size={20} />
              <span><small>PHONE</small><a href={`tel:${PHONE}`}>{PHONE_DISPLAY}</a>{EMAIL && <><br /><a href={`mailto:${EMAIL}`}>{EMAIL}</a></>}</span>
            </div>
            {HOURS.length > 0 && (
              <div>
                <Clock size={20} />
                <span><small>HOURS</small>
                  {HOURS.map(([day, hours]) => <span className="hours-row" key={day}><b>{day}</b>{hours}</span>)}
                </span>
              </div>
            )}
          </div>
          <a className="btn dark" href={directions} target="_blank" rel="noopener noreferrer">Get Directions <ArrowUpRight size={17} /></a>
          <p className="areas">{VISIT.areas}</p>
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
          <Brand />
          <p>{SITE.FOOTER_BLURB}</p>
          <div className="footer-social">
            {SITE.SOCIAL_LINKS.filter(({ url }) => url).map(({ name, url, icon: Icon }) => (
              <a key={name} href={url} target="_blank" rel="noopener noreferrer" aria-label={name} title={name}><Icon size={16} /></a>
            ))}
          </div>
        </div>
        <div>
          <b>Services</b>
          {SITE.SERVICES.items.slice(0, 5).map(({ title }) => <a key={title} href="#services">{title}</a>)}
        </div>
        <div>
          <b>{SITE.NOUN === "shop" ? "Shop" : "Company"}</b>
          {navItems().slice(1).map(([href, label]) => <a key={href} href={href}>{label}</a>)}
          <a href="#book">{SITE.BOOK.nav}</a>
        </div>
        <div>
          <b>Contact</b>
          <a href={`tel:${PHONE}`}>{PHONE_DISPLAY}</a>
          {EMAIL && <a href={`mailto:${EMAIL}`}>{EMAIL}</a>}
          {ADDRESS && <span>{ADDRESS}</span>}
          {ADDRESS && <span>{CITY}</span>}
          {SITE.HOURS_SHORT && <span>{SITE.HOURS_SHORT}</span>}
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
        <Offers />
        <Services />
        <Feature />
        <Process />
        <About />
        <Reviews data={reviewData} rating={rating} />
        <Book />
        <Visit />
      </main>
      <Footer />
    </>
  );
}
