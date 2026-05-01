// ============================================================
// CitiesSection.jsx
// City grid with hover overlay + branding banner at bottom
// ============================================================

import "./CitiesSection.css";

import city1 from "../../assets/delhi.webp";
import city2 from "../../assets/city2.jpeg";
import city3 from "../../assets/city3.jpeg";
import city4 from "../../assets/city4.jpeg";
import car from "../../assets/post.png";
// import city5 from "../../assets/city5.png";

const CITIES = [
  { id: 1, name: "Delhi",    img: city1 },
  { id: 2, name: "Noida",    img: city2 },
  { id: 3, name: "Gurugram", img: city3 },
  { id: 4, name: "jhajjar",   img: city4 },
];

export default function CitiesSection() {
  return (
    <section className="cities-section">
      <div className="cities-inner">

        {/* ── Heading ── */}
        <div className="cities-heading">
          <div className="cities-heading-line cities-heading-line--left" />
          <h2 className="cities-heading-text">
            Ridemitra around all over <span>India</span>
          </h2>
          <div className="cities-heading-line cities-heading-line--right" />
        </div>

        {/* ── City cards grid ── */}
        <div className="cities-grid">
          {CITIES.map(city => (
            <div key={city.id} className="city-card">
              <img src={city.img} alt={city.name} className="city-card__img" draggable={false} />
              <div className="city-card__overlay">
                <span className="city-card__name">{city.name}</span>
              </div>
            </div>
          ))}
        </div>

        {/* ── Branding Banner ── */}
        <div className="brand-banner">

          {/* Left: headline + CTA */}
          <div className="brand-banner__left">
            <div className="brand-dot brand-dot--tl" />

            <h2 className="brand-headline">
              Pre<span className="brand-highlight">m</span>ium Cars
              <span className="brand-dot-inline" />
              <br />Affordable
              <br />Prices
            </h2>
              <button className="brand-cta">Enjoy...</button>
          </div>

          {/* Right: phone mockup */}
          <div className="brand-banner__right">
            <img src={car} alt="Phone Mockup" className="brand-phone" draggable={false} />
          </div>

        </div>
        {/* ── End Branding Banner ── */}

      </div>
    </section>
  );
}