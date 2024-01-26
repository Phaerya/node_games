const { Game } = require('../db/sequelize')

/**
 * @swagger
 * /api/games/{id}:
 *  get:
 *      summary: GET Method for game library
 *      description: GET Method for a specific game by ID
 *      parameters:
 *          - in: path
 *            name: id
 *            description: ID of the game to be fetched
 *            required: true
 *            schema:
 *              type: string
 *      responses : 
 *          200: 
 *              description: Game has been fetched
 *          404:
 *              description: This ID does not exist
 */

module.exports = (app) => {
    app.get('/api/games/:id', (req, res) => {
        Game.findByPk(req.params.id)
            .then(game => {
                const message = 'Un jeu a été trouvé.'
                res.json({ message, data: game })
            })
            .catch(error => console.log(error))
    })
}