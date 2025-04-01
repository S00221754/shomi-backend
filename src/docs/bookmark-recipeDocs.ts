const bookmarkedRecipeDocs = {
  "/api/v1/bookmarks": {
    post: {
      summary: "Bookmark a recipe",
      tags: ["Bookmarked Recipes"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                user_id: { type: "string" },
                recipe_id: { type: "string" },
              },
              required: ["user_id", "recipe_id"],
            },
          },
        },
      },
      responses: {
        201: { description: "Recipe bookmarked successfully" },
        404: { description: "User or recipe not found" },
        409: { description: "Recipe already bookmarked" },
        500: { description: "Server error" },
      },
    },
    delete: {
      summary: "Unbookmark a recipe",
      tags: ["Bookmarked Recipes"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                user_id: { type: "string" },
                recipe_id: { type: "string" },
              },
              required: ["user_id", "recipe_id"],
            },
          },
        },
      },
      responses: {
        204: { description: "Bookmark removed successfully" },
        404: { description: "Bookmark not found" },
        500: { description: "Server error" },
      },
    },
  },

  "/api/v1/bookmarks/{userId}": {
    get: {
      summary: "Get all bookmarked recipes by user",
      tags: ["Bookmarked Recipes"],
      parameters: [
        {
          in: "path",
          name: "userId",
          schema: { type: "string" },
          required: true,
          description: "User ID",
        },
      ],
      responses: {
        200: { description: "List of bookmarked recipes" },
        404: { description: "User not found" },
        500: { description: "Server error" },
      },
    },
  },

  "/api/v1/bookmarks/{userId}/{recipeId}": {
    get: {
      summary: "Check if a recipe is bookmarked by a user",
      tags: ["Bookmarked Recipes"],
      parameters: [
        {
          in: "path",
          name: "userId",
          schema: { type: "string" },
          required: true,
          description: "User ID",
        },
        {
          in: "path",
          name: "recipeId",
          schema: { type: "string" },
          required: true,
          description: "Recipe ID",
        },
      ],
      responses: {
        200: {
          description: "Bookmark status returned",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  bookmarked: { type: "boolean" },
                },
              },
            },
          },
        },
        500: { description: "Server error" },
      },
    },
  },
};

export default bookmarkedRecipeDocs;
