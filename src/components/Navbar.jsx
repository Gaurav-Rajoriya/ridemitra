import logo from "../assets/logo.png"

export default function Navbar({ onBookNow }) {
  return (
    <nav style={{
      background: "linear-gradient(180deg,rgb(45 89 85) 0%, rgba(64, 138, 113, 1) 54%)",
      padding: "0 24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: "64px",
      position: "sticky",
      top: 0,
      zIndex: 1000,
      boxShadow: "0 2px 20px rgba(0,0,0,0.3)"
    }}>
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img
          src={logo}
          alt="RideMitra Logo"
          width={160}
          height={100}
        />
      </div>

      {/* Links */}
      {/* <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <button
          onClick={() => document.getElementById("cars-section")?.scrollIntoView({ behavior: "smooth" })}
          style={{ background: "transparent", border: "none", color: "rgba(255,255,255,0.8)", cursor: "pointer", fontSize: "14px", fontFamily: "inherit" }}>
          Cars
        </button>
        <button
          onClick={() => document.getElementById("cities-section")?.scrollIntoView({ behavior: "smooth" })}
          style={{ background: "transparent", border: "none", color: "rgba(255,255,255,0.8)", cursor: "pointer", fontSize: "14px", fontFamily: "inherit" }}>
          Cities
        </button>
        <button
          style={{
            background: "linear-gradient(135deg, #4ade80, #22c55e)",
            border: "none", color: "#0f4c35", padding: "8px 20px",
            borderRadius: "25px", fontWeight: "700", cursor: "pointer",
            fontSize: "14px", fontFamily: "inherit"
          }}>
          Sign Up
        </button>
      </div> */}
    </nav>
  );
}