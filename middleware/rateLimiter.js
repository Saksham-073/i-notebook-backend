const rateLimit = require('express-rate-limit');

// General limiter applied to all API requests
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 300,                 // limit each IP to 300 requests per window
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: "Too many requests, please try again later." }
});

// Stricter limiter for authentication routes to slow brute-force attempts
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10,                  // limit each IP to 10 auth attempts per window
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: "Too many authentication attempts, please try again later." }
});

module.exports = { apiLimiter, authLimiter };
