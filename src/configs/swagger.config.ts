import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  //   info
  info: {
    title: "Express API Docs",
    version: "1.0.0",
    description: "Express API application documented ",
  },
  //   server
  servers: [{ url: "http://localhost:5001", description: "Development sever" }],
  //   component
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
      cookieAuth: {
        type: "apiKey",
        in: "cookie",
        name: "refreshToken",
      },
    },
  },
  //   security
  security: [
    {
      bearerAuth: [],
    },
    {
      cookieAuth: [],
    },
  ],
};

const options = { swaggerDefinition, apis: ["./src/docs/*.ts"] };

export const swaggerSpec = swaggerJSDoc(options);
