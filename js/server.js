const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.arguments(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/repeaters', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Define schema
const locationSchema = new mongoose.Schema({
    state: String,
    city: String,
    frequency: Float32Array,
    callsign: String,
    offset: Int16Array,
    notes: String,
    id: Int32Array,
    name: String,
    location: String,
    modified: String,
    type: String,
    owner: String,
    ori: String,
    travel: String,
    status: String,
    latitude: Float32Array,
    latitude: Float32Array,
    network: String,
    radius: Int16Array,
    haat: String,
    node: String,
    coordinates: {
        type: { type: String, enum: ['Point'], requried: true },
        coordinates: { type: [Number], required: true }
    }
});

const Location = mongoose.model('Location', locationSchema)

// Route to read locations
app.get('/api/locations', async (req, res) => {
    try {
        const locations = await Location.find();
        res.json(locaitons);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

app.listen(PORT, () => {
    console.log('Server running on http://localahost:${PORT}');
});