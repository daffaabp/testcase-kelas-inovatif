import { Redis } from "@upstash/redis"

if (!process.env.UPSTASH_REDIS_REST_URL) {
    throw new Error('Missing UPSTASH_REDIS_REST_URL')
}
if (!process.env.UPSTASH_REDIS_REST_TOKEN) {
    throw new Error('Missing UPSTASH_REDIS_REST_TOKEN')
}

const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN
})

export default redis

// Contoh penggunaan:
/*
// string
await redis.set('key', 'value');
const data = await redis.get('key');

// sorted set
await redis.zadd('scores', { score: 1, member: 'team1' });
const scores = await redis.zrange('scores', 0, 100);

// list
await redis.lpush('elements', 'magnesium');
const elements = await redis.lrange('elements', 0, 100);

// hash
await redis.hset('people', { name: 'joe' });
const name = await redis.hget('people', 'name');

// sets
await redis.sadd('animals', 'cat');
const animal = await redis.spop('animals', 1);
*/