require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");


const routes=require('./routes');

const app = express();

/**
 * Trust proxy
 * Enable this if you deploy behind reverse proxy (Render, Nginx, Railway, etc.)
 */
app.set("trust proxy", 1);

/**
 * CORS Configuration
 * Adjust origin based on your frontend URL
 */
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:4200",
    credentials: true,
  })
);

/**
 * Security headers
 */
app.use(helmet());

/**
 * Request logging (dev-friendly)
 */
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

/**
 * Compress responses
 */
app.use(compression());

/**
 * Parse JSON and form data
 */
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

/**
 * Parse cookies
 */
app.use(cookieParser());

/**
 * Global Rate Limiter
 * Protects against abuse/spam
 */
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // limit each IP to 200 requests per window
  message: {
    success: false,
    message: "Too many requests, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use("/api", globalLimiter);

/**
 * Health check route
 */
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Coffee shop backend is running ☕",
  });
});
app.use('/api',routes);


/**
 * 404 Handler
 */
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

/**
 * Global Error Handler
 */
app.use((err, req, res, next) => {
  console.error("ERROR:", err);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

module.exports=app;
