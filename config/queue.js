export const redisConnection = {
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST,
};

export const defaultQueueConfig = {
  removeOnComplete: {
    count: 100,
    age: 60 * 60 * 24,
  },
  attempts: 3,
  backoff: {
    type: "exponential",
    delay: 1000,
  },
  removeOnFail: {
    count: 1000,
  },
};
