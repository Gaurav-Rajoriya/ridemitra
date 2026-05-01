const API_BASE = "https://askulglobal.com/backend"; // ← tera server

let WHATSAPP_NUMBER = "8400002841";

// ─────────────────────────────────────────────────────────────
// Fetch Cars from Backend
// ─────────────────────────────────────────────────────────────
export async function fetchCars(city = "Noida") {
  try {
    const res  = await fetch(`${API_BASE}/api.php?action=cars&city=${encodeURIComponent(city)}`);
    const data = await res.json();
    return data.success ? data.cars : [];
  } catch (e) {
    console.error("fetchCars error:", e);
    return [];
  }
}

// ─────────────────────────────────────────────────────────────
// Fetch Hero Settings from Backend
// ─────────────────────────────────────────────────────────────
export async function fetchHeroSettings() {
  try {
    const res  = await fetch(`${API_BASE}/api.php?action=hero`);
    const data = await res.json();
    return data.success ? data.settings : {};
  } catch (e) {
    console.error("fetchHeroSettings error:", e);
    return {};
  }
}

// ─────────────────────────────────────────────────────────────
// Guest Booking → WhatsApp (same as before)
// ─────────────────────────────────────────────────────────────
export async function submitGuestBooking(data) {
  const msg =
`🚗 *New RideMitra Booking!*

👤 *Name:* ${data.name}
📱 *Phone:* ${data.phone}
📍 *Pickup:* ${data.pickup}
📍 *Drop:* ${data.drop || "Not specified"}
📅 *Date:* ${data.date}
🚗 *Car ID:* ${data.carId || "Any available"}

_Booked via RideMitra App_`;

  window.open(
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`,
    "_blank"
  );

  return { success: true, bookingId: "BK" + Date.now() };
}

// ─────────────────────────────────────────────────────────────
// Host Listing → WhatsApp (same as before)
// ─────────────────────────────────────────────────────────────
export async function submitHostListing(data) {
  const msg =
`🏠 *New RideMitra Host Request!*

👤 *Name:* ${data.name}
📱 *Phone:* ${data.phone}
🚗 *Car Model:* ${data.carModel}
📅 *Year:* ${data.year || "Not specified"}
📍 *City:* ${data.city}
📄 *Documents:* ${data.docs || "Not specified"}

_Host registration via RideMitra App_`;

  window.open(
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`,
    "_blank"
  );

  return { success: true, listingId: "LT" + Date.now() };
}