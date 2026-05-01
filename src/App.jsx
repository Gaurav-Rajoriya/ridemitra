
import { useState } from "react";

// ── 6 Section Components ──────────────────────────────────────
import Navbar     from "./components/Navbar";      // Part 1
import Hero       from "./components/Sign Up/Hero";        // Part 2
import Cars       from "./components/Sign Up/Cars";        // Part 3
// import About      from "./components/Page/About";       // Part 4
// import Highlights from "./components/Why Us/Highlights";  // Part 5
import Footer     from "./components/Footer";      // Part 6
import CitiesSection from "./components/Page/City";
import FeaturesSection from "./components/Page/features/FeaturesSection ";
import Banner from "./components/Page/Banner";

// ── WhatsApp number (edit this!) ──────────────────────────────
const WHATSAPP_NUMBER = "8400002841"; // Format: country code + number

export default function App() {

  return (
    <div style={{ color: "#1f2937", minHeight: "100vh" }}>
      {/* ── PART 1: Navbar ── */}
      <Navbar />

      {/* ── PART 2: Hero ── */}
      <Hero  />
      {/* ── PART 3: Cars ── */}
      <Cars />

      <CitiesSection/>
      <FeaturesSection/>
      <Banner/>
      <Footer />

      {/* ── WhatsApp FAB ── */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi! I want to book a car on RideMitra.")}`}
        target="_blank" rel="noreferrer"
        title="Chat on WhatsApp"
        style={{
          position: "fixed", bottom: "24px", right: "24px",
          background: "linear-gradient(135deg, #25d366, #128c7e)",
          width: "60px", height: "60px", borderRadius: "50%",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 8px 25px rgba(37,211,102,0.4)",
          textDecoration: "none", fontSize: "28px", zIndex: 1000,
          transition: "transform 0.2s"
        }}
        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
        <i className="ri-whatsapp-line" style={{ color: "white" }} />
      </a>

    </div>
  );
}