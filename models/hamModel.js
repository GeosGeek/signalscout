const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define hamRepeater schema
const hamSchema = new Schema({
    state: { type: String, required: false },
    city: { type: String, required: false },
    frequency: { type: Number, required: false },
    callsign: { type: String, required: false }, 
    offset: { type: Number, required: false },
    notes: { type: String, required: false },
    lat: { type: Number, required: false },
    long: {type: Number, required: false },
});

// Create the mongodb model
const hamModel = mongoose.model('hamrepeaters', hamSchema);

// Export the model
module.exports = hamModel;
