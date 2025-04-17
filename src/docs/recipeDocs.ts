const recipeDocs = {
  "/api/v1/recipes": {
    post: {
      summary: "Create a new recipe",
      tags: ["Recipe"],
      security: [{ BearerAuth: [] as string[] }],
      requestBody: {
        description: "Recipe details",
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/CreateRecipeDTO",
            },
          },
        },
      },
      responses: {
        201: { description: "Recipe created successfully" },
        400: { description: "Bad Request" },
        500: { description: "Server error" },
      },
    },
    get: {
      summary: "Get all recipes",
      tags: ["Recipe"],
      responses: {
        200: { description: "List of recipes" },
        500: { description: "Server error" },
      },
    },
  },

  "/api/v1/recipes/{id}": {
    get: {
      summary: "Get a recipe by ID",
      tags: ["Recipe"],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
        },
      ],
      responses: {
        200: { description: "Recipe details" },
        404: { description: "Recipe not found" },
        500: { description: "Server error" },
      },
    },
    patch: {
      summary: "Update a recipe by ID",
      tags: ["Recipe"],
      security: [{ BearerAuth: [] as string[] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
        },
      ],
      requestBody: {
        description: "Updated recipe details",
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/UpdateRecipeDTO",
            },
          },
        },
      },
      responses: {
        200: { description: "Recipe updated successfully" },
        400: { description: "Bad Request" },
        404: { description: "Recipe not found" },
        500: { description: "Server error" },
      },
    },
    delete: {
      summary: "Delete a recipe by ID",
      tags: ["Recipe"],
      security: [{ BearerAuth: [] as string[] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
        },
      ],
      responses: {
        200: { description: "Recipe deleted successfully" },
        404: { description: "Recipe not found" },
        500: { description: "Server error" },
      },
    },
  },

  "/api/v1/recipes/recommended": {
    post: {
      summary: "Get recommended recipes for the authenticated user",
      tags: ["Recipe"],
      security: [{ BearerAuth: [] as string[] }],
      requestBody: {
        required: false,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                selectedIngredients: {
                  type: "array",
                  items: { type: "string" },
                },
              },
            },
          },
        },
      },
      responses: {
        200: { description: "Recommended recipes returned" },
        400: { description: "Bad Request" },
        404: { description: "No recommendations found" },
        500: { description: "Server error" },
      },
    },
  },

  "/api/v1/recipes/{recipeId}/deduction-preview": {
    post: {
      summary: "Get deduction preview for a recipe",
      tags: ["Recipe"],
      security: [{ BearerAuth: [] as string[] }],
      parameters: [
        {
          name: "recipeId",
          in: "path",
          required: true,
          schema: { type: "string" },
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                user_id: { type: "string" },
              },
              required: ["user_id"],
            },
          },
        },
      },
      responses: {
        200: { description: "List of matches" },
        400: { description: "Bad request" },
        404: { description: "Recipe or pantry data not found" },
        500: { description: "Server error" },
      },
    },
  },

  "/api/v1/recipes/{recipeId}/cooked": {
    post: {
      summary: "Mark recipe as cooked and deduct ingredients",
      tags: ["Recipe"],
      security: [{ BearerAuth: [] as string[] }],
      parameters: [
        {
          name: "recipeId",
          in: "path",
          required: true,
          schema: { type: "string" },
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["user_id", "deductions"],
              properties: {
                user_id: { type: "string" },
                deductions: {
                  type: "array",
                  items: {
                    type: "object",
                    required: [
                      "user_ingredient_id",
                      "recipe_quantity",
                      "recipe_unit",
                    ],
                    properties: {
                      user_ingredient_id: { type: "string" },
                      recipe_quantity: { type: "number" },
                      recipe_unit: { type: "string" },
                    },
                  },
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Deduction completed",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean" },
                  updated: {
                    type: "array",
                    items: { type: "string" },
                  },
                  skipped: {
                    type: "array",
                    items: { type: "string" },
                  },
                },
              },
            },
          },
        },
        400: { description: "Bad Request" },
        404: { description: "Not Found" },
        500: { description: "Server error" },
      },
    },
  },
};

export default recipeDocs;
