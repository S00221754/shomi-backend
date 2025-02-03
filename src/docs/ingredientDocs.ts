const ingredientDocs = {
    "/api/v1/ingredient": {
      post: {
        summary: "Create a new ingredient",
        tags: ["Ingredient"],
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
        schema: {
          type: "string",
        },
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
      404: {
        description: "Ingredient not found",
      },
      500: {
        description: "Server error",
      },
    },
  },
}
  };
  
  export default ingredientDocs;
  