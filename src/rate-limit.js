const { rateLimit } = require("express-rate-limit");
const { RedisStore } = require("rate-limit-redis");

const redisClient = require("./redis-client");

// Create and use the rate limiter
const limiter = ({
  prefix = "",
  windowMs,
  max,
  standardHeaders = true,
  legacyHeaders = false,
}) =>
  rateLimit({
    // Rate limiter configuration
    windowMs: windowMs,
    max: max,
    standardHeaders: standardHeaders, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: legacyHeaders, // Rate limit info in `X-RateLimit-*` headers

    // Redis store configuration
    store: new RedisStore({
      sendCommand: (...args) => redisClient.call(...args),
    }),

    // Key generator function
    keyGenerator: (req) => prefix + req.ip,
  });

module.exports = limiter;
