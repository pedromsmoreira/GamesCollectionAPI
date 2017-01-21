import { Router, Request, Response, NextFunction } from 'express';
const Heroes = require('../data');

export class HeroRouter {
    router: Router

    /**
     * Initialize the HeroRouter
     */
    /**
     *
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
     * Taker each handler and attach to one of the Express.Router's
     * endpoints.
     */
    init(){
        this.router.route('/')
            .get(this.getAll);

        this.router.route('/:id')
            .get(this.getOne);
    }     

}

// Create the HeroRouter and export its configured Express.Router
const heroRoutes = new HeroRouter();
heroRoutes.init();

export default heroRoutes.router;