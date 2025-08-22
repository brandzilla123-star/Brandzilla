import fetch from "node-fetch";
import { getFromCache, saveToCache } from "../utils/searchCache.js";

export async function search(req, res) {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ error: "Missing query" });
  }

  try {
    const cached = getFromCache(q);
    if (cached) {
      return res.status(200).json({ source: "cache", ...cached });
    }

    const url = `https://www.googleapis.com/customsearch/v1?key=${
      process.env.GOOGLE_API_KEY
    }&cx=${process.env.GOOGLE_CX}&q=${encodeURIComponent(q)}`;

    const googleRes = await fetch(url);
    const data = await googleRes.json();

    if (data.error) {
      return res.status(400).json(data);
    }

    saveToCache(q, data);

    return res.status(200).json({ source: "google", ...data });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
