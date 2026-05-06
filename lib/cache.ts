// Simple in-memory cache for serverless environment
// In production, consider Redis or Vercel KV

interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}

const cache = new Map<string, CacheEntry<any>>();

export function getCache<T>(key: string): T | null {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    cache.delete(key);
    return null;
  }
  return entry.data;
}

export function setCache<T>(key: string, data: T, ttlSeconds: number = 300): void {
  cache.set(key, {
    data,
    expiresAt: Date.now() + ttlSeconds * 1000,
  });
}

export async function fetchWithCache<T>(
  url: string,
  options?: RequestInit,
  ttlSeconds: number = 300
): Promise<T> {
  const cacheKey = `fetch:${url}`;
  const cached = getCache<T>(cacheKey);
  if (cached) return cached;

  const res = await fetch(url, {
    ...options,
    headers: {
      'User-Agent': 'MTG-Modern-Stats/1.0 (Personal Stats Site)',
      ...options?.headers,
    },
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  }

  const data = await res.json() as T;
  setCache(cacheKey, data, ttlSeconds);
  return data;
}
