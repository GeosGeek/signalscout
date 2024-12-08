const HAM_DATA = '/api/ham_repeaters'
const GMRS_DATA = '/api/gmrs_repeaters'
const DIGI_DATA = '/api/digipeaters'

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Import custom data models
const hamModel = require('../models/hamModel');
const gmrsModel = require('../models/gmrsModel');
const digiModel = require('../models/digiModel');

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/signalScout')
    .then(() => console.log('Connected to MongoDB!'))
    .catch((error) => console.log('MongoDB connection error: ', error));

// Serve HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

// Create ham repeaters
app.post(HAM_DATA, async (req, res) => {
    try {
        const { state, city, frequency, callsign, offset, notes, lat, lon } = req.body;
        // Validate input
        if (!lat || !lon || !frequency) {
            return res.status(400).json({ error: 'Invalid data' });
        }
        // Store validated record in corresponding mongo model
        const newRepeater = new hamModel({
            state,
            city,
            frequency,
            callsign,
            offset,
            notes,
            lat,
            lon,
        });
       // Save new record to mongo
       const savedRepeater = await newRepeater.save();
       res.status(201).json(savedRepeater);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create data' });
    }
});

// Route to read ham repeater data
app.get(HAM_DATA, async (req, result) => {
    try {
        const data = await hamModel.find(); // Fetch Ham repeaters
        result.json(data);
    } catch (error) {
        result.status(500).json({ message: error.message });
    }
});

// Route to read gmrs repeaters
app.get(GMRS_DATA, async (req, result) => {
    try {
        const data = await gmrsModel.find(); // Fetch all GMRS repeaters
        result.json(data);
    } catch (error) {
        result.status(500).json({ message: error.message });
    }
});

app.get(DIGI_DATA, async (req, result) => {
    try {
        const data = await digiModel.find(); // Fetch all digipeaters
        result.json(data);
    } catch (error) {
        result.status(500).json({ message: error.message });
    }
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});