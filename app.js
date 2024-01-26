const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const sequelize = require('./src/db/sequelize')
const { INTEGER } = require('sequelize')

const app = express()
const port = 3000

/*************************************************************************** */
/*****************************SWAGGER*************************************** */
const options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "API de bibliothèque de jeux avec Swagger",
            version: "0.1.0",
            description:
                "Application API CRUD simple faite avec express et documenté avec swagger",
            contact: {
                name: "Joaquim",
                email: "info@email.com",
            },
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
        components: {
            schemas: {
                Game: {
                    type: 'object',
                    properties: {
                        name: {
                            type: 'string',
                        },
                        description: {
                            type: 'string',
                        },
                        picture: {
                            type: 'string'
                        },
                        genre: {
                            type: [],
                        },
                        rating: {
                            type: INTEGER
                        }
                    },
                    required: ['name', 'description', 'genre'],
                },
            },
        },
    },
    apis: ['./src/routes/*.js'],
};

const specs = swaggerJsdoc(options);
app

    .use(
        "/api-docs",
        swaggerUi.serve,
        swaggerUi.setup(specs)
    )
    .use(morgan('dev'))
    .use(bodyParser.json())

/*************************************************************************** */
/*************************************************************************** */
sequelize.initDb()

require('./src/routes/findAllGames')(app)
require('./src/routes/findGameById')(app)
require('./src/routes/addGame')(app)

app.listen(port, () => console.log(`Notre application est démarrée sur le port :${port}`))