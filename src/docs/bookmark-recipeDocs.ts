const bookmarkedRecipeDocs = {
  "/api/v1/bookmarks": {
    post: {
      summary: "Bookmark a recipe",
      tags: ["Bookmarked Recipes"],
      security: [{ BearerAuth: [] as string[] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                recipeId: { type: "string" },
              },
              required: ["recipeId"],
            },
          },
        },
      },
      responses: {
        201: { description: "Recipe bookmarked successfully" },
        409: { description: "Recipe already bookmarked" },
        500: { description: "Server error" },
      },
    },
    delete: {
      summary: "Unbookmark a recipe",
      tags: ["Bookmarked Recipes"],
      security: [{ BearerAuth: [] as string[] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                recipeId: { type: "string" },
              },
              required: ["recipeId"],
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
    get: {
      summary: "Get all bookmarked recipes for the authenticated user",
      tags: ["Bookmarked Recipes"],
      security: [{ BearerAuth: [] as string[] }],
      responses: {
        200: { description: "List of bookmarked recipes" },
        500: { description: "Server error" },
      },
    },
  },

  "/api/v1/bookmarks/{recipeId}": {
    get: {
      summary: "Check if a recipe is bookmarked by the authenticated user",
      tags: ["Bookmarked Recipes"],
      security: [{ BearerAuth: [] as string[] }],
      parameters: [
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
