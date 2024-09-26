import redis from "express-redis-cache";

const redisCache = redis({
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST,
  prefix: process.env.REDIS_PREFIX,
  expire: 60 * 60,
});

export default redisCache;
