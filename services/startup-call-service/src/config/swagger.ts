import swaggerJsdoc from "swagger-jsdoc";
import "./schemas"; // Import schema definitions

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Startup Call Service API",
      version: "1.0.0",
      description: "API documentation for the Startup Call Service",
    },
    servers: [
      {
        url: process.env.API_URL || "http://localhost:3000",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.ts"], // Path to the API routes
};

export const swaggerSpec = swaggerJsdoc(options);
