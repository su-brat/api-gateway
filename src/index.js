if (!process.env.NODE_ENV?.toLowerCase()?.startsWith("prod")) {
  require("dotenv").config();
}

const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const limiter = require("./rate-limit");

const app = express();

// Globally, rate limit all requests to the API Gateway
app.use(
  limiter({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 60, // Limit each IP to 60 requests per minute
  })
);

// Proxy requests to haystack api if the path contains "/haystack"
app.use(
  "/haystack",
  limiter({
    prefix: "haystack:", // Prefix for the Redis keys
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 10, // Limit each IP to 10 requests per minute
  }),
  createProxyMiddleware({
    target: process.env.HAYSTACK_API_URL ?? "http://haystack-api:8000", // Flask service name and port from Docker Compose
    changeOrigin: true,
    pathRewrite: {
      "^/haystack": "", // remove "/haystack" from the forwarded request path
    },
  })
);

// Proxy all other requests to the existing API server
app.use(
  "/api",
  limiter({
    prefix: "api:", // Prefix for the Redis keys
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 50, // Limit each IP to 50 requests per minute
  }),
  createProxyMiddleware({
    target: process.env.API_SERVER_URL ?? "http://api-server:3000", // Express service name and port from Docker Compose
    changeOrigin: true,
    pathRewrite: {
      "^/api": "", // remove "/api" from the forwarded request path
    },
  })
);

/**
 * Handles the health check endpoint for the API Gateway.
 *
 * This endpoint is used to verify the availability of the API Gateway.
 * It returns a JSON response with a status of "OK" and a message indicating that the API Gateway is running.
 *
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 *
 * @returns {void}
 */
app.get("/health-check", (req, res) => {
  res.json({
    status: "OK",
    message: "API Gateway is running",
  });
});

// Start the orchestrator on port 4000
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Orchestrator app listening on port ${PORT}`);
});
