const HAM_ENDPOINT = '/api/ham_repeaters'
const GMRS_ENDPOINT = '/api/gmrs_repeaters'
const DIGI_ENDPOINT = '/api/digipeaters'

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

// Middleware
app.use(bodyParser.json()); // Parse JSON bodies

// Import custom data models
const hamModel = require('../models/hamModel');
const gmrsModel = require('../models/gmrsModel');
const digiModel = require('../models/digiModel');

// Only start the server if not testing. e.g. Don't start the server for tests.
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/signalScout')
    .then(() => console.log('Connected to MongoDB!'))
    .catch((error) => console.log('MongoDB connection error: ', error));

// Serve HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

// Create ham repeaters
app.post(HAM_ENDPOINT, async (req, res) => {
    try {
        const { State, City, Frequency, Callsign, Offset, Notes, lat, lon } = req.body;
        // Validate input
        // TODO: ensure values below are valid (lat<=90, lon<180 & lat>-180, frequency is positive)
        if (!lat || !lon || !Frequency) {
            return res.status(400).json({ error: 'Invalid data (lat, lon, or frequency)' });
        }
        // Store validated record in corresponding mongo model
        const newRepeater = new hamModel({
            State,
            City,
            Frequency,
            Callsign,
            Offset,
            Notes,
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
app.get(HAM_ENDPOINT, async (req, result) => {
    try {
        const data = await hamModel.find().limit(10000); // Fetch Ham repeaters
        result.json(data);
    } catch (error) {
        result.status(500).json({ message: error.message });
    }
});

// Update ham repeaters
app.put(`${HAM_ENDPOINT}/:id`, async (req, res) => {
    try {
        // Parse returned data
        const { id } = req.params;
        const { State, City, Frequency, Callsign, Offset, Notes, lat, lon } = req.body;
        // Validate repeater parameters
        if (!lat || !lon || !Frequency) {
            return res.status(400).json({ error: 'Invalid parameters' });
        }
        // Update record in mongo by ID
        const updatedRepeater = await hamModel.findByIdAndUpdate(id, {
            State,
            City,
            Frequency,
            Callsign,
            Offset,
            Notes,
            lat,
            lon,
        }, { new: true }); // Ensure updated document is returned
        // Return 404 if data wasn't found
        if (!updatedRepeater) {
            return res.status(404).json({ error: 'Data not found' });
        }
        // Set status 200 if ham repeater has been updated in mongo
        res.status(200).json(updatedRepeater);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update repeater in mongo' });
    }
});

// Delete ham repeater
app.delete(`${HAM_ENDPOINT}/:id`, async (req, res) => {
    try {
        // Get id of returned repeater
        const { id } = req.params;
        // Delete that repeater
        const deletedRepeater = await hamModel.findByIdAndDelete(id);
        // 
        if (!deletedRepeater) {
            return res.status(404).json({ error: 'Data not found' });
        }
        // 
        res.status(200).json({ message: 'Data deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete data' });
    }
});

// Route to read gmrs repeaters
app.get(GMRS_ENDPOINT, async (req, result) => {
    try {
        const data = await gmrsModel.find().limit(10000); // Fetch all GMRS repeaters
        result.json(data);
    } catch (error) {
        result.status(500).json({ message: error.message });
    }
});

app.get(DIGI_ENDPOINT, async (req, result) => {
    try {
        const data = await digiModel.find().limit(10000); // Fetch all digipeaters
        result.json(data);
    } catch (error) {
        result.status(500).json({ message: error.message });
    }
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// Export endpoints for other modules
module.exports = HAM_ENDPOINT;
module.exports = GMRS_ENDPOINT;
module.exports = DIGI_ENDPOINT;