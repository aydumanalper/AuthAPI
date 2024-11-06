// src/docs/swagger/swaggerOptions.ts

import { Options } from 'swagger-jsdoc';
import dotenv from 'dotenv';

dotenv.config();

const swaggerOptions: Options = {
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
      // Add production servers as needed
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      // Schemas are imported via JSDoc comments
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
  },
  // Path to the API docs
  apis: ['./src/routes/*.ts', './src/docs/swagger/components/*.ts'], // Adjust paths as needed
};

export default swaggerOptions;
