// src/docs/swagger.ts

import swaggerJsdoc from 'swagger-jsdoc';
import dotenv from 'dotenv';

dotenv.config();

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your Project API',
      version: '1.0.0',
      description: 'API documentation for Your Project',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 5000}`,
        description: 'Development server',
      },
      // You can add production server details here
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
  },
  // Path to the API docs
  apis: ['./src/routes/*.ts', './src/models/*.ts'], // Adjust the paths as needed
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
