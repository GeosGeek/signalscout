const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define gmrsRepeater schema
const gmrsSchema = new mongoose.Schema({
    id: { type: Number, required: false },
    name: { type: String, required: false },
    location: { type: String, required: false },
    state: { type: String, required: false },
    modified: { type: Date, required: false },
    frequency: { type: Number, required: false },
    type: { type: String, required: false },
    owner: { type: String, required: false },
    ori: { type: String, required: false },
    travel: { type: String, required: false },
    status: { type: String, required: false },
    latitude: { type: Number, required: false },
    latitude: { type: Number, required: false },
    network: { type: String, required: false },
    radius: { type: Number, required: false },
    haat: { type: String, required: false },
    node: { type: String, required: false },
});

// Create the model
const gmrsModel = mongoose.model('gmrsrepeaters', gmrsSchema);

// Export the model
module.exports = gmrsModel;