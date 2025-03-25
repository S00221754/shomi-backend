import swaggerJsdoc from "swagger-jsdoc";
import ingredientDocs from "../docs/ingredientDocs";
import userIngredientDocs from "../docs/user-ingredientDocs";
import recipeDocs from "../docs/recipeDocs";
import unitTypeDocs from "../docs/unitTypeDocs";
import profileDocs from "../docs/profileDocs";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My TypeScript API",
      version: "1.0.0",
      description: "API documentation for my TypeScript Express API",
    },
    components: {
      securitySchemes: {
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
        CreateRecipeDTO: {
          type: "object",
          properties: {
            recipe_name: { type: "string", description: "The name of the recipe" },
            recipe_description: { type: "string", description: "Description of the recipe" },
            ingredients: {
              type: "array",
              items: { $ref: "#/components/schemas/RecipeIngredient" },
              description: "List of ingredients in the recipe"
            },
            recipe_instructions: { type: "string", description: "Cooking instructions for the recipe" },
            cooking_time: { type: "number", description: "Estimated cooking time in minutes" },
            author_id: { type: "string", description: "User ID or name of the author" },
          },
          required: ["recipe_name", "recipe_description", "recipe_instructions", "cooking_time", "author_id"],
        },
        UpdateRecipeDTO: {
          type: "object",
          properties: {
            recipe_name: { type: "string", description: "The name of the recipe" },
            ingredients: {
              type: "array",
              items: { $ref: "#/components/schemas/RecipeIngredient" },
              description: "List of ingredients in the recipe"
            },
            recipe_description: { type: "string", description: "Description of the recipe" },
            recipe_instructions: { type: "string", description: "Cooking instructions for the recipe" },
            cooking_time: { type: "number", description: "Estimated cooking time in minutes" },
          },
        },
        RecipeIngredient: {
          type: "object",
          properties: {
            ingredient_id: { type: "string", description: "ID of the ingredient" },
            ingredient_name: { type: "string", description: "name of the ingredient" },
            quantity: { type: "number", description: "Quantity of the ingredient" },
            unit: { type: "string", description: "Unit of measurement for the ingredient" },
          },
        }
      },
    },
    paths: {
      ...ingredientDocs,
      ...profileDocs,
      ...userIngredientDocs,
      ...recipeDocs,
      ...unitTypeDocs,
    },
    servers: [{ url: "http://localhost:3000" }],
  },
  apis: ["./src/routes/*.ts", "./src/controllers/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);
export default swaggerSpec;