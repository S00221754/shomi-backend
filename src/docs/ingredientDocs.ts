const ingredientDocs = {
  "/api/v1/ingredient": {
    post: {
      summary: "Create a new ingredient",
      tags: ["Ingredient"],
      security: [{ BearerAuth: [] as string[] }],
      requestBody: {
        description: "Ingredient details",
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/IngredientInput",
            },
          },
        },
      },
      responses: {
        201: {
          description: "Ingredient created successfully",
        },
        400: {
          description: "Bad Request",
        },
        500: {
          description: "Server error",
        },
      },
    },
    get: {
      summary: "Get all ingredients",
      tags: ["Ingredient"],
      responses: {
        200: {
          description: "List of ingredients",
        },
        500: {
          description: "Server error",
        },
      },
    },
  },

  "/api/v1/ingredient/barcode/{barcode}": {
    get: {
      summary: "Get an ingredient by barcode",
      tags: ["Ingredient"],
      parameters: [
        {
          name: "barcode",
          in: "path",
          required: true,
          description: "The barcode of the ingredient to retrieve",
          schema: { type: "string" },
        },
      ],
      responses: {
        200: {
          description: "Ingredient found",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/IngredientInput",
              },
            },
          },
        },
        404: { description: "Ingredient not found" },
        500: { description: "Server error" },
      },
    },
  },

  "/api/v1/ingredient/{id}": {
    get: {
      summary: "Get an ingredient by ID",
      tags: ["Ingredient"],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "The ID of the ingredient to retrieve",
          schema: { type: "string" },
        },
      ],
      responses: {
        200: {
          description: "Ingredient found",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/IngredientInput",
              },
            },
          },
        },
        404: { description: "Ingredient not found" },
        500: { description: "Server error" },
      },
    },
    put: {
      summary: "Update an ingredient (Authenticated users)",
      tags: ["Ingredient"],
      security: [{ BearerAuth: [] as string[] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "The ID of the ingredient to update",
          schema: { type: "string" },
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/IngredientInput",
            },
          },
        },
      },
      responses: {
        200: {
          description: "Ingredient updated successfully",
        },
        400: {
          description: "Bad Request - Missing or invalid data",
        },
        404: {
          description: "Ingredient not found",
        },
        500: {
          description: "Server error",
        },
      },
    },
    delete: {
      summary: "Delete an ingredient (Authenticated users)",
      tags: ["Ingredient"],
      security: [{ BearerAuth: [] as string[] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "The ID of the ingredient to delete",
          schema: { type: "string" },
        },
      ],
      responses: {
        200: {
          description: "Ingredient deleted successfully",
        },
        404: {
          description: "Ingredient not found",
        },
        500: {
          description: "Server error",
        },
      },
    },
  },
};

export default ingredientDocs;
