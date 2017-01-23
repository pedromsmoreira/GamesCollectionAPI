import mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/local');

import IHero = require('./IHero');

interface IHeroModel extends IHero, mongoose.Document{ };

// Hero schema definition
var heroSchema = new mongoose.Schema(
    {
        id: { type: Number },
        name: { type: String, }
});

var Hero = mongoose.model<IHeroModel>("hero", heroSchema);

export = Hero;