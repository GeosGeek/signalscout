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


// Define the schema for the "properties" object
const digiPropsSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    parent_call: { type: String, required: true },
    call: { type: String, required: true },
    lastheard: { type: Date, required: true },
    grid: { type: String, required: true },
    heard: { type: Boolean, required: true },
    ssid: { type: String, default: null },
    last_port: { type: String, required: true },
    uid: { type: String, required: true },
    ports: { type: String, required: true },
});
  
// Define the schema for the "geometry" object
const geometrySchema = new Schema({
    type: { type: String, required: true },
    coordinates: {
      type: [Number], // Array of numbers representing the coordinates
      required: true,
    },
});
  
// Define the main schema
const digiSchema = new Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, required: true },
    type: { type: String, required: true },
    id: { type: String, required: true },
    geometry: { type: geometrySchema, required: true },
    geometry_name: { type: String, required: true },
    properties: { type: propertiesSchema, required: true },
});

// Create models
const hamModel = mongoose.model('hamrepeaters', hamSchema)
const gmrsModel = mongoose.model('gmrsrepeaters', gmrsSchema)
const digiModel = mongoose.model('digipeaters', digiSchema)

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