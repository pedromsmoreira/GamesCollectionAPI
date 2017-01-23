import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import Hero = require('../src/models/Hero');

import app from '../src/App';

chai.use(chaiHttp);
const expect = chai.expect;

describe('GET api/v1/heroes', () => {

    it('responds with JSON array', () => {
        return chai.request(app).get('/api/v1/heroes')
        .then(res => {
            expect(res.status).to.equal(200);
            expect(res).to.be.json;
            expect(res.body).to.be.an('array');
            expect(res.body).to.have.length(5);        });
    });

    it('should include Wolverine', () => {
        return chai.request(app).get('/api/v1/heroes')
        .then(res => {
            let Wolverine = res.body.find(hero => hero.name === 'Wolverine');
            expect(Wolverine).to.exist;
            expect(Wolverine).to.have.all.keys([
                'id',
                'name'
            ]);
        });
    });

});

describe('GET api/v1/heroes/:id', () => {

    it('responds with single JSON object', () => {
        return chai.request(app).get('/api/v1/heroes/1')
        .then(res => {
            expect(res.status).to.equal(200);
            expect(res).to.be.json;
            expect(res.body).to.be.an('object');
        });
    });

    it('should return Luke Cage', () => {
        return chai.request(app).get('/api/v1/heroes/1')
        .then(res => {
            expect(res.body.hero.name).to.equal('Luke Cage');
        });
    });

});

    describe('POST api/v1/heroes', () => {

        it('should return error code 409', (done) => {
            let hero = {
                id: 4,
                name: "Iron Man 2",
                powers: []
            }

            return chai.request(app).post('/api/v1/heroes')
                .send(hero)
                .then(res => {
                    expect(res.status).to.equal(200);
                    done();
                });
        });
    });