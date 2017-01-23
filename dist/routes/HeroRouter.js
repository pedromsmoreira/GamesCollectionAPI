"use strict";
const express_1 = require("express");
const Hero = require("../models/Hero");
const Heroes = require('../data');
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
        res.send(Heroes);
    }
    /**
     * GET one hero by id
     */
    getOne(req, res, next) {
        let query = parseInt(req.params.id);
        let hero = Heroes.find(hero => hero.id === query);
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
        let newHero = new Hero(req.body);
        let heroExists = Heroes.find(hero => hero.name === newHero.name);
        if (heroExists) {
            // res.status(409)
            //     .send({
            //     status: 409,
            //     message: "Conflict! Hero already exists!" 
            //     });
            res.status(409)
                .json({
                message: "Conflict! Hero already exists!"
            });
        }
        else {
            newHero.save((err, hero) => {
                if (err) {
                    res.status(500)
                        .send({
                        status: 500,
                        message: err
                    });
                }
                else {
                    // res.status(204)
                    //     .send({
                    //         status: 204,
                    //         message: "Hero successfully added!",
                    //         body: hero });
                    res.json({
                        message: "Hero successfully added!",
                        body: hero
                    });
                }
            });
        }
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
