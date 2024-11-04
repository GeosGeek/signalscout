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
    state: String,
    city: String,
    frequency: mongoose.Decimal128,
    callsign: String,
    offset: Int16Array,
    notes: String,
    lat: mongoose.Decimal128,
    long: mongoose.Decimal128,
});

// Define gmrsRepeater schema
const gmrsSchema = new mongoose.Schema({
    id: Int32Array,
    name: String,
    location: String,
    state: String,
    modified: Date,
    frequency: mongoose.Decimal128,
    type: String,
    owner: String,
    ori: String,
    travel: String,
    status: String,
    latitude: mongoose.Decimal128,
    latitude: mongoose.Decimal128,
    network: String,
    radius: Int16Array,
    haat: String,
    node: String,
});

// Create models
const hamModel = mongoose.model('hamRepeaters', hamSchema)
const gmrsModel = mongoose.model('gmrsRepeaters', gmrsSchema)

// Route to read locations
app.get('/ham_repeaters', async (req, res) => {
    try {
        const data = await hamModel.find(); // Fetch all documents
        result.json(data);
    } catch (error) {
        result.status(500).json({ message: error.message });
    }
});

app.listen(PORT, () => {
    console.log('Server running on http://localahost:${PORT}');
});