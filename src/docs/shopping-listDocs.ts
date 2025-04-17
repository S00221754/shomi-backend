const shoppingListDocs = {
  "/api/v1/shopping-list": {
    post: {
      summary: "Add an item to the shopping list",
      tags: ["Shopping List"],
      security: [{ BearerAuth: [] as string[] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                user_id: { type: "string", format: "uuid" },
                ingredient_id: { type: "number" },
                Shop_quantity: { type: "number" },
                Shop_added_automatically: { type: "boolean" },
                Shop_reason: { type: "string" },
              },
              required: ["user_id", "ingredient_id"],
              example: {
                user_id: "3bf5eea8-fed5-4695-a564-667a3a6767cd",
                ingredient_id: 101,
                Shop_quantity: 1,
                Shop_added_automatically: false,
                Shop_reason: "",
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: "Item added successfully",
          content: {
            "application/json": {
              example: {
                Shop_id: "d2d09c97-9e43-4d14-b9e0-0f263efec318",
                user_id: "3bf5eea8-fed5-4695-a564-667a3a6767cd",
                ingredient_id: 101,
                Shop_quantity: 1,
                Shop_added_automatically: false,
                Shop_reason: "",
                Shop_created_at: "2025-04-12T12:10:00.000Z",
              },
            },
          },
        },
        409: { description: "Item already exists in shopping list" },
        500: { description: "Server error" },
      },
    },
  },

  "/api/v1/shopping-list/{userId}": {
    get: {
      summary: "Get a user's shopping list",
      tags: ["Shopping List"],
      security: [{ BearerAuth: [] as string[] }],
      parameters: [
        {
          in: "path",
          name: "userId",
          schema: { type: "string", format: "uuid" },
          required: true,
          description: "The user's UUID",
        },
      ],
      responses: {
        200: {
          description: "Shopping list retrieved successfully",
          content: {
            "application/json": {
              example: [
                {
                  Shop_id: "6c44d4b4-8735-44dc-a457-e66f5a41a123",
                  user_id: "3bf5eea8-fed5-4695-a564-667a3a6767cd",
                  ingredient_id: 101,
                  Shop_quantity: 2,
                  Shop_added_automatically: true,
                  Shop_reason: "expiring",
                  Shop_created_at: "2025-04-12T12:00:00.000Z",
                  ingredient: {
                    Ing_id: 101,
                    Ing_name: "Milk",
                    Ing_brand: "DairyPure",
                    Ing_quantity: 1000,
                    Ing_quantity_units: "ml",
                    Ing_keywords: ["dairy", "white"],
                    Ing_barcode: "1234567890123",
                  },
                },
              ],
            },
          },
        },
        404: { description: "User not found" },
        500: { description: "Server error" },
      },
    },
  },

  "/api/v1/shopping-list/{id}": {
    patch: {
      summary: "Update a shopping list item",
      tags: ["Shopping List"],
      security: [{ BearerAuth: [] as string[] }],
      parameters: [
        {
          in: "path",
          name: "id",
          schema: { type: "string", format: "uuid" },
          required: true,
          description: "UUID of the shopping list item",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                Shop_quantity: { type: "number" },
                Shop_added_automatically: { type: "boolean" },
                Shop_reason: { type: "string" },
              },
              example: {
                Shop_quantity: 3,
                Shop_added_automatically: true,
                Shop_reason: "low_quantity",
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Item updated successfully",
          content: {
            "application/json": {
              example: {
                Shop_id: "d2d09c97-9e43-4d14-b9e0-0f263efec318",
                Shop_quantity: 3,
                Shop_added_automatically: true,
                Shop_reason: "low_quantity",
              },
            },
          },
        },
        404: { description: "Shopping list item not found" },
        500: { description: "Server error" },
      },
    },

    delete: {
      summary: "Delete an item from the shopping list",
      tags: ["Shopping List"],
      security: [{ BearerAuth: [] as string[] }],
      parameters: [
        {
          in: "path",
          name: "id",
          schema: { type: "string", format: "uuid" },
          required: true,
          description: "UUID of the shopping list item",
        },
      ],
      responses: {
        204: { description: "Item deleted successfully" },
        404: { description: "Shopping list item not found" },
        500: { description: "Server error" },
      },
    },
  },

  "/api/v1/shopping-list/{id}/mark-bought": {
    patch: {
      summary: "Mark a shopping list item as bought",
      tags: ["Shopping List"],
      security: [{ BearerAuth: [] as string[] }],
      parameters: [
        {
          in: "path",
          name: "id",
          schema: { type: "string", format: "uuid" },
          required: true,
          description: "UUID of the shopping list item",
        },
      ],
      responses: {
        200: {
          description: "Item marked as bought and added to pantry",
          content: {
            "application/json": {
              example: {
                message: "Item marked as bought and moved to pantry.",
              },
            },
          },
        },
        404: { description: "Shopping list item not found" },
        409: {
          description:
            "Pantry already has variants with expiry tracking. Prompt user to choose batch or create new.",
        },
        500: { description: "Server error" },
      },
    },
  },
};

export default shoppingListDocs;
