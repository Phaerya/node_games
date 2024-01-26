const { Sequelize, DataTypes } = require('sequelize')
const GameModel = require('../models/game')
const games = require('./mock-games')

const sequelize = new Sequelize('BetterSteam', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
    dialectOptions: {
        timezone: 'Etc/GMT-2'
    },
    logging: false
})

const Game = GameModel(sequelize, DataTypes)

const initDb = () => {
    sequelize.sync({ force: true })
        .then(_ => {
            games.map(game => {
                Game.create({
                    name: game.name,
                    description: game.description,
                    picture: game.picture,
                    genre: game.genre.join(),
                    rating: game.rating
                }).then(game => console.log(game.toJSON()))
            })
            console.log('La base de données a bien été initalisé.')
        })
}

module.exports = {
    initDb, Game
}