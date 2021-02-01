const scoresService = {
    getAllScores(knex){
       return knex.select('*').from('gamblescore_data')
    },
    insertScore(knex,newScore){
        return knex
        .insert(newScore)
        .into('gamblescore_data')
        .returning('*')
        .then(rows=>{
            return rows[0]
        })
    }
}

module.exports = scoresService