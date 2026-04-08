export default async function handler(req, res) {
  const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vShDvniXzAzksHZDKvI8VHkGVl8vqJFkU-NhjK5qG-fIsmm1QU1gDILQ8ADgv2f3WoRRJtM-8H5SXdn/pub?gid=0&single=true&output=csv";
  try {
    const response = await fetch(SHEET_URL);
    if (!response.ok) throw new Error("Sheet fetch failed: " + response.status);
    const text = await response.text();
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "text/plain");
    res.setHeader("Cache-Control", "s-maxage=300"); // cache 5 min on Vercel edge
    res.status(200).send(text);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
