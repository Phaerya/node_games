const { Game } = require('../db/sequelize')

/**
 * @swagger
 * /api/games:
 *  get:
 *      summary: GET Method for game library
 *      description: GET Method for all games
 *      responses : 
 *          200: 
 *              description: To test GET method
 */
module.exports = (app) => {
    app.get('/api/games', (req, res) => {
        Game.findAll()
            .then(games => {
                const message = 'La bibliothiqèe de jeux a bien été récupéré.'
                res.json({ message, data: games })
            })
            .catch(error => console.log(error))
    })
}