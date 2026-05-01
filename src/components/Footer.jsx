import logo from "../assets/logo.png";

export default function Footer() {
  return (
    <footer style={{ background:"linear-gradient(0deg, rgb(32 57 54) 0%, rgb(43 99 80) 54%)", padding: "48px 24px 24px", color: "rgba(255,255,255,0.7)" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* Top grid */}
        <div style={{ display: "flex", gap: "40px", flexWrap: "wrap", marginBottom: "40px" }}>

          {/* Brand */}
          <div style={{ flex: "2", minWidth: "200px" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              {/* Logo image — replace src with your actual logo path */}
              <img
                src={logo}
                alt="RideMitra Logo"
                style={{ height: "80px", width: "200px", objectFit: "cover" }}
              />
            </div>
            <p style={{ fontSize: "13px", lineHeight: 1.7, marginBottom: "16px" }}>
              RideMitra is your trusted partner for quick and reliable car rentals.
              Simple booking with instant WhatsApp support, affordable pricing,
              and a smooth experience from start to finish.
            </p>
            <div style={{ display: "flex", gap: "8px" }}>
              {[
                { icon: "ri-whatsapp-line", label: "WhatsApp" },
                { icon: "ri-facebook-fill", label: "Facebook" },
              ].map((s, i) => (
                <span key={i} style={{
                  display: "flex", alignItems: "center", gap: "6px",
                  background: "rgba(74,222,128,0.1)",
                  border: "1px solid rgba(74,222,128,0.2)",
                  padding: "6px 12px", borderRadius: "20px",
                  fontSize: "12px", cursor: "pointer"
                }}>
                  <i className={s.icon} style={{ fontSize: "14px", color: "#fff" }} />
                </span>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div style={{ minWidth: "140px" }}>
            <h4 style={{ color: "white", marginBottom: "14px", fontSize: "14px", marginTop: 0 }}>Quick Links</h4>
            {["Cars", "Home", "Book Now"].map(l => (
              <div
                key={l}
                style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px", fontSize: "13px", cursor: "pointer" }}
                onClick={() => l === "Cars" && document.getElementById("cars-section")?.scrollIntoView({ behavior: "smooth" })}
              >
                <i className="ri-arrow-right-s-line" style={{ fontSize: "14px", color: "#fff" }} />
                {l}
              </div>
            ))}
          </div>

          {/* Contact */}
          <div style={{ minWidth: "200px" }}>
            <h4 style={{ color: "white", marginBottom: "14px", fontSize: "14px", marginTop: 0 }}>Contact Info</h4>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", marginBottom: "10px" }}>
              <i className="ri-phone-line" style={{ fontSize: "15px", color: "#fff" }} />
              +91 84000 02841
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", marginBottom: "10px" }}>
              <i className="ri-mail-line" style={{ fontSize: "15px", color: "#fff" }} />
              pixah49991@sixoplus.com
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px" }}>
              <i className="ri-map-pin-line" style={{ fontSize: "15px", color: "#fff" }} />
              Noida
            </div>
          </div>

          {/* Features */}
          <div style={{ minWidth: "160px" }}>
            <h4 style={{ color: "white", marginBottom: "14px", fontSize: "14px", marginTop: 0 }}>Features</h4>
            {[
              { icon: "ri-customer-service-2-line", label: "24/7 Support" },
              { icon: "ri-flashlight-line",          label: "Fast Booking" },
              { icon: "ri-shield-check-line",        label: "Verified Cars" },
              { icon: "ri-lock-2-line",              label: "Secured Payments" },
            ].map(f => (
              <div key={f.label} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px", fontSize: "13px" }}>
                <i className={f.icon} style={{ fontSize: "15px", color: "#fff" }} />
                {f.label}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "20px", textAlign: "center", fontSize: "12px" }}>
          © 2026 RideMitra. All rights reserved.
        </div>
      </div>
    </footer>
  );
}