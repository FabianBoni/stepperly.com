import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

export async function checkAndUpdateSearchLimit(ip: string): Promise<boolean> {
  const key = `search_limit:${ip}`
  const searchCount = await redis.get(key)
  
  if (!searchCount) {
    await redis.set(key, 1, { ex: 86400 }) // Expires in 24 hours
    return true
  }
  
  return false
}