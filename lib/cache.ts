// Enhanced cache with stats, cleanup, and health tracking

interface CacheEntry<T> {
  data: T;
  expiresAt: number;
  createdAt: number;
}

interface CacheStats {
  totalEntries: number;
  expiredEntries: number;
  totalSize: number; // rough estimate
  hitRate: number;
}

const cache = new Map<string, CacheEntry<any>>();
let hits = 0;
let misses = 0;

export function getCache<T>(key: string): T | null {
  const entry = cache.get(key);
  if (!entry) {
    misses++;
    return null;
  }
  if (Date.now() > entry.expiresAt) {
    cache.delete(key);
    misses++;
    return null;
  }
  hits++;
  return entry.data;
}

export function setCache<T>(key: string, data: T, ttlSeconds: number = 300): void {
  cache.set(key, {
    data,
    expiresAt: Date.now() + ttlSeconds * 1000,
    createdAt: Date.now(),
  });
}

export function getCacheStats(): CacheStats {
  let expired = 0;
  let size = 0;
  const now = Date.now();
  cache.forEach((entry) => {
    if (now > entry.expiresAt) expired++;
    size += JSON.stringify(entry.data).length;
  });
  const total = hits + misses;
  return {
    totalEntries: cache.size,
    expiredEntries: expired,
    totalSize: Math.round(size / 1024), // KB
    hitRate: total > 0 ? Math.round((hits / total) * 100) : 0,
  };
}

export function clearExpiredCache(): number {
  const now = Date.now();
  let cleared = 0;
  cache.forEach((entry, key) => {
    if (now > entry.expiresAt) {
      cache.delete(key);
      cleared++;
    }
  });
  return cleared;
}

export function clearAllCache(): void {
  cache.clear();
  hits = 0;
  misses = 0;
}

export function getCacheKeys(): string[] {
  return Array.from(cache.keys());
}

export async function fetchWithRetry(
  url: string,
  options?: RequestInit,
  retries: number = 3,
  baseDelay: number = 1000
): Promise<Response> {
  let lastError: Error | null = null;
  
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, {
        ...options,
        headers: {
          'User-Agent': 'MTG-Modern-Stats/1.0 (Personal Stats Site)',
          ...options?.headers,
        },
      });
      
      if (res.ok) return res;
      
      // If server error, retry; if client error, fail fast
      if (res.status >= 400 && res.status < 500) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }
      
      lastError = new Error(`HTTP ${res.status}: ${res.statusText}`);
    } catch (e) {
      lastError = e instanceof Error ? e : new Error(String(e));
    }
    
    if (i < retries - 1) {
      const delay = baseDelay * Math.pow(2, i); // exponential backoff
      await new Promise(r => setTimeout(r, delay));
    }
  }
  
  throw lastError || new Error('All retries failed');
}

export async function fetchWithCache<T>(
  url: string,
  options?: RequestInit,
  ttlSeconds: number = 300
): Promise<T> {
  const cacheKey = `fetch:${url}`;
  const cached = getCache<T>(cacheKey);
  if (cached) return cached;

  const res = await fetchWithRetry(url, options);
  const data = await res.json() as T;
  setCache(cacheKey, data, ttlSeconds);
  return data;
}
