"use strict";
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/local');
;
// Hero schema definition
var heroSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    name: { type: String, required: true },
    aliases: { type: Array },
    occupation: { type: String },
    gender: { type: String },
    height: {
        ft: Number,
        in: Number
    },
    hair: { type: String },
    eyes: { type: String },
    powers: { type: Array }
});
var Hero = mongoose.model("hero", heroSchema);
module.exports = Hero;
