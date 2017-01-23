"use strict";
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const HeroRouter_1 = require("./routes/HeroRouter");
// Creates and configures an ExpressJS web server
class App {
    // Run configuration methods on the Express instance
    constructor() {
        //db options
        this.options = {
            server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
            replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
        };
        this.express = express();
        this.middleware();
        this.routes();
    }
    // Configure Express middleware
    middleware() {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }
    // Configure API endpoints
    routes() {
        /* This is just to get up and running, and to make sure what we've got is
        * working so far. This function will change when we start to add more
        * API endpoints */
        mongoose.connect('mongodb://localhost:27017/gamesdb', this.options);
        let db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error: '));
        let router = express.Router();
        // placeholder route handler
        router.get('/', (req, res, next) => {
            res.json({
                message: 'Hello World!'
            });
        });
        this.express.use('/', router);
        this.express.use('/api/v1/heroes', HeroRouter_1.default);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = new App().express;
