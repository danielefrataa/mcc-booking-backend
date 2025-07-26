const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MCC Booking API',
      version: '1.0.0',
      description: 'Dokumentasi REST API untuk sistem booking & check-in MCC',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/routes/*.js'], // arahkan ke folder routes kamu
};

const specs = swaggerJsDoc(options);

module.exports = { swaggerUi, specs };
