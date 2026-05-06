// ============================================================
// Hero.jsx — Clean version with working form + WhatsApp submit
// ============================================================

import { useState, useEffect } from "react";
import car from "../../assets/herocar.png";
import { fetchHeroSettings, submitGuestBooking } from "../../api";

// ─── Constants ───────────────────────────────────────────────
const CAR_OPTIONS = [
  "Swift Dzire",
  "Honda City",
  "Hyundai Creta",
  "Maruti Baleno",
  "Toyota Fortuner",
  "Tata Nexon EV",
];

const PRICE_OPTIONS = [
  { value: "budget",  label: "Budget (<₹100/hr)" },
  { value: "mid",     label: "Mid (₹100–₹150/hr)" },
  { value: "premium", label: "Premium (₹150+/hr)" },
];

const DEFAULT_HERO = {
  hero_price:    "₹99/hr",
  hero_tagline:  "Drive Your Freedom",
  hero_subtitle: "Book Self-Drive Car Rentals Across India",
};

const EMPTY_FORM = {
  location:  "",
  tripStart: "",
  tripEnd:   "",
  car:       "",
  price:     "",
};

// ─── Shared input styles ──────────────────────────────────────
const inputStyle = {
  width:       "100%",
  padding:     "10px 12px",
  border:      "1.5px solid #d1fae5",
  borderRadius: "8px",
  fontSize:    "13px",
  fontFamily:  "inherit",
  outline:     "none",
  boxSizing:   "border-box",
  color:       "#1f2937",
  background:  "#fff",
  appearance:  "none",   // removes native date chrome on some browsers
};

// ─── DateInput — shows placeholder text when empty ───────────
// Native <input type="date"> hides its placeholder on most browsers,
// so we layer a visible span on top when no value is selected.
function DateInput({ placeholder, value, onChange }) {
  return (
    <div style={{ position: "relative", marginBottom: "10px" }}>
      {/* Visible placeholder overlay */}
      {!value && (
        <span
          style={{
            position:      "absolute",
            left:          "12px",
            top:           "50%",
            transform:     "translateY(-50%)",
            color:         "#9ca3af",
            fontSize:      "13px",
            pointerEvents: "none",   // click-through so the input still gets focus
            zIndex:        1,
            userSelect:    "none",
          }}
        >
          {placeholder}
        </span>
      )}
      <input
        type="date"
        value={value}
        onChange={onChange}
        style={{
          ...inputStyle,
          // make native date text invisible until a value is chosen
          color: value ? "#1f2937" : "transparent",
        }}
      />
    </div>
  );
}

// ─── BookingForm — reused in both mobile modal & desktop card ─
function BookingForm({ form, setForm, onSubmit, compact = false }) {
  const gap = compact ? "8px" : "10px";

  return (
    <div>
      {/* Tabs */}
      <div style={{ display: "flex", gap: "4px", marginBottom: compact ? "12px" : "16px" }}>
        {["DAILY DRIVE", "WEEKLY PLUS"].map((tab, i) => (
          <button
            key={tab}
            type="button"
            style={{
              flex:         1,
              padding:      compact ? "7px" : "8px",
              background:   i === 0 ? "#408A71" : "#f0fdf4",
              color:        i === 0 ? "white"   : "#0f4c35",
              border:       i === 0 ? "none"    : "1px solid #dcfce7",
              borderRadius: i === 0 ? "6px 0 0 6px" : "0 6px 6px 0",
              cursor:       "pointer",
              fontFamily:   "inherit",
              fontSize:     compact ? "11px" : "12px",
              fontWeight:   "600",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Headings */}
      <p style={{ color: "#0f4c35", fontWeight: "700", marginBottom: "2px", fontSize: compact ? "13px" : "14px" }}>
        Looking for Best Car Rentals?
      </p>
      <p style={{ color: "#6b7280", marginBottom: compact ? "12px" : "16px", fontSize: compact ? "12px" : "13px" }}>
        Book Self-Drive Car Rentals Across India
      </p>

      {/* Location */}
      <input
        type="text"
        placeholder="Location"
        value={form.location}
        onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
        style={{ ...inputStyle, marginBottom: gap }}
      />

      {/* Trip Start */}
      <DateInput
        placeholder="Trip Start"
        value={form.tripStart}
        onChange={e => setForm(f => ({ ...f, tripStart: e.target.value }))}
      />

      {/* Trip End */}
      <DateInput
        placeholder="Trip End"
        value={form.tripEnd}
        onChange={e => setForm(f => ({ ...f, tripEnd: e.target.value }))}
      />

      {/* Car + Price row */}
      <div style={{ display: "flex", gap: "8px", marginBottom: gap }}>
        <select
          value={form.car}
          onChange={e => setForm(f => ({ ...f, car: e.target.value }))}
          style={{ ...inputStyle, flex: 1, marginBottom: 0 }}
        >
          <option value="">Car Choose</option>
          {CAR_OPTIONS.map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        <select
          value={form.price}
          onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
          style={{ ...inputStyle, flex: 1, marginBottom: 0 }}
        >
          <option value="">Price</option>
          {PRICE_OPTIONS.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
        </select>
      </div>

      {/* Submit */}
      <button
        type="button"
        onClick={onSubmit}
        style={{
          width:         "100%",
          padding:       "12px",
          background:    "#408A71",
          color:         "white",
          border:        "none",
          borderRadius:  "8px",
          fontSize:      compact ? "14px" : "15px",
          fontWeight:    "700",
          cursor:        "pointer",
          fontFamily:    "inherit",
          letterSpacing: "1px",
          marginTop:     "2px",
        }}
      >
         Submit
      </button>
    </div>
  );
}

// ─── Mobile Popup Modal ───────────────────────────────────────
function BookingModal({ form, setForm, onSubmit, onClose }) {
  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position:   "fixed",
          inset:      0,
          background: "rgba(0,0,0,0.55)",
          zIndex:     998,
          animation:  "fadeIn 0.2s ease",
        }}
      />

      {/* Card */}
      <div
        style={{
          position:  "fixed",
          top:       "50%",
          left:      "50%",
          transform: "translate(-50%, -50%)",
          zIndex:    999,
          width:     "calc(100vw - 32px)",
          maxWidth:  "360px",
          animation: "popIn 0.28s cubic-bezier(0.34,1.56,0.64,1)",
        }}
      >
        <div
          style={{
            background:   "white",
            borderRadius: "20px",
            padding:      "22px 18px 24px",
            boxShadow:    "0 24px 60px rgba(0,0,0,0.35)",
            position:     "relative",
          }}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            style={{
              position:       "absolute",
              top:            "12px",
              right:          "12px",
              background:     "#f0fdf4",
              border:         "none",
              borderRadius:   "50%",
              width:          "30px",
              height:         "30px",
              fontSize:       "18px",
              cursor:         "pointer",
              display:        "flex",
              alignItems:     "center",
              justifyContent: "center",
              color:          "#408A71",
              fontWeight:     "700",
              padding:        0,
              lineHeight:     1,
            }}
          >
            ×
          </button>

          <BookingForm
            form={form}
            setForm={setForm}
            onSubmit={onSubmit}
            compact
          />
        </div>
      </div>
    </>
  );
}

// ─── Main Hero Component ──────────────────────────────────────
export default function Hero({ onSearch }) {
  const [form,        setForm]        = useState(EMPTY_FORM);
  const [modalOpen,   setModalOpen]   = useState(false);
  const [isMobile,    setIsMobile]    = useState(window.innerWidth < 768);
  const [heroSettings, setHeroSettings] = useState(DEFAULT_HERO);

  // Load hero settings from backend
  useEffect(() => {
    fetchHeroSettings().then(s => {
      if (s && Object.keys(s).length) setHeroSettings(s);
    });
  }, []);

  // Track viewport width for mobile/desktop switch
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = modalOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [modalOpen]);

  // ── Form validation + WhatsApp submit ──────────────────────
  const handleSubmit = () => {
    if (!form.location || !form.tripStart || !form.tripEnd) {
      alert("Please fill in Location, Trip Start and Trip End!");
      return;
    }

    // Send to WhatsApp via api.js
    submitGuestBooking({
      name:   "Guest",           // Hero form doesn't collect name/phone
      phone:  "Not provided",
      pickup: form.location,
      drop:   "",
      date:   `${form.tripStart} → ${form.tripEnd}`,
      carId:  form.car || "Any available",
    });

    // Also call the parent onSearch so listings can filter
    onSearch(form);

    setModalOpen(false);
    setForm(EMPTY_FORM);
  };

  // ── Hero background & decorative bubbles (shared) ──────────
  const sectionStyle = {
    background: "linear-gradient(0deg, rgb(32 57 54) 0%, rgba(64,138,113,1) 54%)",
    position:   "relative",
    overflow:   "hidden",
  };

  // ════════════════════════════════════════════════════════════
  // DESKTOP
  // ════════════════════════════════════════════════════════════
  if (!isMobile) {
    return (
      <section style={{ ...sectionStyle, minHeight: "520px", display: "flex", alignItems: "center", padding: "40px 24px" }}>
        {/* Decorative circles */}
        <div style={{ position: "absolute", right: "-40px", top: "-40px",  width: "300px", height: "300px", background: "rgba(74,222,128,0.08)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", right:  "60px", bottom: "-60px", width: "200px", height: "200px", background: "rgba(74,222,128,0.05)", borderRadius: "50%", pointerEvents: "none" }} />

        <div style={{ maxWidth: "1100px", margin: "0 auto", width: "100%", display: "flex", gap: "40px", alignItems: "center", flexWrap: "wrap" }}>

          {/* ── Booking card ── */}
          <div style={{ background: "white", borderRadius: "16px", padding: "28px", flex: "0 0 480px", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
            <BookingForm form={form} setForm={setForm} onSubmit={handleSubmit} />
          </div>

          {/* ── Headline "Anytime" ── */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <span style={{ color: "white", fontSize: "6px", marginLeft: "80px", marginBottom: "-11px", textTransform: "uppercase" }}>
              {heroSettings.hero_tagline}
            </span>
            <div style={{ display: "flex", alignItems: "flex-start" }}>
              <div style={{ background: "#f5f0e8", width: "25px", height: "350px", borderRadius: "4px", display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: "4px", flexShrink: 0 }}>
                <span style={{ fontSize: "30px", fontWeight: "600", color: "#408A71", lineHeight: 1 }}>A</span>
              </div>
              <div>
                <h1 style={{ fontSize: "30px", fontWeight: "600", color: "#f5f0e8", marginTop: "-6px",  }}>nytime</h1>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "150px", marginLeft: "-100px", rotate: "-90deg" }}>
                  <div style={{ width: "80px", borderTop: "2px dashed white" }} />
                  <span style={{ color: "white", fontSize: "11px", fontWeight: "500", letterSpacing: "2px", textTransform: "uppercase", whiteSpace: "nowrap" }}>Safe &amp; Drive</span>
                  <div style={{ width: "80px", borderTop: "2px dashed white" }} />
                </div>
              </div>
            </div>
          </div>

          {/* ── Car image + badges ── */}
          <div style={{ flex: 1, minWidth: "300px", display: "flex", justifyContent: "center", marginBottom: "-40px" }}>
            <div style={{ position: "relative", width: "350px", height: "550px" }}>
              <img src={car} alt="car" style={{ width: "380px", objectFit: "contain", marginBottom: "-40px" }} />

              {/* "Starting Pricing" badge */}
              <div style={{
                position: "absolute", bottom: "180px", right: "-60px",
                width: "80px", height: "80px",
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                background: "linear-gradient(135deg, rgb(90 117 114) 0%, rgb(12 61 44) 100%)",
                borderRadius: "50%",
              }}>
                <div style={{ color: "#f5f0e8", fontSize: "10px", fontWeight: "600" }}>Starting</div>
                <div style={{ color: "#f5f0e8", fontSize: "10px", fontWeight: "600" }}>Pricing*</div>
              </div>

              {/* Price badge — desktop: clicking it scrolls to form (UX hint) */}
              <div style={{
                position: "absolute", bottom: "100px", left: "200px",
                background: "linear-gradient(135deg, rgb(90 117 114) 0%, rgb(12 61 44) 100%)",
                boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
                borderRadius: "50%", width: "120px", height: "120px",
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              }}>
                <span style={{ color: "#f5f0e8", fontSize: "20px", fontWeight: "700", lineHeight: 1.1 }}>
                  {heroSettings.hero_price}
                </span>
                <button
                  type="button"
                  onClick={() => document.querySelector("input")?.focus()}
                  style={{
                    background:    "transparent",
                    color:         "white",
                    border:        "1px solid rgba(255,255,255,0.8)",
                    borderRadius:  "5px",
                    padding:       "3px 7px",
                    fontSize:      "8px",
                    fontWeight:    "700",
                    letterSpacing: "1px",
                    marginTop:     "5px",
                    cursor:        "pointer",
                    fontFamily:    "inherit",
                  }}
                >
                  BOOK NOW
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>
    );
  }

  // ════════════════════════════════════════════════════════════
  // MOBILE — car image + BOOK NOW opens centered card modal
  // ════════════════════════════════════════════════════════════
  return (
    <>
      {/* Global keyframe animations */}
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
        ...sectionStyle,
        minHeight:      "60svh",
        display:        "flex",
        flexDirection:  "column",
        alignItems:     "center",
        padding:        "28px 16px 24px",
        boxSizing:      "border-box",
      }}>
        {/* Decorative circles */}
        <div style={{ position: "absolute", right: "-60px", top: "-60px",    width: "220px", height: "220px", background: "rgba(74,222,128,0.08)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", left:  "-40px", bottom: "80px",  width: "160px", height: "160px", background: "rgba(74,222,128,0.05)", borderRadius: "50%", pointerEvents: "none" }} />

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
            <span style={{ color: "rgba(255,255,255,0.75)", fontSize: "10px", letterSpacing: "2.5px", textTransform: "uppercase" }}>
              Safe &amp; Drive
            </span>
            <div style={{ width: "50px", borderTop: "1.5px dashed rgba(255,255,255,0.4)" }} />
          </div>
        </div>

        {/* Car image + badges */}
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", width: "100%", zIndex: 1 }}>
          <div style={{ position: "relative", width: "290px", height: "360px" }}>
            <img src={car} alt="car" style={{ width: "310px", objectFit: "contain" }} />

            {/* "Starting Pricing" badge */}
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

            {/* Price + BOOK NOW badge — opens modal */}
            <div style={{
              position:       "absolute",
              bottom:         "0px",
              left:           "168px",
              background:     "linear-gradient(135deg, rgb(90 117 114) 0%, rgb(12 61 44) 100%)",
              boxShadow:      "0 8px 28px rgba(0,0,0,0.5)",
              borderRadius:   "50%",
              width:          "108px",
              height:         "108px",
              display:        "flex",
              flexDirection:  "column",
              alignItems:     "center",
              justifyContent: "center",
            }}>
              <span style={{ color: "#f5f0e8", fontSize: "19px", fontWeight: "700", lineHeight: 1.1 }}>
                {heroSettings.hero_price}
              </span>
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                style={{
                  background:    "transparent",
                  color:         "white",
                  border:        "1px solid rgba(255,255,255,0.8)",
                  borderRadius:  "5px",
                  padding:       "4px 9px",
                  fontSize:      "8px",
                  fontWeight:    "700",
                  letterSpacing: "1px",
                  marginTop:     "6px",
                  cursor:        "pointer",
                  fontFamily:    "inherit",
                }}
              >
                BOOK NOW
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile booking modal */}
      {modalOpen && (
        <BookingModal
          form={form}
          setForm={setForm}
          onSubmit={handleSubmit}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
}