import swaggerJsdoc from "swagger-jsdoc";
import ingredientDocs from "../docs/ingredientDocs";
import userAccountDocs from "../docs/user-accountDocs";
import userIngredientDocs from "../docs/user-ingredientDocs";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My TypeScript API",
      version: "1.0.0",
      description: "API documentation for my TypeScript Express API",
    },
    components: {
      securitySchemes:{
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        IngredientInput: {
          type: "object",
          properties: {
            Ing_name: { type: "string", description: "The name of the ingredient" },
            Ing_brand: { type: "string", description: "The brand of the ingredient (optional)" },
            Ing_keywords: { type: "array", items: { type: "string" }, description: "Keywords related to the ingredient" },
            Ing_units: { type: "array", items: { type: "string" }, description: "The unit types for the ingredient" },
            Ing_barcode: { type: "string", description: "The barcode of the ingredient (optional)" },
          },
          required: ["ING_Name"],
        },
      },
    },
    paths: {
      ...ingredientDocs,
      ...userAccountDocs,
      ...userIngredientDocs,
    },
    servers: [{ url: "http://localhost:3000" }],
  },
  apis: ["./src/routes/*.ts", "./src/controllers/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);
export default swaggerSpec;