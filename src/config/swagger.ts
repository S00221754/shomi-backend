import swaggerJsdoc from "swagger-jsdoc";
import ingredientDocs from "../docs/ingredientDocs";
import userAccountDocs from "../docs/user-accountDocs";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My TypeScript API",
      version: "1.0.0",
      description: "API documentation for my TypeScript Express API",
    },
    components: {
      schemas: {
        IngredientInput: {
          type: "object",
          properties: {
            ING_Name: { type: "string", description: "The name of the ingredient" },
            ING_BrandName: { type: "string", description: "The brand of the ingredient (optional)" },
            ING_KeyWords: { type: "array", items: { type: "string" }, description: "Keywords related to the ingredient" },
            ING_Units: { type: "array", items: { type: "string" }, description: "The unit types for the ingredient" },
            ING_Barcode: { type: "string", description: "The barcode of the ingredient (optional)" },
          },
          required: ["ING_Name"],
        },
      },
    },
    paths: {
      ...ingredientDocs,
      ...userAccountDocs,
    },
    servers: [{ url: "http://localhost:3000" }],
  },
  apis: ["./src/routes/*.ts", "./src/controllers/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);
export default swaggerSpec;