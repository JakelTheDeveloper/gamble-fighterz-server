const express = require('express')
const scoresService = require('./scores-service')
const scoresRouter = express.Router()
const path = require('path')
const bodyParser = express.json()
const logger = require('../logger')

scoresRouter
    .route('/')
    .get(async(req, res, next) => {
        try{
       const scores = await scoresService.getAllScores(
            req.app.get('db')
       )
       const data = await scores
       res.status(200).json(data)
            next()
       }catch(error){
           next(error)
       }
    })
    .post(bodyParser, (req, res, next) => {
        const { username, score } = req.body;
        if (!username) {
            return res
                .status(400)
                .json({error:{message:'Name required'}});
        }
        if (username.length > 10) {
            return res
                .status(400)
                .json({error:{message:'Name must be 10 or less characters!'}});
        }
        const newScore = { username, score }
        scoresService.insertScore(
            req.app.get('db'),
            newScore
        )
            .then(score => {
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl, `/${score.id}`))
                    .json(score)
                    console.log(req.originalUrl)
            })
            .catch(next)
    })
module.exports = scoresRouter