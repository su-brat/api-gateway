const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
if (!process.env.NODE_ENV?.toLowerCase()?.startsWith("prod")) {
  require("dotenv").config();
}
// Proxy requests to chatbot app if the path contains "/chatbot"
app.use(
  "/chatbot",
  createProxyMiddleware({
    target: process.env.CHATBOT_URL ?? "http://chatbot-app:5000", // Flask service name and port from Docker Compose
    changeOrigin: true,
    pathRewrite: {
      "^/chatbot": "", // remove "/chatbot" from the forwarded request path
    },
  })
);

// Proxy all other requests to the existing API server
app.use(
  "/api",
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
  })
})

// Start the orchestrator on port 4000
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Orchestrator app listening on port ${PORT}`);
});
