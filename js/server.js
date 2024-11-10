const HAM_DATA = '/api/ham_repeaters'
const GMRS_DATA = '/api/gmrs_repeaters'

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/signalScout')
    .then(() => console.log('Connected to MongoDB!'))
    .catch((error) => console.log('MongoDB connection error: ', error));

// Define hamRepeater schema
const hamSchema = new mongoose.Schema({
    state: { type: mongoose.Schema.Types.String, required: false },
    city: { type: mongoose.Schema.Types.String, required: false },
    frequency: { type: mongoose.Schema.Types.Number, required: false },
    callsign: { type: mongoose.Schema.Types.String, required: false }, 
    offset: { type: mongoose.Schema.Types.Number, required: false },
    notes: { type: mongoose.Schema.Types.String, required: false },
    lat: { type: mongoose.Schema.Types.Number, required: false },
    long: {type: mongoose.Schema.Types.Number, required: false },
});

// Define gmrsRepeater schema
const gmrsSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.Number, required: false },
    name: { type: mongoose.Schema.Types.String, required: false },
    location: { type: mongoose.Schema.Types.String, required: false },
    state: { type: mongoose.Schema.Types.String, required: false },
    modified: { type: mongoose.Schema.Types.Date, required: false },
    frequency: { type: mongoose.Schema.Types.Number, required: false },
    type: { type: mongoose.Schema.Types.String, required: false },
    owner: { type: mongoose.Schema.Types.String, required: false },
    ori: { type: mongoose.Schema.Types.String, required: false },
    travel: { type: mongoose.Schema.Types.String, required: false },
    status: { type: mongoose.Schema.Types.String, required: false },
    latitude: { type: mongoose.Schema.Types.Number, required: false },
    latitude: { type: mongoose.Schema.Types.Number, required: false },
    network: { type: mongoose.Schema.Types.String, required: false },
    radius: { type: mongoose.Schema.Types.Number, required: false },
    haat: { type: mongoose.Schema.Types.String, required: false },
    node: { type: mongoose.Schema.Types.String, required: false },
});

// Create models
const hamModel = mongoose.model('hamrepeaters', hamSchema)
const gmrsModel = mongoose.model('gmrsrepeaters', gmrsSchema)

// Route to read ham repeater data
app.get(HAM_DATA, async (req, result) => {
    try {
        const data = await hamModel.find(); // Fetch all documents
        result.json(data);
    } catch (error) {
        result.status(500).json({ message: error.message });
    }
});

// Route to read gmrs repeaters
app.get(GMRS_DATA, async (req, result) => {
    try {
        const data = await gmrsModel.find(); // Fetch all documents
        result.json(data);
    } catch (error) {
        result.status(500).json({ message: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});