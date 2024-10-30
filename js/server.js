const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.arguments(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/TABLE', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Define schema
const locationSchema = new mongoose.Schema({
    name: String,
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