const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// Default cache size
const DEFAULT_MAX_CACHE_SIZE = 10;
let cache = new Map(); // Using Map to maintain insertion order

// POST /cache → Stores a key-value pair
app.post('/cache', (req, res) => {
    const { key, value } = req.body;
    if (!key || !value) {
        return res.status(400).json({ error: 'Key and value are required' });
    }

    // If the cache has reached its maximum size, return an error
    if (cache.size >= DEFAULT_MAX_CACHE_SIZE) {
        return res.status(400).json({ error: Cache is full (max size: ${DEFAULT_MAX_CACHE_SIZE}), cannot add more items });
    }

    // Add the new key-value pair to the cache
    cache.set(key, value);
    res.json({ message: 'Stored successfully', key, value });
});

// GET /cache/{key} → Retrieves a value (if exists)
app.get('/cache/:key', (req, res) => {
    const { key } = req.params;
    if (!cache.has(key)) {
        return res.status(404).json({ error: 'Key not found' });
    }

    const value = cache.get(key);
    res.json({ key, value });
});

// DELETE /cache/{key} → Remove from cache
app.delete('/cache/:key', (req, res) => {
    const { key } = req.params;
    if (!cache.has(key)) {
        return res.status(404).json({ error: 'Key not found' });
    }

    cache.delete(key);
    res.json({ message: 'Deleted successfully', key });
});

app.get('/', (req, res) => {
    res.send('Server is running!');
});

// Exporting the handler function for Vercel serverless
module.exports = app;
