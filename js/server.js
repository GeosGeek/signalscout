const HAM_DATA = '/data/ham_repeaters'
const GMRS_DATA = '/data/gmrs_repeaters'

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/signalScout', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Define hamRepeater schema
const hamSchema = new mongoose.Schema({
    state: { type: mongoose.String, required: false },
    city: mongoose.String,
    frequency: mongoose.Decimal128,
    callsign: mongoose.String,
    offset: mongoose.Int16Array,
    notes: mongoose.String,
    lat: mongoose.Decimal128,
    long: mongoose.Decimal128,
});

// Define gmrsRepeater schema
const gmrsSchema = new mongoose.Schema({
    id: mongoose.Int16Array,
    name: mongoose.String,
    location: mongoose.String,
    state: { type: mongoose.String, required: false },
    modified: mongoose.Date,
    frequency: mongoose.Decimal128,
    type: mongoose.String,
    owner: mongoose.String,
    ori: mongoose.String,
    travel: mongoose.String,
    status: mongoose.String,
    latitude: mongoose.Decimal128,
    latitude: mongoose.Decimal128,
    network: mongoose.String,
    radius: mongoose.Int16Array,
    haat: mongoose.String,
    node: mongoose.String,
});

// Create models
const hamModel = mongoose.model('hamRepeaters', hamSchema)
const gmrsModel = mongoose.model('gmrsRepeaters', gmrsSchema)

// Route to read ham repeater data
app.get('/api/ham_repeaters', async (req, res) => {
    try {
        const data = await hamModel.find(); // Fetch all documents
        result.json(data);
    } catch (error) {
        result.status(500).json({ message: error.message });
    }
});

// Route to read gmrs repeaters
app.get('/api/gmrs_repeaters', async (req, res) => {
    try {
        const data = await gmrsModel.find(); // Fetch all documents
        result.json(data);
    } catch (error) {
        result.status(500).json({ message: error.message });
    }
});

app.listen(PORT, () => {
    console.log('Server running on http://localahost:${PORT}');
});