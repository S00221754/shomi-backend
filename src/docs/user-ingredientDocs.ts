const userIngredientDocs = {
  "/api/v1/user-ingredient": {
    post: {
      summary: "Add an ingredient to a user's pantry",
      tags: ["User Ingredients (Pantry)"],
      description: "Adds an ingredient to a user's pantry after verifying the user and ingredient exist.",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["userId", "ingredientId", "unitQuantity"],
              properties: {
                userId: {
                  type: "string",
                  format: "uuid",
                  description: "The ID of the user adding the ingredient.",
                },
                ingredientId: {
                  type: "string",
                  format: "uuid",
                  description: "The ID of the ingredient being added to the pantry.",
                },
                unitQuantity: {
                  type: "integer",
                  minimum: 1,
                  description: "The number of units (e.g., 2 packs, 3 bottles).",
                },
                totalAmount: {
                  type: "number",
                  format: "double",
                  nullable: true,
                  description: "The total weight/volume (e.g., 500g, 1.5L).",
                },
                unitType: {
                  type: "string",
                  nullable: true,
                  description: "The unit of measurement (e.g., g, kg, ml, L, cups).",
                },
                expiryDate: {
                  type: "string",
                  format: "date-time",
                  nullable: true,
                  description: "Optional expiry date of the ingredient in the pantry.",
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: "Ingredient successfully added to the pantry.",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                    format: "uuid",
                    description: "The ID of the newly created pantry entry.",
                  },
                  userId: {
                    type: "string",
                    format: "uuid",
                    description: "The ID of the user who owns this pantry entry.",
                  },
                  ingredientId: {
                    type: "string",
                    format: "uuid",
                    description: "The ID of the ingredient added.",
                  },
                  unitQuantity: {
                    type: "integer",
                    description: "The number of units (e.g., 2 packs, 3 bottles).",
                  },
                  totalAmount: {
                    type: "number",
                    format: "double",
                    nullable: true,
                    description: "The total weight/volume (e.g., 500g, 1.5L).",
                  },
                  unitType: {
                    type: "string",
                    nullable: true,
                    description: "The unit of measurement (e.g., g, kg, ml, L, cups).",
                  },
                  expiryDate: {
                    type: "string",
                    format: "date-time",
                    nullable: true,
                    description: "Expiry date of the ingredient if provided.",
                  },
                  addedAt: {
                    type: "string",
                    format: "date-time",
                    description: "Timestamp when the ingredient was added.",
                  },
                },
              },
            },
          },
        },
        400: {
          description: "Bad request, possibly due to missing required fields.",
        },
        404: {
          description: "User or ingredient not found.",
        },
        500: {
          description: "Internal server error.",
        },
      },
    },
  },
};

export default userIngredientDocs;
