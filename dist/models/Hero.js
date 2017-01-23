"use strict";
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/local');
;
// Hero schema definition
var heroSchema = new mongoose.Schema({
    id: { type: Number },
    name: { type: String, }
});
var Hero = mongoose.model("hero", heroSchema);
module.exports = Hero;
