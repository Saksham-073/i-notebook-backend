require("dotenv").config()
const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')
const { apiLimiter } = require('./middleware/rateLimiter')


const app = express()
const port = process.env.PORT || 5000

// Trust the first proxy hop so rate limiting sees the real client IP
// (needed when deployed behind a reverse proxy / load balancer).
if (process.env.TRUST_PROXY === 'true') {
    app.set('trust proxy', 1)
}

// Restrict CORS to the allowed origins listed in CORS_ORIGIN (comma-separated).
// If CORS_ORIGIN is not set, fall back to allowing all origins (dev only).
const allowedOrigins = process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(',').map(o => o.trim())
    : null;

app.use(cors({
    origin: function (origin, callback) {
        // Allow non-browser requests (no origin) and any origin when unrestricted
        if (!allowedOrigins || !origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error("Not allowed by CORS"));
    }
}))
app.use(express.json())

app.use('/api', apiLimiter)

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

connectToMongo().then(() => {
    app.listen(port, () => {
        console.log(`iNotebook backend listening on port ${port}`)
    })
})
