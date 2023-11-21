const mongoose = require("mongoose");

// Create schema
const Schema = mongoose.Schema;
const LoginSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// Collection Part
const collection = new mongoose.model("user", LoginSchema);
module.exports = collection;