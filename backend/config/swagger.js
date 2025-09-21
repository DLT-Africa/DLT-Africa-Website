const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "DLT Africa API",
      version: "1.0.0",
      description: "API documentation for DLT Africa website backend",
      contact: {
        name: "DLT Africa",
        email: "info@dltafrica.io",
      },
    },
    servers: [
      {
        url: "https://dlt-backend.vercel.app",
        description: "Production server",
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
      schemas: {
        User: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              description: "User ID",
            },
            firstName: {
              type: "string",
              description: "User first name",
            },
            lastName: {
              type: "string",
              description: "User last name",
            },
            email: {
              type: "string",
              format: "email",
              description: "User email address",
            },
            phone: {
              type: "string",
              description: "User phone number",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "User creation date",
            },
          },
        },
        Event: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              description: "Event ID",
            },
            title: {
              type: "string",
              description: "Event title",
            },
            description: {
              type: "string",
              description: "Event description",
            },
            date: {
              type: "string",
              format: "date-time",
              description: "Event date",
            },
            location: {
              type: "string",
              description: "Event location",
            },
            image: {
              type: "string",
              description: "Event image URL",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Event creation date",
            },
          },
        },
        Team: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              description: "Team member ID",
            },
            name: {
              type: "string",
              description: "Team member name",
            },
            position: {
              type: "string",
              description: "Team member position",
            },
            bio: {
              type: "string",
              description: "Team member bio",
            },
            image: {
              type: "string",
              description: "Team member image URL",
            },
            socialLinks: {
              type: "object",
              description: "Social media links",
            },
          },
        },
        Contact: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              description: "Contact message ID",
            },
            name: {
              type: "string",
              description: "Contact person name",
            },
            email: {
              type: "string",
              format: "email",
              description: "Contact email",
            },
            message: {
              type: "string",
              description: "Contact message",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Message creation date",
            },
          },
        },
        Waitlist: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              description: "Waitlist entry ID",
            },
            email: {
              type: "string",
              format: "email",
              description: "Waitlist email",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Waitlist entry date",
            },
          },
        },
        Error: {
          type: "object",
          properties: {
            message: {
              type: "string",
              description: "Error message",
            },
            status: {
              type: "integer",
              description: "HTTP status code",
            },
          },
        },
      },
    },
  },
  apis: ["./routes/*.js"], // Path to the API files
};

const specs = swaggerJsdoc(options);

module.exports = specs;
