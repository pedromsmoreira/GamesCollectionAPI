import { Router, Request, Response, NextFunction } from 'express';
import * as mongoose from 'mongoose';
import Hero = require('../models/Hero');

const Heroes = require('../data');

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
        res.send(Heroes);
    }

    /**
     * GET one hero by id
     */
    public getOne(req: Request, res: Response, next: NextFunction){
        let query = parseInt(req.params.id);
        let hero = Heroes.find(hero => hero.id === query);
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
        let newHero = new Hero(req.body);

        let heroExists = Heroes.find(hero => hero.name === newHero.name);

        if(heroExists) {
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
        else{
            newHero.save((err, hero) => {
                if(err){
                    res.status(500)
                        .send({
                            status: 500,
                            message: err
                            });
                    // res.json({
                    //     message: err
                    // });
                }
                else{
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