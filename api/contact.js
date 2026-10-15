// Request form. Sends through Resend when configured; otherwise answers in demo mode.
const LABELS = {
  name: "Name", phone: "Phone", email: "Email", vehicle: "Vehicle", service: "Service", date: "Preferred date",
  address: "Address", piece: "Item", mileage: "Mileage", timing: "Timing", notes: "Details",
};

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  const body = typeof req.body === "string" ? safeParse(req.body) : (req.body || {});
  if (body.website) return res.status(200).json({ success: true }); // honeypot

  if (!body.name || !body.phone) {
    return res.status(400).json({ success: false, message: "Please add your name and phone number." });
  }

  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    return res.status(200).json({ success: true, demo: true });
  }

  const rows = Object.entries(LABELS)
    .map(([key, label]) => [label, body[key]])
    .filter(([, value]) => value);

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: CONTACT_FROM_EMAIL,
        to: [CONTACT_TO_EMAIL],
        reply_to: body.email || undefined,
        subject: `Website request: ${String(body.name).slice(0, 80)}`,
        html: rows.map(([label, value]) => `<p><strong>${label}:</strong><br/>${escapeHtml(String(value).slice(0, 3000))}</p>`).join(""),
      }),
      signal: AbortSignal.timeout(12000),
    });
    if (!response.ok) throw new Error(`Resend responded ${response.status}`);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Request form error:", error);
    return res.status(502).json({ success: false, message: "We couldn't send that right now. Please call us instead." });
  }
}

function safeParse(value) {
  try { return JSON.parse(value); } catch { return {}; }
}

function escapeHtml(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}
