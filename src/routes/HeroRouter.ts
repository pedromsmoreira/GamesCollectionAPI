import { Router, Request, Response, NextFunction } from 'express';
import Hero = require('../models/Hero');

// const Heroes = require('../data');

export class HeroRouter {
    router: Router

    /**
     * Initialize the HeroRouter
     */
    constructor() {
        this.router = Router();
        this.init();
    }

    /**
     * GET all Heroes
     */
    public getAll(req: Request, res: Response, next: NextFunction){
        var response = {};
        let heroes = Hero.find({}, function(err, data){
            if(err){
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {"error" : false,"message" : data};
            }
            res.json(response);
        });
        // res.send(heroes);
        // res.send(Heroes);
    }

    /**
     * GET one hero by id
     */
    public getOne(req: Request, res: Response, next: NextFunction){
        let query = parseInt(req.params.id);
        let hero = Hero.find(hero => hero.id === query);
        // let hero = Heroes.find(hero => hero.id === query);
        if(hero){
            res.status(200)
                .send({
                    message: 'Success',
                    status: res.status,
                    hero
                });
        }else{
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
    public postHero(req: Request, res: Response, next: NextFunction){
        var db = new Hero();
        var response = {};

        db.id = req.body.id;
        db.name = req.body.name;
        db.powers = req.body.powers;

        db.save(function(err){
            if(err){
                response = { "error" : true,"message" : err };
            }else{
                response = { "error": false, "message": "Data added" };
            }
            res.json(response);
        });
    }

    /**
     * Taker each handler and attach to one of the Express.Router's
     * endpoints.
     */
    init(){
        this.router.route('/')
            .get(this.getAll)
            .post(this.postHero);

        this.router.route('/:id')
            .get(this.getOne);
    }     

}

// Create the HeroRouter and export its configured Express.Router
const heroRoutes = new HeroRouter();
heroRoutes.init();

export default heroRoutes.router;