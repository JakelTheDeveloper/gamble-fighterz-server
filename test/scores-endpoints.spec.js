const { expect } = require('chai')
const knex = require('knex')
const app = require('../src/app')
require('dotenv').config()
const { makeScoresArray } = require('./scores.fixtures')

describe('Scores Endpoints', function () {
    let db
    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL,
        })
        app.set('db', db)
    })

    before('clean the table', () => db('gamblescore_data').truncate())

    afterEach('cleanup', () => db('gamblescore_data').truncate())

    after('disconnect from db', () => db.destroy())

    describe('GET /api/scores', () => {
        context(`Given no scores`, () => {
            it(`responds with 200 and an empty list`, () => {
                return supertest(app)
                    .get('/api/scores')
                    .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(200, [])
            })
        })
    })
    describe('GET /api/scores', () => {
        context('Given there are scores in the database', () => {
            let testScores = makeScoresArray()
            beforeEach('insert scores', () => {
                return db
                    .into('gamblescore_data')
                    .insert(testScores)
            })
            it('GET /scores responds with 200 and all of the scores', () => {
                return supertest(app)
                    .get('/api/scores')
                    .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(200, testScores)
            })
        })
    })
    describe(`POST /api/scores`, () => {
        it(`creates a score, responding with 201 and the new score`, function () {
            const newScore = {
                username: 'JuiceBar',
                score: 20000
            }
            return supertest(app)
                .post('/api/scores')
                .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                .send(newScore)
                .expect(201)
                .expect(res => {
                    expect(res.body.username).to.eql(newScore.username)
                    expect(res.body.score).to.eql(newScore.score)
                    expect(res.body).to.have.property('id')
                })
        })
        it(`responds with 400 and an error message when the 'username' is missing`, () => {
            return supertest(app)
                .post('/api/scores')
                .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                .send({
                    score: 7800
                })
                .expect(400, {
                    error: { message: `Name required` }
                })
        })
    })
})