export default async function handler(req, res) {
  const targetUrl = "https://script.google.com/macros/s/AKfycb.../exec";
  const url = `${targetUrl}?${new URLSearchParams(req.query)}`;
  
  const response = await fetch(url);
  const text = await response.text();
  
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");
  res.status(200).send(text);
}
