const cache = {};
const CACHE_TTL = 1000 * 60 * 60 * 24;

export function getFromCache(query) {
  const entry = cache[query];
  if (!entry) return null;

  const expired = Date.now() - entry.timestamp > CACHE_TTL;
  if (expired) {
    delete cache[query];
    return null;
  }

  return entry.data;
}

export function saveToCache(query, data) {
  cache[query] = {
    data,
    timestamp: Date.now(),
  };
}
