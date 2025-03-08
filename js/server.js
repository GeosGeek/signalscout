const HAM_DATA = '/api/ham_repeaters'
const GMRS_DATA = '/api/gmrs_repeaters'
const DIGI_DATA = '/api/digipeaters'

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

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

// Ham Repeater Endpoints
// Read
app.get(HAM_DATA, async (req, result) => {
    try {
        const data = await hamModel.find();
        result.json(data);
    } catch (error) {
        result.status(500).json({ message: error.message });
    }
});

// Create
app.post(HAM_DATA, async (req, result) => {
    const newHamRepeater = new hamModel(req.body);
    try {
        const savedRepeater = await newHamRepeater.save();
        result.status(201).json(savedRepeater);
    } catch (error) {
        result.status(400).json({ message: error.message });
    }
});

// Update
app.put(`${HAM_DATA}/:id`, async (req, result) => {
    try {
        const updatedRepeater = await hamModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        result.json(updatedRepeater);
    } catch (error) {
        result.status(400).json({ message: error.message });
    }
});

// Delete
app.delete(`${HAM_DATA}/:id`, async (req, result) => {
    try {
        await hamModel.findByIdAndDelete(req.params.id);
        result.json({ message: 'Ham repeater deleted' });
    } catch (error) {
        result.status(500).json({ message: error.message });
    }
});

// GMRS Repeater Endpoints
// Read
app.get(GMRS_DATA, async (req, result) => {
    try {
        const data = await gmrsModel.find();
        result.json(data);
    } catch (error) {
        result.status(500).json({ message: error.message });
    }
});

// Create
app.post(GMRS_DATA, async (req, result) => {
    const newGmrsRepeater = new gmrsModel(req.body);
    try {
        const savedRepeater = await newGmrsRepeater.save();
        result.status(201).json(savedRepeater);
    } catch (error) {
        result.status(400).json({ message: error.message });
    }
});

// Update
app.put(`${GMRS_DATA}/:id`, async (req, result) => {
    try {
        const updatedRepeater = await gmrsModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        result.json(updatedRepeater);
    } catch (error) {
        result.status(400).json({ message: error.message });
    }
});

// Delete
app.delete(`${GMRS_DATA}/:id`, async (req, result) => {
    try {
        await gmrsModel.findByIdAndDelete(req.params.id);
        result.json({ message: 'GMRS repeater deleted' });
    } catch (error) {
        result.status(500).json({ message: error.message });
    }
});

// Digital Repeater Endpoints
// Read
app.get(DIGI_DATA, async (req, result) => {
    try {
        const data = await digiModel.find();
        result.json(data);
    } catch (error) {
        result.status(500).json({ message: error.message });
    }
});

// Create
app.post(DIGI_DATA, async (req, result) => {
    const newDigiRepeater = new digiModel(req.body);
    try {
        const savedRepeater = await newDigiRepeater.save();
        result.status(201).json(savedRepeater);
    } catch (error) {
        result.status(400).json({ message: error.message });
    }
});

// Update
app.put(`${DIGI_DATA}/:id`, async (req, result) => {
    try {
        const updatedRepeater = await digiModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        result.json(updatedRepeater);
    } catch (error) {
        result.status(400).json({ message: error.message });
    }
});

// Delete
app.delete(`${DIGI_DATA}/:id`, async (req, result) => {
    try {
        await digiModel.findByIdAndDelete(req.params.id);
        result.json({ message: 'Digi repeater deleted' });
    } catch (error) {
        result.status(500).json({ message: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});