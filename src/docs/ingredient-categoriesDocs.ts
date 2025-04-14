const ingredientCategoryDocs = {
  "/api/v1/ingredient-categories": {
    get: {
      summary: "Get all ingredient categories",
      tags: ["Ingredient Categories"],
      responses: {
        200: {
          description: "Ingredient categories retrieved successfully",
        },
        500: {
          description: "Server error",
        },
      },
    },
  },
};
export default ingredientCategoryDocs;
