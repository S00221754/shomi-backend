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
    },
  };
  
export default ingredientDocs;
  