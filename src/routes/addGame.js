const { Game } = require('../db/sequelize')

/**
 * @swagger
 * /api/games:
 *  post:
 *      summary: POST Method for game library
 *      description: Test POST method for a new game with incremented ID
 *      requestBody:
 *        description: Game object to be added
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                  description: The name of the game
 *                description:
 *                  type: string
 *                  description: The description of the game
 *                picture:
 *                  type: string
 *                  description: The URL or path to the picture of the game
 *                genre:
 *                  type: string
 *                  description: The genre of the game
 *                rating:
 *                  type: integer
 *                  description: The rating of the game (optional)
 *      responses : 
 *          200: 
 *              description: Game has been added to the collection with unique ID
 *          403:
 *              description: Game not added because it already exists             
 */
module.exports = (app) => {
    app.post('/api/games', (req, res) => {
        Game.create(req.body)
            .then(game => {
                const message = `Le jeu ${req.body.name} a bien été créé.`
                res.json({ message, data: game })
            })
            .catch(error => console.log(error))
    })
}