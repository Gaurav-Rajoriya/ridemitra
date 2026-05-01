// ============================================================
// PART 5 — Highlights.jsx
// Cities across India + Testimonials + Premium Banner CTA
// ============================================================

const cities = [
  "Noida", "Delhi", "Mumbai", "Bengaluru",
  "Hyderabad", "Chennai", "Pune", "Kolkata"
];

const testimonials = [
  { name: "Rahul Sharma", city: "Delhi",  stars: 5, text: "Best self-drive experience! Super smooth booking and great cars." },
  { name: "Priya Mehta",  city: "Noida",  stars: 5, text: "Affordable prices and the car was delivered right at my doorstep!" },
  { name: "Amit Kumar",   city: "Mumbai", stars: 5, text: "RideMitra made my road trip unforgettable. Highly recommend!" },
];

function StarRating({ count }) {
  return <span style={{ color: "#f59e0b", fontSize: "14px" }}>{"★".repeat(count)}</span>;
}

function Cities() {
  return (
    <section id="cities-section" style={{ padding: "60px 24px", background: "white" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div style={{ color: "#22c55e", fontSize: "12px", fontWeight: "700", letterSpacing: "3px", marginBottom: "8px" }}>
            — NATIONWIDE —
          </div>
          <h2 style={{ color: "#0f4c35", fontFamily: "'Playfair Display', serif", fontSize: "32px", margin: 0 }}>
            Ridemitra all over India
          </h2>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center" }}>
          {cities.map((city, i) => (
            <div key={i}
              style={{
                background: "linear-gradient(135deg, #0f4c35, #1a6b4a)",
                color: "white", padding: "14px 28px", borderRadius: "50px",
                fontWeight: "600", fontSize: "14px", cursor: "pointer",
                transition: "transform 0.2s, box-shadow 0.2s",
                boxShadow: "0 4px 15px rgba(15,76,53,0.2)"
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.boxShadow = "0 8px 25px rgba(15,76,53,0.3)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)";    e.currentTarget.style.boxShadow = "0 4px 15px rgba(15,76,53,0.2)"; }}>
              📍 {city}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PremiumBanner({ onBook }) {
  return (
    <section style={{
      background: "linear-gradient(135deg, #0f4c35 0%, #166534 100%)",
      padding: "60px 24px", textAlign: "center", position: "relative", overflow: "hidden"
    }}>
      <div style={{ position: "absolute", left: "-80px", top: "-80px", width: "300px", height: "300px", background: "rgba(74,222,128,0.05)", borderRadius: "50%", pointerEvents: "none" }} />
      <div style={{ position: "relative" }}>
        <h2 style={{ color: "white", fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 5vw, 44px)", marginBottom: "8px" }}>
          Premium Cars •<br />
          <span style={{ color: "#4ade80" }}>Affordable Prices</span>
        </h2>
        <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: "28px", fontSize: "15px" }}>
          From city streets to long journeys — we've got you covered.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
          <button onClick={onBook} style={{
            background: "linear-gradient(135deg, #4ade80, #22c55e)", color: "#0f4c35",
            border: "none", padding: "14px 32px", borderRadius: "30px",
            fontWeight: "800", cursor: "pointer", fontSize: "16px", fontFamily: "inherit"
          }}>
            🚗 Book Now — ₹49/hr
          </button>
          <button onClick={() => document.getElementById("cars-section")?.scrollIntoView({ behavior: "smooth" })} style={{
            background: "transparent", color: "white",
            border: "2px solid rgba(255,255,255,0.3)", padding: "14px 32px",
            borderRadius: "30px", fontWeight: "600", cursor: "pointer",
            fontSize: "16px", fontFamily: "inherit"
          }}>
            Explore Cars
          </button>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section style={{ background: "white", padding: "60px 24px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div style={{ color: "#22c55e", fontSize: "12px", fontWeight: "700", letterSpacing: "3px", marginBottom: "8px" }}>
            — HAPPY RIDERS —
          </div>
          <h2 style={{ color: "#0f4c35", fontFamily: "'Playfair Display', serif", fontSize: "32px", margin: 0 }}>
            What Our Riders Say
          </h2>
        </div>
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "center" }}>
          {testimonials.map((t, i) => (
            <div key={i} style={{
              background: "#f0fdf4", borderRadius: "16px", padding: "24px",
              flex: "1", minWidth: "240px", maxWidth: "320px",
              border: "1px solid #dcfce7"
            }}>
              <StarRating count={t.stars} />
              <p style={{ color: "#374151", lineHeight: 1.6, margin: "12px 0 16px", fontSize: "14px", fontStyle: "italic" }}>
                "{t.text}"
              </p>
              <div style={{ fontWeight: "700", color: "#0f4c35", fontSize: "14px" }}>{t.name}</div>
              <div style={{ color: "#9ca3af", fontSize: "12px" }}>📍 {t.city}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Highlights({ onBook }) {
  return (
    <>
      <Cities />
      <PremiumBanner onBook={onBook} />
      <Testimonials />
    </>
  );
}