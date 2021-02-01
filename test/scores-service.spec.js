const scoresService = require('../src/scores/scores-service')
const knex = require('knex')
const app = require('../src/app')
const { expect } = require('chai')

describe(`Highscore service object`, function () {
    let db
    const testScores = [
        {
            id: 1,
            score: 125000,
            username: "Foo"
        },
        {
            id: 2,
            score: 80000,
            username: "Bar"
        },
        {
            id: 3,
            score: 1000000,
            username: "Juice"
        }
    ]
    before(() => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL,
        })
        app.set('db', db)
    })

    before(() => db('gamblescore_data').truncate())
    afterEach(() => db('gamblescore_data').truncate())
    after(() => db.destroy())

    context('Given gamblescore_data has data', () => {
        before(() => {
            return db
                .into('gamblescore_data')
                .insert(testScores)
        })
        it(`getAllScores() resolves all scores from 'gamblescore_data' table`, () => {
            return scoresService.getAllScores(db)
                .then(scores => {
                    expect(scores).to.eql(testScores)
                })
        })
    })
    context(`Given 'gamblescore_data' has no data`, () => {
        it(`getAllScores() resolves an empty array`, () => {
            return scoresService.getAllScores(db)
                .then(scores => {
                    expect(scores).to.eql([])
                })
        })
        it(`insertScore() inserts a new score and resolves new score and an 'id'`, () => {
            let newScore = {
                username: "Foomar",
                score: 5000
            }
            return scoresService.insertScore(db, newScore)
                .then(score => {
                    expect(score).to.eql({
                        id: 1,
                        username: newScore.username,
                        score: newScore.score
                    })
                })
        })
    })
})
