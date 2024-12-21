export class ExpiringTokenBucket<_Key> {
  public max: number;
  public expiresInSeconds: number;

  private storage = new Map<_Key, ExpiringBucket>();

  constructor(max: number, expiresInSeconds: number) {
    this.max = max;
    this.expiresInSeconds = expiresInSeconds;
  }

  public check(key: _Key, cost: number): boolean {
    const bucket = this.storage.get(key) ?? null;
    const now = Date.now();
    if (bucket === null) {
      return true;
    }
    if (now - bucket.createdAt >= this.expiresInSeconds * 1000) {
      return true;
    }
    return bucket.count >= cost;
  }

  public consume(key: _Key, cost: number): boolean {
    let bucket = this.storage.get(key) ?? null;
    const now = Date.now();
    if (bucket === null) {
      bucket = {
        count: this.max - cost,
        createdAt: now,
      };
      this.storage.set(key, bucket);
      return true;
    }
    if (now - bucket.createdAt >= this.expiresInSeconds * 1000) {
      bucket.count = this.max;
    }
    if (bucket.count < cost) {
      return false;
    }
    bucket.count -= cost;
    this.storage.set(key, bucket);
    return true;
  }

  public reset(key: _Key): void {
    this.storage.delete(key);
  }
}

interface ExpiringBucket {
  count: number;
  createdAt: number;
}
