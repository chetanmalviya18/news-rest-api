import redis from "express-redis-cache";

const redisCache = redis({
  port: 6379,
  host: "localhost",
  prefix: "news_backend",
  expire: 60 * 60,
});

export default redisCache;
