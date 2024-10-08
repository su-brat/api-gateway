const RedisClient = require("ioredis");

const redisConnectionString = process.env.REDIS_URL || "redis://127.0.0.1:6379";

// Create a `ioredis` client
const client = new RedisClient(redisConnectionString);

module.exports = client;