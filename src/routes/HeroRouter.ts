import { Router, Request, Response, NextFunction } from 'express';
import Hero = require('../models/Hero');

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
                response = { "error" : false,"message" : data};
            }
            res.status(200).send(response);
        });
    }

    /**
     * GET one hero by id
     */
    public getOne(req: Request, res: Response, next: NextFunction){
        let response = {};

        Hero.find({ id: parseInt(req.params.id) }, function(err, data){
            if(data){
                response = { "error" : false, "message" : data };
            }else{
                response = { "error": true, "message": "No hero found with the given id."};                
            }
            res.json(response);
        });
    }

    /**
     * Creates a new Hero
     */
    public postHero(req: Request, res: Response, next: NextFunction){
        var db = new Hero(req.body);
        var response = {};

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