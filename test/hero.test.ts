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
            expect(res.body.message).to.be.an('array');
            expect(res.body.message).to.have.length(7);
            });
    });

    it('should include Wolverine', () => {
        return chai.request(app).get('/api/v1/heroes')
        .then(res => {
            let Wolverine = res.body.message.find(hero => hero.name === 'Wolverine');
            expect(Wolverine).to.exist;
            expect(Wolverine).to.have.all.keys([
                '_id',
                '__v',
                'id',
                'name',
                'aliases',
                'occupation',
                'gender',
                'height',
                'hair',
                'eyes',
                'powers'
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
            expect(res.body.message).to.be.an('array');
        });
    });

    it('should return Luke Cage', () => {
        return chai.request(app).get('/api/v1/heroes/1')
        .then(res => {
            expect(res.body.message[0].name).to.equal('Luke Cage');
        });
    });

});

    describe('POST api/v1/heroes', () => {

        it('should return error code 200', (done) => {
            let hero = {
                id: 7,
                name: "Iron Man 2",
                powers: []
            }

            return chai.request(app).post('/api/v1/heroes')
                .send(hero)
                .end(res => {
                    expect(res.status).to.equal(200);
                    expect(res.body.message).to.be.an('object');
                    done();
                });
        });
    });