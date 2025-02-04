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
  "/api/v1/user-ingredient/{id}": {
    get: {
      summary: "Get a user's pantry ingredients",
      tags: ["User Ingredients (Pantry)"],
      description: "Retrieves all ingredients that a user has added to their pantry.",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "string",
            format: "uuid",
          },
          description: "The ID of the user whose pantry ingredients are being retrieved.",
        },
      ],
      responses: {
        200: {
          description: "Successfully retrieved user's pantry ingredients.",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: {
                      type: "string",
                      format: "uuid",
                      description: "The unique ID of the pantry entry.",
                    },
                    userId: {
                      type: "string",
                      format: "uuid",
                      description: "The ID of the user who owns this pantry entry.",
                    },
                    ingredientId: {
                      type: "string",
                      format: "uuid",
                      description: "The ID of the ingredient in the pantry.",
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
        },
        400: {
          description: "Bad request. Possibly due to missing or invalid user ID.",
        },
        404: {
          description: "User not found or user has no ingredients in their pantry.",
        },
        500: {
          description: "Internal server error.",
        },
      },
    },
    patch: {
      summary: "Update a user's pantry ingredient",
      tags: ["User Ingredients (Pantry)"],
      description: "Allows a user to update unitQuantity, totalAmount, or expiry_date for an ingredient in their pantry.",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "string",
            format: "uuid",
          },
          description: "The unique ID of the user's pantry ingredient entry to be updated.",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                unitQuantity: {
                  type: "integer",
                  minimum: 0,
                  description: "The new unit quantity (e.g., 2 bottles). Must be a non-negative integer.",
                },
                totalAmount: {
                  type: "number",
                  format: "double",
                  minimum: 0,
                  nullable: true,
                  description: "The new total amount (e.g., 500g flour). Must be a non-negative number or null.",
                },
                unitType: {
                  type: "string",
                  maxLength: 50,
                  nullable: true,
                  description: "The unit of measurement (e.g., g, kg, ml, L, cups). Maximum length: 50 characters.",
                },
                expiry_date: {
                  type: "string",
                  format: "date-time",
                  nullable: true,
                  description: "The new expiry date for the ingredient in ISO 8601 format (e.g., '2025-12-31T00:00:00Z').",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Ingredient successfully updated.",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                    format: "uuid",
                    description: "The unique ID of the pantry entry.",
                  },
                  userId: {
                    type: "string",
                    format: "uuid",
                    description: "The ID of the user who owns this pantry entry.",
                  },
                  ingredientId: {
                    type: "string",
                    format: "uuid",
                    description: "The ID of the ingredient being updated.",
                  },
                  unitQuantity: {
                    type: "integer",
                    description: "The updated unit quantity.",
                  },
                  totalAmount: {
                    type: "number",
                    format: "double",
                    nullable: true,
                    description: "The updated total amount.",
                  },
                  unitType: {
                    type: "string",
                    nullable: true,
                    description: "The updated unit of measurement.",
                  },
                  expiry_date: {
                    type: "string",
                    format: "date-time",
                    nullable: true,
                    description: "The updated expiry date.",
                  },
                  addedAt: {
                    type: "string",
                    format: "date-time",
                    description: "Timestamp when the ingredient was originally added.",
                  },
                },
              },
            },
          },
        },
        400: {
          description: "Bad request. Invalid or missing input fields.",
        },
        404: {
          description: "User ingredient entry not found.",
        },
        500: {
          description: "Internal server error.",
        },
      },
    },
  },

};

export default userIngredientDocs;
