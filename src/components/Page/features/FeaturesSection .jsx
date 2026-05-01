
import React from "react";
import "./FeaturesSection.css";
import 'remixicon/fonts/remixicon.css'

const STATS = [
  { value: "100%",     label: "Hassle free Secured Trip" },
  { value: "Endless",  label: "Pay by hour, drive limitless" },
  { value: "Delivery", label: "Anywhere, Anytime" },
];

const CATEGORIES = [
  {
    id: 1,
    title: "Top\nCategories",
    accent: false,
    dot: false,
  },
  {
    id: 2,
    title: "Become a Host",
    accent: true,
    dot: true,
  },
  {
    id: 3,
    title: "The Books Cars",
    accent: true,
    dot: true,
  },
  {
    id: 4,
    title: "The Premium Cars",
    accent: true,
    dot: true,
  },
];

export default function FeaturesSection() {
  return (
    <section className="fs-section">
      <div className="fs-inner">

        {/* ── Stats row ── */}
        <div className="fs-stats">
          {STATS.map((s, i) => (
            <div key={i} className="fs-stat">
              <span className="fs-stat__value">{s.value}</span>
              <span className="fs-stat__label">{s.label}</span>
            </div>
          ))}
        </div>

        {/* ── Category cards ── */}
        {/* grid: first col is auto (shorter), remaining 3 are equal */}
        <div className="fs-cards">
          {CATEGORIES.map(cat => (
            <div
              key={cat.id}
              className={`fs-card ${cat.accent ? "fs-card--green" : "fs-card--white"}`}
            >
              {/* Remix icon check badge — top left on green cards */}
              {cat.dot && (
                <div className="fs-card__check">
                  <i className="ri-checkbox-circle-fill" />
                </div>
              )}

              <span className="fs-card__title">
                {cat.title.split("\n").map((line, i, arr) => (
                  <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
                ))}
              </span>
            </div>
          ))}
        </div>

        {/* ── CTA line ── */}
        <div className="fs-cta">
          <p className="fs-cta__text">
            Looking for Short-term Car Rentals?
            <br />
            <span className="fs-cta__sub">
              Ridemitra's self-drive services start at&nbsp;
              <span className="fs-cta__price">₹49/hr</span>
            </span>
          </p>
        </div>

      </div>
    </section>
  );
}