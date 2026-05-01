// ============================================================
// Hero.jsx — BOOK NOW badge opens centered card popup (mobile)
// ============================================================

import { useState, useEffect } from "react";
import car from "../../assets/herocar.png";
import { fetchHeroSettings } from "../../api"; 

const cars = [
  "Swift Dzire", "Honda City", "Hyundai Creta",
  "Maruti Baleno", "Toyota Fortuner", "Tata Nexon EV"
];

export default function Hero({ onSearch }) {
  const [form, setForm] = useState({
    location: "", tripStart: "", tripEnd: "", car: "", price: ""
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const [heroSettings, setHeroSettings] = useState({
    hero_price:    "₹99/hr",
    hero_tagline:  "Drive Your Freedom",
    hero_subtitle: "Book Self-Drive Car Rentals Across India",
  });

  useEffect(() => {
    fetchHeroSettings().then(s => {
      if (s && Object.keys(s).length) setHeroSettings(s);
    });
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    document.body.style.overflow = modalOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [modalOpen]);

  const handleSearch = () => {
    if (!form.location || !form.tripStart || !form.tripEnd) {
      alert("Please fill in Location, Trip Start and Trip End!");
      return;
    }
    setModalOpen(false);
    onSearch(form);
  };

  // ─── Card-style Booking Popup ─────────────────────────────
  const BookingCard = () => (
    <>
      {/* Backdrop */}
      <div
        onClick={() => setModalOpen(false)}
        style={{
          position: "fixed", inset: 0,
          background: "rgba(0,0,0,0.55)",
          zIndex: 998,
          animation: "fadeIn 0.2s ease",
        }}
      />
      {/* Centered card */}
      <div style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 999,
        width: "calc(100vw - 32px)",
        maxWidth: "360px",
        animation: "popIn 0.28s cubic-bezier(0.34,1.56,0.64,1)",
      }}>
        <div style={{
          background: "white",
          borderRadius: "20px",
          padding: "22px 18px 24px",
          boxShadow: "0 24px 60px rgba(0,0,0,0.35)",
          position: "relative",
        }}>
          {/* Close */}
          <button
            onClick={() => setModalOpen(false)}
            style={{
              position: "absolute", top: "12px", right: "12px",
              background: "#f0fdf4", border: "none", borderRadius: "50%",
              width: "30px", height: "30px", fontSize: "18px",
              cursor: "pointer", display: "flex", alignItems: "center",
              justifyContent: "center", color: "#408A71", fontWeight: "700",
              padding: 0, lineHeight: 1,
            }}>×</button>

          {/* Tabs */}
          <div style={{ display: "flex", gap: "4px", marginBottom: "14px" }}>
            {["DAILY DRIVE", "WEEKLY PLUS"].map((tab, i) => (
              <button key={tab} style={{
                flex: 1, padding: "7px",
                background: i === 0 ? "#408A71" : "#f0fdf4",
                color: i === 0 ? "white" : "#0f4c35",
                border: i === 0 ? "none" : "1px solid #dcfce7",
                borderRadius: i === 0 ? "6px 0 0 6px" : "0 6px 6px 0",
                cursor: "pointer", fontFamily: "inherit",
                fontSize: "11px", fontWeight: "600"
              }}>{tab}</button>
            ))}
          </div>

          <p style={{ color: "#0f4c35", fontWeight: "700", marginBottom: "2px", fontSize: "13px" }}>
            Looking for Best Car Rentals?
          </p>
          <p style={{ color: "#6b7280", marginBottom: "12px", fontSize: "12px" }}>
            Book Self-Drive Car Rentals Across India
          </p>

          {[
            { key: "location", placeholder: "Location", type: "text" },
            { key: "tripStart", placeholder: "Trip Start", type: "date" },
            { key: "tripEnd", placeholder: "Trip End", type: "date" },
          ].map(f => (
            <input
              key={f.key} type={f.type} placeholder={f.placeholder}
              value={form[f.key]}
              onChange={e => setForm({ ...form, [f.key]: e.target.value })}
              style={{
                width: "100%", padding: "9px 11px",
                border: "1.5px solid #d1fae5", borderRadius: "8px",
                marginBottom: "8px", fontSize: "13px",
                fontFamily: "inherit", outline: "none",
                boxSizing: "border-box", color: "#1f2937",
              }} />
          ))}

          <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
            <select value={form.car} onChange={e => setForm({ ...form, car: e.target.value })}
              style={{ flex: 1, padding: "9px 10px", border: "1.5px solid #d1fae5", borderRadius: "8px", fontSize: "12px", fontFamily: "inherit", outline: "none", color: "#1f2937" }}>
              <option value="">Car Choose</option>
              {cars.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={form.price} onChange={e => setForm({ ...form, price: e.target.value })}
              style={{ flex: 1, padding: "9px 10px", border: "1.5px solid #d1fae5", borderRadius: "8px", fontSize: "12px", fontFamily: "inherit", outline: "none", color: "#1f2937" }}>
              <option value="">Price</option>
              <option value="budget">Budget (&lt;₹100/hr)</option>
              <option value="mid">Mid (₹100–₹150/hr)</option>
              <option value="premium">Premium (₹150+/hr)</option>
            </select>
          </div>

          <button onClick={handleSearch} style={{
            width: "100%", padding: "12px",
            background: "#408A71", color: "white",
            border: "none", borderRadius: "8px",
            fontSize: "14px", fontWeight: "700",
            cursor: "pointer", fontFamily: "inherit", letterSpacing: "1px"
          }}>
            SEARCH
          </button>
        </div>
      </div>
    </>
  );

  // ════════════════════════════════════════
  // DESKTOP — original layout, unchanged
  // ════════════════════════════════════════
  if (!isMobile) {
    return (
      <section style={{
        background: "linear-gradient(0deg,rgb(32 57 54) 0%, rgba(64, 138, 113, 1) 54%)",
        minHeight: "520px",
        display: "flex",
        alignItems: "center",
        padding: "40px 24px",
        position: "relative",
        overflow: "hidden"
      }}>
        <div style={{ position: "absolute", right: "-40px", top: "-40px", width: "300px", height: "300px", background: "rgba(74,222,128,0.08)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", right: "60px", bottom: "-60px", width: "200px", height: "200px", background: "rgba(74,222,128,0.05)", borderRadius: "50%", pointerEvents: "none" }} />

        <div style={{ maxWidth: "1100px", margin: "0 auto", width: "100%", display: "flex", gap: "40px", alignItems: "center", flexWrap: "wrap" }}>

          {/* Desktop booking form */}
          <div style={{ background: "white", borderRadius: "16px", padding: "28px", flex: "0 0 480px", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
            <div style={{ display: "flex", gap: "4px", marginBottom: "16px" }}>
              {["DAILY DRIVE", "WEEKLY PLUS"].map((tab, i) => (
                <button key={tab} style={{ flex: 1, padding: "8px", background: i === 0 ? "#408A71" : "#f0fdf4", color: i === 0 ? "white" : "#0f4c35", border: i === 0 ? "none" : "1px solid #dcfce7", borderRadius: i === 0 ? "6px 0 0 6px" : "0 6px 6px 0", cursor: "pointer", fontFamily: "inherit", fontSize: "12px", fontWeight: "600" }}>{tab}</button>
              ))}
            </div>
            <p style={{ color: "#0f4c35", fontWeight: "700", marginBottom: "4px", fontSize: "14px" }}>Looking for Best Car Rentals?</p>
            <p style={{ color: "#6b7280", marginBottom: "16px", fontSize: "13px" }}>Book Self-Drive Car Rentals Across India</p>
            {[{ key: "location", placeholder: " Location", type: "text" }, { key: "tripStart", placeholder: "Trip Start", type: "date" }, { key: "tripEnd", placeholder: "Trip End", type: "date" }].map(f => (
              <input key={f.key} type={f.type} placeholder={f.placeholder} value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })} style={{ width: "100%", padding: "10px 12px", border: "1.5px solid #d1fae5", borderRadius: "8px", marginBottom: "10px", fontSize: "13px", fontFamily: "inherit", outline: "none", boxSizing: "border-box", color: "#1f2937" }} />
            ))}
            <div style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
              <select value={form.car} onChange={e => setForm({ ...form, car: e.target.value })} style={{ flex: 1, padding: "10px 12px", border: "1.5px solid #d1fae5", borderRadius: "8px", fontSize: "13px", fontFamily: "inherit", outline: "none", color: "#1f2937" }}>
                <option value="">Car Choose</option>{cars.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <select value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} style={{ flex: 1, padding: "10px 12px", border: "1.5px solid #d1fae5", borderRadius: "8px", fontSize: "13px", fontFamily: "inherit", outline: "none", color: "#1f2937" }}>
                <option value="">Price</option>
                <option value="budget">Budget (&lt;₹100/hr)</option>
                <option value="mid">Mid (₹100–₹150/hr)</option>
                <option value="premium">Premium (₹150+/hr)</option>
              </select>
            </div>
            <button onClick={() => { if (!form.location || !form.tripStart || !form.tripEnd) { alert("Please fill in all required fields!"); return; } onSearch(form); }} style={{ width: "100%", padding: "12px", background: "#408A71", color: "white", border: "none", borderRadius: "8px", fontSize: "15px", fontWeight: "700", cursor: "pointer", fontFamily: "inherit", letterSpacing: "1px" }}>SEARCH</button>
          </div>

          {/* Headline */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <span style={{ color: "white", fontSize: "5px", marginLeft: "83px", marginBottom: "-10px" }}>Drive Your Freedom</span>
            <div style={{ display: "flex", alignItems: "flex-start" }}>
              <div style={{ background: "#f5f0e8", width: "25px", height: "350px", borderRadius: "4px", display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: "4px", flexShrink: 0 }}>
                <span style={{ fontSize: "30px", fontWeight: "600", color: "#408A71", lineHeight: 1 }}>A</span>
              </div>
              <div>
                <h1 style={{ fontSize: "30px", fontWeight: "600", color: "#f5f0e8", marginTop: "-6px", letterSpacing: "1px" }}>nytime</h1>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "150px", marginLeft: "-100px", rotate: "-90deg" }}>
                  <div style={{ width: "80px", borderTop: "2px dashed white" }} />
                  <span style={{ color: "white", fontSize: "11px", fontWeight: "500", letterSpacing: "2px", textTransform: "uppercase", whiteSpace: "nowrap" }}>Safe &amp; Drive</span>
                  <div style={{ width: "80px", borderTop: "2px dashed white" }} />
                </div>
              </div>
            </div>
          </div>

          {/* Car + badges */}
          <div style={{ flex: 1, minWidth: "300px", display: "flex", justifyContent: "center", marginBottom: "-40px" }}>
            <div style={{ position: "relative", width: "350px", height: "550px" }}>
              <div style={{ width: "100%", height: "100%", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img src={car} alt="car" style={{ width: "380px", objectFit: "contain", marginBottom: "-40px" }} />
              </div>
              <div style={{ position: "absolute", bottom: "180px", width: "80px", height: "80px", right: "-60px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "linear-gradient(90deg, rgb(90 117 114) 0%, rgb(12 61 44) 54%)", borderRadius: "50%", textAlign: "center" }}>
                <div style={{ color: "#f5f0e8", fontSize: "10px", fontWeight: "600" }}>Starting</div>
                <div style={{ color: "#f5f0e8", fontSize: "10px", fontWeight: "600" }}>Pricing*</div>
              </div>
              <div style={{ position: "absolute", bottom: "100px", left: "200px", background: "linear-gradient(90deg, rgb(90 117 114) 0%, rgb(12 61 44) 54%)", boxShadow: "black 0px 10px 40px", borderRadius: "50%", width: "120px", height: "120px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "#f5f0e8", fontSize: "20px", fontWeight: "700", lineHeight: 1.1 }}>{heroSettings.hero_price}</span>
                <button style={{ background: "transparent", color: "white", border: "1px solid white", borderRadius: "5px", padding: "3px 7px", fontSize: "8px", fontWeight: "700", letterSpacing: "1px", marginTop: "5px", cursor: "pointer", fontFamily: "inherit" }}>BOOK NOW</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ════════════════════════════════════════
  // MOBILE — car + badges, BOOK NOW opens card popup
  // ════════════════════════════════════════
  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes popIn {
          from { opacity: 0; transform: translate(-50%, -46%) scale(0.92); }
          to   { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
      `}</style>

      <section style={{
        background: "linear-gradient(0deg,rgb(32 57 54) 0%, rgba(64, 138, 113, 1) 54%)",
        minHeight: "60svh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "28px 16px 24px",
        position: "relative",
        overflow: "hidden",
        boxSizing: "border-box",
      }}>
        {/* Decorative circles */}
        <div style={{ position: "absolute", right: "-60px", top: "-60px", width: "220px", height: "220px", background: "rgba(74,222,128,0.08)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", left: "-40px", bottom: "80px", width: "160px", height: "160px", background: "rgba(74,222,128,0.05)", borderRadius: "50%", pointerEvents: "none" }} />

        {/* Tagline */}
        <div style={{ textAlign: "center", marginBottom: "16px", zIndex: 1 }}>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", margin: "0 0 4px" }}>
          {heroSettings.hero_tagline}
          </p>
          <h1 style={{ color: "#f5f0e8", fontSize: "40px", fontWeight: "700", margin: "0 0 10px", letterSpacing: "1px" }}>
            Anytime
          </h1>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
            <div style={{ width: "50px", borderTop: "1.5px dashed rgba(255,255,255,0.4)" }} />
            <span style={{ color: "rgba(255,255,255,0.75)", fontSize: "10px", letterSpacing: "2.5px", textTransform: "uppercase" }}>Safe &amp; Drive</span>
            <div style={{ width: "50px", borderTop: "1.5px dashed rgba(255,255,255,0.4)" }} />
          </div>
        </div>

        {/* Car + badges */}
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", width: "100%", zIndex: 1 }}>
          <div style={{ position: "relative", width: "290px", height: "360px" }}>
            <img
              src={car} alt="car"
              style={{ width: "310px", objectFit: "contain", marginBottom: "-20px" }}
            />

            {/* Starting Pricing badge */}
            <div style={{
              position: "absolute", bottom: "148px", right: "0px",
              width: "70px", height: "70px",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              background: "linear-gradient(135deg, rgb(90 117 114) 0%, rgb(12 61 44) 100%)",
              borderRadius: "50%",
            }}>
              <div style={{ color: "#f5f0e8", fontSize: "9px", fontWeight: "600" }}>Starting</div>
              <div style={{ color: "#f5f0e8", fontSize: "9px", fontWeight: "600" }}>Pricing*</div>
            </div>

            {/* ₹99/hr badge — BOOK NOW opens popup */}
            <div style={{
              position: "absolute", bottom: "0px", left: "168px",
              background: "linear-gradient(135deg, rgb(90 117 114) 0%, rgb(12 61 44) 100%)",
              boxShadow: "0 8px 28px rgba(0,0,0,0.5)",
              borderRadius: "50%", width: "108px", height: "108px",
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
            }}>
              <span style={{ color: "#f5f0e8", fontSize: "19px", fontWeight: "700", lineHeight: 1.1 }}>{heroSettings.hero_price}</span>
              <button
                onClick={() => setModalOpen(true)}
                style={{
                  background: "transparent", color: "white",
                  border: "1px solid rgba(255,255,255,0.8)", borderRadius: "5px",
                  padding: "4px 9px", fontSize: "8px", fontWeight: "700",
                  letterSpacing: "1px", marginTop: "6px", cursor: "pointer",
                  fontFamily: "inherit",
                  transition: "background 0.2s",
                }}
                onMouseDown={e => e.currentTarget.style.background = "rgba(255,255,255,0.15)"}
                onMouseUp={e => e.currentTarget.style.background = "transparent"}
                onTouchStart={e => e.currentTarget.style.background = "rgba(255,255,255,0.15)"}
                onTouchEnd={e => e.currentTarget.style.background = "transparent"}
              >
                BOOK NOW
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Card popup */}
      {modalOpen && <BookingCard />}
    </>
  );
}