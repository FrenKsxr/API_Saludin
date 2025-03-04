const swaggerjsdoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'apiv.1',
            version: '1.0.0',
            description: 'API PASTILLAS DROGAS',
            contact: {
                name: 'AlexGei',
            },
            servers: [
                {
                    url: 'https://alexyah064.github.io',
                },
                {
                    url: 'http://localhost:3000'
                }
            ]
        },
    },
    apis: ['./routes/*.js']
};

const specs = swaggerjsdoc(options);

module.exports = specs;
