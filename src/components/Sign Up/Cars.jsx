// ============================================================
// TopCarsSection.jsx
// All styles live in TopCarsSection.css — zero inline styles
// ============================================================

import { useState, useRef, useEffect, useCallback } from "react";
import "./TopCarsSection.css";

// ✅ WhatsApp submit handlers (edit in api.js)
import { submitGuestBooking, submitHostListing } from "../../api";

// ─────────────────────────────────────────────────────────────
// 🔌 BACKEND HOOK
// ─────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────
// 🔌 BACKEND HOOK — replaces the old useCars mock
// ─────────────────────────────────────────────────────────────
const API_BASE = "https://askulglobal.com/backend"; // ← apna server URL daalo

function useCars(city) {
  const [cars, setCars] = useState([]);
  const [loading, setLoad] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoad(true);
    fetch(`${API_BASE}/api.php?action=cars&city=${encodeURIComponent(city)}`)
      .then(r => r.json())
      .then(d => {
        setCars(d.success ? d.cars : []);
        setLoad(false);
      })
      .catch(e => {
        setError(e.message);
        setLoad(false);
      });
  }, [city]);

  return { cars, loading, error };
}
// ─────────────────────────────────────────────────────────────
// SLIDER HOOK
// ─────────────────────────────────────────────────────────────
const CARDS_PER_PAGE = 4;

function useSlider(total) {
  const totalPages = Math.max(1, Math.ceil(total / CARDS_PER_PAGE));
  const [page, setPage] = useState(0);
  const dragStart = useRef(null);
  const isDragging = useRef(false);
  const trackRef = useRef(null);

  const goTo = useCallback((p) => {
    setPage(Math.max(0, Math.min(p, totalPages - 1)));
  }, [totalPages]);

  const onDragStart = (x) => { dragStart.current = { x, page }; isDragging.current = true; };
  const onDragMove = (x) => {
    if (!isDragging.current || !trackRef.current) return;
    const diff = dragStart.current.x - x;
    const threshold = trackRef.current.offsetWidth * 0.15;
    if (diff > threshold) { goTo(dragStart.current.page + 1); isDragging.current = false; }
    if (diff < -threshold) { goTo(dragStart.current.page - 1); isDragging.current = false; }
  };
  const onDragEnd = () => { isDragging.current = false; };

  const mouseHandlers = {
    onMouseDown: e => onDragStart(e.clientX),
    onMouseMove: e => { if (isDragging.current) onDragMove(e.clientX); },
    onMouseUp: onDragEnd,
    onMouseLeave: onDragEnd,
  };
  const touchHandlers = {
    onTouchStart: e => onDragStart(e.touches[0].clientX),
    onTouchMove: e => { e.stopPropagation(); onDragMove(e.touches[0].clientX); },
    onTouchEnd: onDragEnd,
  };

  return { page, totalPages, goTo, trackRef, mouseHandlers, touchHandlers };
}

// ─────────────────────────────────────────────────────────────
// RIDEMITRA LOGO
// ─────────────────────────────────────────────────────────────
function RidemitraLogo() {
  return (
    <div className="rm-logo">
      <div className="rm-logo__pill">
        <div className="rm-logo__rbox">
          <span className="rm-logo__r">R</span>
        </div>
        <span className="rm-logo__text">idemitra</span>
      </div>
      <span className="rm-logo__tagline">Ride Smart. Ride with Mitra.</span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// CAR CARD
// ─────────────────────────────────────────────────────────────
function CarCard({ car, onBook }) {
  return (
    <div className="car-card-wrap">
      <div className="car-card">
        <img
          className="car-card__img"
          src={car.img}
          alt={car.name}
          draggable={false}
        />
        <div className="car-card__logo">
          <RidemitraLogo />
        </div>
        <div className="car-card__info">
          <div className="tag-car">
            <div className="car-card__name">{car.name}</div>
            <div className="car-card__tag">{car.tag}</div>
          </div>
          <div className="car-card__price">{car.price}</div>
        </div>
      </div>
      <button className="car-card__book-btn" onClick={() => onBook(car)}>
        BOOK NOW
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// FORM HELPERS
// ─────────────────────────────────────────────────────────────
const FRow = ({ children }) => <div className="form-row">{children}</div>;

const FInput = ({ label, value, onChange, placeholder, type = "text" }) => (
  <div className="form-field">
    <label className="form-label">{label}</label>
    <input
      className="form-input"
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  </div>
);


// ✅ NEW: DateInput — date fields ke liye visible placeholder overlay
const DateInput = ({ label, value, onChange }) => (
  <div className="form-field">
    <label className="form-label">{label}</label>
    <div style={{ position: "relative" }}>
      {/* Visible placeholder jab koi value nahi */}
      {!value && (
        <span style={{
          position: "absolute",
          left: "12px",
          top: "50%",
          transform: "translateY(-50%)",
          color: "#9ca3af",
          fontSize: "13px",
          pointerEvents: "none",
          zIndex: 1,
          userSelect: "none",
        }}>
          DD/MM/YYYY
        </span>
      )}
      <input
        className="form-input"
        type="date"
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{ color: value ? undefined : "transparent" }}
      />
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────
// BOOKING MODAL
// ─────────────────────────────────────────────────────────────
function BookingModal({ car, cars, onClose }) {
  const [step, setStep] = useState("choose");
  const [status, setStatus] = useState(null);

  const gInit = { name: "", phone: "", pickup: "", drop: "", date: "", carId: car?.id || "" };
  const hInit = { name: "", phone: "", carModel: "", year: "", city: "", docs: "" };
  const [g, setG] = useState(gInit);
  const [h, setH] = useState(hInit);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const handleGuestSubmit = async () => {
    if (!g.name || !g.phone || !g.pickup || !g.date) { setStatus("error"); return; }
    setStatus("loading");
    const res = await submitGuestBooking(g);
    setStatus(res.success ? "success" : "error");
    if (res.success) setG(gInit);
  };

  const handleHostSubmit = async () => {
    if (!h.name || !h.phone || !h.carModel || !h.city) { setStatus("error"); return; }
    setStatus("loading");
    const res = await submitHostListing(h);
    setStatus(res.success ? "success" : "error");
    if (res.success) setH(hInit);
  };

  const back = () => { setStep("choose"); setStatus(null); };

  return (
    <>
      <div className="modal-backdrop" onClick={onClose} />

      <div className="modal-card">
        {/* Header */}
        <div className="modal-header">
          <div>
            <div className="modal-header__title">
              {step === "choose" ? "How would you like to book?"
                : step === "guest" ? "Book as Guest"
                  : "List Your Car"}
            </div>
            {car && (
              <div className="modal-header__sub">{car.name} · {car.price}</div>
            )}
          </div>
          <button className="modal-header__close" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">

          {/* ── Choose step ── */}
          {step === "choose" && (
            <>
              <p className="modal-choose__sub">Select your role to continue with the booking.</p>
              <div className="modal-choose__options">
                {[
                  { key: "guest", icon: "ri-steering-2-line", title: "Guest", sub: "I want to rent a car" },
                  { key: "host", icon: "ri-home-4-line", title: "Host", sub: "I want to list my car" },
                ].map(opt => (
                  <button
                    key={opt.key}
                    className="modal-choose__btn"
                    onClick={() => { setStep(opt.key); setStatus(null); }}
                  >
                    <i className={`${opt.icon} modal-choose__icon`} />
                    <div className="modal-choose__title">{opt.title}</div>
                    <div className="modal-choose__desc">{opt.sub}</div>
                  </button>
                ))}
              </div>
            </>
          )}

          {/* ── Guest form ── */}
          {step === "guest" && (
            <>
              <button className="form-back-btn" onClick={back}>← Back</button>
              <FRow>
                <FInput label="Full Name *" value={g.name} onChange={v => setG({ ...g, name: v })} placeholder="Rahul Sharma" />
                <FInput label="Phone *" value={g.phone} onChange={v => setG({ ...g, phone: v })} placeholder="+91 98765 43210" type="tel" />
              </FRow>
              <FRow>
                <FInput label="Pickup Location *" value={g.pickup} onChange={v => setG({ ...g, pickup: v })} placeholder="Sector 18, Noida" />
                <FInput label="Drop Location" value={g.drop} onChange={v => setG({ ...g, drop: v })} placeholder="CP, Delhi" />
              </FRow>
              <FRow>
                <DateInput
                  label="Trip Date *"
                  value={g.date}
                  onChange={v => setG({ ...g, date: v })}
                />
                <div className="form-field">
                  <label className="form-label">Car</label>
                  <select className="form-select" value={g.carId} onChange={e => setG({ ...g, carId: e.target.value })}>
                    <option value="">Any available</option>
                    {cars.map(c => <option key={c.id} value={c.id}>{c.name} — {c.price}</option>)}
                  </select>
                </div>
              </FRow>
              {status === "error" && <p className="form-msg--error">Please fill all required fields.</p>}
              {status === "success" && <p className="form-msg--success">Booking sent on WhatsApp! We'll call you shortly.</p>}
              <button
                className="form-submit form-submit--guest"
                onClick={handleGuestSubmit}
                disabled={status === "loading"}
              >
                {status === "loading" ? "SENDING..." : "CONFIRM BOOKING →"}
              </button>
            </>
          )}

          {/* ── Host form ── */}
          {step === "host" && (
            <>
              <button className="form-back-btn" onClick={back}>← Back</button>
              <FRow>
                <FInput label="Your Name *" value={h.name} onChange={v => setH({ ...h, name: v })} placeholder="Anjali Mehta" />
                <FInput label="Phone *" value={h.phone} onChange={v => setH({ ...h, phone: v })} placeholder="+91 98765 43210" type="tel" />
              </FRow>
              <FRow>
                <FInput label="Car Model *" value={h.carModel} onChange={v => setH({ ...h, carModel: v })} placeholder="Maruti Swift Dzire" />
                <FInput label="Year" value={h.year} onChange={v => setH({ ...h, year: v })} placeholder="2020" type="number" />
              </FRow>
              <FRow>
                <FInput label="City *" value={h.city} onChange={v => setH({ ...h, city: v })} placeholder="Noida" />
                <div className="form-field">
                  <label className="form-label">Documents Ready?</label>
                  <select className="form-select" value={h.docs} onChange={e => setH({ ...h, docs: e.target.value })}>
                    <option value="">Select</option>
                    <option value="yes">Yes, all ready</option>
                    <option value="partial">Partially ready</option>
                    <option value="no">No, need help</option>
                  </select>
                </div>
              </FRow>
              {status === "error" && <p className="form-msg--error">Please fill all required fields.</p>}
              {status === "success" && <p className="form-msg--success">Request sent on WhatsApp! Our team will contact you soon.</p>}
              <button
                className="form-submit form-submit--host"
                onClick={handleHostSubmit}
                disabled={status === "loading"}
              >
                {status === "loading" ? "SENDING..." : "LIST MY CAR →"}
              </button>
            </>
          )}

        </div>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────
export default function TopCarsSection({ city = "Noida" }) {
  const { cars, loading } = useCars(city);
  const { page, totalPages, goTo, trackRef, mouseHandlers, touchHandlers } = useSlider(cars.length);
  const [selectedCar, setSelectedCar] = useState(null);

  const visibleCars = cars.slice(page * CARDS_PER_PAGE, (page + 1) * CARDS_PER_PAGE);

  return (
    <>
      <section className="tcs-section">
        <div className="tcs-inner">

          {/* Heading */}
          <div className="tcs-heading">
            <div className="tcs-heading-line tcs-heading-line--left" />
            <h2>Top Cars in <span>{city}</span></h2>
            <div className="tcs-heading-line tcs-heading-line--right" />
          </div>

          {/* Slider */}
          <div
            ref={trackRef}
            className="tcs-track"
            {...mouseHandlers}
            {...touchHandlers}
          >
            {loading ? (
              <div className="tcs-grid">
                {[1, 2, 3, 4].map(i => (
                  <div key={i}>
                    <div className="tcs-skeleton-card" />
                    <div className="tcs-skeleton-btn" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="tcs-grid">
                {visibleCars.map(car => (
                  <CarCard key={car.id} car={car} onBook={setSelectedCar} />
                ))}
              </div>
            )}
          </div>

          {/* Dots */}
          {!loading && (
            <div className="tcs-dots">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  className={`tcs-dot ${i === page ? "tcs-dot--active" : "tcs-dot--inactive"}`}
                  onClick={() => goTo(i)}
                />
              ))}
            </div>
          )}

        </div>
      </section>

      {/* Modal */}
      {selectedCar && (
        <BookingModal
          car={selectedCar}
          cars={cars}
          onClose={() => setSelectedCar(null)}
        />
      )}
    </>
  );
}