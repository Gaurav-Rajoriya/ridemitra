
const features = [
  { icon: "🛡️", title: "Verified Cars",      desc: "Every car is thoroughly inspected and verified before listing." },
  { icon: "⚡", title: "Fast Booking",        desc: "Book in under 2 minutes. Instant WhatsApp confirmation." },
  { icon: "💬", title: "24/7 Support",        desc: "Round-the-clock support via WhatsApp, call, or chat." },
  { icon: "🔒", title: "Secured Payments",    desc: "All transactions are encrypted and 100% safe." },
];


function WhyUs() {
  return (
    <div style={{ background: "white", padding: "60px 24px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div style={{ color: "#22c55e", fontSize: "12px", fontWeight: "700", letterSpacing: "3px", marginBottom: "8px" }}>— OUR PROMISE —</div>
          <h2 style={{ color: "#0f4c35", fontFamily: "'Playfair Display', serif", fontSize: "32px", margin: 0 }}>Why Choose RideMitra?</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "20px" }}>
          {features.map((f, i) => (
            <div key={i} style={{
              background: "#f0fdf4", borderRadius: "16px", padding: "24px",
              border: "1px solid #dcfce7", textAlign: "center"
            }}>
              <div style={{ fontSize: "36px", marginBottom: "12px" }}>{f.icon}</div>
              <h4 style={{ color: "#0f4c35", fontFamily: "'Playfair Display', serif", marginBottom: "8px", fontSize: "16px" }}>{f.title}</h4>
              <p style={{ color: "#6b7280", fontSize: "13px", lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function About({ onBecomeHost, onBookNow }) {
  return (
    <>
      <WhyUs />
    </>
  );
}