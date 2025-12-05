// DB CONNECTION
import { db, verifyDatabaseConnection } from './config/db.js';
//EXPRESS
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
const app = express();
//CORS
import cors from 'cors';
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:5000',
    process.env.ALLOWED_ORIGIN
].filter(Boolean);

app.use(cors({
    origin: function(origin, callback) {
        // Allow requests with no origin (like mobile apps or curl)
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin) || origin.includes('amplifyapp.com')) {
            callback(null, true);
        } else {
            callback(null, true); // Allow all for now, can restrict later
        }
    },
    credentials: true
}));
app.use(express.json()); //serving JSON

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//PORT
const PORT = 5000;

// Import routes
import userRoutes from './routes/userRoutes.js';
import leaderboardRoutes from './routes/leaderboardRoutes.js';

//----------------------ROUTES--------------------------
// API Routes
app.use('/api/auth', userRoutes);
app.use('/api/leaderboard', leaderboardRoutes);

// Basic test route
app.get('/api/test', (req, res) => {
    res.json({ message: 'Server is working!' });
});



//---------------------SERVE REACT FILES-----------------
// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, "..", "dist")));

// Catch-all route to serve the React app for client-side routing
app.get("/*splat", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "dist", "index.html"));
});

//--------------------SERVER START---------------------------
app.listen(PORT, async () => {
    console.log(`Server is running: http://localhost:${PORT}`);
    await verifyDatabaseConnection();
});
