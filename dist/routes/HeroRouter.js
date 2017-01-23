"use strict";
const express_1 = require("express");
const Hero = require("../models/Hero");
// const Heroes = require('../data');
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
            res.json(response);
        });
        // res.send(heroes);
        // res.send(Heroes);
    }
    /**
     * GET one hero by id
     */
    getOne(req, res, next) {
        let query = parseInt(req.params.id);
        let hero = Hero.find(hero => hero.id === query);
        // let hero = Heroes.find(hero => hero.id === query);
        if (hero) {
            res.status(200)
                .send({
                message: 'Success',
                status: res.status,
                hero
            });
        }
        else {
            res.status(400)
                .send({
                message: 'No hero found with the given id.',
                status: res.status
            });
        }
    }
    /**
     * Creates a new Hero
     */
    postHero(req, res, next) {
        var db = new Hero();
        var response = {};
        db.id = req.body.id;
        db.name = req.body.name;
        db.powers = req.body.powers;
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
