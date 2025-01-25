type CacheValue<T> = {
    value: T;
    expire: number | null;
};

class CacheManager<T> {
    private cache: Map<string, CacheValue<T>> = new Map();

    set(key: string, value: T, ttl?: number): void {
        const expire = ttl ? Date.now() + ttl : null;
        this.cache.set(key, {
            value,
            expire,
        });
    }

    get(key: string): T | null {
        const cacheEntry = this.cache.get(key);

        if (!cacheEntry) {
            return null;
        }

        if (cacheEntry.expire && cacheEntry.expire < Date.now()) {
            this.cache.delete(key);
            return null;
        }

        return cacheEntry.value;
    }

    delete(key: string): void {
        this.cache.delete(key);
    }

    clear(): void {
        this.cache.clear();
    }

    has(key: string): boolean {
        const cacheEntry = this.cache.get(key);

        if (!cacheEntry) {
            return false;
        }

        if (cacheEntry.expire && cacheEntry.expire < Date.now()) {
            this.cache.delete(key);
            return false;
        }

        return true;
    }
}

export const otpSignUpCacheManager = new CacheManager<{
    first_name: string;
    last_name: string;
    email: string;
    otp: string;
    password: string;
}>();
