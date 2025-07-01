import { createClient } from 'redis';

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

export const redisClient = createClient({ url: redisUrl });

redisClient.on('error', (err: any) => {
  console.error('Erro no Redis:', err);
});

export async function connectRedis() {
  if (!redisClient.isOpen) {
    await redisClient.connect();
    console.log('Conectado ao Redis');
  }
}

export async function getCache<T>(key: string): Promise<T | null> {
  const cached = await redisClient.get(key);
  return cached ? JSON.parse(cached) : null;
}

export async function setCache<T>(key: string, value: T, ttlSeconds = 300): Promise<void> {
  await redisClient.set(key, JSON.stringify(value), { EX: ttlSeconds });
}
