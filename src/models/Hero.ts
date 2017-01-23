import * as mongoose from "mongoose";
import IHero = require('./IHero');

interface IHeroModel extends IHero, mongoose.Document{ };

// Hero schema definition
var heroSchema = new mongoose.Schema(
    {
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

var Hero = mongoose.model<IHeroModel>("hero", heroSchema);

export = Hero;