// DB CONNECTION
const { connectDatabase } = require('./config/db');
//EXPRESS
const express = require('express');
const path = require('path');
const app = express();
//CORS
const cors = require('cors');
app.use(cors());
app.use(express.json()); //serving JSON
//PORT
const PORT = 5000;




//----------------------ROUTES--------------------------



//---------------------SERVE REACT FILES-----------------
// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, "..", "dist")));

// Catch-all route to serve the React app for client-side routing
app.get("/*splat", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "dist", "index.html"));
});

//--------------------SERVER START---------------------------
app.listen(PORT, () => {
    console.log(`Server is running: http://localhost:${PORT}`);
})
