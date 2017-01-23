"use strict";
const express_1 = require("express");
const Hero = require("../models/Hero");
class HeroRouter {
    /**
     * Initialize the HeroRouter
     */
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    /**
     * GET all Heroes
     */
    getAll(req, res, next) {
        var response = {};
        let heroes = Hero.find({}, function (err, data) {
            if (err) {
                response = { "error": true, "message": "Error fetching data" };
            }
            else {
                response = { "error": false, "message": data };
            }
            res.status(200).send(response);
        });
    }
    /**
     * GET one hero by id
     */
    getOne(req, res, next) {
        let response = {};
        Hero.find({ id: parseInt(req.params.id) }, function (err, data) {
            if (data) {
                response = { "error": false, "message": data };
            }
            else {
                response = { "error": true, "message": "No hero found with the given id." };
            }
            res.json(response);
        });
    }
    /**
     * Creates a new Hero
     */
    postHero(req, res, next) {
        var db = new Hero(req.body);
        var response = {};
        db.save(function (err) {
            if (err) {
                response = { "error": true, "message": err };
            }
            else {
                response = { "error": false, "message": "Data added" };
            }
            res.json(response);
        });
    }
    /**
     * Taker each handler and attach to one of the Express.Router's
     * endpoints.
     */
    init() {
        this.router.route('/')
            .get(this.getAll)
            .post(this.postHero);
        this.router.route('/:id')
            .get(this.getOne);
    }
}
exports.HeroRouter = HeroRouter;
// Create the HeroRouter and export its configured Express.Router
const heroRoutes = new HeroRouter();
heroRoutes.init();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = heroRoutes.router;
