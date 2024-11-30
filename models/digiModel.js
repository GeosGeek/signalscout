const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
const geometrySchema = new mongoose.Schema({
    type: { type: String, required: true },
    coordinates: {
      type: [Number], // Array of numbers representing the coordinates
      required: true,
    },
});
  
// Define the main schema
const digiSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, required: true },
    type: { type: String, required: true },
    id: { type: String, required: true },
    geometry: { type: geometrySchema, required: true },
    geometry_name: { type: String, required: true },
    properties: { type: digiPropsSchema, required: true },
});

// Create the model
const digiModel = mongoose.model('digipeaters', digiSchema);

// Export the models
module.exports = digiModel;