export default async function handler(req, res) {
  // URL target (Google Apps Script kamu)
  const targetUrl = "https://script.google.com/macros/s/AKfycb.../exec";

  // gabung query string dari request Canva
  const url = `${targetUrl}?${new URLSearchParams(req.query)}`;

  try {
    const response = await fetch(url, {
      method: req.method, // GET/POST sesuai request
      headers: { "Content-Type": "application/json" }
    });

    const text = await response.text();

    // ✅ FIX: tambahin header CORS
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
      // preflight request → langsung balas OK
      res.status(200).end();
      return;
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200).send(text);

  } catch (error) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(500).json({ error: error.toString() });
  }
}
